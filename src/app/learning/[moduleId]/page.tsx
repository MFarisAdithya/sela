"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Info,
  Check,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";
import { learningModules } from "@/data/learningModules";
import { useApp } from "@/context/AppContext";

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { completedModules, toggleModuleComplete } = useApp();

  const slug = params?.moduleId as string;
  const module = learningModules.find((m) => m.slug === slug || m.id === slug);

  if (!module) {
    return (
      <div className="py-12 text-center space-y-4">
        <h1 className="text-lg font-bold text-brand-900">Modul Tidak Ditemukan</h1>
        <p className="text-xs text-text-muted">
          Modul yang kamu cari mungkin telah dipindahkan atau belum tersedia.
        </p>
        <Link href="/learning">
          <NeuButton size="sm" variant="primary">
            Kembali ke Ruang Belajar
          </NeuButton>
        </Link>
      </div>
    );
  }

  const isCompleted = completedModules.includes(module.id);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 pb-8">
      {/* Back button */}
      <div>
        <Link
          href="/learning"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Ruang Belajar</span>
        </Link>
      </div>

      {/* Module Title Card */}
      <NeuCard variant="raised" className="p-5 sm:p-7 space-y-4 bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="info" size="sm">
            {module.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            <span>{module.duration}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-brand-900 leading-tight">
            {module.title}
          </h1>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            {module.description}
          </p>
        </div>

        {/* Objectives Box */}
        <div className="p-4 rounded-xl bg-surface-inset shadow-neu-inset space-y-2 border border-border-subtle/80">
          <span className="text-xs font-bold text-brand-900 uppercase tracking-wider block">
            Tujuan Pembelajaran:
          </span>
          <ul className="space-y-1.5 text-xs text-text-main">
            {module.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </NeuCard>

      {/* Main Content Sections */}
      <div className="space-y-4">
        {module.contentSections.map((section, idx) => (
          <NeuCard key={idx} variant="raised-sm" className="p-5 sm:p-6 space-y-2.5">
            <h2 className="text-sm sm:text-base font-bold text-brand-900">
              {section.heading}
            </h2>
            <p className="text-xs sm:text-sm text-text-main leading-relaxed whitespace-pre-line">
              {section.body}
            </p>
          </NeuCard>
        ))}
      </div>

      {/* 60-Second Micro Exercise Card */}
      <NeuCard variant="raised" className="p-5 sm:p-6 bg-gradient-to-br from-surface to-teal-50/50 border border-teal-200/80 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shadow-neu-inset">
            <Sparkles className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-teal-900 uppercase tracking-wider">
              {module.microExercise.title}
            </h3>
            <span className="text-[11px] text-text-muted">Latihan Praktik Singkat</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-text-main leading-relaxed font-medium">
          {module.microExercise.instruction}
        </p>

        <div className="p-3 rounded-xl bg-white/80 border border-teal-100 text-xs text-teal-900 italic">
          Contoh: &ldquo;{module.microExercise.suggestedReflection}&rdquo;
        </div>
      </NeuCard>

      {/* Non-clinical Educational Disclaimer */}
      <div className="flex items-center gap-2 text-[11px] text-text-muted px-2">
        <Info className="w-3.5 h-3.5 text-brand-600 shrink-0" />
        <span>{module.disclaimer}</span>
      </div>

      {/* Completion Action Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border-subtle/80">
        <NeuButton
          size="lg"
          variant={isCompleted ? "secondary" : "primary"}
          onClick={() => toggleModuleComplete(module.id)}
          leftIcon={<CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-teal-600" : ""}`} />}
          className="w-full sm:w-auto"
        >
          {isCompleted ? "Tandai Belum Selesai" : "Selesaikan Modul Ini"}
        </NeuButton>

        <Link href="/journal" className="w-full sm:w-auto">
          <NeuButton size="lg" variant="ghost" className="w-full sm:w-auto">
            Tulis Refleksi di Jurnal &rarr;
          </NeuButton>
        </Link>
      </div>
    </div>
  );
}
