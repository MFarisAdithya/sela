"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Send,
  Sparkles,
  ShieldAlert,
  AlertCircle,
  RotateCcw,
  ExternalLink,
  KeyRound,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuModal } from "@/components/ui/NeuModal";
import { Badge } from "@/components/ui/Badge";
import { SourceCitation } from "@/components/chat/SourceCitation";
import { useApp } from "@/context/AppContext";
import { RetrievedSource } from "@/types/knowledge";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp: string;
  sources?: RetrievedSource[];
  isCrisis?: boolean;
  isAiGenerated?: boolean;
  modelUsed?: string;
  statusBadge?: string;
}

const starterPrompts = [
  "Bagaimana cara menyampaikan rasa kecewa kepada keluarga secara baik?",
  "Apa langkah pertama untuk melatih komunikasi asertif?",
  "Aku merasa kurang percaya diri saat berbicara di depan orang lain.",
  "Aku merasa sangat lelah dan kewalahan hari ini.",
];

export default function SafeStoryPage() {
  const { userName, isAiConfigured, checkAiConfiguration } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: `Halo ${userName}. Ini ruang cerita Safe Story AI. Kamu bisa menuliskan apa yang sedang kamu rasakan atau tanyakan seputar pengelolaan emosi, komunikasi, dan kesiapan diri. Jawaban didasarkan pada materi terverifikasi.`,
      timestamp: "Baru saja",
      isAiGenerated: false,
      statusBadge: "Panduan Awal",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAiConfiguration();
  }, [checkAiConfiguration]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const executeSend = async (messageText: string) => {
    const userMsgId = "user-" + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: messageText,
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
          message: messageText,
          userAlias: userName,
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
            isAiGenerated: false,
            statusBadge: "Protokol Keselamatan",
          },
        ]);
      } else if (data.status === "api_unconfigured") {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "ai",
            text: `${data.reply}\n\n${data.ragContext ? `"${data.ragContext}"` : "Tidak ada materi terverifikasi yang cocok untuk topik ini."}`,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            sources: data.sources,
            isAiGenerated: false,
            statusBadge: "RAG Terverifikasi",
          },
        ]);
      } else if (data.status === "api_error") {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "ai",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            sources: data.sources,
            isAiGenerated: false,
            statusBadge: "Kendala API Cloud",
          },
        ]);
      } else {
        // Success: Live AI response
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "ai",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            sources: data.sources,
            isAiGenerated: true,
            modelUsed: data.modelUsed,
            statusBadge: data.hasGroundedSources
              ? `${data.modelUsed} • Rujukan Terverifikasi`
              : `${data.modelUsed} • Refleksi Empatik`,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "system",
          text: "Tidak dapat terhubung ke server backend. Periksa koneksi jaringan atau server lokal.",
          timestamp: "Error",
          isAiGenerated: false,
          statusBadge: "Koneksi Terputus",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    // Check if first time sending in session - show consent
    const hasAlreadyConsented = sessionStorage.getItem("fathercare_chat_consent") === "true";
    if (!hasAlreadyConsented) {
      setPendingMessage(text);
      setIsConsentModalOpen(true);
      return;
    }

    executeSend(text);
  };

  const handleConfirmConsent = () => {
    sessionStorage.setItem("fathercare_chat_consent", "true");
    setIsConsentModalOpen(false);
    if (pendingMessage) {
      executeSend(pendingMessage);
      setPendingMessage("");
    }
  };

  const handleResetChat = () => {
    if (confirm("Bersihkan seluruh percakapan di sesi ini?")) {
      setMessages([
        {
          id: "msg-init-reset",
          sender: "ai",
          text: `Halo ${userName}. Percakapan telah dibersihkan. Kamu bisa mulai bercerita kembali.`,
          timestamp: "Baru saja",
          statusBadge: "Sesi Baru",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-3xl mx-auto space-y-3">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between border-b border-border-subtle/80 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-brand-900">Safe Story AI</h1>
          {isAiConfigured ? (
            <Badge variant="active" dot size="sm">
              AI Aktif
            </Badge>
          ) : (
            <Badge variant="info" dot size="sm">
              RAG Lokal
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <NeuButton
            variant="ghost"
            size="sm"
            onClick={handleResetChat}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Mulai Ulang
          </NeuButton>
        </div>
      </div>

      {/* Safety & Non-Clinical Disclaimer Banner */}
      <div className="p-3 rounded-xl bg-surface-inset border border-border-subtle/80 flex items-start gap-2.5 text-xs text-text-muted shrink-0">
        <AlertCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Ruang Nonklinis:</strong> Asisten ini membantu refleksi awal dan edukasi terverifikasi. AI tidak membuat diagnosis medis dan tidak menggantikan konseling psikolog.
        </p>
      </div>

      {/* Chat Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          const isSystem = msg.sender === "system";

          if (isSystem) {
            return (
              <div
                key={msg.id}
                className={cn(
                  "p-4 rounded-2xl border text-xs leading-relaxed space-y-2 animate-in fade-in",
                  msg.isCrisis
                    ? "bg-rose-50 border-rose-300 text-rose-950"
                    : "bg-surface-inset border-border-subtle text-text-main"
                )}
              >
                <div className="flex items-center gap-1.5 font-bold text-rose-800">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>{msg.statusBadge || "Pemberitahuan Sistem"}</span>
                </div>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.isCrisis && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    <a
                      href="tel:119"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 text-white font-semibold text-xs shadow-sm hover:bg-rose-700"
                    >
                      Hubungi 119 ext 8 (SEJIWA)
                    </a>
                    <Link
                      href="/referrals"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-rose-300 text-rose-800 font-semibold text-xs hover:bg-rose-50"
                    >
                      Lihat Rujukan Pendamping
                    </Link>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={cn("flex flex-col animate-in fade-in duration-150", isUser ? "items-end" : "items-start")}
            >
              <div
                className={cn(
                  "max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed",
                  isUser
                    ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-neu-raised-sm rounded-br-none"
                    : "bg-surface border border-border-subtle shadow-neu-raised-sm text-text-main rounded-bl-none"
                )}
              >
                {!isUser && msg.statusBadge && (
                  <div className="mb-2">
                    <Badge variant={msg.isAiGenerated ? "active" : "info"} size="sm">
                      {msg.statusBadge}
                    </Badge>
                  </div>
                )}

                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Grounded RAG Source Citations */}
                {msg.sources && msg.sources.length > 0 && (
                  <SourceCitation sources={msg.sources} />
                )}
              </div>

              <span className="text-[10px] text-text-muted mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-text-muted p-3 bg-surface rounded-2xl border border-border-subtle shadow-neu-raised-sm w-fit animate-pulse">
            <Sparkles className="w-4 h-4 text-brand-600 animate-spin" />
            <span>Memproses pencarian materi & generasi respons...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts */}
      {messages.length <= 1 && (
        <div className="space-y-1.5 shrink-0">
          <span className="text-[11px] font-semibold text-text-muted">Pilih contoh topik:</span>
          <div className="flex flex-wrap gap-2">
            {starterPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 rounded-xl bg-surface text-xs text-brand-900 border border-border-subtle shadow-neu-raised-sm hover:border-brand-300 text-left transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="shrink-0 space-y-1.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tulis apa yang sedang kamu rasakan..."
              maxLength={1000}
              disabled={isLoading}
              className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-surface-inset shadow-neu-inset text-text-main border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-text-subtle"
            />
            {inputValue.length > 700 && (
              <span className="absolute right-3 top-3.5 text-[10px] text-text-muted">
                {inputValue.length}/1000
              </span>
            )}
          </div>
          <NeuButton
            type="submit"
            variant="primary"
            disabled={!inputValue.trim() || isLoading}
            isLoading={isLoading}
            className="shrink-0 px-4 min-h-[44px]"
            aria-label="Kirim pesan"
          >
            <Send className="w-4 h-4" />
          </NeuButton>
        </form>

        <p className="text-[10px] text-text-muted text-center">
          Pesan disanitasi dari data pribadi sebelum diproses. Bukan pengganti konseling profesional.
        </p>
      </div>

      {/* Pre-flight Consent Modal */}
      <NeuModal
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
        title="Persetujuan Pemrosesan AI"
        description="FATHERCARE AI mengedepankan prinsip persetujuan pengguna sebelum mengirim data ke model pihak ketiga."
        footer={
          <>
            <NeuButton variant="ghost" size="sm" onClick={() => setIsConsentModalOpen(false)}>
              Batal
            </NeuButton>
            <NeuButton variant="primary" size="sm" onClick={handleConfirmConsent}>
              Setuju dan Kirim
            </NeuButton>
          </>
        }
      >
        <div className="space-y-3 text-xs text-text-muted">
          <div className="p-3 rounded-xl bg-surface-inset border border-border-subtle space-y-1.5">
            <strong className="text-brand-900 block flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-brand-600" /> Perlindungan Privasi
            </strong>
            <p>
              Pola nomor telepon, surel, dan NIK disamarkan secara otomatis. Teks hanya digunakan untuk menyusun respons reflektif dan tidak disimpan secara permanen di server.
            </p>
          </div>
          <p>
            Dengan melanjutkan, kamu menyetujui teks ceritamu diproses oleh sistem untuk pendampingan awal nonklinis.
          </p>
        </div>
      </NeuModal>
    </div>
  );
}
