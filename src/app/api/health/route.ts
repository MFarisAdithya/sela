import { NextResponse } from "next/server";
import { getGeminiConfigStatus } from "@/lib/ai/geminiService";

export async function GET() {
  const status = getGeminiConfigStatus();

  return NextResponse.json({
    status: "ok",
    isConfigured: status.isConfigured,
    provider: "google_gemini",
    model: status.model,
    description: status.statusText,
    mode: status.isConfigured ? "AI_AKTIF" : "API_BELUM_DIKONFIGURASI",
  });
}
