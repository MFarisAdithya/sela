"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PenLine,
  Trash2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuTextarea } from "@/components/ui/NeuInput";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

const prompts = [
  "Apa hal kecil yang membuatmu merasa lega atau bersyukur hari ini?",
  "Jika ada perasaan yang sulit diungkapkan secara langsung hari ini, apa itu?",
  "Apa satu hal yang ingin kamu lakukan untuk merawat dirimu minggu ini?",
];

export default function JournalPage() {
  const router = useRouter();
  const { journalEntries, addJournalEntry, deleteJournalEntry, clearAllJournal, currentMood } = useApp();
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [entryText, setEntryText] = useState("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleSave = () => {
    if (!entryText.trim()) return;

    addJournalEntry({
      prompt: prompts[selectedPromptIdx],
      content: entryText.trim(),
      mood: currentMood || undefined,
    });

    setEntryText("");
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleConsultWithAi = (content: string) => {
    // Navigate to safe story with content
    router.push("/safe-story");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-subtle/80 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Refleksi Pribadi
          </span>
          <h1 className="text-2xl font-extrabold text-brand-900 tracking-tight">
            Catatan pribadi
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Tersimpan di browser selama sesi ini. Tidak dikirim ke server.
          </p>
        </div>

        {journalEntries.length > 0 && (
          <NeuButton
            size="sm"
            variant="ghost"
            onClick={() => {
              if (confirm("Hapus semua catatan di sesi ini?")) clearAllJournal();
            }}
            className="text-state-danger hover:text-red-700 text-xs self-start sm:self-auto"
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Hapus semua
          </NeuButton>
        )}
      </div>

      {/* Writing Form */}
      <NeuCard variant="raised" className="p-5 sm:p-6 space-y-4">
        {/* Daily Prompt Picker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-900 uppercase tracking-wider">
              Pertanyaan pemandu
            </span>
            <button
              onClick={() => setSelectedPromptIdx((prev) => (prev + 1) % prompts.length)}
              className="text-[11px] text-brand-700 hover:text-brand-900 font-medium"
            >
              Ganti pertanyaan &rarr;
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-inset shadow-neu-inset text-xs font-medium text-brand-900 border border-border-subtle/80">
            {prompts[selectedPromptIdx]}
          </div>
        </div>

        {/* Textarea */}
        <NeuTextarea
          label="Tulis catatanmu di sini"
          rows={5}
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Tulis dengan jujur apa yang kamu rasakan tanpa khawatir dinilai..."
        />

        {/* Action button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-text-muted">
            {isSavedNotice ? (
              <span className="text-teal-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Catatan tersimpan di sesi
              </span>
            ) : (
              "Data otomatis hilang bila sesi ditutup."
            )}
          </span>

          <NeuButton
            variant="primary"
            size="md"
            onClick={handleSave}
            disabled={!entryText.trim()}
          >
            Simpan catatan
          </NeuButton>
        </div>
      </NeuCard>

      {/* Journal History */}
      <div className="space-y-3 pt-2">
        <h2 className="text-sm font-bold text-brand-900 uppercase tracking-wider">
          Riwayat sesi ini ({journalEntries.length})
        </h2>

        {journalEntries.length === 0 ? (
          <NeuCard variant="inset" className="p-6 text-center text-xs text-text-muted space-y-2">
            <BookOpen className="w-8 h-8 text-brand-400 mx-auto" />
            <p className="font-semibold text-brand-900">Belum ada catatan tersimpan</p>
            <p>Tulis beberapa kalimat pada kolom di atas untuk mulai mencatat.</p>
          </NeuCard>
        ) : (
          <div className="space-y-3">
            {journalEntries.map((entry) => (
              <NeuCard key={entry.id} variant="raised-sm" className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-border-subtle/70 pb-2">
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-text-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {entry.date}
                    </span>
                    <p className="text-xs font-semibold text-brand-900">{entry.prompt}</p>
                  </div>
                  <button
                    onClick={() => deleteJournalEntry(entry.id)}
                    className="p-1 text-text-muted hover:text-state-danger transition-colors"
                    aria-label="Hapus catatan ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-text-main leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>

                <div className="pt-1 flex items-center justify-end">
                  <NeuButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleConsultWithAi(entry.content)}
                    className="text-xs text-brand-700 hover:text-brand-900"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Bantu refleksikan di Cerita AI
                  </NeuButton>
                </div>
              </NeuCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
