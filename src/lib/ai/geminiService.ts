import { GoogleGenAI } from "@google/genai";
import { RetrievedSource } from "@/types/knowledge";

export interface GenerateGeminiChatParams {
  userMessage: string;
  contextText?: string;
  sources?: RetrievedSource[];
  userAlias?: string;
  isEducationalQuery?: boolean;
  mode?: "guided_story" | "practice_talk";
  persona?: "orang_tua" | "guru_dosen" | "teman" | "konselor";
  storyContext?: {
    facts?: string;
    feelings?: string;
    needs?: string;
    openingLine?: string;
  };
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

const DEFAULT_MODEL = "gemini-3.5-flash-lite";
const FALLBACK_MODELS = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-3.8-flash"];

/**
 * Checks if GEMINI_API_KEY is configured on the server
 */
export function getGeminiConfigStatus(): GeminiModelStatus {
  const apiKey = process.env.GEMINI_API_KEY;
  const isConfigured = !!apiKey && apiKey.trim().length > 0 && !apiKey.includes("your-key");
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  return {
    isConfigured,
    model,
    statusText: isConfigured ? `Layanan Terhubung: Google Gemini (${model})` : "API Belum Dikonfigurasi",
  };
}

/**
 * Generates an educational or reflective response using the official @google/genai SDK
 * with resilient timeout handling and automatic fallback between official supported models.
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

  const primaryModel = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const timeoutMs = parseInt(process.env.GEMINI_TIMEOUT_MS || "60000", 10);
  const hasGroundedSources = !!params.sources && params.sources.length > 0;

  // Strict non-clinical system instructions
  let systemPrompt = "";

  if (params.mode === "practice_talk") {
    const personaMap: Record<string, string> = {
      orang_tua: "Kamu berperan sebagai Orang Tua (Ayah / Ibu) di Indonesia. Kamu peduli pada masa depan anak, tetapi terkadang terdengar agak cemas, terkejut, atau sedikit protektif di awal bila mendengar hal di luar rencana. Berbicaralah realistis, hangat namun manusiawi, tanpa menggurui secara berlebihan. Jaga dialogmu ringkas (2-3 kalimat).",
      guru_dosen: "Kamu berperan sebagai Guru atau Dosen Pembimbing Akademik. Nada bicaramu sopan, formal, solutif, menghargai keberanian murid/mahasiswa untuk jujur, namun tetap memegang aturan akademik dan tanggung jawab pengerjaan tugas. Jaga dialogmu ringkas (2-3 kalimat).",
      teman: "Kamu berperan sebagai Teman Sebaya / Sahabat dekat. Gaya bicaramu santai, bersahabat, empatik, menggunakan bahasa sehari-hari yang suportif tanpa menghakimi. Jaga dialogmu ringkas (2-3 kalimat).",
      konselor: "Kamu berperan sebagai Konselor Sebaya / Tenaga Konseling Awal. Nada bicaramu tenang, mendengarkan aktif, tidak menghakimi, dan membantu pengguna mengekspresikan perasaannya secara aman. Jaga dialogmu ringkas (2-3 kalimat).",
    };
    const personaDesc = personaMap[params.persona || "orang_tua"] || personaMap.orang_tua;

    systemPrompt = `Kamu sedang berada dalam sesi SIMULASI LATIHAN PERCAKAPAN (Practice Talk) di platform SELA.AI.
Tujuan: Membantu pengguna (${params.userAlias || "Kawan"}) melatih kata-kata dan keberanian bicara sebelum menghadapi percakapan nyata.

PERANMU SAAT INI:
${personaDesc}

${
  params.storyContext
    ? `LATAR BELAKANG KARTU CERITA PENGGUNA:
- Fakta situasi: ${params.storyContext.facts || "-"}
- Emosi yang dirasakan: ${params.storyContext.feelings || "-"}
- Kebutuhan utama: ${params.storyContext.needs || "-"}
- Kalimat pembuka: ${params.storyContext.openingLine || "-"}`
    : ""
}

PANDUAN INTERAKSI:
1. Tanggapi langsung dialog pengguna dalam karakter persona di atas secara alami dalam bahasa Indonesia yang manusiawi.
2. JANGAN mendiagnosis penyakit kejiwaan apa pun. Ini simulasi latihan peran.
3. Respons dalam dialog langsung yang ringkas (maksimal 3 kalimat).
4. Di bagian akhir pesan (baris terpisah), berikan masukan komunikasi singkat dalam format:
   [Tips Komunikasi: <1 masukan singkat dan membangun tentang nada bicara, asertivitas, atau keterbukaan pengguna>]`;
  } else {
    systemPrompt = `Kamu adalah SELA, ruang refleksi digital dan pendampingan awal nonklinis bagi remaja dan dewasa muda (usia 15–24 tahun) dengan prinsip "Ruang untuk dirimu."
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
  }

  const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

  // Build model attempt list (primary model first, then fallback alternatives)
  const modelsToTry = [primaryModel, ...FALLBACK_MODELS.filter((m) => m !== primaryModel)];

  let lastError: any = null;

  for (const modelToAttempt of modelsToTry) {
    try {
      const generatePromise = ai.models.generateContent({
        model: modelToAttempt,
        contents: params.userMessage,
        config: {
          systemInstruction: systemPrompt,
          maxOutputTokens: 1000,
          temperature: 0.6,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(
          () =>
            reject(
              new Error(
                `Batas waktu permintaan ke Google Gemini (${Math.round(timeoutMs / 1000)} detik) terlampaui.`
              )
            ),
          timeoutMs
        )
      );

      const response = (await Promise.race([generatePromise, timeoutPromise])) as any;
      const replyText = response.text?.trim();

      if (!replyText) {
        return {
          reply:
            "Model AI tidak menghasilkan teks untuk masukan ini. Silakan coba rumuskan ceritamu dengan cara lain.",
          isAiGenerated: true,
          modelUsed: `Google Gemini (${modelToAttempt})`,
          hasGroundedSources,
        };
      }

      return {
        reply: replyText,
        isAiGenerated: true,
        modelUsed: `Google Gemini (${modelToAttempt})`,
        hasGroundedSources,
      };
    } catch (error: any) {
      lastError = error;
      const errMsg = error?.message || "";
      console.warn(`[Gemini Attempt] Model ${modelToAttempt} failed: ${errMsg.substring(0, 120)}`);

      // If it's a critical auth issue, do not loop through other models
      if (errMsg.includes("API_KEY_INVALID") || errMsg.includes("API key not valid")) {
        break;
      }
      // If it was a timeout, continuing with a second heavy call might make user wait too long
      if (errMsg.includes("Batas waktu permintaan")) {
        break;
      }
    }
  }

  // Handle final error if all attempts fail
  const rawMsg = lastError?.message || "Terjadi kegagalan komunikasi dengan layanan Gemini.";
  let friendlyError = rawMsg;

  if (rawMsg.includes("API_KEY_INVALID") || rawMsg.includes("API key not valid")) {
    friendlyError = "API key Google Gemini tidak valid atau telah dicabut.";
  } else if (rawMsg.includes("ResourceExhausted") || rawMsg.includes("429")) {
    friendlyError = "Batas kuota panggilan Google Gemini sementara tercapai. Mohon tunggu beberapa saat.";
  } else if (rawMsg.includes("UNAVAILABLE") || rawMsg.includes("503")) {
    friendlyError = "Server Google Gemini sedang mengalami beban tinggi sementara. Mohon coba beberapa saat lagi.";
  } else if (rawMsg.includes("Batas waktu permintaan")) {
    friendlyError = rawMsg;
  }

  return {
    reply: "",
    isAiGenerated: false,
    error: friendlyError,
    hasGroundedSources,
  };
}
