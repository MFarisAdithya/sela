import { NextResponse } from "next/server";
import { getGeminiConfigStatus } from "@/lib/ai/geminiService";

export async function GET() {
  const status = getGeminiConfigStatus();

  return NextResponse.json({
    status: "ok",
    isConfigured: status.isConfigured,
    description: status.statusText,
  });
}
