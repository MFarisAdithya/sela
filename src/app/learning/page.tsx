"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Filter,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { learningModules } from "@/data/learningModules";
import { useApp } from "@/context/AppContext";

export default function LearningPage() {
  const { completedModules } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = ["Semua", "Psikoedukasi", "Life Skills", "Resiliensi", "Karier"];

  const filteredModules =
    selectedCategory === "Semua"
      ? learningModules
      : learningModules.filter((m) => m.category === selectedCategory);

  const completedCount = completedModules.length;
  const totalCount = learningModules.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Materi Bertumbuh & Life Skills</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
            Ruang Belajar
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Modul ringkas yang dirancang untuk memperkuat ketahanan emosi, komunikasi, dan kesiapan masa depan.
          </p>
        </div>

        {/* Progress Card Header */}
        <div className="p-3 sm:p-4 rounded-2xl bg-surface shadow-neu-raised-sm border border-border-subtle min-w-[220px] space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-brand-900">Kemajuan Belajar</span>
            <span className="font-semibold text-brand-700">
              {completedCount}/{totalCount} Modul
            </span>
          </div>
          <ProgressBar value={completionPercentage} />
        </div>
      </div>

      {/* Featured Primary Module Banner */}
      <NeuCard
        variant="raised"
        className="p-5 sm:p-6 bg-gradient-to-br from-surface to-brand-50/70 border border-brand-200/80 space-y-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="verified" size="sm">
            Modul Rekomendasi Utama
          </Badge>
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-600" /> 6 Menit Baca & Latihan
          </span>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-brand-900">
            Memahami Ketidakhadiran Figur Ayah dengan Lembut
          </h2>
          <p className="text-xs sm:text-sm text-text-main max-w-2xl leading-relaxed">
            Menemukan kembali rasa utuh dalam dirimu, memvalidasi luka tanpa menyalahkan, dan membangun resiliensi pribadi yang mandiri.
          </p>
        </div>

        <div className="pt-1">
          <Link href={`/learning/${learningModules[2].slug}`}>
            <NeuButton size="md" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Mulai Baca Modul &rarr;
            </NeuButton>
          </Link>
        </div>
      </NeuCard>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
        <Filter className="w-3.5 h-3.5 text-text-muted shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl shrink-0 transition-all ${
              selectedCategory === cat
                ? "bg-brand-100 text-brand-900 border border-brand-300 shadow-neu-inset"
                : "bg-surface text-text-muted hover:text-brand-900 border border-border-subtle/80 shadow-neu-raised-sm"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredModules.map((module) => {
          const isCompleted = completedModules.includes(module.id);

          return (
            <Link key={module.id} href={`/learning/${module.slug}`} className="group">
              <NeuCard
                variant="raised-sm"
                interactive
                className="p-5 h-full space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="info" size="sm">
                      {module.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-[11px] text-text-muted">
                      <Clock className="w-3 h-3 text-brand-600" />
                      <span>{module.duration}</span>
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-brand-900 group-hover:text-brand-700 transition-colors">
                    {module.title}
                  </h3>

                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {module.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border-subtle/70 text-xs">
                  {isCompleted ? (
                    <span className="flex items-center gap-1.5 font-semibold text-teal-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      <span>Telah Selesai</span>
                    </span>
                  ) : (
                    <span className="text-text-muted">Belum diselesaikan</span>
                  )}

                  <span className="font-semibold text-brand-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Buka</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </NeuCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
