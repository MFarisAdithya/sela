import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";

export default function SettingsPlaceholder() {
  return (
    <div className="max-w-xl mx-auto py-8 space-y-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-surface-inset shadow-neu-inset mx-auto flex items-center justify-center text-brand-700">
        <ShieldCheck className="w-7 h-7" />
      </div>
      <div className="space-y-2">
        <Badge variant="prototype" size="sm">
          Fase 2
        </Badge>
        <h1 className="text-xl font-bold text-brand-900">Pengaturan & Privasi</h1>
        <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
          Pusat kendali privasi data, tombol pembersihan sesi lokal, dan indikator mode operasional AI (Demo vs Aktif).
        </p>
      </div>
      <NeuCard variant="inset" className="p-4 text-xs text-text-muted max-w-sm mx-auto text-left">
        <p className="font-semibold text-brand-900 mb-1">Status Pengembangan:</p>
        <p>Fitur reset data sesi dan toggle mode AI akan diaktifkan secara utuh pada Fase 2.</p>
      </NeuCard>
      <div>
        <Link href="/dashboard">
          <NeuButton variant="secondary" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Kembali ke Dashboard
          </NeuButton>
        </Link>
      </div>
    </div>
  );
}
