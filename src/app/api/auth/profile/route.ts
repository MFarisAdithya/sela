import { NextRequest, NextResponse } from "next/server";
import {
  encodeSessionToken,
  getUserFromSessionToken,
  updateUserProfile,
} from "@/lib/auth/authService";

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("sela_session_token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, error: "Sesi tidak ditemukan" }, { status: 401 });
  }

  const existing = getUserFromSessionToken(token);
  if (!existing) {
    return NextResponse.json({ success: false, error: "Sesi kedaluwarsa" }, { status: 401 });
  }

  try {
    const json = await req.json();

    const updates: Record<string, unknown> = {};
    if (typeof json.displayName === "string" && json.displayName.trim().length >= 1) {
      updates.displayName = json.displayName.trim();
    }
    if (json.ageBand) {
      updates.ageBand = json.ageBand;
    }
    if (typeof json.onboardingCompleted === "boolean") {
      updates.onboardingCompleted = json.onboardingCompleted;
    }

    if (json.consent) {
      updates.consent = {
        ...existing.consent,
        ...json.consent,
        ...(json.consent.aiProcessingConsent
          ? { aiProcessingConsentAt: new Date().toISOString() }
          : {}),
      };
    }

    const updatedUser = updateUserProfile(existing.id, updates) || {
      ...existing,
      ...updates,
    };

    const response = NextResponse.json({
      success: true,
      user: updatedUser,
    });

    response.cookies.set("sela_session_token", encodeSessionToken(updatedUser), {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: "Gagal memperbarui profil" }, { status: 500 });
  }
}
