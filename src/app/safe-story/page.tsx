"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  Sparkles,
  LifeBuoy,
  BookOpen,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  ExternalLink,
  Shield,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuModal } from "@/components/ui/NeuModal";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  citations?: Array<{
    title: string;
    source: string;
    status: string;
    summary: string;
  }>;
  isCrisis?: boolean;
}

const initialPrompts = [
  "Aku merasa cemas menghadapi ujian dan takut mengecewakan orang lain.",
  "Bagaimana cara menyampaikan batasan diri ke teman secara asertif?",
  "Akhir-akhir ini aku merasa sepi dan bingung menentukan arah setelah lulus.",
  "Terkadang sulit berbicara dengan keluarga saat ada hal yang mengganjal.",
];

export default function SafeStoryPage() {
  const { userName, isAiActive } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-0",
      sender: "ai",
      text: `Hai ${userName || "Alex"}! Aku di sini untuk mendengarkan apa pun yang sedang kamu rasakan hari ini dengan tenang dan tanpa menghakimi. Kamu memegang kendali penuh atas percakapan ini—ceritakan sesuai rasa nyamanmu.`,
      timestamp: "Baru saja",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [hasConfirmedTransmission, setHasConfirmedTransmission] = useState(false);
  const [pendingText, setPendingText] = useState("");
  const [highRiskAlert, setHighRiskAlert] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    // Check if user text has high-risk self-harm signals
    const highRiskKeywords = ["menyakiti diri", "bunuh diri", "ingin mati", "mengakhiri hidup", "self harm"];
    const isRisky = highRiskKeywords.some((kw) => text.toLowerCase().includes(kw));

    if (isRisky) {
      setHighRiskAlert(
        "Kami sangat peduli dengan keselamatanmu. Fathercare AI bukan layanan gawat darurat. Tolong segera hubungi orang dewasa terpercaya atau kontak darurat nasional di bawah ini."
      );
    } else {
      setHighRiskAlert(null);
    }

    // If AI is in ACTIVE mode and transmission not yet confirmed by user in this session, show consent dialog
    if (isAiActive && !hasConfirmedTransmission) {
      setPendingText(text);
      setShowConsentModal(true);
      return;
    }

    executeMessage(text, isRisky);
  };

  const executeMessage = async (text: string, isRisky: boolean) => {
    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      if (isRisky) {
        // High risk fallback response
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: "ai-" + Date.now(),
              sender: "ai",
              text: "Aku mendengar bahwa situasi saat ini terasa sangat berat bagimu. Keselamatan dan kesejahteraanmu adalah yang paling utama. Aku adalah asisten AI dengan keterbatasan dan tidak bisa memberikan pendampingan krisis. Mohon cari tempat aman sekarang dan hubungi konselor, guru BK, atau layanan Hotline Kemenkes 119 ext 8.",
              timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
              isCrisis: true,
            },
          ]);
          setIsLoading(false);
        }, 600);
        return;
      }

      // If active mode and we have API route
      if (isAiActive) {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });

        if (res.ok) {
          const data = await res.json();
          setMessages((prev) => [
            ...prev,
            {
              id: "ai-" + Date.now(),
              sender: "ai",
              text: data.reply,
              timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
              citations: data.citations,
            },
          ]);
          setIsLoading(false);
          return;
        }
      }

      // Demo Mode deterministic fallback simulation
      setTimeout(() => {
        let simulatedReply = "";
        let simulatedCitations = [
          {
            title: "Pengenalan Emosi & Regulasi Diri Remaja",
            source: "Modul Psikoedukasi Genre InnovAItion 2026",
            status: "Ditinjau oleh Ahli Konseling",
            summary: "Menamai emosi secara spesifik dan memvalidasi perasaan tanpa terburu-buru menghakimi diri sendiri.",
          },
        ];

        if (text.toLowerCase().includes("cemas") || text.toLowerCase().includes("takut")) {
          simulatedReply =
            "Rasa cemas saat menghadapi tantangan atau ekspektasi adalah respon alami tubuhmu. Mengetahui bahwa kamu sedang cemas adalah langkah awal yang sangat baik. Cobalah teknik pernapasan 4-7-8 sejenak: tarik napas 4 detik, tahan 7 detik, dan hembuskan perlahan 8 detik. Apa satu hal kecil yang ada di bawah kendalimu hari ini?";
        } else if (text.toLowerCase().includes("asertif") || text.toLowerCase().includes("teman")) {
          simulatedReply =
            "Menjaga batasan diri bukan berarti tidak peduli dengan orang lain. Kamu bisa menggunakan formula kalimat 'Saya merasa... ketika... karena... jadi saya ingin...'. Ini membantu temanmu memahami sudut pandangmu tanpa merasa diserang secara personal.";
          simulatedCitations = [
            {
              title: "Komunikasi Asertif untuk Remaja & Pemuda",
              source: "Panduan Life Skills ADUJAKNAS 2026",
              status: "Terverifikasi",
              summary: "Teknik menyampaikan kebutuhan diri secara jujur dan menghormati hak lawan bicara.",
            },
          ];
        } else {
          simulatedReply =
            "Terima kasih sudah mau berbagi hal ini denganku. Mengungkapkan isi pikiran lewat tulisan butuh keberanian. Dari apa yang kamu ceritakan, bagian mana yang saat ini terasa paling menguras energimu? Kamu boleh memilih untuk lanjut bercerita, mencatatnya di jurnal, atau sekadar beristirahat sejenak.";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: "ai-" + Date.now(),
            sender: "ai",
            text: simulatedReply,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            citations: simulatedCitations,
          },
        ]);
        setIsLoading(false);
      }, 800);
    } catch {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: "ai-" + Date.now(),
          sender: "ai",
          text: "Maaf, terjadi gangguan koneksi sementara. Sistem tetap dapat membantumu melalui modul Ruang Belajar atau kamu bisa bercerita kembali dalam beberapa saat.",
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "msg-0",
        sender: "ai",
        text: `Percakapan telah direset. Hai ${userName || "Alex"}, apa yang ingin kamu diskusikan atau ceritakan sekarang?`,
        timestamp: "Baru saja",
      },
    ]);
    setHighRiskAlert(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-4 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <NeuCard variant="raised-sm" className="p-4 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center shadow-neu-inset shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-brand-900 leading-none">
                Safe Story AI
              </h1>
              {isAiActive ? (
                <Badge variant="active" size="sm" dot>
                  AI Aktif
                </Badge>
              ) : (
                <Badge variant="demo" size="sm" dot>
                  Mode Demo
                </Badge>
              )}
            </div>
            <p className="text-[11px] text-text-muted mt-1">
              Ruang reflektif nonklinis &bull; RAG Basis Pengetahuan Terverifikasi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleResetChat}
            className="p-2 rounded-xl text-text-muted hover:text-brand-900 hover:bg-brand-50 transition-colors text-xs flex items-center gap-1.5"
            title="Reset riwayat percakapan sesi"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Sesi</span>
          </button>

          <Link href="/referrals">
            <NeuButton size="sm" variant="secondary" leftIcon={<LifeBuoy className="w-3.5 h-3.5 text-brand-600" />}>
              Pilihan Bantuan
            </NeuButton>
          </Link>
        </div>
      </NeuCard>

      {/* Safety Alert Banner (if high-risk detected) */}
      {highRiskAlert && (
        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-3 shadow-md animate-in slide-in-from-top-2">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-800">
                Pemberitahuan Keselamatan Mendesak
              </h2>
              <p className="text-xs mt-1 leading-relaxed">{highRiskAlert}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="tel:119"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-sm"
            >
              Telepon Hotline 119 Ext 8
            </a>
            <Link
              href="/referrals"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-rose-800 border border-rose-300 text-xs font-semibold hover:bg-rose-100/50"
            >
              Lihat Konselor & Layanan Bantuan &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Chat Messages Container */}
      <NeuCard variant="inset" className="p-4 sm:p-6 min-h-[420px] max-h-[560px] overflow-y-auto space-y-4 bg-surface-inset/60">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-1.5`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed transition-all ${
                msg.sender === "user"
                  ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-md rounded-tr-sm"
                  : msg.isCrisis
                  ? "bg-rose-100 text-rose-950 border border-rose-300 shadow-sm rounded-tl-sm font-medium"
                  : "bg-surface shadow-neu-raised-sm border border-border-subtle/80 text-text-main rounded-tl-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* RAG Citations Accordion */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-border-subtle/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-900">
                    <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                    <span>Sumber Pengetahuan RAG:</span>
                  </div>
                  {msg.citations.map((cite, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-surface-inset shadow-neu-inset text-[11px] space-y-1 border border-border-subtle/60"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-brand-900">{cite.title}</span>
                        <Badge variant="verified" size="sm">
                          {cite.status}
                        </Badge>
                      </div>
                      <p className="text-text-muted">{cite.summary}</p>
                      <span className="text-[10px] text-brand-700 italic block">
                        Ref: {cite.source}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span className="text-[10px] text-text-subtle px-1">
              {msg.sender === "user" ? "Kamu" : "Fathercare AI"} &bull; {msg.timestamp}
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-text-muted p-2 animate-pulse">
            <Sparkles className="w-4 h-4 text-brand-600 animate-spin" />
            <span>Fathercare AI sedang mencari materi dan menyusun respon empatik...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </NeuCard>

      {/* Suggested Starter Prompts */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-text-muted px-1">
          Inspirasi topik percakapan:
        </span>
        <div className="flex flex-wrap gap-2">
          {initialPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-surface shadow-neu-raised-sm hover:shadow-neu-raised border border-border-subtle/80 text-text-main hover:text-brand-900 transition-all disabled:opacity-50"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="space-y-2"
      >
        <div className="flex items-end gap-2 p-2 rounded-2xl bg-surface shadow-neu-raised border border-border-subtle">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(inputText);
              }
            }}
            placeholder="Tulis apa yang kamu rasakan... (Tekan Enter untuk kirim, Shift+Enter untuk baris baru)"
            rows={2}
            maxLength={1000}
            className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent border-none focus:outline-none text-text-main placeholder:text-text-subtle resize-none leading-relaxed"
          />

          <NeuButton
            type="submit"
            size="md"
            variant="primary"
            disabled={!inputText.trim() || isLoading}
            isLoading={isLoading}
            className="shrink-0 h-11 w-11 !p-0 rounded-xl"
            aria-label="Kirim Pesan"
          >
            <Send className="w-4 h-4" />
          </NeuButton>
        </div>

        <div className="flex items-center justify-between px-2 text-[10px] text-text-subtle">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-brand-600" />
            Percakapan privat di browser Anda &bull; Tidak disimpan di database publik
          </span>
          <span>{inputText.length}/1000 karakter</span>
        </div>
      </form>

      {/* External AI Transmission Consent Modal */}
      <NeuModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        title="Konfirmasi Pengiriman Teks ke AI Eksternal"
        description="Persetujuan privasi sebelum teks dikirim ke model pemrosesan bahasa alami eksternal."
        footer={
          <>
            <NeuButton
              variant="secondary"
              size="sm"
              onClick={() => setShowConsentModal(false)}
            >
              Batal
            </NeuButton>
            <NeuButton
              variant="primary"
              size="sm"
              onClick={() => {
                setHasConfirmedTransmission(true);
                setShowConsentModal(false);
                executeMessage(pendingText, false);
              }}
            >
              Setuju & Kirim
            </NeuButton>
          </>
        }
      >
        <div className="space-y-3 text-xs leading-relaxed text-text-muted">
          <p>
            Anda sedang mengaktifkan <strong>Mode AI Aktif</strong>. Pesan Anda akan dikirim ke server backend kami untuk dicocokkan dengan basis pengetahuan (RAG) dan diteruskan ke OpenAI API untuk menghasilkan jawaban kontekstual.
          </p>
          <div className="p-3 rounded-xl bg-surface-inset shadow-neu-inset space-y-1 text-text-main">
            <div className="flex items-center gap-1.5 font-semibold text-brand-900 text-xs">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Perlindungan Privasi Otomatis:</span>
            </div>
            <ul className="list-disc list-inside text-[11px] text-text-muted space-y-0.5">
              <li>Penyaringan otomatis informasi identitas (PII: nomor HP, email, nama lengkap).</li>
              <li>Pesan tidak digunakan untuk melatih model umum publik.</li>
              <li>Riwayat tidak disimpan di database permanen.</li>
            </ul>
          </div>
        </div>
      </NeuModal>
    </div>
  );
}
