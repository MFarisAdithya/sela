import { NextRequest, NextResponse } from "next/server";
import { decodeSessionToken, getUserProfileById } from "@/lib/auth/authService";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("sela_session_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const decoded = decodeSessionToken(token);
  if (!decoded) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = getUserProfileById(decoded.uid);
  if (!user) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
