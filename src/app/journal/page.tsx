"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Copy,
  Download,
  Trash2,
  Edit3,
  Check,
  ArrowRight,
  Plus,
  Heart,
  MessageSquare,
  Sparkles,
  Layers,
  BookOpen,
  Send,
  AlertCircle,
  HelpCircle,
  Share2,
} from "lucide-react";
import { useApp, StoryCard } from "@/context/AppContext";
import { AuraModuleHeader } from "@/components/ui/AuraMascot";
import { cn } from "@/lib/utils";

export default function StoryCardHubPage() {
  const router = useRouter();
  const {
    storyCards,
    activeStoryCard,
    setActiveStoryCard,
    addStoryCard,
    updateStoryCard,
    deleteStoryCard,
    clearAllStoryCards,
    journalEntries,
    addJournalEntry,
    deleteJournalEntry,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"story_cards" | "free_journal">("story_cards");
  const [selectedCardId, setSelectedCardId] = useState<string>(
    activeStoryCard?.id || storyCards[0]?.id || ""
  );
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields
  const currentCard = storyCards.find((c) => c.id === selectedCardId) || storyCards[0];
  const [editFacts, setEditFacts] = useState(currentCard?.facts || "");
  const [editFeelings, setEditFeelings] = useState(currentCard?.feelings || "");
  const [editNeeds, setEditNeeds] = useState(currentCard?.needs || "");
  const [editOpeningLine, setEditOpeningLine] = useState(currentCard?.openingLine || "");

  // Free journal fields
  const [journalNote, setJournalNote] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);

  const handleSelectCard = (card: StoryCard) => {
    setSelectedCardId(card.id);
    setActiveStoryCard(card);
    setIsEditing(false);
    setEditFacts(card.facts);
    setEditFeelings(card.feelings);
    setEditNeeds(card.needs);
    setEditOpeningLine(card.openingLine);
  };

  const handleSaveEdit = () => {
    if (!currentCard) return;
    updateStoryCard(currentCard.id, {
      facts: editFacts,
      feelings: editFeelings,
      needs: editNeeds,
      openingLine: editOpeningLine,
    });
    setIsEditing(false);
  };

  const handleCopyToClipboard = () => {
    if (!currentCard) return;
    const textToCopy = `[KARTU CERITA SELA.AI - ${currentCard.title}]
Lawan Bicara: ${currentCard.targetPerson}
Tanggal: ${currentCard.date}

1. FAKTA SITUASI:
${currentCard.facts}

2. PERASAAN YANG DIRASAKAN:
${currentCard.feelings}

3. KEBUTUHAN SEBENARNYA:
${currentCard.needs}

4. KALIMAT PEMBUKA PERCAKAPAN:
"${currentCard.openingLine}"

(Dibuat secara aman di SELA.AI - Help-Seeking Navigator)`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  const handleDownloadTxt = () => {
    if (!currentCard) return;
    const content = `KARTU CERITA PRIBADI - SELA.AI
=====================================================
Judul        : ${currentCard.title}
Lawan Bicara : ${currentCard.targetPerson}
Tanggal      : ${currentCard.date}
=====================================================

[1] FAKTA SITUASI OBJEKTIF:
${currentCard.facts}

[2] PERASAAN YANG DIRASAKAN:
${currentCard.feelings}

[3] KEBUTUHAN SEBENARNYA:
${currentCard.needs}

[4] KALIMAT PEMBUKA SIAP PAKAI:
"${currentCard.openingLine}"

=====================================================
Prinsip SELA.AI: Ruang untuk dirimu. From Unspoken Problems to Prepared Conversations.
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kartu-cerita-${currentCard.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGoToPracticeTalk = (card: StoryCard) => {
    setActiveStoryCard(card);
    router.push("/dashboard");
  };

  const handleSaveFreeJournal = () => {
    if (!journalNote.trim()) return;
    addJournalEntry({
      prompt: "Refleksi Mandiri Bebas",
      content: journalNote.trim(),
    });
    setJournalNote("");
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2 animate-in fade-in duration-150">
      {/* Header with Aura Mascot */}
      <AuraModuleHeader
        productKey="kartu-cerita"
        eyebrow="Tahap 02 — Kartu Cerita"
        title="Kartu Cerita Pribadi"
        description="Cerita yang awalnya terasa rumit mulai tersusun menjadi lebih jelas bersama Aura."
        rightSlot={
          <div className="flex items-center gap-1.5 p-1 bg-[#E3EEFF] rounded-2xl border border-[#CCE1FF] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("story_cards")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5",
                activeTab === "story_cards"
                  ? "bg-[#2457A7] text-white shadow-sm"
                  : "text-[#17365D]/70 hover:text-[#17365D]"
              )}
            >
              <FileText className="w-3.5 h-3.5" />
              Kartu Cerita ({storyCards.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("free_journal")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5",
                activeTab === "free_journal"
                  ? "bg-[#2457A7] text-white shadow-sm"
                  : "text-[#17365D]/70 hover:text-[#17365D]"
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Catatan Bebas ({journalEntries.length})
            </button>
          </div>
        }
      />

      {/* TAB 1: STORY CARDS */}
      {activeTab === "story_cards" && (
        <div className="space-y-6">
          {/* Card Selector Row & Create Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {storyCards.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectCard(c)}
                  className={cn(
                    "px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap border transition-all",
                    currentCard?.id === c.id
                      ? "bg-[#2457A7] text-white border-[#2457A7] shadow-sm"
                      : "bg-[#F7FAFF] text-[#17365D] border-[#CCE1FF] hover:border-[#2457A7]/50"
                  )}
                >
                  {c.title}
                </button>
              ))}
            </div>

            <Link
              href="/safe-story"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white border border-[#2457A7] text-[#2457A7] hover:bg-[#EBF3FF] text-xs font-semibold shadow-sm shrink-0 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              Buat Cerita Baru di Guided Story
            </Link>
          </div>

          {currentCard ? (
            <div className="bg-[#F7FAFF] p-6 sm:p-8 rounded-3xl border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] space-y-6">
              {/* Card Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#CCE1FF]/70 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF3FF] text-[#2457A7]">
                      Lawan Bicara: {currentCard.targetPerson}
                    </span>
                    <span className="text-xs text-[#17365D]/60">{currentCard.date}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#17365D] mt-1.5">
                    {currentCard.title}
                  </h2>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (isEditing) handleSaveEdit();
                      else setIsEditing(true);
                    }}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[#CCE1FF] bg-white text-xs font-semibold text-[#17365D] hover:bg-[#EBF3FF] flex items-center gap-1.5 shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#2457A7]" />
                    <span>{isEditing ? "Simpan Perubahan" : "Edit Poin"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyToClipboard}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[#CCE1FF] bg-white text-xs font-semibold text-[#17365D] hover:bg-[#EBF3FF] flex items-center gap-1.5 shadow-sm"
                  >
                    {copiedNotice ? <Check className="w-3.5 h-3.5 text-[#1F7A65]" /> : <Copy className="w-3.5 h-3.5 text-[#2457A7]" />}
                    <span>{copiedNotice ? "Tersalin!" : "Salin"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[#CCE1FF] bg-white text-xs font-semibold text-[#17365D] hover:bg-[#EBF3FF] flex items-center gap-1.5 shadow-sm"
                    title="Unduh file .TXT"
                  >
                    <Download className="w-3.5 h-3.5 text-[#2457A7]" />
                    <span className="hidden sm:inline">Unduh .TXT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Hapus kartu cerita ini dari perangkatmu?")) {
                        deleteStoryCard(currentCard.id);
                      }
                    }}
                    className="p-2 rounded-xl border border-[#CCE1FF] bg-white text-[#B42332] hover:bg-[#FFEBEB] shadow-sm"
                    title="Hapus Kartu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Aura Merangkum Companion Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAFDFE] via-[#F4F8FF] to-[#E8F1FC] border border-[#BFD8F5] shadow-sm flex items-center gap-4 animate-in fade-in">
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 shrink-0">
                  <img
                    src="/images/aura/aura-merangkum-kartu.png"
                    alt="Aura memegang kartu cerita 4 pilar"
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono-num text-[10px] font-semibold text-[#1E56A0] px-2 py-0.5 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
                      Aura Merangkum
                    </span>
                    <span className="text-xs font-semibold text-[#102542]">
                      4 Pilar Komunikasi
                    </span>
                  </div>
                  <p className="text-xs text-[#35527A] leading-relaxed">
                    Cerita yang awalnya terasa rumit kini tersusun rapi: fakta situasi objektif, perasaanmu, kebutuhan nyata, dan kalimat pembuka siap pakai saat kamu bicara.
                  </p>
                </div>
              </div>

              {/* 4 Quadrants of the Story Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Quadrant 1: Facts */}
                <div className="p-5 rounded-2xl bg-white border border-[#CCE1FF] shadow-inner space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2457A7]">
                    <Layers className="w-4 h-4 text-[#2457A7]" />
                    1. Fakta Situasi Objektif
                  </div>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={editFacts}
                      onChange={(e) => setEditFacts(e.target.value)}
                      className="w-full text-xs text-[#17365D] p-2 border border-[#CCE1FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-[#17365D]/90 leading-relaxed">
                      {currentCard.facts}
                    </p>
                  )}
                </div>

                {/* Quadrant 2: Feelings */}
                <div className="p-5 rounded-2xl bg-white border border-[#CCE1FF] shadow-inner space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2457A7]">
                    <Heart className="w-4 h-4 text-[#2457A7]" />
                    2. Emosi yang Dirasakan
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editFeelings}
                      onChange={(e) => setEditFeelings(e.target.value)}
                      className="w-full text-xs text-[#17365D] p-2 border border-[#CCE1FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-[#17365D]/90 leading-relaxed">
                      {currentCard.feelings}
                    </p>
                  )}
                </div>

                {/* Quadrant 3: Needs */}
                <div className="p-5 rounded-2xl bg-white border border-[#CCE1FF] shadow-inner space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2457A7]">
                    <HelpCircle className="w-4 h-4 text-[#2457A7]" />
                    3. Kebutuhan Sebenarnya
                  </div>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={editNeeds}
                      onChange={(e) => setEditNeeds(e.target.value)}
                      className="w-full text-xs text-[#17365D] p-2 border border-[#CCE1FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-[#17365D]/90 leading-relaxed">
                      {currentCard.needs}
                    </p>
                  )}
                </div>

                {/* Quadrant 4: Opening Line */}
                <div className="p-5 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] shadow-inner space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2457A7]">
                    <MessageSquare className="w-4 h-4 text-[#2457A7]" />
                    4. Kalimat Pembuka Siap Pakai
                  </div>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={editOpeningLine}
                      onChange={(e) => setEditOpeningLine(e.target.value)}
                      className="w-full text-xs text-[#17365D] p-2 border border-[#CCE1FF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-[#17365D] font-medium italic leading-relaxed">
                      &ldquo;{currentCard.openingLine}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Transition Banner to Pilar 3 (Practice Talk) */}
              <div className="pt-4 border-t border-[#CCE1FF]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#E3EEFF]/50 p-4 rounded-2xl border border-[#CCE1FF]">
                <div className="text-xs text-[#17365D]/85">
                  <strong className="block text-[#17365D] font-bold">
                    Siap Menguji Kata-katamu Sebelum Obrolan Nyata?
                  </strong>
                  Gunakan kartu ini sebagai contekan dalam simulasi latihan percakapan interaktif (Practice Talk).
                </div>

                <button
                  type="button"
                  onClick={() => handleGoToPracticeTalk(currentCard)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2457A7] text-white text-xs sm:text-sm font-semibold hover:bg-[#1C4477] transition-all shadow-md shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  Latih di Practice Talk
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-[#F7FAFF] rounded-3xl border border-[#CCE1FF] space-y-3">
              <FileText className="w-10 h-10 text-[#2457A7]/50 mx-auto" />
              <h3 className="text-base font-bold text-[#17365D]">Belum Ada Kartu Cerita</h3>
              <p className="text-xs text-[#17365D]/70 max-w-sm mx-auto">
                Mulai dari Guided Story untuk merapikan situasi yang mengganjal ke dalam 4 dimensi.
              </p>
              <Link
                href="/safe-story"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#2457A7] text-white text-xs font-semibold shadow-md"
              >
                Mulai Urai Cerita Sekarang
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FREE JOURNAL NOTES */}
      {activeTab === "free_journal" && (
        <div className="space-y-6">
          <div className="bg-[#F7FAFF] p-6 sm:p-8 rounded-3xl border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                Catatan Bebas Lokal
              </span>
              <h2 className="text-xl font-bold text-[#17365D] mt-1">
                Tumpahkan Apa yang Ada di Kepala
              </h2>
              <p className="text-xs text-[#17365D]/75 mt-0.5">
                Catatan ini hanya disimpan di perambanmu dan tidak dikirimkan ke mana pun.
              </p>
            </div>

            <textarea
              rows={5}
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder="Tuliskan unek-unek, refleksi bebas, atau apa pun yang ingin kamu catat hari ini..."
              className="w-full rounded-2xl bg-white border border-[#CCE1FF] p-4 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7] leading-relaxed shadow-inner"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#1F7A65] font-semibold">
                {journalSaved && "✓ Catatan berhasil disimpan di sesi ini!"}
              </span>
              <button
                type="button"
                onClick={handleSaveFreeJournal}
                disabled={!journalNote.trim()}
                className="px-6 py-2.5 rounded-full bg-[#2457A7] text-white text-xs font-semibold hover:bg-[#1C4477] transition-all shadow-md disabled:opacity-50"
              >
                Simpan Catatan
              </button>
            </div>
          </div>

          {/* List of saved journal notes */}
          {journalEntries.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2457A7]">
                Riwayat Catatan Sesi Ini ({journalEntries.length})
              </h3>
              <div className="space-y-2.5">
                {journalEntries.map((j) => (
                  <div
                    key={j.id}
                    className="p-4 rounded-2xl bg-white border border-[#CCE1FF] shadow-sm flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#17365D]/50 font-semibold">{j.date}</span>
                      <p className="text-[#17365D] leading-relaxed whitespace-pre-wrap">{j.content}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteJournalEntry(j.id)}
                      className="text-[#B42332] hover:text-[#8e1b27] p-1 shrink-0"
                      title="Hapus catatan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
