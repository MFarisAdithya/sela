import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { evaluateSafety } from "@/lib/safety/classifier";
import { maskPii } from "@/lib/safety/piiMasker";
import { retrieveKnowledge } from "@/lib/ai/ragEngine";
import { generateGeminiChat, getGeminiConfigStatus } from "@/lib/ai/geminiService";

const ChatRequestSchema = z.object({
  message: z.string().min(1, "Pesan tidak boleh kosong").max(1000, "Pesan maksimal 1.000 karakter"),
  userAlias: z.string().optional().default("Alex"),
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

    const { message, userAlias } = parseResult.data;

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

    // 2. Data Sanitization (PII Masking)
    const sanitizedMessage = maskPii(message);

    // 3. Knowledge Retrieval (Gemini Semantic + BM25 Hybrid RAG)
    const rag = await retrieveKnowledge(sanitizedMessage, 2);

    // 4. Check Gemini API Configuration Status
    const configStatus = getGeminiConfigStatus();
    if (!configStatus.isConfigured) {
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
