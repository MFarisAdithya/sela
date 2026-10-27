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
  MessageSquare,
  Sparkle,
  MessageSquarePlus,
  SlidersHorizontal,
  Bot,
  Lightbulb,
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

export type PersonaKey = "sela_bebas" | "orang_tua" | "guru_dosen" | "teman" | "konselor" | "kustom";

export interface PersonaConfig {
  key: PersonaKey;
  label: string;
  category: "bebas" | "simulasi";
  badge: string;
  roleTitle: string;
  desc: string;
  avatarIcon: any;
  starterOptions: string[];
}

const personas: PersonaConfig[] = [
  {
    key: "sela_bebas",
    label: "Sela (Ngobrol Bebas)",
    category: "bebas",
    badge: "Bicara Apa Saja",
    roleTitle: "Sela · Teman Cerita",
    desc: "Ngobrol santai tentang apa pun bersama Sela, tanpa skenario peran.",
    avatarIcon: Sparkles,
    starterOptions: [
      "Hai Sela, aku lagi pengen ngobrol santai aja nih.",
      "Aku lagi ngerasa agak overthinking hari ini, boleh cerita?",
      "Boleh kasih saran cara ngadepin situasi yang bikin cemas?",
      "Hari ini rasanya campur aduk banget, butuh tempat curhat.",
    ],
  },
  {
    key: "orang_tua",
    label: "Orang Tua (Ayah / Ibu)",
    category: "simulasi",
    badge: "Keluarga",
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
    category: "simulasi",
    badge: "Akademik",
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
    category: "simulasi",
    badge: "Pertemanan",
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
    category: "simulasi",
    badge: "Bantuan",
    roleTitle: "Simulasi Konseling Awal",
    desc: "Latih cara sampaikan uneg-uneg saat pertama kali konseling.",
    avatarIcon: UserCheck,
    starterOptions: [
      "Halo, ini pertama kalinya saya berkonsultasi. Saya ingin mengurai hal yang sedang terasa mengganjal.",
      "Saya sering merasa cemas berlebihan saat memikirkan masa depan dan ekspektasi orang lain.",
      "Saya merasa sulit mengatur emosi dan pola tidur beberapa minggu terakhir.",
    ],
  },
  {
    key: "kustom",
    label: "Lawan Bicara / Topik Kustom",
    category: "simulasi",
    badge: "Tentukan Sendiri",
    roleTitle: "Simulasi Kustom",
    desc: "Tentukan siapa yang ingin diajak bicara atau topik apa pun pilihanmu.",
    avatarIcon: MessageSquare,
    starterOptions: [
      "Boleh minta waktu sebentar? Ada hal penting yang ingin aku bicarakan berdua.",
      "Aku ingin membicarakan hal yang kemarin sempat bikin kita salah paham.",
      "Boleh kita evaluasi pembagian tugas kita minggu ini?",
    ],
  },
];

const quickTopics = [
  { label: "💭 Curhat uneg-uneg", text: "Hai Sela, ada yang mengganjal di hatiku hari ini dan aku pengen curhat santai..." },
  { label: "🧠 Atasi overthinking", text: "Sela, kepalaku lagi penuh banget dan overthinking. Boleh bantu urai langkah tenangnya?" },
  { label: "☕ Ngobrol santai bebas", text: "Halo Sela! Hari ini lagi senggang, pengen ngobrol santai aja bareng kamu." },
  { label: "🤝 Masalah pertemanan", text: "Sela, aku lagi merasa agak canggung sama temanku. Gimana ya cara terbaik menyikapinya?" },
  { label: "🎯 Tanya saran & tips", text: "Sela, boleh minta tips ringan gimana cara memulai obrolan tanpa canggung?" },
];

const customPresets = [
  { name: "Pasangan / Pacar", topic: "Bicara batasan & waktu bersama" },
  { name: "Kakak / Adik", topic: "Menyelesaikan salah paham di rumah" },
  { name: "Rekan Kerja / Tim", topic: "Koordinasi tugas & beban kerja" },
  { name: "Atasan / Bos", topic: "Konsultasi izin & kendala kerja" },
  { name: "Teman Sekamar / Kos", topic: "Membahas kenyamanan tinggal bersama" },
];

export default function PracticeTalkDashboard() {
  const router = useRouter();
  const { userName, activeStoryCard, storyCards, setActiveStoryCard } = useApp();

  const [selectedPersonaKey, setSelectedPersonaKey] = useState<PersonaKey>("sela_bebas");
  const [filterCategory, setFilterCategory] = useState<"semua" | "bebas" | "simulasi">("semua");
  const [customPersonaName, setCustomPersonaName] = useState("Pasangan / Pacar");
  const [customTopic, setCustomTopic] = useState("");
  const [messages, setMessages] = useState<PracticeMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentPersona = personas.find((p) => p.key === selectedPersonaKey) || personas[0];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getWelcomeText = (key: PersonaKey, name: string, customName: string) => {
    switch (key) {
      case "sela_bebas":
        return `Halo ${name}! Aku Sela, teman ngobrolmu. Kamu bisa cerita apa saja di sini—curhat uneg-uneg, tanya saran, atau sekadar ngobrol santai. Apa yang sedang ada di pikiranmu hari ini?`;
      case "kustom":
        return `Halo ${name}, ini ${customName || "lawan bicaramu"}. Ada hal apa yang ingin kamu ceritakan atau bicarakan? Silakan, aku mendengarkan.`;
      case "orang_tua":
        return `Halo ${name}. Ada apa, Nak? Tumben mau ngobrol serius, ada masalah apa di kampus atau sekolah?`;
      case "guru_dosen":
        return `Selamat siang, ${name}. Ya, silakan duduk. Ada kendala akademik apa yang ingin kamu konsultasikan?`;
      case "teman":
        return `Oi ${name}! Tumben ngajak ngobrol serius, ada apa nih? Cerita aja santai, aku dengerin kok.`;
      case "konselor":
        return `Halo ${name}, selamat datang. Ruang ini aman dan tidak akan menghakimi. Silakan sampaikan apa yang sedang terasa berat di pikiranmu.`;
      default:
        return `Halo ${name}, aku siap mendengarkan.`;
    }
  };

  // Initialize welcome message when persona changes
  useEffect(() => {
    setMessages([
      {
        id: "msg-init-" + selectedPersonaKey + "-" + Date.now(),
        sender: "persona",
        text: getWelcomeText(selectedPersonaKey, userName, customPersonaName),
        timestamp: "Baru saja",
      },
    ]);
  }, [selectedPersonaKey, userName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
          customPersonaName: selectedPersonaKey === "kustom" ? customPersonaName : undefined,
          customTopic: selectedPersonaKey === "kustom" ? customTopic : undefined,
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

      // Parse [Tips Komunikasi: ...] or [Tips dari Sela: ...] if returned
      let cleanText = replyFull;
      let commTip: string | undefined = undefined;

      const tipMatch = replyFull.match(/\[(Tips Komunikasi|Tips dari Sela):\s*(.*?)\]/i);
      if (tipMatch) {
        commTip = tipMatch[2].trim();
        cleanText = replyFull.replace(/\[(Tips Komunikasi|Tips dari Sela):\s*.*?\]/i, "").trim();
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
          text: selectedPersonaKey === "sela_bebas"
            ? "Sela tetap menemanimu di sini. Ceritakan hal apa pun yang ingin kamu bagi dengan tenang."
            : "Lawan bicaramu mendengarmu. Coba lanjutkan kata-katamu dengan tenang.",
          tip: "Koneksi simulasi terputus sementara, namun kamu tetap bisa terus melatih penyampaianmu.",
          timestamp: "Error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSession = () => {
    if (confirm("Mulai ulang sesi obrolan ini?")) {
      setMessages([
        {
          id: "msg-reset-" + Date.now(),
          sender: "persona",
          text: getWelcomeText(selectedPersonaKey, userName, customPersonaName),
          timestamp: "Baru saja",
        },
      ]);
    }
  };

  const PersonaIcon = currentPersona.avatarIcon;

  const filteredPersonas = personas.filter((p) => {
    if (filterCategory === "bebas") return p.category === "bebas";
    if (filterCategory === "simulasi") return p.category === "simulasi";
    return true;
  });

  return (
    <div className="space-y-5 max-w-4xl mx-auto py-2 animate-in fade-in duration-150">
      {/* Top Header with Aura Mascot */}
      <AuraModuleHeader
        productKey="practice-talk"
        eyebrow="Ruang Ngobrol & Latihan"
        title="Latihan Ngobrol & Teman Cerita"
        description="Ngobrol santai tentang apa saja bareng Sela, atau latih kalimat pembukamu sebelum bicara sungguhan."
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

      {/* Persona & Topic Selection Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-[#17365D] block">
              Pilih teman ngobrol atau lawan bicara:
            </span>
            <span className="text-[11px] text-[#2457A7]">
              Bisa ngobrol bebas tentang apa saja bareng Sela, atau pilih lawan bicara simulasi
            </span>
          </div>

          {/* Quick Category Filters */}
          <div className="flex items-center gap-1 p-1 bg-[#E3EEFF] rounded-xl border border-[#CCE1FF] self-start sm:self-auto text-xs">
            <button
              type="button"
              onClick={() => setFilterCategory("semua")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-semibold transition-all",
                filterCategory === "semua"
                  ? "bg-[#2457A7] text-white shadow-xs"
                  : "text-[#17365D]/70 hover:text-[#17365D]"
              )}
            >
              Semua (6)
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterCategory("bebas");
                setSelectedPersonaKey("sela_bebas");
              }}
              className={cn(
                "px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1",
                filterCategory === "bebas"
                  ? "bg-[#2457A7] text-white shadow-xs"
                  : "text-[#17365D]/70 hover:text-[#17365D]"
              )}
            >
              <Sparkles className="w-3 h-3" />
              Ngobrol Bebas
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterCategory("simulasi");
                if (selectedPersonaKey === "sela_bebas") {
                  setSelectedPersonaKey("orang_tua");
                }
              }}
              className={cn(
                "px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1",
                filterCategory === "simulasi"
                  ? "bg-[#2457A7] text-white shadow-xs"
                  : "text-[#17365D]/70 hover:text-[#17365D]"
              )}
            >
              <Users className="w-3 h-3" />
              Simulasi Bicara
            </button>
          </div>
        </div>

        {/* Grid of 6 Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredPersonas.map((p) => {
            const Icon = p.avatarIcon;
            const isSelected = selectedPersonaKey === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setSelectedPersonaKey(p.key)}
                className={cn(
                  "p-3.5 rounded-2xl border text-left flex flex-col justify-between relative group cursor-pointer select-none",
                  "transition-colors duration-100 active:scale-[0.98] active:duration-40",
                  isSelected
                    ? "bg-[#1E56A0] text-[#FAFDFE] border-[#133A6E] shadow-sm font-semibold"
                    : "bg-[#FAFDFE] text-[#102542] border-[#BFD8F5] hover:border-[#8AB6EB] hover:shadow-xs"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-xl flex items-center justify-center shrink-0",
                        isSelected ? "bg-white/20 text-white" : "bg-[#EBF3FF] text-[#2457A7]"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        isSelected
                          ? "bg-white/20 text-white"
                          : p.key === "sela_bebas"
                          ? "bg-[#D6E9FF] text-[#2563EB]"
                          : "bg-[#EBF3FF] text-[#2457A7]"
                      )}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <span className="text-xs font-bold block mb-1">{p.label}</span>
                </div>
                <p
                  className={cn(
                    "text-[11px] leading-snug line-clamp-2 mt-0.5",
                    isSelected ? "text-white/80" : "text-[#17365D]/70"
                  )}
                >
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Custom Persona Setup Drawer (When Kustom is active) */}
        {selectedPersonaKey === "kustom" && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] space-y-3 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#17365D] block">
                  Tentukan Lawan Bicara Kustom:
                </span>
                <span className="text-[11px] text-[#17365D]/70">
                  Pilih preset cepat atau tuliskan nama peran sesuai keinginanmu
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {customPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCustomPersonaName(preset.name);
                      setCustomTopic(preset.topic);
                    }}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all",
                      customPersonaName === preset.name
                        ? "bg-[#2457A7] text-white border-[#2457A7] shadow-xs"
                        : "bg-white text-[#17365D] border-[#CCE1FF] hover:bg-[#F7FAFF]"
                    )}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-bold text-[#2457A7] block mb-1">
                  Siapa Lawan Bicaranya?
                </label>
                <input
                  type="text"
                  value={customPersonaName}
                  onChange={(e) => setCustomPersonaName(e.target.value)}
                  placeholder="Misal: Pasangan / Pacar, Kakak, Rekan Kerja, Bos..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#CCE1FF] text-[#17365D] focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#2457A7] block mb-1">
                  Topik yang Ingin Dibahas (Opsional):
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Misal: Batasan waktu, Minta maaf, Evaluasi tugas..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#CCE1FF] text-[#17365D] focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Quick Topic Chips (When Sela Bebas is active) */}
        {selectedPersonaKey === "sela_bebas" && (
          <div className="space-y-1.5 p-3 sm:p-4 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] animate-in fade-in">
            <span className="text-[11px] font-bold text-[#2457A7] uppercase tracking-wider block">
              Ide Topik Obrolan Bareng Sela (Klik untuk mencoba):
            </span>
            <div className="flex flex-wrap gap-2 pt-0.5">
              {quickTopics.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputValue(item.text)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#CCE1FF] hover:border-[#2457A7] text-xs font-medium text-[#17365D] hover:text-[#2457A7] hover:bg-[#F7FAFF] transition-colors duration-75 active:scale-95 active:duration-40 cursor-pointer shadow-xs"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat Simulation Area */}
      <div className="bg-[#F7FAFF] p-4 sm:p-6 rounded-3xl border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] flex flex-col h-[520px]">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">
          {/* Companion Banner */}
          {messages.length <= 1 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAFDFE] via-[#F4F8FF] to-[#E8F1FC] border border-[#BFD8F5] shadow-sm flex items-center gap-4 mb-3 animate-in fade-in">
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 shrink-0">
                <img
                  src="/images/aura/aura-berlatih-bicara.png"
                  alt="Sela menemani ngobrol"
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono-num text-[10px] font-semibold text-[#1E56A0] px-2 py-0.5 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
                    {selectedPersonaKey === "sela_bebas" ? "Sela Teman Cerita" : "Sela Menemani"}
                  </span>
                  <span className="text-xs font-semibold text-[#102542]">
                    {selectedPersonaKey === "sela_bebas"
                      ? "Ruang Ngobrol Bebas Apa Saja"
                      : selectedPersonaKey === "kustom"
                      ? `Simulasi Dialog: ${customPersonaName || "Lawan Bicara"}`
                      : "Simulasi Dialog Aman"}
                  </span>
                </div>
                <p className="text-xs text-[#35527A] leading-relaxed">
                  {selectedPersonaKey === "sela_bebas"
                    ? "Tumpahkan apa saja yang ada di pikiranmu. Kamu bisa curhat, ngobrol santai, atau tanya tips apa pun tanpa takut dihakimi."
                    : selectedPersonaKey === "kustom"
                    ? `Latih percakapanmu bersama ${customPersonaName || "lawan bicara"} di sini. Sela akan membantumu meninjau cara penyampaianmu agar lebih tenang dan jelas.`
                    : "Coba sampaikan apa yang ingin kamu katakan di sini tanpa rasa cemas salah bicara. Sela akan membantu memberikan tips komunikasi asertif di setiap tanggapan."}
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
                    <span>
                      {selectedPersonaKey === "kustom"
                        ? `Simulasi: ${customPersonaName || "Lawan Bicara"}`
                        : currentPersona.roleTitle}
                    </span>
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
              message={
                selectedPersonaKey === "sela_bebas"
                  ? "Sela sedang mengetik tanggapan..."
                  : `${selectedPersonaKey === "kustom" ? (customPersonaName || "Lawan bicara") : currentPersona.roleTitle} sedang merespons...`
              }
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
                placeholder={
                  selectedPersonaKey === "sela_bebas"
                    ? "Tulis apa saja yang ingin kamu obrolkan dengan Sela..."
                    : selectedPersonaKey === "kustom"
                    ? `Ketik pesanmu ke ${customPersonaName || "lawan bicara"}...`
                    : `Coba kalimatmu ke ${currentPersona.label}...`
                }
                maxLength={1000}
                disabled={isLoading}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-white shadow-inner text-[#17365D] border border-[#CCE1FF] focus:outline-none focus:ring-2 focus:ring-[#2457A7] placeholder:text-[#17365D]/40"
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="shrink-0 px-4 py-3 min-h-[44px] rounded-2xl bg-[#2457A7] text-white hover:bg-[#1C4477] transition-all disabled:opacity-40 shadow-sm"
              aria-label="Kirim pesan obrolan"
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
