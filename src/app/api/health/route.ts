import { NextResponse } from "next/server";
import { getActiveModelInfo } from "@/lib/ai/openAiService";

export async function GET() {
  const info = getActiveModelInfo();

  return NextResponse.json({
    status: "ok",
    isConfigured: info.isActive,
    provider: info.provider,
    model: info.model,
    description: info.description,
    mode: info.isActive ? "AI_AKTIF" : "API_BELUM_DIKONFIGURASI",
  });
}
