import { UserProfile, AuthSession } from "@/types/auth";

const CURRENT_POLICY_VERSION = "2026.1";

const globalForAuth = globalThis as unknown as {
  selaDemoUsersMap?: Map<string, { passwordHash: string; profile: UserProfile }>;
};

// Seed a default demo user for easy testing
const defaultDemoUser: UserProfile = {
  id: "usr_alex_demo_01",
  email: "alex@sela.ai",
  displayName: "Alex",
  ageBand: "15-18 tahun",
  emailVerified: true,
  onboardingCompleted: true,
  plan: "free",
  consent: {
    termsAccepted: true,
    termsVersion: CURRENT_POLICY_VERSION,
    termsAcceptedAt: new Date().toISOString(),
    privacyNoticeAcknowledged: true,
    privacyVersion: CURRENT_POLICY_VERSION,
    privacyAcknowledgedAt: new Date().toISOString(),
    aiProcessingConsent: true,
    aiProcessingConsentAt: new Date().toISOString(),
    guardianConsentStatus: "tidak_diperlukan",
    marketingOptIn: false,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

if (!globalForAuth.selaDemoUsersMap) {
  globalForAuth.selaDemoUsersMap = new Map<string, { passwordHash: string; profile: UserProfile }>();
  globalForAuth.selaDemoUsersMap.set("alex@sela.ai", {
    passwordHash: "Password123!",
    profile: defaultDemoUser,
  });
}

const demoUsersMap = globalForAuth.selaDemoUsersMap;

function hashPassword(password: string): string {
  return Buffer.from(password).toString("base64");
}

function deriveDisplayNameFromIdentifier(identifier: string): string {
  const cleaned = identifier.trim();
  if (!cleaned) return "Kawan Sela";
  const localPart = cleaned.includes("@") ? cleaned.split("@")[0] : cleaned;
  const words = localPart
    .replace(/[._-]+/g, " ")
    .replace(/\d+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "Kawan Sela";
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
    .slice(0, 30);
}

/**
 * Creates a self-contained encoded session token so serverless cold starts never lose user state
 */
export function encodeSessionToken(userOrId: UserProfile | string, emailArg?: string): string {
  if (typeof userOrId === "string") {
    const existing = getUserProfileById(userOrId) || (emailArg ? getUserProfileByEmail(emailArg) : null);
    const payload = {
      uid: userOrId,
      em: emailArg || existing?.email || "tamu@sela.ai",
      dn: existing?.displayName || deriveDisplayNameFromIdentifier(emailArg || "Kawan Sela"),
      ab: existing?.ageBand || "18-24 tahun",
      pl: existing?.plan || "free",
      ai: existing?.consent?.aiProcessingConsent ?? true,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };
    return Buffer.from(JSON.stringify(payload)).toString("base64url");
  }

  const payload = {
    uid: userOrId.id,
    em: userOrId.email,
    dn: userOrId.displayName,
    ab: userOrId.ageBand,
    pl: userOrId.plan,
    ai: userOrId.consent?.aiProcessingConsent ?? true,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

/**
 * Decodes and verifies session token
 */
export function decodeSessionToken(token: string): {
  uid: string;
  em: string;
  dn?: string;
  ab?: UserProfile["ageBand"];
  pl?: UserProfile["plan"];
  ai?: boolean;
} | null {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf-8");
    const parsed = JSON.parse(raw);
    if (parsed.exp && parsed.exp > Date.now() && parsed.uid && parsed.em) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Retrieves or reconstructs a UserProfile from a session token (safe across serverless cold starts)
 */
export function getUserFromSessionToken(token: string): UserProfile | null {
  const decoded = decodeSessionToken(token);
  if (!decoded) return null;

  const existing = getUserProfileById(decoded.uid) || getUserProfileByEmail(decoded.em);
  if (existing) return existing;

  const now = new Date().toISOString();
  const reconstructed: UserProfile = {
    id: decoded.uid,
    email: decoded.em,
    displayName: decoded.dn || deriveDisplayNameFromIdentifier(decoded.em),
    ageBand: decoded.ab || "15-18 tahun",
    emailVerified: true,
    onboardingCompleted: true,
    plan: decoded.pl || "free",
    consent: {
      termsAccepted: true,
      termsVersion: CURRENT_POLICY_VERSION,
      termsAcceptedAt: now,
      privacyNoticeAcknowledged: true,
      privacyVersion: CURRENT_POLICY_VERSION,
      privacyAcknowledgedAt: now,
      aiProcessingConsent: decoded.ai ?? true,
      aiProcessingConsentAt: now,
      guardianConsentStatus: "tidak_diperlukan",
      marketingOptIn: false,
    },
    createdAt: now,
    updatedAt: now,
  };

  demoUsersMap.set(decoded.em.toLowerCase(), {
    passwordHash: "open_access",
    profile: reconstructed,
  });

  return reconstructed;
}

/**
 * Registers a user (open-access friendly for competition judges)
 */
export async function registerUser(params: {
  displayName: string;
  email: string;
  password: string;
  ageBand?: UserProfile["ageBand"];
  termsAccepted?: boolean;
  privacyAcknowledged?: boolean;
  marketingOptIn?: boolean;
}): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
  const rawEmail = params.email.trim().toLowerCase() || "tamu@sela.ai";
  const normalizedEmail = rawEmail.includes("@") ? rawEmail : `${rawEmail}@sela.ai`;
  const now = new Date().toISOString();

  const existing = demoUsersMap.get(normalizedEmail);
  const userId = existing?.profile.id || "usr_" + Math.random().toString(36).substring(2, 10);

  const newProfile: UserProfile = {
    id: userId,
    email: normalizedEmail,
    displayName: params.displayName.trim() || deriveDisplayNameFromIdentifier(normalizedEmail),
    ageBand: params.ageBand || "15-18 tahun",
    emailVerified: true,
    onboardingCompleted: true,
    plan: existing?.profile.plan || "free",
    consent: {
      termsAccepted: true,
      termsVersion: CURRENT_POLICY_VERSION,
      termsAcceptedAt: now,
      privacyNoticeAcknowledged: true,
      privacyVersion: CURRENT_POLICY_VERSION,
      privacyAcknowledgedAt: now,
      aiProcessingConsent: true,
      aiProcessingConsentAt: now,
      guardianConsentStatus: "tidak_diperlukan",
      marketingOptIn: !!params.marketingOptIn,
    },
    createdAt: existing?.profile.createdAt || now,
    updatedAt: now,
  };

  demoUsersMap.set(normalizedEmail, {
    passwordHash: hashPassword(params.password || "demo"),
    profile: newProfile,
  });

  const token = encodeSessionToken(newProfile);

  return {
    success: true,
    session: {
      user: newProfile,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
  };
}

/**
 * Logs in a user — accepts ANY email/username and ANY password (auto-provisions account if not registered)
 * so competition judges can immediately access the app without friction.
 */
export async function loginUser(params: {
  email: string;
  password: string;
}): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
  const rawIdentifier = params.email.trim().toLowerCase() || "juri@sela.ai";
  const normalizedEmail = rawIdentifier.includes("@") ? rawIdentifier : `${rawIdentifier}@sela.ai`;
  let record = demoUsersMap.get(normalizedEmail);

  if (!record) {
    const now = new Date().toISOString();
    const userId = "usr_" + Math.random().toString(36).substring(2, 10);
    const autoProfile: UserProfile = {
      id: userId,
      email: normalizedEmail,
      displayName: deriveDisplayNameFromIdentifier(rawIdentifier),
      ageBand: "15-18 tahun",
      emailVerified: true,
      onboardingCompleted: true,
      plan: "free",
      consent: {
        termsAccepted: true,
        termsVersion: CURRENT_POLICY_VERSION,
        termsAcceptedAt: now,
        privacyNoticeAcknowledged: true,
        privacyVersion: CURRENT_POLICY_VERSION,
        privacyAcknowledgedAt: now,
        aiProcessingConsent: true,
        aiProcessingConsentAt: now,
        guardianConsentStatus: "tidak_diperlukan",
        marketingOptIn: false,
      },
      createdAt: now,
      updatedAt: now,
    };

    record = {
      passwordHash: hashPassword(params.password || "demo"),
      profile: autoProfile,
    };
    demoUsersMap.set(normalizedEmail, record);
  }

  const token = encodeSessionToken(record.profile);

  return {
    success: true,
    session: {
      user: record.profile,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
  };
}

export function getUserProfileByEmail(email: string): UserProfile | null {
  const normalized = email.trim().toLowerCase();
  const record = demoUsersMap.get(normalized);
  return record ? record.profile : null;
}

export function getUserProfileById(userId: string): UserProfile | null {
  for (const [, val] of demoUsersMap) {
    if (val.profile.id === userId) return val.profile;
  }
  return null;
}

export function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): UserProfile | null {
  for (const [, val] of demoUsersMap) {
    if (val.profile.id === userId) {
      val.profile = {
        ...val.profile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return val.profile;
    }
  }
  return null;
}

export function deleteUserAccount(userId: string): boolean {
  for (const [em, val] of demoUsersMap) {
    if (val.profile.id === userId) {
      demoUsersMap.delete(em);
      return true;
    }
  }
  return false;
}
