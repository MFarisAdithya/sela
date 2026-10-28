import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/auth/authService";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => ({}));
    const displayName =
      typeof json.displayName === "string" && json.displayName.trim()
        ? json.displayName.trim()
        : "Kawan Sela";
    const email =
      typeof json.email === "string" && json.email.trim()
        ? json.email.trim()
        : `${displayName.toLowerCase().replace(/\s+/g, ".")}@sela.ai`;
    const password =
      typeof json.password === "string" && json.password
        ? json.password
        : "demo";
    const ageBand =
      json.ageBand === "15-18 tahun" ||
      json.ageBand === "19-24 tahun" ||
      json.ageBand === "Di atas 24 tahun"
        ? json.ageBand
        : "15-18 tahun";

    const res = await registerUser({
      displayName,
      email,
      password,
      ageBand,
      termsAccepted: true,
      privacyAcknowledged: true,
      marketingOptIn: !!json.marketingOptIn,
    });

    if (!res.success || !res.session) {
      return NextResponse.json({ success: false, error: res.error }, { status: 400 });
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
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan internal pada server" },
      { status: 500 }
    );
  }
}
