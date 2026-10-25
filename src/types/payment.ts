export type PlanType = "free" | "premium";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "expired"
  | "cancelled"
  | "refunded";

export type PaymentMethod =
  | "qris"
  | "gopay"
  | "bank_transfer"
  | "credit_card"
  | "sandbox_simulator";

export interface PlanConfig {
  id: string;
  name: string;
  tier: PlanType;
  price: number; // in IDR
  formattedPrice: string;
  durationDays: number;
  periodLabel: string;
  description: string;
  features: string[];
}

export interface TransactionRecord {
  id: string; // Order ID, e.g., ORD-20261026-XXXX
  userId: string;
  userEmail: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  expiresAt?: string; // Expiration of the payment link / transaction window
  activeUntil?: string; // Resulting entitlement duration after payment
  snapToken?: string;
  redirectUrl?: string;
  isSandbox: boolean;
  notes?: string;
}

export interface UserEntitlements {
  userId: string;
  plan: PlanType;
  isPremiumActive: boolean;
  premiumUntil?: string;
  // Quota & Limits
  monthlyAiLimit: number;
  monthlyAiUsed: number;
  monthlyPracticeTalkLimit: number;
  monthlyPracticeTalkUsed: number;
  maxActiveStoryCards: number;
  currentActiveStoryCards: number;
  // Entitlement Flags
  canExportBrief: boolean;
  hasSupporterBadge: boolean;
  hasAdvancedPersonaSimulation: boolean;
  // Unlocked & Non-Paywalled Guarantees
  supportPathwayAlwaysFree: boolean;
  safetyInterventionsAlwaysFree: boolean;
}
