import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { evaluateSafety } from "@/lib/safety/classifier";
import { maskPii } from "@/lib/safety/piiMasker";
import { retrieveKnowledge } from "@/lib/ai/ragEngine";
import { generateAiResponse, isApiKeyConfigured } from "@/lib/ai/openAiService";

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

    // 1. Safety Screening & Triage Layer
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
            title: "Protokol Darurat Kesehatan Jiwa Nasional 119 ext 8",
            source_name: "Kementerian Kesehatan RI (SEJIWA)",
            reference: "Hotline 119 ekstensi 8 (Gratis 24 Jam)",
            score: 1.0,
            snippet: "Layanan konseling darurat pencegahan bunuh diri dan krisis kejiwaan nasional.",
            review_status: "verified_expert",
          },
        ],
      });
    }

    // 2. Data Sanitization (PII Masking)
    const sanitizedMessage = maskPii(message);

    // 3. Knowledge Retrieval (RAG)
    const rag = retrieveKnowledge(sanitizedMessage, 2);

    // 4. Check if OpenAI API Key is Configured
    if (!isApiKeyConfigured()) {
      return NextResponse.json({
        status: "api_unconfigured",
        isAiGenerated: false,
        reply:
          "API OpenAI belum dikonfigurasi pada server (.env.local). Silakan masukkan OPENAI_API_KEY untuk mengaktifkan AI sungguhan. Berikut ringkasan materi terverifikasi yang relevan dengan pertanyaanmu dari basis pengetahuan lokal:",
        ragContext: rag.hasMatch ? rag.chunks[0]?.content : null,
        sources: rag.sources,
        safety,
        instructions:
          "Untuk mengaktifkan model AI aktif: Buka file .env.local dan isi OPENAI_API_KEY=sk-... lalu muat ulang server.",
      });
    }

    // 5. Generate Real AI Response via OpenAI
    const aiResult = await generateAiResponse({
      userMessage: sanitizedMessage,
      contextText: rag.contextText,
      sources: rag.sources,
      userAlias,
    });

    if (aiResult.error) {
      return NextResponse.json({
        status: "api_error",
        isAiGenerated: false,
        reply: `Terjadi kendala saat menghubungi layanan AI (${aiResult.error}). Kamu tetap dapat membaca materi terverifikasi yang ditemukan di bawah ini.`,
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
