import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { classifySafetyRisk } from "@/lib/safety/classifier";
import { maskPii } from "@/lib/safety/piiMasker";
import { searchKnowledgeBase } from "@/lib/ai/ragEngine";
import { buildSystemPrompt } from "@/lib/ai/promptBuilder";
import { callOpenAiChat } from "@/lib/ai/openAiService";
import { generateDemoReply } from "@/lib/ai/demoResponses";

const ChatRequestSchema = z.object({
  message: z.string().min(1, "Pesan tidak boleh kosong").max(1000, "Pesan maksimal 1000 karakter"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parseResult = ChatRequestSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Format permintaan tidak valid", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { message } = parseResult.data;

    // 1. Safety Triage Layer
    const safetyCheck = classifySafetyRisk(message);

    if (safetyCheck.level === "tinggi") {
      return NextResponse.json({
        reply:
          "Kami sangat peduli dengan keselamatanmu. Fathercare AI adalah asisten refleksi awal dengan keterbatasan dan BUKAN layanan gawat darurat. Jika kamu sedang merasa sangat tertekan, ingin menyakiti diri, atau berada dalam situasi bahaya fisik, tolong segera cari tempat aman dan hubungi orang dewasa terpercaya atau layanan darurat nasional di Hotline Kemenkes 119 Ext 8 atau SAPA KemenPPPA 129.",
        isCrisis: true,
        safetyLevel: "tinggi",
        citations: [
          {
            title: "Protokol Respons Situasi Krisis & Risiko Menyakiti Diri",
            source: "Protokol Keselamatan AI Remaja InnovAItion 2026",
            status: "Terverifikasi Ahli",
            summary: "AI wajib menghentikan generasi bebas dan menampilkan nomor bantuan darurat nasional.",
          },
        ],
        mode: "safety_intervention",
      });
    }

    // 2. PII Sanitization Layer (protect sensitive identifiers)
    const { sanitizedText } = maskPii(message);

    // 3. RAG Retrieval Layer (Query against verified knowledge base)
    const retrievedResults = searchKnowledgeBase(sanitizedText, 2);
    const retrievedChunks = retrievedResults.map((r) => r.chunk);

    // 4. Check for OpenAI Key & Provider Execution
    const apiKey = process.env.OPENAI_API_KEY;
    const hasValidKey = apiKey && apiKey.trim() !== "" && !apiKey.includes("your_openai_api_key_here");

    if (hasValidKey) {
      const systemPrompt = buildSystemPrompt(retrievedChunks);
      const openAiRes = await callOpenAiChat(systemPrompt, sanitizedText);

      if (openAiRes.success && openAiRes.reply) {
        return NextResponse.json({
          reply: openAiRes.reply,
          citations: retrievedChunks.map((c) => ({
            title: c.title,
            source: c.source_name,
            status: c.review_status === "verified_expert" ? "Terverifikasi Ahli" : "Draf Prototipe",
            summary: c.content.slice(0, 140) + "...",
          })),
          mode: "active",
          isCrisis: false,
          safetyLevel: safetyCheck.level,
        });
      }
    }

    // 5. Fallback: Deterministic Grounded DEMO Mode Response
    const demoReply = generateDemoReply(sanitizedText, retrievedResults);

    return NextResponse.json({
      reply: demoReply.reply,
      citations: demoReply.citations,
      mode: "demo",
      isCrisis: false,
      safetyLevel: safetyCheck.level,
      note: hasValidKey ? "Fallback ke simulasi lokal (API Cloud tidak merespons)" : "Berjalan dalam Mode Demo Lokal",
    });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server AI" },
      { status: 500 }
    );
  }
}
