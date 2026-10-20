import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";

export default function LearningPlaceholder() {
  return (
    <div className="max-w-xl mx-auto py-8 space-y-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-surface-inset shadow-neu-inset mx-auto flex items-center justify-center text-amber-700">
        <GraduationCap className="w-7 h-7" />
      </div>
      <div className="space-y-2">
        <Badge variant="prototype" size="sm">
          Fase 2
        </Badge>
        <h1 className="text-xl font-bold text-brand-900">Ruang Belajar</h1>
        <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
          Modul edukasi mandiri mengenai komunikasi asertif, resiliensi, regulasi emosi, dan kesiapan karier. Akan diimplementasikan pada Fase 2.
        </p>
      </div>
      <NeuCard variant="inset" className="p-4 text-xs text-text-muted max-w-sm mx-auto text-left">
        <p className="font-semibold text-brand-900 mb-1">Status Pengembangan:</p>
        <p>Materi psikoedukasi dan struktur modul terstruktur sedang disiapkan untuk Fase 2.</p>
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
