import { NextRequest, NextResponse } from "next/server";
import { getUserFromSessionToken } from "@/lib/auth/authService";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("sela_session_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = getUserFromSessionToken(token);
  if (!user) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
