"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Send,
  Sparkles,
  ShieldAlert,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Lock,
  Layers,
  Heart,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuModal } from "@/components/ui/NeuModal";
import { Badge } from "@/components/ui/Badge";
import { SourceCitation } from "@/components/chat/SourceCitation";
import { useApp, StoryCard } from "@/context/AppContext";
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

const feelingsOptions = [
  "Cemas akan masa depan",
  "Takut mengecewakan",
  "Lelah mental & kewalahan",
  "Merasa bersalah",
  "Bingung mengambil keputusan",
  "Takut disalahkan / dimarahi",
  "Malu mengakui kesulitan",
  "Merasa sendiri",
];

const starterPrompts = [
  "Aku merasa tertekan karena jurusanku kurang cocok, tapi orang tua berharap tinggi.",
  "Tugas minggu ini menumpuk dan aku kurang tidur, tapi takut izin ke dosen.",
  "Hubunganku dengan sahabat merenggang karena salah paham yang belum dibahas.",
  "Aku sering merasa apa pun yang kukerjakan belum cukup baik buat keluarga.",
];

export default function SafeStoryPage() {
  const router = useRouter();
  const { userName, addStoryCard, setActiveStoryCard, isAiConfigured, checkAiConfiguration } = useApp();

  const [activeTab, setActiveTab] = useState<"guided_steps" | "free_chat">("guided_steps");

  // State for Guided Steps Mode
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [targetPerson, setTargetPerson] = useState<StoryCard["targetPerson"]>("Orang Tua");
  const [title, setTitle] = useState("");
  const [facts, setFacts] = useState("");
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [customFeelings, setCustomFeelings] = useState("");
  const [needs, setNeeds] = useState("");
  const [openingLine, setOpeningLine] = useState("");
  const [isCreatedSuccess, setIsCreatedSuccess] = useState(false);

  // State for Free Chat Mode
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: `Halo ${userName}. Tulis apa saja yang sedang terasa mengganjal di pikiranmu, santai dan tanpa terburu-buru.`,
      timestamp: "Baru saja",
      isAiGenerated: false,
      statusBadge: "Pojokan Tenang",
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

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings((prev) =>
      prev.includes(feeling) ? prev.filter((f) => f !== feeling) : [...prev, feeling]
    );
  };

  const handleSaveToStoryCard = () => {
    const finalFeelings = [
      ...selectedFeelings,
      ...(customFeelings.trim() ? [customFeelings.trim()] : []),
    ].join(", ") || "Belum ditentukan";

    const newCard = addStoryCard({
      title: title.trim() || `Cerita: Bicara dengan ${targetPerson}`,
      facts: facts.trim() || "Fakta situasi belum dirumuskan.",
      feelings: finalFeelings,
      needs: needs.trim() || "Didengarkan dan dipahami dengan tenang.",
      openingLine:
        openingLine.trim() ||
        `Boleh aku minta waktu sebentar untuk membicarakan hal yang sedang mengganjal pikiranku?`,
      targetPerson,
    });

    setActiveStoryCard(newCard);
    setIsCreatedSuccess(true);
    setTimeout(() => {
      router.push("/journal");
    }, 1200);
  };

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
            isAiGenerated: false,
            statusBadge: "Protokol Keselamatan",
          },
        ]);
      } else if (data.status === "clinical_refusal") {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "system",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
            sources: data.sources,
            isAiGenerated: false,
            statusBadge: data.statusBadge || "Batas Nonklinis SELA.AI",
          },
        ]);
      } else if (data.status === "api_unconfigured") {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            sender: "ai",
            text: `${data.reply}\n\n${data.ragContext ? `"${data.ragContext}"` : "Tidak ada materi khusus untuk topik ini di penyimpanan lokal."}`,
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
            statusBadge: data.hasGroundedSources ? "Rujukan Terverifikasi" : "Refleksi Empatik",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "system",
          text: "Tidak dapat terhubung ke server. Periksa jaringan lokalmu.",
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

    executeSend(text);
  };

  const handleConfirmConsent = () => {
    sessionStorage.setItem("sela_chat_consent", "true");
    setIsConsentModalOpen(false);
    if (pendingMessage) {
      executeSend(pendingMessage);
      setPendingMessage("");
    }
  };

  const handleConvertChatToCard = () => {
    const userTexts = messages.filter((m) => m.sender === "user").map((m) => m.text);
    const combinedFacts = userTexts.length > 0 ? userTexts.join(" ") : "Refleksi obrolan bebas dengan SELA.AI";

    const newCard = addStoryCard({
      title: `Cerita dari Refleksi Chat (${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short" })})`,
      facts: combinedFacts.substring(0, 300),
      feelings: "Merasa cemas dan membutuhkan kejelasan arah",
      needs: "Didengarkan dan dipahami tanpa terburu-buru dihakimi",
      openingLine: "Ada hal penting yang ingin aku ceritakan secara terbuka saat kamu ada waktu senggang.",
      targetPerson: "Orang Tua",
    });

    setActiveStoryCard(newCard);
    router.push("/journal");
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto py-2">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#C6DCF5] pb-4">
        <div>
          <span className="font-mono-num text-xs font-semibold text-[#1E56A0] block mb-0.5">
            Tahap 01 — Guided Story
          </span>
          <h1 className="font-display-serif text-2xl sm:text-3xl font-medium text-[#102542]">
            Urai Cerita Pribadi
          </h1>
          <p className="text-xs sm:text-sm text-[#2B4566] mt-0.5">
            Rapikan uneg-uneg ke dalam 4 bagian Kartu Cerita sebelum kamu bicara.
          </p>
        </div>

        {/* Mode Selector Groove */}
        <div className="sky-groove flex items-center gap-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("guided_steps")}
            className={cn(
              "px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5",
              activeTab === "guided_steps"
                ? "bg-[#FAFDFE] text-[#102542] shadow-sm border border-[#9AC0EB]"
                : "text-[#2B4566] hover:text-[#102542]"
            )}
          >
            <Layers className="w-3.5 h-3.5 text-[#1E56A0]" />
            Langkah Terpadu
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("free_chat")}
            className={cn(
              "px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5",
              activeTab === "free_chat"
                ? "bg-[#FAFDFE] text-[#102542] shadow-sm border border-[#9AC0EB]"
                : "text-[#2B4566] hover:text-[#102542]"
            )}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#1E56A0]" />
            Obrolan Reflektif
          </button>
        </div>
      </div>

      {/* Safety & Non-Clinical Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-[#F7FAFF] border border-[#CCE1FF] flex items-start gap-3 text-xs text-[#17365D]/80">
        <AlertCircle className="w-4 h-4 text-[#2457A7] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Ruang Nonklinis Aman:</strong> Cerita yang kamu tulis tidak akan dihakimi atau dinilai. SELA.AI tidak membuat diagnosis medis. Jika situasi melibatkan bahaya fisik atau krisis darurat, silakan segera akses saluran bantuan bebas biaya di pojok kanan bawah atau hubungi <strong>119 ext 8 (SEJIWA)</strong>.
        </p>
      </div>

      {/* TAB 1: GUIDED STEPS WORKFLOW */}
      {activeTab === "guided_steps" && (
        <div className="space-y-6">
          {/* Step Progress Bar */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { num: 1, label: "1. Lawan Bicara & Fakta" },
              { num: 2, label: "2. Emosi yang Dirasa" },
              { num: 3, label: "3. Kebutuhan Nyata" },
              { num: 4, label: "4. Kalimat Pembuka" },
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num as any)}
                className={cn(
                  "py-2 px-2 text-center rounded-xl text-xs font-medium border transition-all truncate",
                  step === s.num
                    ? "bg-[#2457A7] text-white border-[#2457A7] shadow-sm font-semibold"
                    : step > s.num
                    ? "bg-[#EBF3FF] text-[#2457A7] border-[#CCE1FF]"
                    : "bg-[#F7FAFF] text-[#17365D]/50 border-[#CCE1FF]/70"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Step Container Card */}
          <div className="bg-[#F7FAFF] p-6 sm:p-8 rounded-3xl border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)]">
            {/* STEP 1: Target Person & Facts */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                    Langkah 1 dari 4
                  </span>
                  <h2 className="text-xl font-bold text-[#17365D] mt-1">
                    Dengan siapa kamu berencana berbicara, dan apa yang sedang terjadi?
                  </h2>
                  <p className="text-xs text-[#17365D]/75 mt-1">
                    Tuliskan fakta secara objektif seperti apa adanya, tanpa menyalahkan dirimu sendiri.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-2">
                    Lawan Bicara yang Ingin Dihadapi:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(["Orang Tua", "Guru / Dosen", "Teman Sebaya", "Konselor Profesional"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setTargetPerson(p)}
                        className={cn(
                          "p-3 rounded-2xl border text-xs font-semibold text-center transition-all",
                          targetPerson === p
                            ? "bg-[#2457A7] text-white border-[#2457A7] shadow-sm"
                            : "bg-white text-[#17365D] border-[#CCE1FF] hover:border-[#2457A7]/50"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                    Judul Singkat Cerita (Opsional):
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Diskusi Nilai & Jurusan dengan Orang Tua"
                    className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                    Fakta Situasi yang Terjadi:
                  </label>
                  <textarea
                    rows={4}
                    value={facts}
                    onChange={(e) => setFacts(e.target.value)}
                    placeholder="Contoh: Minggu lalu orang tua menanyakan rencana karirku. Aku merasa jurusanku saat ini tidak cocok dan nilaiku menurun, tapi aku belum berani terus terang karena mereka sudah banyak berkorban."
                    className="w-full rounded-2xl bg-white border border-[#CCE1FF] p-4 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7] leading-relaxed"
                  />
                  <span className="text-[11px] text-[#17365D]/60 mt-1 block">
                    Fokus pada peristiwa nyata: apa yang dikatakan, apa yang terjadi, dan kapan terjadi.
                  </span>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#2457A7] text-white text-xs font-semibold hover:bg-[#1C4477] transition-all shadow-md"
                  >
                    Lanjut: Kenali Perasaanmu
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Emotions Identification */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                    Langkah 2 dari 4
                  </span>
                  <h2 className="text-xl font-bold text-[#17365D] mt-1">
                    Saat memikirkan situasi itu, apa yang sebenarnya terasa di hatimu?
                  </h2>
                  <p className="text-xs text-[#17365D]/75 mt-1">
                    Pilih satu atau beberapa emosi yang mewakili beban perasaanmu saat ini.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {feelingsOptions.map((feeling) => {
                    const isSelected = selectedFeelings.includes(feeling);
                    return (
                      <button
                        key={feeling}
                        type="button"
                        onClick={() => toggleFeeling(feeling)}
                        className={cn(
                          "px-4 py-2.5 rounded-2xl border text-xs font-medium transition-all flex items-center gap-1.5",
                          isSelected
                            ? "bg-[#2457A7] text-white border-[#2457A7] shadow-sm font-semibold"
                            : "bg-white text-[#17365D] border-[#CCE1FF] hover:border-[#2457A7]/40"
                        )}
                      >
                        <Heart className={cn("w-3.5 h-3.5", isSelected ? "text-white" : "text-[#2457A7]")} />
                        {feeling}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                    Tambahan Perasaan Lain (Jika ada):
                  </label>
                  <input
                    type="text"
                    value={customFeelings}
                    onChange={(e) => setCustomFeelings(e.target.value)}
                    placeholder="Contoh: Merasa sesak di dada saat memikirkannya"
                    className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-full border border-[#CCE1FF] text-xs font-semibold text-[#17365D]/80 hover:bg-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Kembali
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#2457A7] text-white text-xs font-semibold hover:bg-[#1C4477] transition-all shadow-md"
                  >
                    Lanjut: Kebutuhanmu
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Needs Identification */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                    Langkah 3 dari 4
                  </span>
                  <h2 className="text-xl font-bold text-[#17365D] mt-1">
                    Apa yang sebenarnya paling kamu harapkan dari percakapan itu nanti?
                  </h2>
                  <p className="text-xs text-[#17365D]/75 mt-1">
                    Bukan berarti semua harapan pasti langsung terwujud, tetapi mengetahui kebutuhanmu membuatmu lebih jelas saat berbicara.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Hanya ingin didengarkan dulu tanpa langsung diceramahi",
                    "Meminta izin mengeksplorasi opsi alternatif secara terbuka",
                    "Meminta dispensasi tenggat waktu dengan rencana konkret",
                    "Meminta bantuan atau arahan tanpa rasa malu",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setNeeds(preset)}
                      className={cn(
                        "p-3.5 rounded-2xl border text-xs text-left transition-all",
                        needs === preset
                          ? "bg-[#EBF3FF] border-[#2457A7] text-[#17365D] font-semibold"
                          : "bg-white border-[#CCE1FF] text-[#17365D]/85 hover:border-[#2457A7]/40"
                      )}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                    Tuliskan Kebutuhan Spesifikmu:
                  </label>
                  <textarea
                    rows={3}
                    value={needs}
                    onChange={(e) => setNeeds(e.target.value)}
                    placeholder="Contoh: Aku butuh orang tuaku memahami bahwa aku tetap berusaha, dan aku butuh waktu 1 semester untuk memperbaiki nilai tanpa paksaan langsung pindah jurusan."
                    className="w-full rounded-2xl bg-white border border-[#CCE1FF] p-4 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7] leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-full border border-[#CCE1FF] text-xs font-semibold text-[#17365D]/80 hover:bg-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Kembali
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#2457A7] text-white text-xs font-semibold hover:bg-[#1C4477] transition-all shadow-md"
                  >
                    Lanjut: Susun Kalimat Pembuka
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Opening Line Formulation & Final Card Generation */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                    Langkah 4 dari 4
                  </span>
                  <h2 className="text-xl font-bold text-[#17365D] mt-1">
                    Susun Kalimat Pembuka Siap Pakai
                  </h2>
                  <p className="text-xs text-[#17365D]/75 mt-1">
                    Kalimat pertama yang tenang dan tidak menuduh akan membuka jalan percakapan yang jauh lebih aman.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                    Contoh Kalimat Asertif untuk {targetPerson}:
                  </label>
                  <div className="space-y-2">
                    {[
                      targetPerson === "Orang Tua"
                        ? "Ayah/Ibu, ada hal penting tentang perkuliahan yang pengen aku ceritain dengan tenang saat Ayah/Ibu ada waktu senggang."
                        : targetPerson === "Guru / Dosen"
                        ? "Selamat pagi Bapak/Ibu, mohon izin meminta waktu sebentar untuk berkonsultasi mengenai kendala dan progres pengerjaan tugas saya."
                        : targetPerson === "Teman Sebaya"
                        ? "Boleh ngobrol sebentar berdua? Ada yang kepikiran di kepalaku dan pengen aku lurusin biar hubungan kita tetap nyaman."
                        : "Halo Kak/Bapak/Ibu, ini pertama kalinya saya berkonsultasi. Saya ingin mengurai beberapa hal yang sedang terasa mengganjal.",
                    ].map((sample) => (
                      <div
                        key={sample}
                        onClick={() => setOpeningLine(sample)}
                        className="p-3 rounded-2xl bg-white border border-[#CCE1FF] text-xs text-[#17365D] cursor-pointer hover:border-[#2457A7] transition-all"
                      >
                        <span className="text-[10px] text-[#2457A7] font-bold block mb-0.5">Klik untuk Gunakan:</span>
                        &ldquo;{sample}&rdquo;
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                    Sesuaikan Kalimat Pembukamu Sendiri:
                  </label>
                  <textarea
                    rows={3}
                    value={openingLine}
                    onChange={(e) => setOpeningLine(e.target.value)}
                    placeholder="Tulis kalimat yang paling nyaman diucapkan oleh bibirmu..."
                    className="w-full rounded-2xl bg-white border border-[#CCE1FF] p-4 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7] leading-relaxed"
                  />
                </div>

                {/* Live Card Preview Box */}
                <div className="p-4 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2457A7] block">
                    Pratinjau Kartu Cerita yang Akan Dibuat:
                  </span>
                  <div className="text-xs text-[#17365D] space-y-1">
                    <p><strong>Lawan Bicara:</strong> {targetPerson}</p>
                    <p className="line-clamp-2"><strong>Fakta:</strong> {facts || "Belum diisi"}</p>
                    <p><strong>Perasaan:</strong> {selectedFeelings.join(", ") || customFeelings || "Belum dipilih"}</p>
                    <p className="line-clamp-1"><strong>Kebutuhan:</strong> {needs || "Belum diisi"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-full border border-[#CCE1FF] text-xs font-semibold text-[#17365D]/80 hover:bg-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Kembali
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveToStoryCard}
                    disabled={isCreatedSuccess}
                    className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-[#1F7A65] hover:bg-[#18604F] text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
                  >
                    {isCreatedSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        Kartu Tersimpan! Membuka...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        Simpan &amp; Buat Kartu Cerita
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FREE CHAT REFLECTION */}
      {activeTab === "free_chat" && (
        <div className="flex flex-col h-[calc(100vh-230px)] space-y-3">
          {/* Action to convert free chat to Story Card */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] text-[#17365D]/70">
              Bercerita bebas di ruang refleksi SELA.
            </span>
            <button
              type="button"
              onClick={handleConvertChatToCard}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2457A7] hover:underline"
            >
              <FileText className="w-3.5 h-3.5" />
              Ekstrak Obrolan Ini ke Kartu Cerita →
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0 bg-[#F7FAFF] p-4 rounded-3xl border border-[#CCE1FF] shadow-inner">
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
                        ? "bg-[#FFEBEB] border-[#F5A9A9] text-[#B42332]"
                        : "bg-white border-[#CCE1FF] text-[#17365D]"
                    )}
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      <ShieldAlert className="w-4 h-4 text-[#B42332]" />
                      <span>{msg.statusBadge || "Pemberitahuan Sistem"}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    {msg.isCrisis && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        <a
                          href="tel:119"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#B42332] text-white font-semibold text-xs shadow-sm hover:bg-[#8e1b27]"
                        >
                          Hubungi 119 ext 8 (SEJIWA)
                        </a>
                        <Link
                          href="/support"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#F5A9A9] text-[#B42332] font-semibold text-xs hover:bg-[#FFEBEB]"
                        >
                          Lihat Support Pathway
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
                        ? "bg-[#2457A7] text-white shadow-sm rounded-br-none"
                        : "bg-white border border-[#CCE1FF] shadow-sm text-[#17365D] rounded-bl-none"
                    )}
                  >
                    {!isUser && msg.statusBadge && (
                      <div className="mb-2">
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EBF3FF] text-[#2457A7]">
                          {msg.statusBadge}
                        </span>
                      </div>
                    )}

                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {msg.sources && msg.sources.length > 0 && (
                      <SourceCitation sources={msg.sources} />
                    )}
                  </div>

                  <span className="text-[10px] text-[#17365D]/50 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#17365D]/75 p-3 bg-white rounded-2xl border border-[#CCE1FF] shadow-sm w-fit animate-pulse">
                <Sparkles className="w-4 h-4 text-[#2457A7] animate-spin" />
                <span>Merumuskan refleksi terpandu...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter prompt pills */}
          {messages.length <= 1 && (
            <div className="space-y-1.5 shrink-0">
              <span className="text-[11px] font-semibold text-[#17365D]/60">Pilih contoh situasi awal:</span>
              <div className="flex flex-wrap gap-2">
                {starterPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    className="px-3 py-1.5 rounded-xl bg-white text-xs text-[#17365D] border border-[#CCE1FF] shadow-sm hover:border-[#2457A7] text-left transition-all"
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
                  placeholder="Ketikkan apa yang sedang mengganjal pikiranmu..."
                  maxLength={1000}
                  disabled={isLoading}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-white shadow-inner text-[#17365D] border border-[#CCE1FF] focus:outline-none focus:ring-2 focus:ring-[#2457A7] placeholder:text-[#17365D]/40"
                />
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="shrink-0 px-4 py-3 min-h-[44px] rounded-2xl bg-[#2457A7] text-white hover:bg-[#1C4477] transition-all disabled:opacity-40 shadow-sm"
                aria-label="Kirim pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Pre-flight Consent Modal */}
      <NeuModal
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
        title="Persetujuan Privasi Refleksi"
        description="SELA.AI menjaga kerahasiaan catatan refleksimu sebelum diproses."
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
        <div className="space-y-3 text-xs text-[#17365D]/80">
          <div className="p-3 rounded-xl bg-[#EBF3FF] border border-[#CCE1FF] space-y-1">
            <strong className="text-[#17365D] block flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#2457A7]" /> Sanitasi Data &amp; Privasi
            </strong>
            <p>
              Nomor kontak, nama lengkap, dan data identitas disamarkan otomatis sebelum teks diproses. Teks tidak digunakan untuk iklan atau pihak ketiga.
            </p>
          </div>
        </div>
      </NeuModal>
    </div>
  );
}
