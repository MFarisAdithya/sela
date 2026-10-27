"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Send,
  Sparkles,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  FileText,
  Edit3,
  BookmarkCheck,
  MessageSquare,
  ShieldCheck,
  Home,
  Check,
} from "lucide-react";
import { AuraAvatar, AuraLoadingIndicator } from "@/components/ui/AuraMascot";
import { useApp, StoryCard } from "@/context/AppContext";
import { RetrievedSource } from "@/types/knowledge";
import { SourceCitation } from "@/components/chat/SourceCitation";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp: string;
  sources?: RetrievedSource[];
  isCrisis?: boolean;
}

interface StructuredStorySummary {
  facts: string;
  feelings: string;
  nextSteps: string;
}

const STARTER_SUGGESTIONS = [
  "Aku lagi banyak pikiran.",
  "Aku bingung harus mulai dari mana.",
  "Aku ingin cerita tentang sesuatu.",
];

export default function SafeStoryPage() {
  const router = useRouter();
  const { userName, addStoryCard, setActiveStoryCard } = useApp();

  // Mode: "chat" or "card"
  const [viewMode, setViewMode] = useState<"chat" | "card">("chat");

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: "Hai, kamu lagi ingin cerita tentang apa?",
      timestamp: "Baru saja",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Structured Story Card State
  const [summary, setSummary] = useState<StructuredStorySummary>({
    facts: "",
    feelings: "",
    nextSteps: "",
  });
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [savedCardId, setSavedCardId] = useState<string | null>(null);
  const [showNextSteps, setShowNextSteps] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isLoading]);

  // Execute sending a message to Sela via /api/chat
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsgId = "user-" + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          userAlias: userName,
          mode: "guided_story",
        }),
      });

      const data = await res.json();
      const aiMsgId = "ai-" + Date.now();

      if (data.status === "crisis_detected") {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "system",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            isCrisis: true,
            sources: data.sources,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "ai",
            text: data.reply || "Sela mendengarmu. Ceritakan apa yang ada di pikiranmu pelan-pelan ya.",
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            sources: data.sources,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "system",
          text: "Koneksi ke Sela terputus sementara. Kamu tetap bisa melanjutkan ceritamu atau merapikan yang sudah ada.",
          timestamp: "Error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate structured story card summary from conversation
  const handleGenerateSummary = async () => {
    setIsSummarizing(true);
    setViewMode("card");
    setShowNextSteps(false);

    const userTexts = messages
      .filter((m) => m.sender === "user")
      .map((m) => m.text)
      .join("\n");

    const fullConversationText = messages
      .map((m) => `${m.sender === "user" ? userName : "Sela"}: ${m.text}`)
      .join("\n");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: fullConversationText.slice(-1000) || userTexts || "Cerita refleksi bersama Sela",
          userAlias: userName,
          mode: "summarize_story",
        }),
      });

      const data = await res.json();
      if (data.summary) {
        setSummary({
          facts: data.summary.facts || userTexts.slice(0, 200) || "Fakta situasi yang sedang dihadapi.",
          feelings: data.summary.feelings || "Merasa banyak pikiran dan butuh ruang tenang untuk berpikir.",
          nextSteps: data.summary.nextSteps || "Menyiapkan kata-kata dengan tenang dan istirahat sejenak.",
        });
      } else {
        // Fallback extraction
        setSummary({
          facts: userTexts.slice(0, 200) || "Fakta situasi yang sedang dihadapi.",
          feelings: "Merasa banyak pikiran, cemas, dan butuh ruang tenang untuk merapikannya.",
          nextSteps: "Menyiapkan kata-kata dengan tenang sebelum melanjutkan.",
        });
      }
    } catch {
      setSummary({
        facts: userTexts.slice(0, 200) || "Fakta situasi yang sedang dihadapi.",
        feelings: "Merasa banyak pikiran, cemas, dan butuh ruang tenang untuk merapikannya.",
        nextSteps: "Menyiapkan kata-kata dengan tenang sebelum melanjutkan.",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  // Save card into AppContext storyCards
  const handleSaveCard = () => {
    const newCard = addStoryCard({
      title: `Cerita bersama Sela (${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short" })})`,
      facts: summary.facts.trim() || "Fakta situasi belum dirumuskan.",
      feelings: summary.feelings.trim() || "Merasa cemas dan butuh ruang tenang.",
      needs: summary.nextSteps.trim() || "Didengarkan dan dipahami dengan tenang.",
      openingLine: `Boleh luangkan waktu sebentar? Ada hal yang ingin aku bicarakan pelan-pelan.`,
      targetPerson: "Teman Sebaya",
    });

    setActiveStoryCard(newCard);
    setSavedCardId(newCard.id);
  };

  // Reset entire session
  const handleResetSession = () => {
    if (confirm("Mulai ulang sesi cerita dari awal?")) {
      setViewMode("chat");
      setSavedCardId(null);
      setShowNextSteps(false);
      setIsEditingCard(false);
      setMessages([
        {
          id: "msg-welcome-" + Date.now(),
          sender: "ai",
          text: "Hai, kamu lagi ingin cerita tentang apa?",
          timestamp: "Baru saja",
        },
      ]);
    }
  };

  const userMessagesCount = messages.filter((m) => m.sender === "user").length;

  return (
    <div className="max-w-2xl mx-auto py-3 space-y-6 animate-in fade-in duration-150 text-[#102542]">
      {/* 1. Header Sederhana */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#DCEAFB]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
            <h1 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542]">
              Ngobrol sama Sela
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#47668D]">
            Kamu nggak harus punya semua jawabannya sekarang. Cerita aja pelan-pelan.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetSession}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[#CCE1FF] bg-white text-xs font-semibold text-[#1E56A0] hover:bg-[#F4F8FF] transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
          title="Mulai ulang sesi"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#1E56A0]" />
          <span className="hidden sm:inline">Mulai ulang</span>
        </button>
      </div>

      {/* 2. MODE 1: CHAT CONVERSATION */}
      {viewMode === "chat" && (
        <div className="space-y-4">
          {/* Main Chat Conversation Container */}
          <div className="bg-[#FAFDFE] p-4 sm:p-6 rounded-3xl border border-[#DCEAFB] shadow-[0_8px_30px_rgba(37,99,235,0.06)] min-h-[420px] flex flex-col justify-between space-y-4">
            {/* Messages List */}
            <div className="space-y-4 overflow-y-auto pr-1">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                const isSystem = msg.sender === "system";

                if (isSystem) {
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 animate-in fade-in",
                        msg.isCrisis
                          ? "bg-[#FFEBEB] border-[#F5A9A9] text-[#B42332]"
                          : "bg-white border-[#CCE1FF] text-[#17365D]"
                      )}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        <ShieldAlert className="w-4 h-4 text-[#B42332]" />
                        <span>Pemberitahuan Keselamatan</span>
                      </div>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      {msg.isCrisis && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          <a
                            href="tel:119"
                            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#B42332] text-white font-semibold text-xs shadow-sm hover:bg-[#8e1b27]"
                          >
                            Hubungi 119 ext 8 (SEJIWA)
                          </a>
                          <Link
                            href="/support"
                            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white border border-[#F5A9A9] text-[#B42332] font-semibold text-xs hover:bg-[#FFEBEB]"
                          >
                            Cari Dukungan Nyata
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col animate-in fade-in duration-150",
                      isUser ? "items-end" : "items-start"
                    )}
                  >
                    {!isUser && (
                      <div className="flex items-center gap-2 mb-1.5 px-1">
                        <AuraAvatar size="xs" />
                        <span className="text-[11px] font-bold text-[#1E56A0]">
                          Sela
                        </span>
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[88%] sm:max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed",
                        isUser
                          ? "bg-[#2457A7] text-white shadow-sm rounded-br-none"
                          : "bg-white border border-[#CCE1FF] shadow-sm text-[#102542] rounded-bl-none"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-[#CCE1FF]/50">
                          <SourceCitation sources={msg.sources} />
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-[#516B8C] mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {isLoading && (
                <AuraLoadingIndicator
                  message="Sebentar ya, Sela sedang menyiapkan ini..."
                  subMessage="Mendengarkan ceritamu dengan tenang."
                  className="w-fit max-w-sm"
                />
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action: "Bantu rapikan ceritaku" (visible after at least 1 user message) */}
            {userMessagesCount >= 1 && (
              <div className="pt-2 border-t border-[#DCEAFB]/80 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
                <span className="text-[11px] text-[#47668D]">
                  Sudah merasa cukup bercerita?
                </span>
                <button
                  type="button"
                  onClick={handleGenerateSummary}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1E56A0] hover:bg-[#133A6E] text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bantu rapikan ceritaku</span>
                </button>
              </div>
            )}
          </div>

          {/* Kotak Input Chat & Tombol Kirim */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tulis ceritamu di sini..."
                maxLength={1000}
                disabled={isLoading}
                className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-2xl bg-white shadow-inner text-[#102542] border border-[#BFD8F5] focus:outline-none focus:ring-2 focus:ring-[#2563EB] placeholder:text-[#516B8C]/50 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="shrink-0 px-5 py-3.5 min-h-[48px] rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all disabled:opacity-40 shadow-sm flex items-center justify-center active:scale-95 cursor-pointer"
              aria-label="Kirim cerita"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* 3 Saran Singkat di Bawah Kotak Chat (Saat Belum Mulai Mengetik) */}
          {userMessagesCount === 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-[#516B8C] block">
                Atau pilih satu hal untuk memulai:
              </span>
              <div className="flex flex-wrap gap-2">
                {STARTER_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(suggestion)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#BFD8F5] hover:border-[#2563EB] hover:bg-[#F0F7FF] text-xs text-[#2B4566] hover:text-[#2563EB] font-medium transition-all shadow-xs text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. MODE 2: KARTU CERITA PRIBADI & PILIHAN BERIKUTNYA */}
      {viewMode === "card" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Card Loading State */}
          {isSummarizing ? (
            <div className="bg-white p-8 rounded-3xl border border-[#DCEAFB] shadow-sm text-center py-16 space-y-4">
              <AuraLoadingIndicator
                message="Sebentar ya, Sela sedang merapikan ceritamu..."
                subMessage="Menyusun fakta, perasaan, dan hal yang ingin kamu lakukan berikutnya."
                className="mx-auto"
              />
            </div>
          ) : (
            <>
              {/* Top Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#EBF3FF] border border-[#BFD8F5] p-4 sm:p-5 rounded-2xl">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono-num text-[10px] font-bold uppercase tracking-wider text-[#1E56A0] px-2.5 py-0.5 rounded-full bg-[#DCEAFB]">
                      Kartu Ceritamu
                    </span>
                    {savedCardId && (
                      <span className="text-[11px] font-semibold text-[#1F7A65] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Tersimpan
                      </span>
                    )}
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#102542]">
                    Rangkuman Cerita Pribadi
                  </h2>
                  <p className="text-xs text-[#35527A] mt-0.5">
                    Periksa ceritamu di bawah ini. Kamu boleh mengeditnya kapan saja agar benar-benar pas.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setViewMode("chat")}
                  className="text-xs font-semibold text-[#2563EB] hover:underline self-start sm:self-auto shrink-0"
                >
                  ← Kembali ngobrol
                </button>
              </div>

              {/* Structured Card Body with 3 Sections */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#BFD8F5] shadow-[0_12px_36px_rgba(30,86,160,0.08)] space-y-6">
                {/* 1. Apa yang terjadi */}
                <div className="space-y-1.5 pb-5 border-b border-[#DCEAFB]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E56A0] block">
                    1. Apa yang terjadi
                  </span>
                  {isEditingCard ? (
                    <textarea
                      rows={3}
                      value={summary.facts}
                      onChange={(e) => setSummary({ ...summary, facts: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-[#F7FAFF] border border-[#BFD8F5] text-xs sm:text-sm text-[#102542] focus:outline-none focus:ring-2 focus:ring-[#2563EB] leading-relaxed"
                      placeholder="Ceritakan kejadian atau fakta yang sedang dihadapi..."
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-[#102542] leading-relaxed whitespace-pre-wrap">
                      {summary.facts || "Belum ada catatan fakta."}
                    </p>
                  )}
                </div>

                {/* 2. Apa yang mungkin aku rasakan */}
                <div className="space-y-1.5 pb-5 border-b border-[#DCEAFB]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E56A0] block">
                      2. Apa yang mungkin aku rasakan
                    </span>
                    <span className="text-[10px] text-[#516B8C] italic">
                      (Boleh kamu ubah sesuai perasaan aslimu)
                    </span>
                  </div>
                  {isEditingCard ? (
                    <textarea
                      rows={2}
                      value={summary.feelings}
                      onChange={(e) => setSummary({ ...summary, feelings: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-[#F7FAFF] border border-[#BFD8F5] text-xs sm:text-sm text-[#102542] focus:outline-none focus:ring-2 focus:ring-[#2563EB] leading-relaxed"
                      placeholder="Perasaan apa yang sedang terasa..."
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-[#102542] leading-relaxed whitespace-pre-wrap">
                      {summary.feelings || "Belum ada catatan emosi."}
                    </p>
                  )}
                </div>

                {/* 3. Apa yang ingin aku lakukan berikutnya */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E56A0] block">
                    3. Apa yang ingin aku lakukan berikutnya
                  </span>
                  {isEditingCard ? (
                    <textarea
                      rows={2}
                      value={summary.nextSteps}
                      onChange={(e) => setSummary({ ...summary, nextSteps: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-[#F7FAFF] border border-[#BFD8F5] text-xs sm:text-sm text-[#102542] focus:outline-none focus:ring-2 focus:ring-[#2563EB] leading-relaxed"
                      placeholder="Langkah kecil atau hal yang ingin kamu lakukan..."
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-[#102542] leading-relaxed whitespace-pre-wrap">
                      {summary.nextSteps || "Belum ada langkah berikutnya."}
                    </p>
                  )}
                </div>

                {/* Action Buttons for Card */}
                <div className="pt-4 border-t border-[#DCEAFB] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingCard(!isEditingCard)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#BFD8F5] bg-white text-xs font-semibold text-[#1E56A0] hover:bg-[#F0F7FF] transition-all shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isEditingCard ? "Selesai edit" : "Edit cerita"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveCard}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs",
                        savedCardId
                          ? "bg-[#E6F4EA] text-[#1F7A65] border border-[#B7E1CD]"
                          : "bg-white border border-[#BFD8F5] text-[#1E56A0] hover:bg-[#F0F7FF]"
                      )}
                    >
                      {savedCardId ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Kartu tersimpan</span>
                        </>
                      ) : (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5" />
                          <span>Simpan kartu</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowNextSteps(true)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95"
                  >
                    <span>Lanjut, yuk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 4. PILIHAN BERIKUTNYA (3 Pilihan Visual Nyata) */}
              {showNextSteps && (
                <div className="space-y-3 pt-2 animate-in fade-in duration-200">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-[#102542]">
                      Pilih Langkah Berikutnya
                    </h3>
                    <p className="text-xs text-[#47668D]">
                      Kamu bebas memilih mau latihan bicara, mencari teman mendengar, atau istirahat dulu.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Option 1: Latihan Ngobrol -> /dashboard */}
                    <Link
                      href="/dashboard"
                      className="p-5 rounded-2xl bg-white border border-[#BFD8F5] hover:border-[#2563EB] hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-xl bg-[#EBF3FF] text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-[#102542] group-hover:text-[#2563EB] transition-colors">
                          Latihan Ngobrol
                        </h4>
                        <p className="text-xs text-[#516B8C] leading-snug">
                          Latih kalimat pembukamu dengan lawan bicara simulasi sebelum bicara sungguhan.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-[#2563EB] inline-flex items-center gap-1 pt-1">
                        Mulai latihan →
                      </span>
                    </Link>

                    {/* Option 2: Cari Dukungan -> /support */}
                    <Link
                      href="/support"
                      className="p-5 rounded-2xl bg-white border border-[#BFD8F5] hover:border-[#0F6E56] hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-xl bg-[#E6F4EA] text-[#0F6E56] flex items-center justify-center group-hover:bg-[#0F6E56] group-hover:text-white transition-colors">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-[#102542] group-hover:text-[#0F6E56] transition-colors">
                          Cari Dukungan
                        </h4>
                        <p className="text-xs text-[#516B8C] leading-snug">
                          Temukan teman mendengar atau bantuan manusia terpercaya dan resmi di dunia nyata.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-[#0F6E56] inline-flex items-center gap-1 pt-1">
                        Lihat dukungan →
                      </span>
                    </Link>

                    {/* Option 3: Selesai Dulu -> /app */}
                    <Link
                      href="/app"
                      className="p-5 rounded-2xl bg-white border border-[#BFD8F5] hover:border-[#1E56A0] hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-2">
                        <div className="w-9 h-9 rounded-xl bg-[#DCEAFB] text-[#1E56A0] flex items-center justify-center group-hover:bg-[#1E56A0] group-hover:text-white transition-colors">
                          <Home className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-[#102542] group-hover:text-[#1E56A0] transition-colors">
                          Selesai Dulu
                        </h4>
                        <p className="text-xs text-[#516B8C] leading-snug">
                          Istirahat sejenak tanpa beban. Kamu sudah melangkah dengan sangat baik hari ini.
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-[#1E56A0] inline-flex items-center gap-1 pt-1">
                        Kembali ke Beranda →
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
