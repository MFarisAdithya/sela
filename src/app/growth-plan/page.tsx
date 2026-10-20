"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Circle,
  Plus,
  Heart,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput } from "@/components/ui/NeuInput";
import { NeuModal } from "@/components/ui/NeuModal";
import { Badge } from "@/components/ui/Badge";
import { CircularProgress } from "@/components/ui/ProgressBar";
import { useApp } from "@/context/AppContext";

export default function GrowthPlanPage() {
  const { growthTasks, toggleGrowthTask } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("Pengembangan Diri");

  const completedCount = growthTasks.filter((t) => t.completed).length;
  const totalCount = growthTasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;

    // Add to context task list
    growthTasks.push({
      id: "gt-" + Date.now(),
      text: newTaskText.trim(),
      category: newTaskCategory,
      completed: false,
    });

    setNewTaskText("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Perkembangan Sukarela</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
            Rencana Bertumbuh
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Target pribadi mingguan tanpa tekanan kompetisi atau rasa bersalah.
          </p>
        </div>

        <NeuButton
          size="sm"
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Tambah Target Kecil
        </NeuButton>
      </div>

      {/* Main Focus Goal with Neumorphic Circular Progress */}
      <NeuCard variant="raised" className="p-6 sm:p-8 bg-surface space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2.5 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="verified" size="sm">
                Fokus Minggu Ini
              </Badge>
              <span className="text-xs text-text-muted flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-600" /> Siklus 7 Hari
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-brand-900">
              Bangun Rasa Percaya Diri & Ketangguhan Emosional
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-md leading-relaxed">
              Fokus pada tindakan nyata yang menumbuhkan penerimaan diri dan memperkuat hubungan baik dengan orang terdekat.
            </p>
          </div>

          {/* Neumorphic Circular Progress Component */}
          <div className="shrink-0 p-3 rounded-full bg-surface shadow-neu-raised border border-white/60">
            <CircularProgress
              value={progressPercent}
              size={120}
              subtitle={`${completedCount}/${totalCount} Selesai`}
            />
          </div>
        </div>
      </NeuCard>

      {/* Weekly Checklist Tasks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider">
            Langkah Bertumbuh Minggu Ini ({completedCount}/{totalCount})
          </h2>
          <span className="text-[11px] text-text-muted">Centang saat selesai</span>
        </div>

        <div className="space-y-2.5">
          {growthTasks.map((task) => (
            <NeuCard
              key={task.id}
              variant="raised-sm"
              interactive
              onClick={() => toggleGrowthTask(task.id)}
              className={`p-4 flex items-center justify-between gap-3.5 transition-all select-none ${
                task.completed ? "bg-brand-50/60 border-teal-200" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  className="mt-0.5 text-brand-700 focus:outline-none shrink-0"
                  aria-label={task.completed ? "Batalkan selesai" : "Tandai selesai"}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-600 fill-teal-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-text-subtle hover:text-brand-600" />
                  )}
                </button>

                <div className="space-y-0.5">
                  <span
                    className={`text-xs sm:text-sm font-medium leading-relaxed block ${
                      task.completed ? "line-through text-text-muted" : "text-text-main"
                    }`}
                  >
                    {task.text}
                  </span>
                  <span className="text-[10px] font-semibold text-brand-700 bg-brand-100 px-2 py-0.5 rounded-md inline-block">
                    {task.category}
                  </span>
                </div>
              </div>
            </NeuCard>
          ))}
        </div>
      </div>

      {/* Gentle Non-Guilt Principle Card */}
      <NeuCard variant="inset" className="p-5 bg-surface-inset/80 space-y-2 border border-border-subtle/80">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
          <h3 className="text-xs font-bold text-brand-900 uppercase tracking-wider">
            Pengingat Lembut
          </h3>
        </div>
        <p className="text-xs text-text-muted leading-relaxed">
          Tidak ada sistem streak atau penalti di sini. Kamu berhak mengambil waktu istirahat jika hari ini terasa berat. Bertumbuh adalah tentang konsistensi yang penuh kasih pada dirimu sendiri, bukan perlombaan kesempurnaan.
        </p>
      </NeuCard>

      {/* Modal: Tambah Target */}
      <NeuModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Target Bertumbuh Baru"
        description="Pilih langkah kecil yang realistis dan nyaman untuk kamu capai dalam beberapa hari ke depan."
        footer={
          <>
            <NeuButton
              variant="secondary"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </NeuButton>
            <NeuButton
              variant="primary"
              size="sm"
              disabled={!newTaskText.trim()}
              onClick={handleAddTask}
            >
              Simpan Target
            </NeuButton>
          </>
        }
      >
        <div className="space-y-4">
          <NeuInput
            label="Rencana Langkah Kecil"
            placeholder="Contoh: Jalan santai 15 menit tanpa melihat ponsel"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
              Kategori Langkah
            </label>
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl bg-surface-inset shadow-neu-inset text-text-main border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              <option value="Refleksi">Refleksi Hati</option>
              <option value="Belajar">Ruang Belajar</option>
              <option value="Dukungan">Jejaring Sosial</option>
              <option value="Kesehatan Diri">Kesehatan & Istirahat</option>
              <option value="Life Skills">Praktik Keterampilan Hidup</option>
            </select>
          </div>
        </div>
      </NeuModal>
    </div>
  );
}
