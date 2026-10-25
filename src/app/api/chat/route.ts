import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { evaluateSafety } from "@/lib/safety/classifier";
import { maskPii } from "@/lib/safety/piiMasker";
import { retrieveKnowledge } from "@/lib/ai/ragEngine";
import { generateGeminiChat, getGeminiConfigStatus } from "@/lib/ai/geminiService";

const ChatRequestSchema = z.object({
  message: z.string().min(1, "Pesan tidak boleh kosong").max(1000, "Pesan maksimal 1.000 karakter"),
  userAlias: z.string().optional().default("Alex"),
  mode: z.enum(["guided_story", "practice_talk"]).optional().default("guided_story"),
  persona: z.enum(["orang_tua", "guru_dosen", "teman", "konselor"]).optional().default("orang_tua"),
  storyContext: z
    .object({
      facts: z.string().optional(),
      feelings: z.string().optional(),
      needs: z.string().optional(),
      openingLine: z.string().optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      {
        status: "validation_error",
        error: "Format request JSON tidak valid.",
      },
      { status: 400 }
    );
  }

  try {
    const parseResult = ChatRequestSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          status: "validation_error",
          error: parseResult.error.errors[0]?.message || "Input tidak valid",
        },
        { status: 400 }
      );
    }

    const { message, userAlias, mode, persona, storyContext } = parseResult.data;

    // 1. Safety Screening & Triage Layer (Rule: Separate from LLM)
    const safety = evaluateSafety(message);
    if (safety.isCrisis) {
      return NextResponse.json({
        status: "crisis_detected",
        reply: safety.safetyMessage,
        isAiGenerated: false,
        safety,
        sources: [
          {
            id: "safety-01",
            title: "Protokol Darurat Kesehatan Jiwa Nasional 119 ext 8 (SEJIWA)",
            author_or_organization: "Kementerian Kesehatan Republik Indonesia",
            publication_date: "2023",
            url: "https://sejiwa.kemkes.go.id/",
            material_section: "Layanan Konseling Darurat Pencegahan Bunuh Diri dan Krisis Kejiwaan",
            score: 1.0,
            snippet: "Layanan konseling darurat pencegahan bunuh diri dan krisis kejiwaan nasional 24 jam bebas pulsa.",
            review_status: "official_protocol",
          },
        ],
      });
    }

    if (safety.isClinicalDiagnosisRequest) {
      return NextResponse.json({
        status: "clinical_refusal",
        reply: safety.safetyMessage,
        isAiGenerated: false,
        safety,
        statusBadge: "Batas Nonklinis SELA.AI",
        sources: [
          {
            id: "navigasi-04",
            title: "Mengenal Peran Psikolog Klinis, Psikiater (Sp.KJ), dan Konselor Sebaya",
            author_or_organization: "Ikatan Psikolog Klinis (IPK) Indonesia & PDSKJI",
            publication_date: "2023",
            url: "https://ipkindonesia.or.id/",
            material_section: "Pedoman Penyelenggaraan Pelayanan Kesehatan Mental Terpadu",
            score: 1.0,
            snippet: "Psikolog klinis dan psikiater adalah tenaga profesional yang berwenang memberikan asesmen dan evaluasi klinis mendalam, bukan model kecerdasan buatan.",
            review_status: "verified_expert",
          },
          {
            id: "navigasi-01",
            title: "Alur Konsultasi Kesehatan Mental di Puskesmas Menggunakan BPJS Kesehatan",
            author_or_organization: "BPJS Kesehatan & Kementerian Kesehatan Republik Indonesia",
            publication_date: "2023",
            url: "https://bpjs-kesehatan.go.id/",
            material_section: "Panduan Layanan Kesehatan Jiwa Tingkat Pertama (Faskes 1)",
            score: 0.95,
            snippet: "Konsultasi kesehatan mental ditanggung 100% oleh BPJS Kesehatan di Faskes Tingkat 1 (Puskesmas/Klinik Pratama tempat terdaftar).",
            review_status: "official_protocol",
          },
        ],
      });
    }

    // 2. Data Sanitization (PII Masking)
    const sanitizedMessage = maskPii(message);

    // 3. Knowledge Retrieval (Gemini Semantic + BM25 Hybrid RAG)
    const rag = await retrieveKnowledge(sanitizedMessage, 2);

    // 4. Check Gemini API Configuration Status
    const configStatus = getGeminiConfigStatus();
    if (!configStatus.isConfigured) {
      if (mode === "practice_talk") {
        const offlinePersonaReplies: Record<string, string> = {
          orang_tua:
            "Bapak/Ibu mengerti kamu mungkin merasa berat menyampaikannya. Coba ceritakan pelan-pelan apa kendalanya, biar kita cari jalan keluarnya sama-sama.\n\n[Tips Komunikasi: Kalimat pembukamu sudah cukup tenang. Lanjutkan dengan menyampaikan fakta secara jelas tanpa merasa harus defensif.]",
          guru_dosen:
            "Terima kasih sudah berinisiatif menyampaikan hal ini secara terbuka. Bisa jelaskan lebih spesifik bagian tugas mana yang mengalami kendala dan rencana penyelesaianmu?\n\n[Tips Komunikasi: Penyampaianmu sopan dan langsung ke pokok permasalahan. Ini memudahkan lawan bicara memahami situasi.]",
          teman:
            "Santai aja, ceritain aja pelan-pelan. Aku dengerin kok, nggak usah ngerasa nggak enakan gitu ke aku.\n\n[Tips Komunikasi: Sikap terbuka dan jujur membantu sahabatmu merasa dipercaya untuk mendengarkan.]",
          konselor:
            "Terima kasih sudah meluangkan waktu untuk hadir dan mulai bercerita. Ruang ini aman, silakan sampaikan apa yang paling mengganjal di hatimu saat ini.\n\n[Tips Komunikasi: Memulai dengan mengutarakan emosi yang dirasakan adalah langkah awal yang sangat baik dalam konseling.]",
        };

        return NextResponse.json({
          status: "simulation_reply",
          isAiGenerated: false,
          reply: offlinePersonaReplies[persona] || offlinePersonaReplies.orang_tua,
          hasGroundedSources: false,
          statusBadge: "Simulasi Latihan",
        });
      }

      return NextResponse.json({
        status: "api_unconfigured",
        isAiGenerated: false,
        reply:
          "API Google Gemini belum dikonfigurasi pada server (.env.local). Silakan masukkan GEMINI_API_KEY untuk mengaktifkan AI sungguhan. Berikut ringkasan materi terverifikasi yang relevan dengan pertanyaanmu dari basis pengetahuan lokal:",
        ragContext: rag.hasMatch ? rag.chunks[0]?.content : null,
        sources: rag.sources,
        safety,
        instructions:
          "Untuk mengaktifkan model Gemini: Buka file .env.local dan isi GEMINI_API_KEY=AQ.... lalu muat ulang server.",
      });
    }

    // 5. Generate Response via Official @google/genai SDK
    const aiResult = await generateGeminiChat({
      userMessage: sanitizedMessage,
      contextText: rag.contextText,
      sources: rag.sources,
      userAlias,
      isEducationalQuery: rag.hasMatch,
      mode,
      persona,
      storyContext,
    });

    if (aiResult.error) {
      return NextResponse.json({
        status: "api_error",
        isAiGenerated: false,
        reply: `Terjadi kendala saat menghubungi layanan Google Gemini (${aiResult.error}). Kamu tetap dapat membaca materi terverifikasi yang ditemukan di bawah ini.`,
        sources: rag.sources,
        safety,
        error: aiResult.error,
      });
    }

    return NextResponse.json({
      status: "success",
      reply: aiResult.reply,
      isAiGenerated: true,
      modelUsed: aiResult.modelUsed,
      sources: rag.sources,
      hasGroundedSources: rag.hasMatch,
      safety,
    });
  } catch (error: any) {
    console.error("API /chat error:", error);
    return NextResponse.json(
      {
        status: "internal_error",
        error: "Terjadi kesalahan internal pada server.",
      },
      { status: 500 }
    );
  }
}
