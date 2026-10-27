"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  CheckCircle2,
  Circle,
  Plus,
  Sparkles,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput } from "@/components/ui/NeuInput";
import { CircularProgress } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { AuraModuleHeader } from "@/components/ui/AuraMascot";
import { useApp } from "@/context/AppContext";

export default function GrowthPlanPage() {
  const { growthTasks, toggleGrowthTask } = useApp();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const completedCount = growthTasks.filter((t) => t.completed).length;
  const progressPct =
    growthTasks.length > 0
      ? Math.round((completedCount / growthTasks.length) * 100)
      : 0;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    // Add locally to tasks
    growthTasks.push({
      id: "task-" + Date.now(),
      title: newTaskTitle.trim(),
      category: "Target Pribadi",
      completed: false,
    });
    setNewTaskTitle("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Header with Aura Mascot */}
      <AuraModuleHeader
        productKey="progress"
        eyebrow="Aura Menyemangati · Langkah Kecil"
        title="Rencana Langkah Kecil & Progress"
        description="Menghargai kemajuan kecil tanpa membuat pengguna merasa harus selalu produktif. Selesaikan langkah ringan sesuai kesiapanmu."
        rightSlot={
          <NeuButton
            size="sm"
            variant="primary"
            onClick={() => setIsAdding(!isAdding)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="self-start sm:self-auto"
          >
            {isAdding ? "Batal" : "Tambah target"}
          </NeuButton>
        }
      />

      {/* Aura Menyemangati Companion Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAFDFE] via-[#F4F8FF] to-[#E8F1FC] border border-[#BFD8F5] shadow-sm flex items-center gap-4 animate-in fade-in">
        <div className="relative w-16 sm:w-20 h-16 sm:h-20 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/aura/aura-menyemangati.png"
            alt="Aura tersenyum dengan pose penuh semangat, ditemani panah naik dan bintang kecil"
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-mono-num text-[10px] font-semibold text-[#1E56A0] px-2.5 py-0.5 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
              Aura Menyemangati
            </span>
            <span className="text-xs font-semibold text-[#102542]">
              Kemajuan Kecil Tetap Berarti
            </span>
          </div>
          <p className="text-xs text-[#35527A] leading-relaxed">
            Aura tersenyum dengan pose penuh semangat untuk mengapresiasi usahamu. Mengambil waktu untuk beristirahat atau menyelesaikan satu target kecil sudah merupakan kemajuan nyata yang patut dirayakan.
          </p>
        </div>
      </div>

      {/* Main Focus & Circular Progress Card */}
      <NeuCard variant="raised" className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-surface">
        <div className="md:col-span-2 space-y-2 text-left">
          <div className="flex items-center gap-2">
            <Badge variant="verified" size="sm">
              Fokus Minggu Ini
            </Badge>
            <span className="text-xs text-text-muted">Target Sukarela</span>
          </div>
          <h2 className="text-lg font-bold text-brand-900">
            Membangun Keterampilan Komunikasi & Regulasi Diri
          </h2>
          <p className="text-xs text-text-muted leading-relaxed">
            Pilih 1–3 langkah kecil yang dapat kamu selesaikan dengan tenang. Tidak ada pengurangan skor bila kamu membutuhkan istirahat.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-2">
          <CircularProgress
            value={progressPct}
            subtitle={`${completedCount} dari ${growthTasks.length} selesai`}
          />
        </div>
      </NeuCard>

      {/* Add New Task Form */}
      {isAdding && (
        <NeuCard variant="raised-sm" className="p-4 space-y-3 animate-in fade-in">
          <h3 className="text-xs font-bold text-brand-900 uppercase tracking-wider">
            Tambah Target Baru
          </h3>
          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <NeuInput
                placeholder="Tuliskan 1 langkah kecil yang ingin kamu capai..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
              />
            </div>
            <NeuButton type="submit" variant="primary" size="md">
              Simpan
            </NeuButton>
          </form>
        </NeuCard>
      )}

      {/* Tasks Checklist */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-brand-900 uppercase tracking-wider">
          Daftar Langkah Mingguan
        </h3>

        <div className="space-y-2.5">
          {growthTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleGrowthTask(task.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                task.completed
                  ? "bg-teal-50/50 border-teal-200 text-teal-950 shadow-neu-inset"
                  : "bg-surface border-border-subtle shadow-neu-raised-sm hover:shadow-neu-raised text-text-main"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="shrink-0 text-brand-700"
                  aria-label={task.completed ? "Tandai belum selesai" : "Tandai selesai"}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-600 fill-teal-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-text-muted" />
                  )}
                </button>
                <div className="space-y-0.5">
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      task.completed ? "line-through text-text-muted" : "text-brand-900"
                    }`}
                  >
                    {task.title}
                  </span>
                  <span className="block text-[10px] text-text-subtle">{task.category}</span>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-text-muted shrink-0">
                {task.completed ? "Selesai" : "Belum"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gentle Philosophy Reminder */}
      <div className="p-3 rounded-xl bg-surface-inset text-xs text-text-muted border border-border-subtle/80 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
        <span>Rencana bertumbuh adalah alat bantu perencanaan mandiri tanpa kompetisi atau streak. Fitur ini tidak menjamin kesembuhan atau perubahan kondisi klinis.</span>
      </div>
    </div>
  );
}
