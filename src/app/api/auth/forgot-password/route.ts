import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const result = ForgotPasswordSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    // Always return safe neutral message to prevent email enumeration attacks
    return NextResponse.json({
      success: true,
      message:
        "Jika alamat email terdaftar di sistem SELA.AI, tautan pemulihan kata sandi telah dikirimkan ke kotak masukmu.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
