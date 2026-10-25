import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { registerUser } from "@/lib/auth/authService";

const RegisterSchema = z.object({
  displayName: z.string().min(2, "Nama panggilan minimal 2 karakter").max(50),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  ageBand: z.enum(["15-18 tahun", "19-24 tahun", "Di atas 24 tahun"]).optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "Ketentuan penggunaan wajib disetujui" }),
  }),
  privacyAcknowledged: z.literal(true, {
    errorMap: () => ({ message: "Pemberitahuan privasi wajib disetujui" }),
  }),
  marketingOptIn: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const result = RegisterSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.errors[0]?.message || "Data pendaftaran tidak valid",
        },
        { status: 400 }
      );
    }

    const { displayName, email, password, ageBand, termsAccepted, privacyAcknowledged, marketingOptIn } =
      result.data;

    const res = await registerUser({
      displayName,
      email,
      password,
      ageBand,
      termsAccepted,
      privacyAcknowledged,
      marketingOptIn,
    });

    if (!res.success || !res.session) {
      return NextResponse.json({ success: false, error: res.error }, { status: 400 });
    }

    const response = NextResponse.json({
      success: true,
      user: res.session.user,
    });

    // Set secure HTTP-only session cookie
    response.cookies.set("sela_session_token", res.session.token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan internal pada server" },
      { status: 500 }
    );
  }
}
