import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Heart, ArrowRight } from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";

export default function SplashPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Soft Neumorphic App Emblem */}
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-surface shadow-neu-raised flex items-center justify-center border border-white/80">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 flex items-center justify-center text-white shadow-inner">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white/20" />
          </div>
          <span className="absolute -top-1.5 -right-1.5">
            <Badge variant="verified" size="sm">
              Genre 2026
            </Badge>
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-semibold shadow-neu-inset">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Platform Pendampingan Awal Remaja</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-900 leading-tight">
            FATHERCARE AI
          </h1>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal px-2">
            Dukungan aman untuk jiwa muda yang hebat. Kami di sini untuk mendengarkan, memahami, dan mendukungmu di setiap langkah.
          </p>
        </div>

        {/* Feature Highlights Card */}
        <NeuCard variant="raised-sm" className="p-4 sm:p-5 text-left space-y-3 bg-surface/80">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0 shadow-neu-inset">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-brand-900">Privasi & Ruang Aman</h2>
              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                Tanpa diagnosa klinis, tanpa data sensitif yang disimpan permanen, dan bebas melangkah sesuai kenyamananmu.
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
              Mulai Perjalanan
            </NeuButton>
          </Link>

          <Link href="/design-system" className="block w-full">
            <NeuButton
              size="md"
              variant="secondary"
              className="w-full text-sm shadow-neu-raised-sm"
              leftIcon={<Sparkles className="w-4 h-4 text-brand-600" />}
            >
              Preview Design System & Komponen (Fase 1)
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
