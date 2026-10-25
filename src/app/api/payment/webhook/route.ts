import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { processPaymentUpdate, getTransactionById } from "@/lib/payment/paymentService";
import { PaymentStatus, PaymentMethod } from "@/types/payment";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    if (!payload) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const orderId = payload.order_id || payload.orderId;
    const transactionStatus = payload.transaction_status || payload.status;
    const fraudStatus = payload.fraud_status;
    const grossAmount = payload.gross_amount;
    const signatureKey = payload.signature_key;
    const paymentType = (payload.payment_type || "qris") as PaymentMethod;

    if (!orderId) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    const tx = getTransactionById(orderId);
    if (!tx) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Real Midtrans Signature Verification if Server Key is configured
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (serverKey && signatureKey && grossAmount) {
      const statusCode = payload.status_code || "200";
      const hashStr = `${orderId}${statusCode}${grossAmount}${serverKey}`;
      const expectedSignature = crypto.createHash("sha512").update(hashStr).digest("hex");

      if (signatureKey !== expectedSignature) {
        console.warn(`[Midtrans Webhook] Invalid signature key for order ${orderId}`);
        return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
      }
    }

    // Map Midtrans / Gateway status to internal PaymentStatus
    let internalStatus: PaymentStatus = "pending";

    if (transactionStatus === "capture") {
      if (fraudStatus === "challenge") {
        internalStatus = "pending";
      } else if (fraudStatus === "accept" || !fraudStatus) {
        internalStatus = "paid";
      }
    } else if (transactionStatus === "settlement" || transactionStatus === "paid") {
      internalStatus = "paid";
    } else if (transactionStatus === "cancel" || transactionStatus === "deny") {
      internalStatus = "cancelled";
    } else if (transactionStatus === "expire") {
      internalStatus = "expired";
    } else if (transactionStatus === "pending") {
      internalStatus = "pending";
    }

    // Process update idempotently
    const result = await processPaymentUpdate({
      orderId,
      status: internalStatus,
      paymentMethod: paymentType,
      notes: `Webhook status update: ${transactionStatus}`,
    });

    return NextResponse.json({
      status: "OK",
      orderId,
      internalStatus,
      updatedEntitlement: result.updatedEntitlement,
    });
  } catch (error) {
    console.error("Payment webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failure" }, { status: 500 });
  }
}
