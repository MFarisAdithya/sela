"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Send,
  Sparkles,
  Users,
  GraduationCap,
  HeartHandshake,
  UserCheck,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkle,
} from "lucide-react";
import { useApp, StoryCard } from "@/context/AppContext";
import { AuraModuleHeader, AuraAvatar, AuraLoadingIndicator } from "@/components/ui/AuraMascot";
import { cn } from "@/lib/utils";

interface PracticeMessage {
  id: string;
  sender: "user" | "persona";
  text: string;
  tip?: string;
  timestamp: string;
}

type PersonaKey = "orang_tua" | "guru_dosen" | "teman" | "konselor";

const personas: {
  key: PersonaKey;
  label: string;
  roleTitle: string;
  desc: string;
  avatarIcon: any;
  starterOptions: string[];
}[] = [
  {
    key: "orang_tua",
    label: "Orang Tua (Ayah / Ibu)",
    roleTitle: "Simulasi Orang Tua",
    desc: "Latih nada bicara tenang saat hadapi ekspektasi keluarga.",
    avatarIcon: Users,
    starterOptions: [
      "Ayah/Ibu, ada hal penting tentang perkuliahan yang ingin aku ceritain dengan tenang.",
      "Boleh minta waktu sebentar? Aku pengen ngobrol berdua tanpa terburu-buru.",
      "Aku tahu Ayah/Ibu ingin yang terbaik buat aku, tapi ada yang terasa berat di jurusanku saat ini.",
    ],
  },
  {
    key: "guru_dosen",
    label: "Guru / Dosen Pembimbing",
    roleTitle: "Simulasi Guru / Dosen",
    desc: "Latih cara izin kendala tugas secara sopan dan jelas.",
    avatarIcon: GraduationCap,
    starterOptions: [
      "Selamat pagi Bapak/Ibu, mohon izin meminta waktu sebentar untuk berkonsultasi mengenai progres tugas saya.",
      "Saya mengalami kendala kesehatan minggu ini sehingga tertinggal, apakah memungkinkan mendiskusikan dispensasi tenggat?",
      "Mohon arahan Bapak/Ibu terkait bagian materi tugas yang belum saya pahami sepenuhnya.",
    ],
  },
  {
    key: "teman",
    label: "Teman Sebaya / Sahabat",
    roleTitle: "Simulasi Sahabat",
    desc: "Latih obrolan terbuka bareng teman tanpa canggung.",
    avatarIcon: HeartHandshake,
    starterOptions: [
      "Boleh ngobrol sebentar berdua? Ada yang kepikiran di kepalaku dan pengen aku lurusin.",
      "Akhir-akhir ini aku ngerasa agak overwhelmed dan butuh temen cerita sebentar.",
      "Maaf ya kalau beberapa hari kemarin aku agak slow-response, aku lagi ngerasa capek banget secara mental.",
    ],
  },
  {
    key: "konselor",
    label: "Konselor / Tenaga Profesional",
    roleTitle: "Simulasi Konseling Awal",
    desc: "Latih cara sampaikan uneg-uneg saat pertama kali konseling.",
    avatarIcon: UserCheck,
    starterOptions: [
      "Halo, ini pertama kalinya saya berkonsultasi. Saya ingin mengurai hal yang sedang terasa mengganjal.",
      "Saya sering merasa cemas berlebihan saat memikirkan masa depan dan ekspektasi orang lain.",
      "Saya merasa sulit mengatur emosi dan pola tidur beberapa minggu terakhir.",
    ],
  },
];

export default function PracticeTalkDashboard() {
  const router = useRouter();
  const { userName, activeStoryCard, storyCards, setActiveStoryCard } = useApp();

  const [selectedPersonaKey, setSelectedPersonaKey] = useState<PersonaKey>("orang_tua");
  const [messages, setMessages] = useState<PracticeMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(true);

  const currentPersona = personas.find((p) => p.key === selectedPersonaKey) || personas[0];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when persona changes
  useEffect(() => {
    const welcomeTexts: Record<PersonaKey, string> = {
      orang_tua: `Halo ${userName}. Ada apa, Nak? Tumben mau ngobrol serius, ada masalah apa di kampus atau sekolah?`,
      guru_dosen: `Selamat siang, ${userName}. Ya, silakan duduk. Ada kendala akademik apa yang ingin kamu konsultasikan?`,
      teman: `Oi ${userName}! Tumben ngajak ngobrol serius, ada apa nih? Cerita aja santai, aku dengerin kok.`,
      konselor: `Halo ${userName}, selamat datang. Ruang ini aman dan tidak akan menghakimi. Silakan sampaikan apa yang sedang terasa berat di pikiranmu.`,
    };

    setMessages([
      {
        id: "msg-init-" + selectedPersonaKey,
        sender: "persona",
        text: welcomeTexts[selectedPersonaKey],
        timestamp: "Baru saja",
      },
    ]);
  }, [selectedPersonaKey, userName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsgId = "user-" + Date.now();
    const newUserMsg: PracticeMessage = {
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
          mode: "practice_talk",
          persona: selectedPersonaKey,
          storyContext: activeStoryCard
            ? {
                facts: activeStoryCard.facts,
                feelings: activeStoryCard.feelings,
                needs: activeStoryCard.needs,
                openingLine: activeStoryCard.openingLine,
              }
            : undefined,
        }),
      });

      const data = await res.json();
      const replyFull = data.reply || "Maaf, respon tidak dapat dihasilkan.";

      // Parse [Tips Komunikasi: ...] if returned
      let cleanText = replyFull;
      let commTip: string | undefined = undefined;

      const tipMatch = replyFull.match(/\[Tips Komunikasi:\s*(.*?)\]/i);
      if (tipMatch) {
        commTip = tipMatch[1].trim();
        cleanText = replyFull.replace(/\[Tips Komunikasi:\s*.*?\]/i, "").trim();
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "persona-" + Date.now(),
          sender: "persona",
          text: cleanText,
          tip: commTip,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "persona",
          text: "Bapak/Ibu/Teman mendengarmu. Coba lanjutkan kata-katamu dengan tenang.",
          tip: "Koneksi simulasi terputus sementara, namun kamu tetap bisa terus melatih penyampaianmu.",
          timestamp: "Error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSession = () => {
    if (confirm("Mulai ulang sesi latihan dengan persona ini?")) {
      const welcomeTexts: Record<PersonaKey, string> = {
        orang_tua: `Halo ${userName}. Ada apa, Nak? Tumben mau ngobrol serius, ada masalah apa di kampus atau sekolah?`,
        guru_dosen: `Selamat siang, ${userName}. Ya, silakan duduk. Ada kendala akademik apa yang ingin kamu konsultasikan?`,
        teman: `Oi ${userName}! Tumben ngajak ngobrol serius, ada apa nih? Cerita aja santai, aku dengerin kok.`,
        konselor: `Halo ${userName}, selamat datang. Ruang ini aman dan tidak akan menghakimi. Silakan sampaikan apa yang sedang terasa berat di pikiranmu.`,
      };

      setMessages([
        {
          id: "msg-reset-" + Date.now(),
          sender: "persona",
          text: welcomeTexts[selectedPersonaKey],
          timestamp: "Baru saja",
        },
      ]);
    }
  };

  const PersonaIcon = currentPersona.avatarIcon;

  return (
    <div className="space-y-5 max-w-4xl mx-auto py-2 animate-in fade-in duration-150">
      {/* Top Header with Aura Mascot */}
      <AuraModuleHeader
        productKey="practice-talk"
        eyebrow="Latihan Ngobrol"
        title="Latihan Ngobrol"
        description="Yuk, latihan ngobrol dan coba kalimat pembukamu sebelum bicara sungguhan."
        rightSlot={
          <button
            type="button"
            onClick={handleResetSession}
            className="letterpress-cotton inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#1E56A0]" />
            Mulai ulang sesi
          </button>
        }
      />

      {/* Persona Selection Bar */}
      <div className="space-y-2.5">
        <span className="text-xs font-semibold text-[#35527A]">
          Pilih lawan bicara untuk latihan:
        </span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {personas.map((p) => {
            const Icon = p.avatarIcon;
            const isSelected = selectedPersonaKey === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setSelectedPersonaKey(p.key)}
                className={cn(
                  "p-3.5 rounded-2xl border text-left transition-colors flex flex-col justify-between",
                  isSelected
                    ? "bg-[#1E56A0] text-[#FAFDFE] border-[#133A6E] shadow-sm font-semibold"
                    : "bg-[#FAFDFE] text-[#102542] border-[#BFD8F5] hover:border-[#8AB6EB]"
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-xl flex items-center justify-center shrink-0",
                      isSelected ? "bg-white/20 text-white" : "bg-[#EBF3FF] text-[#2457A7]"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold truncate">{p.label}</span>
                </div>
                <p
                  className={cn(
                    "text-[11px] leading-snug line-clamp-2",
                    isSelected ? "text-white/80" : "text-[#17365D]/70"
                  )}
                >
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Story Card Cheat Sheet Drawer (If card exists) */}
      {activeStoryCard && (
        <div className="rounded-2xl border border-[#CCE1FF] bg-[#EBF3FF] overflow-hidden">
          <div
            onClick={() => setIsCheatSheetOpen(!isCheatSheetOpen)}
            className="p-3 px-4 flex items-center justify-between cursor-pointer hover:bg-[#CCE1FF]/30 transition-all text-xs font-bold text-[#17365D]"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2457A7]" />
              <span>Contekan Kartu Ceritamu: &ldquo;{activeStoryCard.title}&rdquo;</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2457A7]">
              <span>{isCheatSheetOpen ? "Sembunyikan" : "Tampilkan Poin"}</span>
              {isCheatSheetOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>

          {isCheatSheetOpen && (
            <div className="p-4 pt-1 border-t border-[#CCE1FF]/70 text-xs text-[#17365D] space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-white/80 border border-[#CCE1FF]/60">
                  <strong className="block text-[#2457A7] uppercase tracking-wider mb-0.5">Fakta:</strong>
                  <span className="line-clamp-2">{activeStoryCard.facts}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-[#CCE1FF]/60">
                  <strong className="block text-[#2457A7] uppercase tracking-wider mb-0.5">Emosi:</strong>
                  <span className="line-clamp-2">{activeStoryCard.feelings}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-[#CCE1FF]/60">
                  <strong className="block text-[#2457A7] uppercase tracking-wider mb-0.5">Kebutuhan:</strong>
                  <span className="line-clamp-2">{activeStoryCard.needs}</span>
                </div>
              </div>

              {activeStoryCard.openingLine && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-[#2457A7]/30">
                  <div className="text-xs">
                    <span className="text-[10px] text-[#2457A7] font-bold uppercase tracking-wider block">
                      Kalimat Pembuka Rekomendasi:
                    </span>
                    <span className="italic font-medium text-[#17365D]">
                      &ldquo;{activeStoryCard.openingLine}&rdquo;
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSendMessage(activeStoryCard.openingLine)}
                    className="px-3 py-1.5 rounded-xl bg-[#2457A7] text-white text-[11px] font-semibold hover:bg-[#1C4477] transition-all shrink-0 self-start sm:self-auto"
                  >
                    Gunakan Sekarang →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Chat Simulation Area */}
      <div className="bg-[#F7FAFF] p-4 sm:p-6 rounded-3xl border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] flex flex-col h-[520px]">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">
          {/* Aura Berlatih Berbicara Companion Banner */}
          {messages.length <= 1 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAFDFE] via-[#F4F8FF] to-[#E8F1FC] border border-[#BFD8F5] shadow-sm flex items-center gap-4 mb-3 animate-in fade-in">
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 shrink-0">
                <img
                  src="/images/aura/aura-berlatih-bicara.png"
                  alt="Aura berlatih berbicara menghadap dua gelembung percakapan"
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono-num text-[10px] font-semibold text-[#1E56A0] px-2 py-0.5 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
                    Aura Berlatih Berbicara
                  </span>
                  <span className="text-xs font-semibold text-[#102542]">
                    Simulasi Dialog Aman
                  </span>
                </div>
                <p className="text-xs text-[#35527A] leading-relaxed">
                  Coba sampaikan apa yang ingin kamu katakan di sini tanpa rasa cemas salah bicara. Aura akan membantu memberikan tips komunikasi asertif di setiap tanggapan.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg) => {
            const isUser = msg.sender === "user";

            return (
              <div
                key={msg.id}
                className={cn("flex flex-col animate-in fade-in duration-150", isUser ? "items-end" : "items-start")}
              >
                {!isUser && (
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] font-bold text-[#2457A7]">
                    <PersonaIcon className="w-3.5 h-3.5" />
                    <span>{currentPersona.roleTitle}</span>
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed",
                    isUser
                      ? "bg-[#2457A7] text-white shadow-sm rounded-br-none"
                      : "bg-white border border-[#CCE1FF] shadow-sm text-[#17365D] rounded-bl-none"
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Communication Coaching Tip Note */}
                  {msg.tip && (
                    <div className="mt-3 p-3 rounded-xl bg-[#EBF3FF] border border-[#CCE1FF] text-xs text-[#17365D] space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-[#2457A7]">
                        <AuraAvatar size="xs" />
                        <span>Tips dari Sela:</span>
                      </div>
                      <p className="text-[11px] text-[#17365D]/85 leading-relaxed">{msg.tip}</p>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-[#17365D]/50 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {isLoading && (
            <AuraLoadingIndicator
              message={`${currentPersona.roleTitle} sedang merespons...`}
              subMessage="Sebentar ya, Sela sedang menyiapkan ini..."
              className="w-fit max-w-sm"
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="pt-3 border-t border-[#CCE1FF]/60 shrink-0">
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
                placeholder={`Uji kalimatmu ke ${currentPersona.label}...`}
                maxLength={1000}
                disabled={isLoading}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-white shadow-inner text-[#17365D] border border-[#CCE1FF] focus:outline-none focus:ring-2 focus:ring-[#2457A7] placeholder:text-[#17365D]/40"
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="shrink-0 px-4 py-3 min-h-[44px] rounded-2xl bg-[#2457A7] text-white hover:bg-[#1C4477] transition-all disabled:opacity-40 shadow-sm"
              aria-label="Kirim latihan bicara"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Transition Banner to Pilar 4 (Support Pathway) */}
      <div className="p-5 rounded-3xl bg-[#E3EEFF] border border-[#CCE1FF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs sm:text-sm text-[#17365D]/85 space-y-1">
          <strong className="block text-[#17365D] font-bold text-sm sm:text-base">
            Butuh teman bicara nyata atau bantuan lebih lanjut?
          </strong>
          <p className="text-xs text-[#17365D]/75">
            Latihan ini adalah langkah awal. Saat kamu butuh teman mendengar atau bantuan nyata, kamu nggak sendirian.
          </p>
        </div>

        <Link
          href="/support"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1F7A65] hover:bg-[#18604F] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shrink-0 self-start sm:self-auto"
        >
          <ShieldCheck className="w-4 h-4" />
          Cari Dukungan
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
