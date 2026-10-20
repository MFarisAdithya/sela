import OpenAI from "openai";
import { RetrievedSource } from "@/types/knowledge";

export interface GenerateChatParams {
  userMessage: string;
  contextText?: string;
  sources?: RetrievedSource[];
  userAlias?: string;
}

export interface GenerateChatResult {
  reply: string;
  isAiGenerated: boolean;
  modelUsed?: string;
  provider?: "gemini" | "openai" | "groq" | "free";
  error?: string;
}

export interface ModelInfo {
  isActive: boolean;
  provider: "gemini" | "openai" | "groq" | "free" | "none";
  model: string;
  description: string;
}

export function getActiveModelInfo(): ModelInfo {
  // 1. Check Google Gemini (Free & High Quota)
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey.trim().length > 0 && !geminiKey.includes("your-key")) {
    return {
      isActive: true,
      provider: "gemini",
      model: process.env.GEMINI_MODEL || "gemini-flash-lite-latest",
      description: "Google Gemini Flash (Gratis Resmi)",
    };
  }

  // 2. Check OpenAI API
  const openAiKey = process.env.OPENAI_API_KEY;
  if (openAiKey && openAiKey.trim().length > 0 && !openAiKey.includes("sk-your-key")) {
    return {
      isActive: true,
      provider: "openai",
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      description: "OpenAI Cloud API",
    };
  }

  // 3. Check Groq
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey && groqKey.trim().length > 0 && !groqKey.includes("your-key")) {
    return {
      isActive: true,
      provider: "groq",
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      description: "Groq Cloud (Gratis Resmi 30 RPM)",
    };
  }

  // 4. Default: Zero-Config Free Cloud Gateway
  const allowFree = process.env.AI_PROVIDER === "free";
  if (allowFree) {
    return {
      isActive: true,
      provider: "free",
      model: process.env.FREE_MODEL || "openai-free",
      description: "Free Public AI Gateway (Bebas Biaya / Tanpa Kunci)",
    };
  }

  return {
    isActive: false,
    provider: "none",
    model: "none",
    description: "API Belum Dikonfigurasi",
  };
}

export function isApiKeyConfigured(): boolean {
  return getActiveModelInfo().isActive;
}

async function callGeminiApi(apiKey: string, model: string, systemPrompt: string, userMessage: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    signal: AbortSignal.timeout(12000),
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        { role: "user", parts: [{ text: userMessage }] },
      ],
      generationConfig: {
        maxOutputTokens: 450,
        temperature: 0.6,
      },
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Gemini API HTTP ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Tidak ada respons yang dikembalikan oleh model Gemini.");
  }
  return text.trim();
}

export async function generateAiResponse(params: GenerateChatParams): Promise<GenerateChatResult> {
  const modelInfo = getActiveModelInfo();
  if (!modelInfo.isActive) {
    return {
      reply: "",
      isAiGenerated: false,
      error: "api_key_missing",
    };
  }

  const systemInstructions = `Kamu adalah SELA, ruang refleksi digital dan pendampingan awal nonklinis untuk remaja dan dewasa muda (usia 15–24 tahun) dengan prinsip "Ruang untuk dirimu."
Nama pengguna saat ini: ${params.userAlias || "Alex"}.

PRINSIP KOMUNIKASI & CONTENT DESIGN:
1. Gunakan bahasa Indonesia yang natural, hangat, tenang, dan terasa ditulis manusia.
2. JANGAN mendiagnosis (dilarang menyebut "kamu depresi", "kamu trauma", "kamu bipolar", atau menetapkan label medis apa pun).
3. JANGAN mengarang kontak darurat atau nama konselor fiktif. Rujuk hanya pada sumber terverifikasi resmi (Hotline 119 ext 8, SAPA 129).
4. JANGAN gunakan slogan motivasi klise seperti "Kamu tidak sendirian", "Tetaplah tersenyum", atau kalimat pemasaran generik.
5. JANGAN gunakan validasi emosional berulang atau berpura-pura merasakan apa yang dirasakan pengguna (hindari "Aku sangat memahami kepedihanmu").
6. Tanggapi langsung situasi spesifik yang diceritakan pengguna, tawarkan 1 langkah kecil yang realistis, dan akhiri dengan 1 pertanyaan terbuka atau pilihan lanjut sesuai kenyamanan mereka.

KONTEKS MATERI TERVERIFIKASI (RAG):
${params.contextText ? params.contextText : "Tidak ada dokumen khusus yang cocok untuk topik ini. Jawab dengan bijak secara umum tanpa keluar dari batas pendampingan awal."}

Jika teks pengguna di luar materi terverifikasi, sampaikan batasanmu dengan jujur dan jangan mengarang teori sendiri.`;

  try {
    let reply = "";

    if (modelInfo.provider === "gemini") {
      reply = await callGeminiApi(
        process.env.GEMINI_API_KEY!.trim(),
        modelInfo.model,
        systemInstructions,
        params.userMessage
      );
    } else {
      // OpenAI, Groq, or Free OpenAI Compatible Gateway
      let apiKey = "";
      let baseURL: string | undefined = undefined;
      let modelName = "";

      if (modelInfo.provider === "groq") {
        apiKey = process.env.GROQ_API_KEY!.trim();
        baseURL = "https://api.groq.com/openai/v1";
        modelName = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
      } else if (modelInfo.provider === "openai") {
        apiKey = process.env.OPENAI_API_KEY!.trim();
        baseURL = undefined;
        modelName = process.env.OPENAI_MODEL || "gpt-4o-mini";
      } else {
        apiKey = "free-tier-access";
        baseURL = "https://text.pollinations.ai/openai";
        modelName = "openai";
      }

      const openai = new OpenAI({
        apiKey,
        baseURL,
        timeout: 18000,
      });

      const response = await openai.chat.completions.create({
        model: modelName,
        messages: [
          { role: "system", content: systemInstructions },
          { role: "user", content: params.userMessage },
        ],
        max_tokens: 450,
        temperature: 0.6,
      });

      reply = response.choices[0]?.message?.content?.trim() || "Maaf, belum ada respons yang dapat dimuat saat ini.";
    }

    return {
      reply,
      isAiGenerated: true,
      modelUsed: `${modelInfo.description}`,
      provider: modelInfo.provider === "none" ? undefined : modelInfo.provider,
    };
  } catch (error: any) {
    console.error("AI API call error:", error?.message || error);
    return {
      reply: "",
      isAiGenerated: false,
      error: error?.message || "ai_request_failed",
    };
  }
}
