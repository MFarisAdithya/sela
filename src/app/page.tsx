import React from "react";
import Link from "next/link";
import { Sparkles, Shield, ArrowRight } from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";
import { SelaMark } from "@/components/ui/SelaLogo";

export default function SplashPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="w-full max-w-md mx-auto space-y-7 animate-in fade-in zoom-in-95 duration-300">
        {/* Soft Neumorphic SELA App Emblem */}
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-surface shadow-neu-raised flex items-center justify-center border border-white/80">
          <SelaMark size={56} />
          <span className="absolute -top-1.5 -right-1.5">
            <Badge variant="verified" size="sm">
              Genre 2026
            </Badge>
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-semibold shadow-neu-inset">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Pendampingan Awal Remaja</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-900 leading-none lowercase">
            sela
          </h1>

          <p className="font-serif text-xl sm:text-2xl font-medium text-brand-800 tracking-normal italic">
            Ruang untuk dirimu.
          </p>

          <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal px-2 max-w-sm mx-auto">
            Ruang digital yang mendampingi remaja dalam mengenali diri, memahami emosi, melatih keterampilan hidup, dan menemukan dukungan yang tepat.
          </p>
        </div>

        {/* Feature Highlights Card */}
        <NeuCard variant="raised-sm" className="p-4 sm:p-5 text-left space-y-3 bg-surface/80">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0 shadow-neu-inset">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-brand-900">Batasan & Privasi</h2>
              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                Tanpa diagnosis medis, data tidak disimpan permanen di server, dan kamu memegang kendali penuh.
              </p>
            </div>
          </div>
        </NeuCard>

        {/* Action Button */}
        <div className="pt-2 space-y-3">
          <Link href="/onboarding" className="block w-full">
            <NeuButton
              size="lg"
              variant="primary"
              className="w-full text-base shadow-neu-raised"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Mulai
            </NeuButton>
          </Link>

          <Link href="/design-system" className="block w-full">
            <NeuButton
              size="md"
              variant="secondary"
              className="w-full text-sm shadow-neu-raised-sm"
              leftIcon={<Sparkles className="w-4 h-4 text-brand-600" />}
            >
              Lihat Komponen Desain
            </NeuButton>
          </Link>

          <p className="text-[11px] text-text-muted">
            Inovasi Program Genre InnovAItion AI Challenge &bull; ADUJAKNAS 2026
          </p>
        </div>
      </div>
    </div>
  );
}
