import { NextRequest, NextResponse } from "next/server";
import { decodeSessionToken, getUserProfileById, updateUserProfile } from "@/lib/auth/authService";

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("sela_session_token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, error: "Sesi tidak ditemukan" }, { status: 401 });
  }

  const decoded = decodeSessionToken(token);
  if (!decoded) {
    return NextResponse.json({ success: false, error: "Sesi kedaluwarsa" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const existing = getUserProfileById(decoded.uid);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    const updates: any = {};
    if (typeof json.displayName === "string" && json.displayName.trim().length >= 2) {
      updates.displayName = json.displayName.trim();
    }
    if (json.ageBand) {
      updates.ageBand = json.ageBand;
    }
    if (typeof json.onboardingCompleted === "boolean") {
      updates.onboardingCompleted = json.onboardingCompleted;
    }

    // Consent updates
    if (json.consent) {
      updates.consent = {
        ...existing.consent,
        ...json.consent,
        ...(json.consent.aiProcessingConsent
          ? { aiProcessingConsentAt: new Date().toISOString() }
          : {}),
      };
    }

    const updatedUser = updateUserProfile(decoded.uid, updates);

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal memperbarui profil" }, { status: 500 });
  }
}
