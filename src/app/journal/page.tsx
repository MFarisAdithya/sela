"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PenLine,
  Sparkles,
  Trash2,
  Bookmark,
  Calendar,
  MessageSquareHeart,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuTextarea } from "@/components/ui/NeuInput";
import { NeuModal } from "@/components/ui/NeuModal";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

const suggestedPrompts = [
  "Apa hal yang membuatmu merasa aman atau bersyukur hari ini, sekecil apa pun itu?",
  "Jika ada perasaan yang sedang paling mengganjal di hatimu saat ini, apa itu?",
  "Apa satu hal yang ingin kamu sampaikan pada dirimu sendiri saat merasa lelah?",
  "Bagaimana kamu mendefinisikan rasa nyaman dan siapa orang yang membuatmu merasakannya?",
];

export default function JournalPage() {
  const router = useRouter();
  const { journalEntries, addJournalEntry, deleteJournalEntry, clearAllJournals, isAiActive } = useApp();

  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [journalContent, setJournalContent] = useState("");
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);
  const [isAiReflectModalOpen, setIsAiReflectModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEntryToDelete, setSelectedEntryToDelete] = useState<string | null>(null);

  const activePrompt = suggestedPrompts[selectedPromptIndex];

  const handleSave = () => {
    if (!journalContent.trim()) return;

    addJournalEntry({
      prompt: activePrompt,
      content: journalContent.trim(),
    });

    setJournalContent("");
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  const handleReflectWithAi = () => {
    if (!journalContent.trim()) return;
    setIsAiReflectModalOpen(true);
  };

  const confirmAiReflection = () => {
    setIsAiReflectModalOpen(false);
    // Redirect to Safe Story AI with intent
    router.push("/safe-story");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700">
            <PenLine className="w-3.5 h-3.5" />
            <span>Ruang Hati Privat</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
            Jurnal Reflektif
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Ekspresikan perasaan, peristiwa, atau perenungan harianmu secara jujur dan aman.
          </p>
        </div>

        {journalEntries.length > 0 && (
          <NeuButton
            size="sm"
            variant="danger"
            onClick={() => setIsDeleteModalOpen(true)}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Hapus Semua Jurnal
          </NeuButton>
        )}
      </div>

      {/* Daily Reflection Writing Card */}
      <NeuCard variant="raised" className="p-5 sm:p-6 space-y-5 bg-surface">
        {/* Prompt Header */}
        <div className="space-y-3 border-b border-border-subtle/80 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Prompt Panduan Hari Ini</span>
            </span>
            <button
              onClick={() =>
                setSelectedPromptIndex((prev) => (prev + 1) % suggestedPrompts.length)
              }
              className="text-xs text-brand-700 hover:text-brand-900 font-semibold underline underline-offset-2"
            >
              Ganti Pertanyaan &rarr;
            </button>
          </div>

          <p className="text-sm font-semibold text-text-main italic bg-surface-inset p-3.5 rounded-xl shadow-neu-inset border border-border-subtle/70">
            &ldquo;{activePrompt}&rdquo;
          </p>

          <p className="text-[11px] text-text-muted leading-relaxed">
            Tips: Tidak ada jawaban yang salah atau dinilai di sini. Tulis apa adanya sesuai suara hatimu.
          </p>
        </div>

        {/* Text Area */}
        <NeuTextarea
          placeholder="Tuliskan perasaanmu di sini... (Hanya tersimpan di perangkatmu)"
          rows={6}
          value={journalContent}
          onChange={(e) => setJournalContent(e.target.value)}
        />

        {/* Notification Alert */}
        {saveSuccessNotice && (
          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Jurnalmu telah tersimpan di sesi browser ini!</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <NeuButton
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReflectWithAi}
            disabled={!journalContent.trim()}
            leftIcon={<MessageSquareHeart className="w-4 h-4 text-brand-600" />}
          >
            Bantu Aku Merefleksikan Tulisan Ini
          </NeuButton>

          <NeuButton
            type="button"
            variant="primary"
            size="md"
            onClick={handleSave}
            disabled={!journalContent.trim()}
            leftIcon={<Bookmark className="w-4 h-4" />}
          >
            Simpan Jurnal Sesi
          </NeuButton>
        </div>
      </NeuCard>

      {/* Previous Entries List */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider px-1">
          Catatan Refleksimu ({journalEntries.length})
        </h2>

        {journalEntries.length === 0 ? (
          <NeuCard variant="inset" className="p-8 text-center space-y-2 bg-surface-inset/60">
            <PenLine className="w-8 h-8 text-text-subtle mx-auto" />
            <h3 className="text-xs font-bold text-brand-900">Belum Ada Catatan Jurnal</h3>
            <p className="text-xs text-text-muted max-w-sm mx-auto">
              Menulis beberapa kalimat singkat dapat membantumu menjernihkan pikiran dan memahami kebutuhan dirimu.
            </p>
          </NeuCard>
        ) : (
          <div className="space-y-3">
            {journalEntries.map((entry) => (
              <NeuCard key={entry.id} variant="raised-sm" className="p-4 sm:p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-text-muted">
                      <Calendar className="w-3.5 h-3.5 text-brand-600" />
                      <span>{entry.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-brand-900 italic">
                      &ldquo;{entry.prompt}&rdquo;
                    </p>
                  </div>

                  <button
                    onClick={() => deleteJournalEntry(entry.id)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-state-danger hover:bg-rose-50 transition-colors"
                    title="Hapus catatan ini"
                    aria-label="Hapus catatan jurnal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-text-main leading-relaxed whitespace-pre-wrap bg-surface-inset p-3 rounded-xl border border-border-subtle/50">
                  {entry.content}
                </p>
              </NeuCard>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Konfirmasi Refleksi Bersama AI */}
      <NeuModal
        isOpen={isAiReflectModalOpen}
        onClose={() => setIsAiReflectModalOpen(false)}
        title="Refleksikan Tulisan dengan Safe Story AI?"
        description="Persetujuan eksplisit sebelum intisari tulisan jurnal dikirimkan ke asisten AI."
        footer={
          <>
            <NeuButton
              variant="secondary"
              size="sm"
              onClick={() => setIsAiReflectModalOpen(false)}
            >
              Batal
            </NeuButton>
            <NeuButton
              variant="primary"
              size="sm"
              onClick={confirmAiReflection}
            >
              Lanjut ke Safe Story AI
            </NeuButton>
          </>
        }
      >
        <div className="space-y-3 text-xs leading-relaxed text-text-muted">
          <p>
            AI akan membantu membacakan intisari emosi dari tulisanmu dan menawarkan pertanyaan pemandu reflektif untuk membantumu menemukan langkah kecil yang menenangkan.
          </p>
          <div className="p-3 rounded-xl bg-surface-inset shadow-neu-inset text-text-main space-y-1">
            <span className="font-semibold text-brand-900 block">Jaminan Privasi:</span>
            <p className="text-[11px] text-text-muted">
              Tulisan jurnalmu tidak akan disimpan permanen atau dipublikasikan. Anda dapat memilih kembali tanpa harus membagikan jurnal Anda.
            </p>
          </div>
        </div>
      </NeuModal>

      {/* Modal: Konfirmasi Hapus Semua Jurnal */}
      <NeuModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Semua Catatan Jurnal Sesi?"
        description="Tindakan ini akan menghapus seluruh catatan jurnal yang ada di sesi browser Anda."
        footer={
          <>
            <NeuButton
              variant="secondary"
              size="sm"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Batal
            </NeuButton>
            <NeuButton
              variant="danger"
              size="sm"
              onClick={() => {
                clearAllJournals();
                setIsDeleteModalOpen(false);
              }}
            >
              Ya, Hapus Semua
            </NeuButton>
          </>
        }
      >
        <p className="text-xs text-text-muted leading-relaxed">
          Semua catatan jurnal di perangkat ini akan segera dibersihkan. Tindakan ini tidak dapat dibatalkan.
        </p>
      </NeuModal>
    </div>
  );
}
