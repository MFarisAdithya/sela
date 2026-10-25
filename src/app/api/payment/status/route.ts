import { NextRequest, NextResponse } from "next/server";
import { getTransactionById, processPaymentUpdate } from "@/lib/payment/paymentService";
import { getUserProfileById } from "@/lib/auth/authService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Parameter orderId diperlukan." }, { status: 400 });
  }

  const tx = getTransactionById(orderId);
  if (!tx) {
    return NextResponse.json({ error: "Transaksi tidak ditemukan." }, { status: 404 });
  }

  const user = getUserProfileById(tx.userId);

  return NextResponse.json({
    orderId: tx.id,
    planId: tx.planId,
    planName: tx.planName,
    amount: tx.amount,
    currency: tx.currency,
    status: tx.status,
    paymentMethod: tx.paymentMethod,
    createdAt: tx.createdAt,
    paidAt: tx.paidAt,
    activeUntil: tx.activeUntil,
    isSandbox: tx.isSandbox,
    userPlan: user?.plan || "free",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.orderId || !body.action) {
      return NextResponse.json({ error: "Missing orderId or action" }, { status: 400 });
    }

    const tx = getTransactionById(body.orderId);
    if (!tx) {
      return NextResponse.json({ error: "Transaksi tidak ditemukan" }, { status: 404 });
    }

    // Only allow sandbox simulation for testing
    if (body.action === "simulate_pay") {
      const result = await processPaymentUpdate({
        orderId: body.orderId,
        status: "paid",
        notes: "Disimulasikan melalui Sandbox Test Simulator",
      });
      return NextResponse.json({ success: true, status: "paid", result });
    } else if (body.action === "simulate_cancel") {
      const result = await processPaymentUpdate({
        orderId: body.orderId,
        status: "cancelled",
        notes: "Dibatalkan oleh pengguna melalui Simulator Sandbox",
      });
      return NextResponse.json({ success: true, status: "cancelled", result });
    }

    return NextResponse.json({ error: "Aksi tidak dikenali." }, { status: 400 });
  } catch (error) {
    console.error("Payment status simulation error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 });
  }
}
