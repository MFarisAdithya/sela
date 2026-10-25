import { NextRequest, NextResponse } from "next/server";
import { decodeSessionToken, deleteUserAccount } from "@/lib/auth/authService";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("sela_session_token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, error: "Sesi tidak ditemukan" }, { status: 401 });
  }

  const decoded = decodeSessionToken(token);
  if (!decoded) {
    return NextResponse.json({ success: false, error: "Sesi kedaluwarsa" }, { status: 401 });
  }

  const deleted = deleteUserAccount(decoded.uid);

  const response = NextResponse.json({
    success: true,
    message: "Akun dan data terkait telah berhasil dihapus.",
  });

  // Clear session cookie
  response.cookies.delete("sela_session_token");

  return response;
}
