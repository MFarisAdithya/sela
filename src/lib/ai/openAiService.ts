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
  error?: string;
}

export function isApiKeyConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim().length > 0;
}

export async function generateAiResponse(params: GenerateChatParams): Promise<GenerateChatResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    return {
      reply: "",
      isAiGenerated: false,
      error: "api_key_missing",
    };
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const openai = new OpenAI({
    apiKey: apiKey.trim(),
    timeout: 12000, // 12 seconds timeout
  });

  const systemInstructions = `Kamu adalah FATHERCARE AI, asisten pendampingan awal nonklinis untuk remaja dan dewasa muda (usia 15–24 tahun).

PRINSIP KOMUNIKASI & CONTENT DESIGN:
1. Gunakan bahasa Indonesia yang natural, hangat, tenang, dan terasa ditulis manusia.
2. JANGAN mendiagnosis (dilarang menyebut "kamu depresi", "kamu trauma", "kamu bipolar", atau menetapkan label medis apa pun).
3. JANGAN mengarang kontak darurat atau nama konselor fiktif. Rujuk hanya pada sumber terverifikasi resmi.
4. JANGAN gunakan slogan motivasi klise seperti "Kamu tidak sendirian", "Tetaplah tersenyum", atau "Mulai versi terbaik dirimu".
5. JANGAN gunakan validasi emosional berulang atau berpura-pura merasakan apa yang dirasakan pengguna (hindari "Aku sangat memahami kepedihanmu").
6. Tanggapi langsung situasi spesifik yang diceritakan pengguna, tawarkan 1 langkah kecil yang realistis, dan akhiri dengan 1 pertanyaan terbuka atau pilihan lanjut sesuai kenyamanan mereka.

KONTEKS MATERI TERVERIFIKASI (RAG):
${params.contextText ? params.contextText : "Tidak ada dokumen khusus yang cocok untuk topik ini. Jawab dengan bijak secara umum tanpa keluar dari batas pendampingan awal."}

Jika teks pengguna di luar materi terverifikasi, sampaikan batasanmu dengan jujur dan jangan mengarang teori sendiri.`;

  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemInstructions },
        { role: "user", content: params.userMessage },
      ],
      max_tokens: 450,
      temperature: 0.6,
    });

    const reply = response.choices[0]?.message?.content?.trim() || "Maaf, belum ada respons yang dapat dimuat saat ini.";

    return {
      reply,
      isAiGenerated: true,
      modelUsed: model,
    };
  } catch (error: any) {
    console.error("OpenAI API call error:", error?.message || error);
    return {
      reply: "",
      isAiGenerated: false,
      error: error?.message || "openai_request_failed",
    };
  }
}
