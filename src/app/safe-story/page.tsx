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
  Info,
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
  demoLabel?: string;
}

const starterPrompts = [
  "Bagaimana cara menyampaikan rasa kecewa kepada keluarga secara baik?",
  "Apa langkah pertama untuk melatih komunikasi asertif?",
  "Aku merasa kurang percaya diri saat berbicara di depan orang lain.",
  "Aku merasa sangat lelah dan kewalahan hari ini.",
];

// Predefined verified demo scenarios for Phase 2
function getDemoResponse(query: string, userName: string): { reply: string; sources: RetrievedSource[]; isCrisis: boolean } {
  const q = query.toLowerCase();

  // Crisis check
  if (
    q.includes("bunuh diri") ||
    q.includes("ingin mati") ||
    q.includes("mau mati") ||
    q.includes("self harm") ||
    q.includes("menyakiti diri") ||
    q.includes("mengakhiri hidup")
  ) {
    return {
      reply:
        "Jika kamu atau seseorang di dekatmu sedang berada dalam bahaya mendesak atau membutuhkan bantuan segera, prioritaskan pergi ke tempat aman dan hubungi Hotline Kesehatan Jiwa Kemenkes 119 ekstensi 8 (Bebas pulsa, 24 jam) atau nomor darurat 112.",
      isCrisis: true,
      sources: [
        {
          id: "safety-01",
          title: "Protokol Darurat Kesehatan Jiwa Nasional 119 ext 8",
          source_name: "Kementerian Kesehatan RI (SEJIWA)",
          reference: "Hotline 119 ekstensi 8 (Gratis 24 Jam)",
          score: 1.0,
          snippet: "Layanan konseling darurat pencegahan bunuh diri dan krisis kejiwaan nasional.",
          review_status: "verified_expert",
        },
      ],
    };
  }

  // Communication / Assertiveness
  if (q.includes("komunikasi") || q.includes("asertif") || q.includes("bicara") || q.includes("bicara di depan")) {
    return {
      reply: `Menyampaikan apa yang kita rasakan tanpa memicu konflik memang membutuhkan latihan, ${userName}. 

Salah satu cara yang terbukti efektif adalah menggunakan pola Pesan "Saya":
1. Sebutkan fakta yang terjadi secara netral (tanpa menuduh).
2. Sebutkan emosi spesifik yang kamu rasakan: "Aku merasa cemas / kurang dihargai..."
3. Sampaikan kebutuhanmu dan ajakan konkret.

Apakah situasi yang ingin kamu bicarakan ini terjadi dengan teman, guru, atau di rumah?`,
      isCrisis: false,
      sources: [
        {
          id: "skill-01",
          title: "Komunikasi Asertif: Teknik Pesan 'Saya'",
          source_name: "Modul Life Skills Pendidikan Sebaya - Forum Genre (2022)",
          reference: "Panduan Konselor Sebaya Remaja Indonesia, BKKBN",
          score: 0.95,
          snippet: "Komunikasi asertif membantu menyampaikan kebutuhan tanpa menyerang orang lain.",
          review_status: "verified_expert",
        },
      ],
    };
  }

  // Family / Father reflection
  if (q.includes("keluarga") || q.includes("ayah") || q.includes("orang tua") || q.includes("rumah")) {
    return {
      reply: `Membahas dinamika keluarga sering kali membawa perasaan campur aduk, ${userName}. 

Penting untuk diingat bahwa keputusan dan keterbatasan komunikasi orang dewasa bukanlah kesalahanmu. Kamu tidak bertanggung jawab atas ketidakhadiran atau jarak emosional yang terjadi.

Fokus yang paling aman saat ini adalah mengenali apa yang kamu butuhkan untuk merasa tenang. Dari hal-hal yang sedang kamu alami, bagian mana yang terasa paling berat?`,
      isCrisis: false,
      sources: [
        {
          id: "psycho-02",
          title: "Memahami Keterbatasan Peran Ayah Tanpa Menyalahkan Diri",
          source_name: "Ashari, Y. (2018) & Panduan Pengasuhan Positif KemenPPPA",
          reference: "Kajian Fatherless dan Dampak Perkembangan Emosi, Jurnal Psikologi Sosial",
          score: 0.92,
          snippet: "Kekurangan peran pengasuhan bukan kesalahan remaja; remaja berhak bertumbuh dengan mencari figur pendukung yang aman.",
          review_status: "verified_expert",
        },
      ],
    };
  }

  // Confidence / Career / Interview
  if (q.includes("percaya diri") || q.includes("wawancara") || q.includes("kerja") || q.includes("karier") || q.includes("lulus")) {
    return {
      reply: `Rasa gugup saat harus berbicara di depan orang lain atau menghadapi wawancara adalah hal yang wajar dialami siapa saja, ${userName}.

Kamu bisa mencoba latihan perkenalan diri 60 detik dengan tiga bagian:
1. Siapa dirimu dan latar belakang keahlianmu.
2. Satu pengalaman nyata atau proyek yang pernah kamu selesaikan.
3. Kontribusi yang ingin kamu berikan.

Apakah kamu sedang mempersiapkan wawancara kerja, magang, atau presentasi di sekolah?`,
      isCrisis: false,
      sources: [
        {
          id: "career-02",
          title: "Latihan Perkenalan Diri 60 Detik untuk Wawancara",
          source_name: "Pedoman Pelatihan Vokasi - Kemendikbudristek",
          reference: "Modul Wawancara Kerja SMK/Vokasi Indonesia",
          score: 0.9,
          snippet: "Rumus perkenalan 3 bagian membantu remaja menyampaikan potensi secara ringkas dan terarah.",
          review_status: "verified_expert",
        },
      ],
    };
  }

  // Sadness / Exhaustion
  if (q.includes("sedih") || q.includes("lelah") || q.includes("capek") || q.includes("kewalahan") || q.includes("cemas")) {
    return {
      reply: `Hari yang berat bisa membuat energi kita terkuras, ${userName}. 

Kamu tidak harus menyelesaikan semua masalah atau memikirkan jalan keluar malam ini. Terkadang langkah yang paling tepat adalah mengizinkan dirimu beristirahat, minum air putih, dan menarik napas perlahan.

Jika terasa membantu, kamu juga bisa menuliskannya di Catatan Pribadi agar tidak terus berputar di pikiran. Apakah kamu ingin mengambil jeda sejenak sekarang?`,
      isCrisis: false,
      sources: [
        {
          id: "psycho-01",
          title: "Mengenal Emosi Dasar dan Validasi Diri",
          source_name: "Modul Tentang Kita - Forum Genre & BKKBN (2021)",
          reference: "Panduan Pengelolaan Emosi Remaja, BKKBN RI",
          score: 0.88,
          snippet: "Langkah awal pengelolaan emosi adalah menamai perasaan tersebut secara jujur tanpa menghakimi diri sendiri.",
          review_status: "verified_expert",
        },
      ],
    };
  }

  // Default fallback
  return {
    reply: `Terima kasih sudah berbagi, ${userName}. Ini adalah topik yang baik untuk dieksplorasi secara perlahan.

Dalam pendampingan awal, kita berfokus pada apa yang bisa kamu kendalikan hari ini. Dari apa yang kamu ceritakan tadi, langkah kecil apa yang terasa paling realistis untuk kamu coba terlebih dahulu?`,
    isCrisis: false,
    sources: [
      {
        id: "psycho-03",
        title: "Prinsip Resiliensi: Mengambil Langkah Kecil",
        source_name: "Panduan Dukungan Kesehatan Jiwa Remaja - Kemendikbud & WHO",
        reference: "Buku Saku Kesehatan Mental Remaja Indonesia",
        score: 0.8,
        snippet: "Fokus pada satu tindakan kecil hari ini yang berada dalam kendalimu.",
        review_status: "verified_expert",
      },
    ],
  };
}

export default function SafeStoryPage() {
  const { userName } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "ai",
      text: `Halo ${userName}. Ini ruang cerita Safe Story AI. Untuk Fase 2, halaman ini berjalan dalam Mode DEMO dengan skenario respons terstruktur berbasis materi resmi. Silakan tulis apa yang sedang kamu rasakan atau pilih contoh topik di bawah.`,
      timestamp: "Baru saja",
      demoLabel: "Skenario Demo Fase 2",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = (textToSend?: string) => {
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

    // Simulate natural response latency (400ms - 800ms)
    setTimeout(() => {
      const demoResult = getDemoResponse(text, userName);
      const aiMsgId = "ai-" + Date.now();

      if (demoResult.isCrisis) {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "system",
            text: demoResult.reply,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            isCrisis: true,
            sources: demoResult.sources,
            demoLabel: "Protokol Keselamatan Demo",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "ai",
            text: demoResult.reply,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            sources: demoResult.sources,
            demoLabel: "SIMULASI DEMO",
          },
        ]);
      }
      setIsLoading(false);
    }, 600);
  };

  const toggleSourceExpand = (msgId: string) => {
    setExpandedSources((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const handleResetChat = () => {
    if (confirm("Bersihkan seluruh percakapan di sesi ini?")) {
      setMessages([
        {
          id: "msg-init-reset",
          sender: "ai",
          text: `Halo ${userName}. Percakapan telah dibersihkan. Kamu bisa mulai bercerita kembali.`,
          timestamp: "Baru saja",
          demoLabel: "SIMULASI DEMO",
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
          <Badge variant="demo" dot size="sm">
            Mode DEMO (Fase 2)
          </Badge>
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

      {/* Explicit Phase 2 Notice Banner */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-2 shrink-0">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Mode Demo Terbatas (Fase 2):</strong> Respons pada tahap ini disimulasikan secara terstruktur berdasarkan materi resmi (BKKBN, ABKIN, Kemendikbud) untuk menguji antarmuka. <em>Backend AI sungguhan dan RAG live akan dihubungkan pada Fase 3.</em>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-2">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          const isSystem = msg.sender === "system";

          if (isSystem && msg.isCrisis) {
            return (
              <div key={msg.id} className="p-4 rounded-2xl bg-rose-50 border border-rose-300 shadow-sm space-y-3 text-rose-950 animate-in fade-in">
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
                    Telepon 119 ext 8 (SEJIWA Kemenkes)
                  </a>
                  <a
                    href="tel:112"
                    className="px-3 py-1.5 rounded-xl bg-white text-rose-800 border border-rose-300 font-semibold text-xs flex items-center gap-1.5 hover:bg-rose-100"
                  >
                    Nomor Darurat 112
                  </a>
                  <Link href="/referrals">
                    <span className="px-3 py-1.5 rounded-xl bg-white text-brand-900 border border-brand-200 font-semibold text-xs inline-block hover:bg-brand-50">
                      Lihat Direktori Bantuan Manusia &rarr;
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
                {!isUser && msg.demoLabel && (
                  <div className="mb-2">
                    <Badge variant="demo" size="sm">
                      {msg.demoLabel}
                    </Badge>
                  </div>
                )}

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
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-text-muted p-3 bg-surface rounded-2xl border border-border-subtle shadow-neu-raised-sm w-fit animate-pulse">
            <Sparkles className="w-4 h-4 text-brand-600 animate-spin" />
            <span>Memproses skenario respons simulasi...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts */}
      {messages.length <= 1 && (
        <div className="space-y-1.5 shrink-0">
          <span className="text-[11px] font-semibold text-text-muted">Contoh topik demo:</span>
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
          Mode demo Fase 2. Bukan diagnosis dan bukan pengganti konseling profesional.
        </p>
      </div>
    </div>
  );
}
