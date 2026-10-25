import {
  PlanConfig,
  TransactionRecord,
  UserEntitlements,
  PaymentStatus,
  PaymentMethod,
} from "@/types/payment";
import { getUserProfileById, updateUserProfile } from "@/lib/auth/authService";

/**
 * Server-authoritative plan configurations
 * Client-submitted prices are NEVER trusted.
 */
export const SERVER_PLANS: Record<string, PlanConfig> = {
  free: {
    id: "free",
    name: "SELA Free",
    tier: "free",
    price: 0,
    formattedPrice: "Gratis",
    durationDays: 0,
    periodLabel: "Selamanya",
    description: "Akses esensial navigasi percakapan dan keselamatan tanpa biaya.",
    features: [
      "Akses dashboard dan refleksi harian",
      "Penyusunan cerita awal dengan Guided Story",
      "Penyimpanan draf Kartu Cerita aktif",
      "Latihan memulai obrolan dengan Practice Talk",
      "Modul keterampilan hidup dan regulasi emosi inti",
      "Support Pathway & kontak darurat 100% gratis selamanya",
    ],
  },
  premium_30d: {
    id: "premium_30d",
    name: "SELA Supporter Premium",
    tier: "premium",
    price: 19000,
    formattedPrice: "Rp19.000",
    durationDays: 30,
    periodLabel: "30 hari",
    description: "Satu kali bayar · Tanpa auto-charge",
    features: [
      "Kuota interaksi AI jauh lebih besar dibandingkan paket Gratis",
      "Lebih banyak kesempatan menggunakan Practice Talk",
      "Kapasitas penyimpanan Kartu Cerita lebih luas",
      "Akses penuh ke seluruh modul premium",
      "Insight refleksi dan perkembangan diri yang lebih mendalam",
      "Rencana dukungan personal untuk membantu pengguna menentukan langkah berikutnya",
    ],
  },
};

// In-Memory Usage Trackers for user quotas
interface UsageCounter {
  aiUsed: number;
  practiceTalkUsed: number;
  lastResetMonth: string; // e.g. "2026-10"
}

// Global singletons for development and testing
const globalForPayment = globalThis as unknown as {
  selaTransactionsMap?: Map<string, TransactionRecord>;
  selaUserUsageMap?: Map<string, UsageCounter>;
};

// Seed a demonstration initial transaction for Alex
const initialDemoTransaction: TransactionRecord = {
  id: "ORD-20261020-001A",
  userId: "usr_alex_demo_01",
  userEmail: "alex@sela.ai",
  planId: "premium_30d",
  planName: "SELA Supporter Premium",
  amount: 19000,
  currency: "IDR",
  status: "paid",
  paymentMethod: "qris",
  createdAt: "2026-10-20T10:00:00.000Z",
  updatedAt: "2026-10-20T10:02:15.000Z",
  paidAt: "2026-10-20T10:02:15.000Z",
  activeUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 24).toISOString(), // ~24 days left
  isSandbox: true,
  notes: "Transaksi pengujian awal sandbox SELA.AI",
};

if (!globalForPayment.selaTransactionsMap) {
  globalForPayment.selaTransactionsMap = new Map<string, TransactionRecord>();
  globalForPayment.selaTransactionsMap.set(initialDemoTransaction.id, initialDemoTransaction);
}
const transactionsMap = globalForPayment.selaTransactionsMap;

if (!globalForPayment.selaUserUsageMap) {
  globalForPayment.selaUserUsageMap = new Map<string, UsageCounter>();
}
const userUsageMap = globalForPayment.selaUserUsageMap;

function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function getUserUsage(userId: string): UsageCounter {
  const currentMonth = getCurrentMonthKey();
  const existing = userUsageMap.get(userId);
  if (!existing || existing.lastResetMonth !== currentMonth) {
    const fresh = { aiUsed: 3, practiceTalkUsed: 1, lastResetMonth: currentMonth };
    userUsageMap.set(userId, fresh);
    return fresh;
  }
  return existing;
}

export function incrementUserAiUsage(userId: string): void {
  const usage = getUserUsage(userId);
  usage.aiUsed += 1;
  userUsageMap.set(userId, usage);
}

export function incrementPracticeTalkUsage(userId: string): void {
  const usage = getUserUsage(userId);
  usage.practiceTalkUsed += 1;
  userUsageMap.set(userId, usage);
}

/**
 * Calculates current active user entitlements with expiration handling
 */
export function getUserEntitlements(userId: string, currentStoryCardCount = 1): UserEntitlements {
  const user = getUserProfileById(userId);
  const now = new Date();
  const isPremiumPlan = user?.plan === "premium";

  // Check if premium has expired
  let isPremiumActive = false;
  let premiumUntil = user?.premiumUntil;

  if (isPremiumPlan && premiumUntil) {
    const expiryDate = new Date(premiumUntil);
    if (expiryDate > now) {
      isPremiumActive = true;
    } else {
      // Graceful downgrade: Keep existing cards intact, but change entitlement
      isPremiumActive = false;
      updateUserProfile(userId, { plan: "free" });
    }
  }

  const usage = getUserUsage(userId);

  if (isPremiumActive) {
    return {
      userId,
      plan: "premium",
      isPremiumActive: true,
      premiumUntil,
      monthlyAiLimit: 100,
      monthlyAiUsed: usage.aiUsed,
      monthlyPracticeTalkLimit: 10,
      monthlyPracticeTalkUsed: usage.practiceTalkUsed,
      maxActiveStoryCards: 20,
      currentActiveStoryCards: currentStoryCardCount,
      canExportBrief: true,
      hasSupporterBadge: true,
      hasAdvancedPersonaSimulation: true,
      supportPathwayAlwaysFree: true,
      safetyInterventionsAlwaysFree: true,
    };
  }

  return {
    userId,
    plan: "free",
    isPremiumActive: false,
    premiumUntil: undefined,
    monthlyAiLimit: 10,
    monthlyAiUsed: usage.aiUsed,
    monthlyPracticeTalkLimit: 2,
    monthlyPracticeTalkUsed: usage.practiceTalkUsed,
    maxActiveStoryCards: 1,
    currentActiveStoryCards: currentStoryCardCount,
    canExportBrief: false,
    hasSupporterBadge: false,
    hasAdvancedPersonaSimulation: false,
    supportPathwayAlwaysFree: true,
    safetyInterventionsAlwaysFree: true,
  };
}

/**
 * Initiates a checkout order
 */
export async function createCheckoutOrder(params: {
  userId: string;
  userEmail: string;
  planId: string;
  paymentMethod?: PaymentMethod;
}): Promise<{ success: boolean; transaction?: TransactionRecord; error?: string }> {
  const plan = SERVER_PLANS[params.planId];
  if (!plan || plan.tier !== "premium") {
    return { success: false, error: "Paket langganan tidak valid." };
  }

  const user = getUserProfileById(params.userId);
  if (!user) {
    return { success: false, error: "Sesi pengguna tidak valid." };
  }

  // Calculate duration extension: if already active, extend from current expiration date
  const now = new Date();
  let baseStartDate = now;
  if (user.plan === "premium" && user.premiumUntil) {
    const existingExpiry = new Date(user.premiumUntil);
    if (existingExpiry > now) {
      baseStartDate = existingExpiry;
    }
  }

  const newActiveUntil = new Date(
    baseStartDate.getTime() + plan.durationDays * 24 * 60 * 60 * 1000
  ).toISOString();

  const timestamp = Date.now();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `ORD-${timestamp}-${randomSuffix}`;

  // Check if Midtrans server credentials exist
  const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
  const isRealGateway = !!midtransServerKey && midtransServerKey.trim().length > 0;

  let snapToken = `SANDBOX-SNAP-${orderId}`;
  let redirectUrl = `/app/pembayaran?orderId=${orderId}&status=pending`;

  if (isRealGateway) {
    try {
      // Optional real Midtrans Snap call
      const authHeader = "Basic " + Buffer.from(midtransServerKey + ":").toString("base64");
      const snapRes = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({
          transaction_details: {
            order_id: orderId,
            gross_amount: plan.price,
          },
          customer_details: {
            first_name: user.displayName,
            email: user.email,
          },
          item_details: [
            {
              id: plan.id,
              price: plan.price,
              quantity: 1,
              name: plan.name,
            },
          ],
        }),
      });

      if (snapRes.ok) {
        const snapData = await snapRes.json();
        snapToken = snapData.token || snapToken;
        redirectUrl = snapData.redirect_url || redirectUrl;
      }
    } catch {
      // Graceful fallback to sandbox simulation
    }
  }

  const transaction: TransactionRecord = {
    id: orderId,
    userId: user.id,
    userEmail: user.email,
    planId: plan.id,
    planName: plan.name,
    amount: plan.price,
    currency: "IDR",
    status: "pending",
    paymentMethod: params.paymentMethod || "qris",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour payment window
    activeUntil: newActiveUntil,
    snapToken,
    redirectUrl,
    isSandbox: !isRealGateway,
    notes: isRealGateway ? "Midtrans Snap Sandbox" : "SELA Sandbox Payment Simulator",
  };

  transactionsMap.set(orderId, transaction);

  return {
    success: true,
    transaction,
  };
}

/**
 * Idempotent Webhook & Transaction Processor
 */
export async function processPaymentUpdate(params: {
  orderId: string;
  status: PaymentStatus;
  paymentMethod?: PaymentMethod;
  notes?: string;
}): Promise<{ success: boolean; transaction?: TransactionRecord; updatedEntitlement?: boolean }> {
  const tx = transactionsMap.get(params.orderId);
  if (!tx) {
    return { success: false };
  }

  // Idempotency: if already paid, avoid extending subscription repeatedly
  if (tx.status === "paid" && params.status === "paid") {
    return { success: true, transaction: tx, updatedEntitlement: false };
  }

  const now = new Date().toISOString();
  tx.status = params.status;
  tx.updatedAt = now;
  if (params.paymentMethod) tx.paymentMethod = params.paymentMethod;
  if (params.notes) tx.notes = params.notes;

  let updatedEntitlement = false;

  if (params.status === "paid") {
    tx.paidAt = now;
    // Update user profile entitlement
    updateUserProfile(tx.userId, {
      plan: "premium",
      premiumUntil: tx.activeUntil,
    });
    updatedEntitlement = true;
  }

  transactionsMap.set(tx.id, tx);

  return {
    success: true,
    transaction: tx,
    updatedEntitlement,
  };
}

/**
 * Retrieves transaction by Order ID
 */
export function getTransactionById(orderId: string): TransactionRecord | null {
  return transactionsMap.get(orderId) || null;
}

/**
 * Retrieves transactions for a specific user
 */
export function getUserTransactions(userId: string): TransactionRecord[] {
  const userTxs: TransactionRecord[] = [];
  for (const [, tx] of transactionsMap) {
    if (tx.userId === userId) {
      userTxs.push(tx);
    }
  }
  return userTxs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
