import { NextResponse } from "next/server";
import { isApiKeyConfigured } from "@/lib/ai/openAiService";

export async function GET() {
  const isConfigured = isApiKeyConfigured();

  return NextResponse.json({
    status: "ok",
    isConfigured,
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    mode: isConfigured ? "AI_AKTIF" : "API_BELUM_DIKONFIGURASI",
  });
}
