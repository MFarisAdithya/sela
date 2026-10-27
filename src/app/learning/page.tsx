"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Clock,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AuraModuleHeader } from "@/components/ui/AuraMascot";
import { useApp } from "@/context/AppContext";
import { LEARNING_MODULES, LearningModule } from "@/data/learningModules";
import { copy } from "@/lib/copy";

export default function LearningPage() {
  const { completedModules, toggleModuleCompleted } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>("mod-1");

  const categories = [
    "Semua",
    copy.learning.categories.psikoedukasi,
    copy.learning.categories.lifeSkills,
    copy.learning.categories.karier,
  ];

  const filteredModules =
    selectedCategory === "Semua"
      ? LEARNING_MODULES
      : LEARNING_MODULES.filter((m) => m.category === selectedCategory);

  const progressPct = Math.round(
    (completedModules.length / LEARNING_MODULES.length) * 100
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2 animate-in fade-in duration-150">
      {/* Header with Aura Mascot */}
      <AuraModuleHeader
        productKey="materi-edukasi"
        title="Belajar & Kenali Diri"
        description="Tips ringan dan hal-hal kecil untuk membantumu memahami diri dan menghadapi orang lain."
        rightSlot={
          <div className="w-full sm:w-56 space-y-1">
            <ProgressBar
              value={progressPct}
              label={`Langkahmu: ${completedModules.length} dari ${LEARNING_MODULES.length} selesai`}
              showPercentage
            />
          </div>
        }
      />

      {/* Aura Belajar Companion Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAFDFE] via-[#F4F8FF] to-[#E8F1FC] border border-[#BFD8F5] shadow-sm flex items-center gap-4 animate-in fade-in">
        <div className="relative w-16 sm:w-20 h-16 sm:h-20 shrink-0">
          <img
            src="/images/aura/aura-ruang-belajar.png"
            alt="Sela membaca buku terbuka dengan bintang kecil di atas kepalanya"
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-mono-num text-[10px] font-semibold text-[#1E56A0] px-2 py-0.5 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
              Sela Belajar
            </span>
            <span className="text-xs font-semibold text-[#102542]">
              Sudut Belajar &amp; Kenali Diri
            </span>
          </div>
          <p className="text-xs text-[#35527A] leading-relaxed">
            Belajar mengenali emosi, meredakan ketegangan, dan melatih komunikasi santai. Pelajari topik-topik ringkas ini kapan pun kamu butuh panduan santai.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border ${
              selectedCategory === cat
                ? "bg-brand-700 text-white border-brand-800 shadow-neu-raised-sm"
                : "bg-surface text-text-muted border-border-subtle hover:text-brand-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {filteredModules.map((mod) => {
          const isCompleted = completedModules.includes(mod.id);
          const isExpanded = expandedModuleId === mod.id;

          return (
            <NeuCard
              key={mod.id}
              variant="raised"
              className={`p-5 transition-all space-y-3 ${
                isCompleted ? "border-teal-300/80 bg-teal-50/20" : "border-border-subtle"
              }`}
            >
              {/* Module Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={isCompleted ? "success" : "info"} size="sm">
                      {mod.category}
                    </Badge>
                    <span className="text-[11px] text-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {mod.duration}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-brand-900">{mod.title}</h2>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setExpandedModuleId(isExpanded ? null : mod.id)
                  }
                  className="p-1.5 rounded-lg text-text-muted hover:text-brand-900 shrink-0"
                  aria-label={isExpanded ? "Tutup detail" : "Buka detail"}
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Expandable Module Content */}
              {isExpanded && (
                <div className="pt-3 border-t border-border-subtle/80 space-y-4 text-xs">
                  {/* Key Points */}
                  <div className="space-y-2">
                    <span className="font-bold text-brand-900 block">Poin Pembelajaran:</span>
                    <ul className="space-y-1.5 list-disc list-inside text-text-main leading-relaxed pl-1">
                      {mod.keyPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical Exercise Box */}
                  <div className="p-3.5 rounded-xl bg-surface-inset shadow-neu-inset border border-border-subtle/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                        {mod.practicalExercise.title}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {mod.practicalExercise.duration}
                      </span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-text-muted leading-relaxed">
                      {mod.practicalExercise.steps.map((st, sIdx) => (
                        <li key={sIdx}>{st}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Source reference */}
                  <div className="text-[11px] text-text-subtle border-t border-border-subtle/60 pt-2">
                    <strong>Sumber rujukan:</strong> {mod.source}
                  </div>
                </div>
              )}

              {/* Bottom toggle complete action */}
              <div className="flex items-center justify-between pt-1 border-t border-border-subtle/60">
                <button
                  onClick={() => toggleModuleCompleted(mod.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
                    isCompleted
                      ? "text-teal-800 bg-teal-100 hover:bg-teal-200"
                      : "text-brand-800 bg-brand-100 hover:bg-brand-200"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCompleted ? "Tandai belum selesai" : "Tandai sudah selesai"}</span>
                </button>

                <button
                  onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                  className="text-xs text-brand-700 hover:text-brand-900 font-medium"
                >
                  {isExpanded ? "Tutup materi" : "Baca materi lengkap →"}
                </button>
              </div>
            </NeuCard>
          );
        })}
      </div>

      {/* Non-clinical disclaimer footer */}
      <div className="p-3 rounded-xl bg-surface-inset text-[11px] text-text-muted border border-border-subtle flex items-start gap-2">
        <Shield className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <span>
          Modul ini bersifat edukasi dan pengembangan diri mandiri. Bila kamu membutuhkan konseling tatap muka atau evaluasi mendalam, hubungi Guru BK atau konselor sebaya.
        </span>
      </div>
    </div>
  );
}
