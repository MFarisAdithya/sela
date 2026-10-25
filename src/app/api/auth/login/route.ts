import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { loginUser } from "@/lib/auth/authService";

const LoginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Kata sandi tidak boleh kosong"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const result = LoginSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Email atau kata sandi tidak sesuai.",
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const res = await loginUser({ email, password });

    if (!res.success || !res.session) {
      return NextResponse.json(
        {
          success: false,
          error: res.error || "Email atau kata sandi tidak sesuai.",
        },
        { status: 401 }
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
