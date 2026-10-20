"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckSquare, Square, ArrowLeft } from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { useApp } from "@/context/AppContext";
import { copy } from "@/lib/copy";

const NICKNAME_KEY = "sela:nickname";

export default function OnboardingPage() {
  const router = useRouter();
  const { setHasConsented, userName, setUserName } = useApp();
  const [agreeNonClinical, setAgreeNonClinical] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [inputName, setInputName] = useState(userName === "Alex" ? "" : userName);

  const t = copy.onboarding;
  const canProceed = agreeNonClinical && agreePrivacy;

  const handleProceed = () => {
    if (!canProceed) return;
    const finalName = inputName.trim() || "Kawan";
    setHasConsented(true);
    setUserName(finalName);
    try {
      sessionStorage.setItem(NICKNAME_KEY, finalName);
      sessionStorage.setItem("sela_chat_consent", "true");
    } catch {
      // sessionStorage unavailable
    }
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto py-8 space-y-6 text-center animate-in fade-in duration-200">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-brand-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-xs text-text-muted leading-relaxed max-w-sm mx-auto">
          {t.intro}
        </p>
      </div>

      {/* Name Input */}
      <NeuCard variant="raised-sm" className="p-4 sm:p-5 text-left space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
          {t.nicknameLabel}
        </label>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Tulis namamu atau nama samaran..."
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-surface-inset shadow-neu-inset text-text-main border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <span className="text-[11px] text-text-muted block">
          {t.nicknameHelp}
        </span>
      </NeuCard>

      {/* Consent Checkboxes */}
      <NeuCard variant="raised" className="p-4 sm:p-5 text-left space-y-3 bg-surface">
        <button
          type="button"
          role="checkbox"
          aria-checked={agreeNonClinical}
          onClick={() => setAgreeNonClinical(!agreeNonClinical)}
          className="w-full text-left flex items-start gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-brand-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <div className="mt-0.5 text-brand-700 shrink-0">
            {agreeNonClinical ? (
              <CheckSquare className="w-5 h-5 text-teal-600 fill-teal-100" />
            ) : (
              <Square className="w-5 h-5 text-text-muted" />
            )}
          </div>
          <p className="text-xs text-text-main leading-relaxed">
            {t.consentLimits}
          </p>
        </button>

        <button
          type="button"
          role="checkbox"
          aria-checked={agreePrivacy}
          onClick={() => setAgreePrivacy(!agreePrivacy)}
          className="w-full text-left flex items-start gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-brand-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <div className="mt-0.5 text-brand-700 shrink-0">
            {agreePrivacy ? (
              <CheckSquare className="w-5 h-5 text-teal-600 fill-teal-100" />
            ) : (
              <Square className="w-5 h-5 text-text-muted" />
            )}
          </div>
          <p className="text-xs text-text-main leading-relaxed">
            {t.consentPrivacy}
          </p>
        </button>
      </NeuCard>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <NeuButton
          size="lg"
          variant="primary"
          disabled={!canProceed}
          onClick={handleProceed}
          className="w-full text-base"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {t.submit}
        </NeuButton>

        <Link href="/" className="inline-block text-xs text-text-muted hover:text-brand-900 transition-colors">
          ← {t.back}
        </Link>
      </div>
    </div>
  );
}
