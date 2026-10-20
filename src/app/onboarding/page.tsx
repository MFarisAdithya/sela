import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";

export default function OnboardingPage() {
  return (
    <div className="max-w-md mx-auto py-8 space-y-6 text-center animate-in fade-in duration-200">
      <div className="space-y-2">
        <Badge variant="prototype" size="sm">
          Persetujuan Pengguna
        </Badge>
        <h1 className="text-2xl font-extrabold text-brand-900">
          Sebelum kita mulai
        </h1>
        <p className="text-xs text-text-muted leading-relaxed">
          FATHERCARE AI adalah asisten refleksi dan edukasi awal nonklinis. Kami tidak mendiagnosis dan tidak menggantikan bantuan profesional.
        </p>
      </div>

      <NeuCard variant="raised" className="p-5 text-left space-y-3 bg-surface">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-text-muted">
            <span className="font-bold text-brand-900 block">Privasi Sesi</span>
            <p>
              Teks ceritamu tidak disimpan permanen di server dan kamu bebas keluar kapan saja.
            </p>
          </div>
        </div>
      </NeuCard>

      <div className="space-y-3 pt-2">
        <Link href="/dashboard" className="block w-full">
          <NeuButton size="lg" variant="primary" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Saya mengerti, masuk ke dashboard
          </NeuButton>
        </Link>
        <Link href="/" className="block text-xs text-text-muted hover:text-brand-900">
          &larr; Kembali ke halaman awal
        </Link>
      </div>
    </div>
  );
}
