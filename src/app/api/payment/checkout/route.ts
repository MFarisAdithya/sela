import { NextRequest, NextResponse } from "next/server";
import { decodeSessionToken, getUserProfileById } from "@/lib/auth/authService";
import { createCheckoutOrder } from "@/lib/payment/paymentService";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("sela_session_token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Silakan masuk terlebih dahulu untuk melanjutkan pesanan." },
        { status: 401 }
      );
    }

    const decoded = decodeSessionToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Sesi tidak valid atau telah kedaluwarsa." },
        { status: 401 }
      );
    }

    const user = getUserProfileById(decoded.uid);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Data pengguna tidak ditemukan." },
        { status: 404 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const planId = body.planId || "premium_30d";
    const paymentMethod = body.paymentMethod || "qris";

    const result = await createCheckoutOrder({
      userId: user.id,
      userEmail: user.email,
      planId,
      paymentMethod,
    });

    if (!result.success || !result.transaction) {
      return NextResponse.json(
        { success: false, error: result.error || "Gagal membuat pesanan." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      transaction: result.transaction,
    });
  } catch (error) {
    console.error("Payment checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan internal pada pemrosesan pesanan." },
      { status: 500 }
    );
  }
}
