import { GoogleGenAI } from "@google/genai";
import { RetrievedSource } from "@/types/knowledge";

export interface GenerateGeminiChatParams {
  userMessage: string;
  contextText?: string;
  sources?: RetrievedSource[];
  userAlias?: string;
  isEducationalQuery?: boolean;
}

export interface GenerateGeminiChatResult {
  reply: string;
  isAiGenerated: boolean;
  modelUsed?: string;
  error?: string;
  hasGroundedSources: boolean;
}

export interface GeminiModelStatus {
  isConfigured: boolean;
  model: string;
  statusText: string;
}

/**
 * Checks if GEMINI_API_KEY is configured on the server
 */
export function getGeminiConfigStatus(): GeminiModelStatus {
  const apiKey = process.env.GEMINI_API_KEY;
  const isConfigured = !!apiKey && apiKey.trim().length > 0 && !apiKey.includes("your-key");
  const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";

  return {
    isConfigured,
    model,
    statusText: isConfigured ? "AI Aktif: Google Gemini" : "API Belum Dikonfigurasi",
  };
}

/**
 * Generates an educational or reflective response using the official @google/genai SDK
 */
export async function generateGeminiChat(
  params: GenerateGeminiChatParams
): Promise<GenerateGeminiChatResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim().length === 0 || apiKey.includes("your-key")) {
    return {
      reply: "",
      isAiGenerated: false,
      error: "api_key_unconfigured",
      hasGroundedSources: false,
    };
  }

  const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";
  const hasGroundedSources = !!params.sources && params.sources.length > 0;

  // Strict non-clinical system instructions
  const systemPrompt = `Kamu adalah SELA, ruang refleksi digital dan pendampingan awal nonklinis bagi remaja dan dewasa muda (usia 15–24 tahun) dengan prinsip "Ruang untuk dirimu."
Nama pengguna saat ini: ${params.userAlias || "Kawan"}.

BATASAN PERILAKU & CONTENT DESIGN:
1. Gunakan bahasa Indonesia yang natural, hangat, tenang, dan terasa ditulis manusia.
2. JANGAN mendiagnosis (dilarang keras menyebut "kamu depresi", "kamu bipolar", "kamu trauma", atau memberi label kejiwaan apa pun).
3. JANGAN mengarang kontak darurat atau nama pendamping fiktif. Rujuk hanya pada nomor darurat nasional resmi (119 ext 8 SEJIWA, SAPA 129).
4. JANGAN gunakan slogan motivasi klise seperti "Kamu tidak sendirian", "Mulai versi terbaik dirimu", atau kalimat pemasaran generik.
5. JANGAN gunakan validasi emosional berulang atau berpura-pura merasakan apa yang dirasakan pengguna (hindari "Aku sangat memahami kepedihanmu").
6. Tanggapi langsung situasi spesifik yang diceritakan pengguna, tawarkan 1 langkah kecil yang konkret, dan akhiri dengan 1 pertanyaan terbuka atau opsi refleksi sesuai kenyamanan mereka.

${
  hasGroundedSources
    ? `PEDOMAN JAWABAN EDUKATIF BERBASIS KNOWLEDGE BASE:
Jawabanmu WAJIB berpijak pada dokumen materi terverifikasi di bawah ini. Sampaikan intisari materi secara komunikatif dan ringkas:
--- KONTEKS MATERI TERVERIFIKASI ---
${params.contextText}
-----------------------------------`
    : `PEDOMAN PERCAKAPAN REFLEKTIF TANPA DOKUMEN:
Pertanyaan pengguna tidak memiliki rujukan materi khusus di basis pengetahuan lokal. 
Jawablah sebagai pendamping reflektif: dengarkan secara tenang, sampaikan dengan jujur bahwa kamu tidak memiliki panduan ilmiah khusus untuk topik tersebut, dan tawarkan langkah awal yang aman atau ajak mendiskusikannya dengan orang terpercaya.`
}`;

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

    // Enforce 12-second timeout
    const generatePromise = ai.models.generateContent({
      model: model,
      contents: params.userMessage,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 450,
        temperature: 0.6,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Batas waktu permintaan ke Google Gemini (12 detik) terlampaui.")), 12000)
    );

    const response = (await Promise.race([generatePromise, timeoutPromise])) as any;
    const replyText = response.text?.trim();

    if (!replyText) {
      return {
        reply: "Model AI tidak menghasilkan teks untuk masukan ini. Silakan coba rumuskan ceritamu dengan cara lain.",
        isAiGenerated: true,
        modelUsed: model,
        hasGroundedSources,
      };
    }

    return {
      reply: replyText,
      isAiGenerated: true,
      modelUsed: `Google Gemini (${model})`,
      hasGroundedSources,
    };
  } catch (error: any) {
    console.error("Gemini SDK Generation Error:", error?.message || error);

    const errorMessage = error?.message || "Terjadi kegagalan komunikasi dengan layanan Gemini.";
    let friendlyError = errorMessage;

    if (errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("API key not valid")) {
      friendlyError = "API key Google Gemini tidak valid atau telah dicabut.";
    } else if (errorMessage.includes("ResourceExhausted") || errorMessage.includes("429")) {
      friendlyError = "Batas kuota panggilan Google Gemini sementara tercapai. Mohon tunggu beberapa detik.";
    } else if (errorMessage.includes("timeout")) {
      friendlyError = "Koneksi ke Google Gemini terputus karena batas waktu (timeout).";
    }

    return {
      reply: "",
      isAiGenerated: false,
      error: friendlyError,
      hasGroundedSources,
    };
  }
}
