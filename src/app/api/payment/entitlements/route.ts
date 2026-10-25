import { NextRequest, NextResponse } from "next/server";
import { decodeSessionToken, getUserProfileById } from "@/lib/auth/authService";
import { getUserEntitlements } from "@/lib/payment/paymentService";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("sela_session_token")?.value;
  if (!token) {
    // Return unauthenticated fallback entitlements
    return NextResponse.json({
      authenticated: false,
      entitlements: {
        plan: "free",
        isPremiumActive: false,
        monthlyAiLimit: 10,
        monthlyAiUsed: 0,
        monthlyPracticeTalkLimit: 2,
        monthlyPracticeTalkUsed: 0,
        maxActiveStoryCards: 1,
        currentActiveStoryCards: 0,
        supportPathwayAlwaysFree: true,
        safetyInterventionsAlwaysFree: true,
      },
    });
  }

  const decoded = decodeSessionToken(token);
  if (!decoded) {
    return NextResponse.json({ authenticated: false, error: "Invalid session" }, { status: 401 });
  }

  const user = getUserProfileById(decoded.uid);
  if (!user) {
    return NextResponse.json({ authenticated: false, error: "User not found" }, { status: 404 });
  }

  const entitlements = getUserEntitlements(user.id);

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      plan: user.plan,
      premiumUntil: user.premiumUntil,
    },
    entitlements,
  });
}
