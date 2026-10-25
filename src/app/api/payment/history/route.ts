import { NextRequest, NextResponse } from "next/server";
import { decodeSessionToken, getUserProfileById } from "@/lib/auth/authService";
import { getUserTransactions } from "@/lib/payment/paymentService";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("sela_session_token")?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false, transactions: [] }, { status: 401 });
  }

  const decoded = decodeSessionToken(token);
  if (!decoded) {
    return NextResponse.json({ authenticated: false, transactions: [] }, { status: 401 });
  }

  const user = getUserProfileById(decoded.uid);
  if (!user) {
    return NextResponse.json({ authenticated: false, transactions: [] }, { status: 404 });
  }

  const transactions = getUserTransactions(user.id);

  return NextResponse.json({
    authenticated: true,
    userId: user.id,
    transactions,
  });
}
