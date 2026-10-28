import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/auth/authService";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => ({}));
    const email = typeof json.email === "string" && json.email.trim() ? json.email.trim() : "juri@sela.ai";
    const password = typeof json.password === "string" && json.password ? json.password : "demo";

    const res = await loginUser({ email, password });

    if (!res.success || !res.session) {
      return NextResponse.json(
        {
          success: false,
          error: res.error || "Gagal memproses sesi masuk.",
        },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: res.session.user,
    });

    response.cookies.set("sela_session_token", res.session.token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
