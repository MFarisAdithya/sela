"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Send,
  Sparkles,
  ShieldAlert,
  BookOpen,
  AlertCircle,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  KeyRound,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";
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
}

const starterPrompts = [
  "Bagaimana cara menyampaikan rasa kecewa kepada keluarga secara baik?",
  "Apa langkah pertama untuk melatih komunikasi asertif?",
  "Aku merasa kurang percaya diri saat berbicara di depan orang lain.",
];

export default function SafeStoryPage() {
  const { userName, isAiConfigured, checkAiConfiguration } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "ai",
      text: `Halo ${userName}. Ini ruang cerita untuk refleksi awal dan mempelajari keterampilan diri. Kamu bisa menuliskan apa yang sedang kamu pikirkan saat ini.`,
      timestamp: "Baru saja",
      isAiGenerated: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAiConfiguration();
  }, [checkAiConfiguration]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
          },
        ]);
      } else if (data.status === "api_unconfigured") {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "ai",
            text: `${data.reply}\n\n${data.ragContext ? `"${data.ragContext}"` : ""}`,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            sources: data.sources,
            isAiGenerated: false,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "ai",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            sources: data.sources,
            isAiGenerated: data.isAiGenerated,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "system",
          text: "Gagal menghubungi server. Periksa koneksi internet atau status server lokal.",
          timestamp: "Error",
          isAiGenerated: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSourceExpand = (msgId: string) => {
    setExpandedSources((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const handleResetChat = () => {
    if (confirm("Hapus seluruh percakapan sesi ini?")) {
      setMessages([
        {
          id: "msg-init-reset",
          sender: "ai",
          text: `Halo ${userName}. Percakapan telah dibersihkan. Kamu bisa mulai bercerita kembali.`,
          timestamp: "Baru saja",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-3xl mx-auto space-y-3">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between border-b border-border-subtle/80 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-brand-900">Cerita AI</h1>
          {isAiConfigured ? (
            <Badge variant="active" dot size="sm">
              AI Aktif
            </Badge>
          ) : (
            <Badge variant="warning" dot size="sm">
              API Belum Dikonfigurasi
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg text-text-muted hover:text-brand-900 text-xs flex items-center gap-1 transition-colors"
            title="Bersihkan percakapan sesi ini"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bersihkan sesi</span>
          </button>
          <Link href="/referrals">
            <NeuButton size="sm" variant="danger" className="text-xs">
              Bantuan darurat
            </NeuButton>
          </Link>
        </div>
      </div>

      {/* Warning banner if API key is not configured */}
      {!isAiConfigured && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2 shrink-0">
          <KeyRound className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Kunci API Belum Terpasang:</strong> AI aktif memerlukan <code>OPENAI_API_KEY</code> pada berkas <code>.env.local</code> di server. Saat ini, sistem menampilkan materi terverifikasi dari RAG lokal tanpa mengarang simulasi.
          </div>
        </div>
      )}

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-2">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          const isSystem = msg.sender === "system";

          if (isSystem && msg.isCrisis) {
            return (
              <div key={msg.id} className="p-4 rounded-2xl bg-rose-50 border border-rose-300 shadow-sm space-y-3 text-rose-950">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <span>Protokol Keselamatan Darurat</span>
                </div>
                <p className="text-xs leading-relaxed">{msg.text}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="tel:119"
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:bg-rose-700"
                  >
                    Telepon 119 ext 8 (Kemenkes)
                  </a>
                  <a
                    href="tel:112"
                    className="px-3 py-1.5 rounded-xl bg-white text-rose-800 border border-rose-300 font-semibold text-xs flex items-center gap-1.5 hover:bg-rose-100"
                  >
                    Nomor Darurat 112
                  </a>
                  <Link href="/referrals">
                    <span className="px-3 py-1.5 rounded-xl bg-white text-brand-900 border border-brand-200 font-semibold text-xs inline-block hover:bg-brand-50">
                      Pilihan Pendamping Manusia &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={cn("flex flex-col max-w-[88%] sm:max-w-[80%]", isUser ? "ml-auto items-end" : "mr-auto items-start")}
            >
              <div
                className={cn(
                  "p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed transition-all",
                  isUser
                    ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-br-sm shadow-neu-raised-sm"
                    : "bg-surface text-text-main rounded-bl-sm border border-border-subtle shadow-neu-raised-sm"
                )}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Grounded RAG Source Citations */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-border-subtle/80 space-y-1.5">
                    <button
                      onClick={() => toggleSourceExpand(msg.id)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:text-brand-900 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{msg.sources.length} Rujukan Terverifikasi</span>
                      {expandedSources[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {expandedSources[msg.id] && (
                      <div className="space-y-1.5 pt-1">
                        {msg.sources.map((src) => (
                          <div
                            key={src.id}
                            className="p-2 rounded-xl bg-surface-inset/80 border border-border-subtle/70 text-[11px] text-text-muted space-y-0.5"
                          >
                            <div className="font-semibold text-brand-900 flex items-center justify-between">
                              <span>{src.title}</span>
                              <Badge variant="verified" size="sm">
                                Resmi
                              </Badge>
                            </div>
                            <p className="text-[10px] text-text-subtle">{src.source_name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <span className="text-[10px] text-text-muted mt-1 px-1">
                {msg.timestamp} {msg.isAiGenerated && "• Model AI"}
              </span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-text-muted p-3 bg-surface rounded-2xl border border-border-subtle shadow-neu-raised-sm w-fit">
            <Sparkles className="w-4 h-4 text-brand-600 animate-spin" />
            <span>Menghubungi basis pengetahuan & menyusun jawaban...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts (if chat is fresh) */}
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
          Pesanmu dianalisis dengan penyaring keselamatan. Bukan pengganti konseling klinis.
        </p>
      </div>
    </div>
  );
}
