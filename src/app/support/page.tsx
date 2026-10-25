"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  Building2,
  GraduationCap,
  Users,
  Heart,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  MessageCircle,
  Copy,
  Check,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useApp, SupportContact } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export default function SupportPathwayPage() {
  const { supportContacts, addSupportContact, deleteSupportContact } = useApp();

  const [activeCategory, setActiveCategory] = useState<
    "krisis" | "primer_bpjs" | "kampus_sekolah" | "komunitas" | "lingkaran_pribadi"
  >("krisis");

  // State for adding trusted personal contact
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactRole, setNewContactRole] = useState("");
  const [newContactCategory, setNewContactCategory] = useState<SupportContact["category"]>("sahabat");

  // State for copying starter lines
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim()) return;

    addSupportContact({
      name: newContactName.trim(),
      role: newContactRole.trim() || "Orang terpercaya",
      category: newContactCategory,
    });

    setNewContactName("");
    setNewContactRole("");
    setIsAddingContact(false);
  };

  const handleCopyLine = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const starterLines = [
    {
      target: "Saat Menemui Psikolog / Dokter di Puskesmas",
      line: "Selamat pagi/siang Dok/Kak. Ini pertama kalinya saya datang untuk berkonsultasi kesehatan mental. Akhir-akhir ini saya sering merasa cemas dan sulit tidur karena beban pikiran yang menumpuk.",
    },
    {
      target: "Saat Menemui Guru BK di Sekolah",
      line: "Permisi Bapak/Ibu, bolehkah saya meminta waktu sebentar untuk berkonsultasi pribadi? Ada beberapa kendala emosional dan tugas yang sedang membuat saya sangat kesulitan berkonsentrasi.",
    },
    {
      target: "Saat Menghubungi Hotline Darurat SEJIWA 119 ext 8",
      line: "Halo SEJIWA, saya merasa sangat kewalahan dengan beban pikiran saya saat ini dan butuh teman bicara yang aman untuk menenangkan diri.",
    },
    {
      target: "Saat Mulai Bicara dengan Sahabat Terpercaya",
      line: "Boleh luangkan waktu ngobrol berdua sebentar? Akhir-akhir ini aku lagi merasa berat banget dan pengen cerita tanpa dihakimi.",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2 animate-in fade-in duration-150">
      {/* Header */}
      <div className="border-b border-[#CCE1FF]/80 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7] px-2.5 py-0.5 rounded-full bg-[#EBF3FF]">
          Pilar 4 · Support Pathway
        </span>
        <h1 className="text-2xl font-extrabold text-[#17365D] tracking-tight mt-1">
          Peta Jalur Dukungan Nyata
        </h1>
        <p className="text-xs sm:text-sm text-[#17365D]/75 mt-0.5">
          Direktori bantuan krisis darurat, panduan konseling Puskesmas (BPJS), layanan kampus/sekolah, dan komunitas pendamping sebaya bebas biaya.
        </p>
      </div>

      {/* Free Access & Non-Paywall Commitment Banner */}
      <div className="p-4 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] flex items-start gap-3 text-xs text-[#17365D]">
        <ShieldCheck className="w-5 h-5 text-[#2457A7] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="block font-bold">Komitmen Akses Bantuan Terbuka (Zero Paywall)</strong>
          <p className="text-[#17365D]/80 leading-relaxed">
            Informasi kontak bantuan darurat, panduan faskes primer, dan nomor rujukan di halaman ini <strong>tidak akan pernah dikunci di balik biaya atau langganan apa pun</strong>. Keselamatan dan akses pertolongan adalah hak dasar setiap individu.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {[
          { key: "krisis", label: "Krisis Darurat (24 Jam)", icon: PhoneCall },
          { key: "primer_bpjs", label: "Puskesmas & BPJS", icon: Building2 },
          { key: "kampus_sekolah", label: "Kampus / Guru BK", icon: GraduationCap },
          { key: "komunitas", label: "Komunitas Sebaya", icon: Users },
          { key: "lingkaran_pribadi", label: `Lingkaran Terpercaya (${supportContacts.length})`, icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key as any)}
              className={cn(
                "px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap border transition-all flex items-center gap-1.5 shrink-0",
                isActive
                  ? "bg-[#2457A7] text-white border-[#2457A7] shadow-sm"
                  : "bg-[#F7FAFF] text-[#17365D] border-[#CCE1FF] hover:border-[#2457A7]/50"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. KRISIS DARURAT (24 JAM) */}
      {activeCategory === "krisis" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FFEBEB] border border-[#F5A9A9] text-xs text-[#B42332] flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Protokol Keselamatan Darurat:</strong>
              Jika kamu atau seseorang yang kamu kenal berada dalam bahaya fisik langsung, memiliki dorongan menyakiti diri, atau mengalami kekerasan, segera hubungi salah satu kontak darurat di bawah ini.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SEJIWA */}
            <div className="p-5 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFEBEB] text-[#B42332]">
                  Kemenkes RI · Bebas Pulsa
                </span>
                <span className="text-xs font-bold text-[#1F7A65]">24 Jam Aktif</span>
              </div>
              <h3 className="text-lg font-bold text-[#17365D]">SEJIWA — Hotline Kesehatan Jiwa</h3>
              <p className="text-xs text-[#17365D]/80 leading-relaxed">
                Layanan konseling darurat psikologis awal dan pencegahan krisis kejiwaan nasional yang dikelola oleh Kementerian Kesehatan RI bekerja sama dengan Himpunan Psikologi Indonesia (HIMPSI).
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="tel:119"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2457A7] text-white text-xs font-semibold hover:bg-[#1C4477] transition-all shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Telepon 119 (ext 8)
                </a>
                <span className="text-xs text-[#17365D]/60">Tekan 119, lalu tekan angka 8</span>
              </div>
            </div>

            {/* SAPA 129 */}
            <div className="p-5 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF3FF] text-[#2457A7]">
                  KemenPPPA RI · Perlindungan
                </span>
                <span className="text-xs font-bold text-[#1F7A65]">24 Jam Aktif</span>
              </div>
              <h3 className="text-lg font-bold text-[#17365D]">SAPA 129 — Perlindungan Perempuan &amp; Anak</h3>
              <p className="text-xs text-[#17365D]/80 leading-relaxed">
                Layanan pengaduan dan penanganan korban kekerasan fisik, psikis, penelantaran, atau pelecehan terhadap anak dan perempuan dari Kementerian PPPA RI.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <a
                  href="tel:129"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2457A7] text-white text-xs font-semibold hover:bg-[#1C4477] transition-all shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Telepon 129
                </a>
                <a
                  href="https://wa.me/628111129129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1F7A65] text-white text-xs font-semibold hover:bg-[#18604F] transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp 08111-129-129
                </a>
              </div>
            </div>

            {/* Halo Kemenkes */}
            <div className="p-5 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF3FF] text-[#2457A7]">
                Informasi Layanan Faskes
              </span>
              <h3 className="text-base font-bold text-[#17365D]">Halo Kemenkes (1500-567)</h3>
              <p className="text-xs text-[#17365D]/80 leading-relaxed">
                Pusat informasi resmi faskes rumah sakit jiwa, puskesmas dengan poli kesehatan jiwa, dan jadwal dokter spesialis kedokteran jiwa (Sp.KJ) di kotamu.
              </p>
              <a
                href="tel:1500567"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2457A7] hover:underline pt-1"
              >
                <PhoneCall className="w-3 h-3" /> Hubungi 1500-567 →
              </a>
            </div>

            {/* Bantuan Kegawatdaruratan Umum */}
            <div className="p-5 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF3FF] text-[#2457A7]">
                Darurat Medis / Ambulans
              </span>
              <h3 className="text-base font-bold text-[#17365D]">Layanan Ambulans Darurat (118 / 119)</h3>
              <p className="text-xs text-[#17365D]/80 leading-relaxed">
                Bantuan penjemputan medis darurat untuk cedera fisik, overdosis, atau situasi yang mengancam nyawa ke instalasi gawat darurat (IGD) terdekat.
              </p>
              <a
                href="tel:119"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#2457A7] hover:underline pt-1"
              >
                <PhoneCall className="w-3 h-3" /> Telepon 119 →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. PUSKESMAS & BPJS KESEHATAN */}
      {activeCategory === "primer_bpjs" && (
        <div className="space-y-5">
          <div className="bg-[#F7FAFF] p-6 sm:p-8 rounded-3xl border border-[#CCE1FF] shadow-sm space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                Panduan Layanan Primer
              </span>
              <h2 className="text-xl font-bold text-[#17365D] mt-1">
                Cara Konseling ke Puskesmas Menggunakan BPJS Kesehatan (Gratis)
              </h2>
              <p className="text-xs text-[#17365D]/80 mt-1">
                Banyak puskesmas di Indonesia kini memiliki psikolog klinis atau dokter umum yang dilatih dalam skrining kesehatan mental (SRQ-20) tanpa biaya tambahan bagi peserta BPJS aktif.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-[#CCE1FF] space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-[#2457A7] text-white flex items-center justify-center font-bold text-xs">1</span>
                <strong className="block text-[#17365D]">Cek Faskes 1</strong>
                <p className="text-[#17365D]/75 text-[11px] leading-relaxed">
                  Buka aplikasi Mobile JKN atau lihat kartu BPJS-mu untuk memastikan nama Puskesmas atau Klinik Pratama Faskes Tingkat 1.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#CCE1FF] space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-[#2457A7] text-white flex items-center justify-center font-bold text-xs">2</span>
                <strong className="block text-[#17365D]">Daftar ke Loket</strong>
                <p className="text-[#17365D]/75 text-[11px] leading-relaxed">
                  Bawa KTP/Kartu Pelajar dan kartu BPJS. Sampaikan ingin mendaftar ke <em>Poli Psikologi</em> atau <em>Poli Umum</em> untuk konsultasi kesehatan mental.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#CCE1FF] space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-[#2457A7] text-white flex items-center justify-center font-bold text-xs">3</span>
                <strong className="block text-[#17365D]">Sesi Konseling</strong>
                <p className="text-[#17365D]/75 text-[11px] leading-relaxed">
                  Konsultasikan keluhanmu secara tenang. Kamu boleh memperlihatkan Kartu Cerita SELA.AI sebagai contekan jika merasa gugup.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#CCE1FF] space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-[#2457A7] text-white flex items-center justify-center font-bold text-xs">4</span>
                <strong className="block text-[#17365D]">Rujukan Lanjutan</strong>
                <p className="text-[#17365D]/75 text-[11px] leading-relaxed">
                  Bila memerlukan penanganan lebih lanjut dari dokter psikiater (Sp.KJ), dokter Puskesmas akan menerbitkan surat rujukan berjenjang ke RSUD tanpa biaya.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. KAMPUS & SEKOLAH */}
      {activeCategory === "kampus_sekolah" && (
        <div className="space-y-4">
          <div className="bg-[#F7FAFF] p-6 rounded-3xl border border-[#CCE1FF] shadow-sm space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
              Layanan Institusi Pendidikan
            </span>
            <h2 className="text-xl font-bold text-[#17365D]">
              Pusat Konseling Universitas &amp; Guru BK Sekolah
            </h2>
            <p className="text-xs text-[#17365D]/80 leading-relaxed">
              Bimbingan dan Konseling (BK) di sekolah serta Unit Konseling Mahasiswa (PKM / UPT Bimbingan Konseling) di kampus disediakan khusus untuk membantu mahasiswa dan siswa menghadapi stres akademik, adaptasi sosial, maupun masalah keluarga tanpa biaya.
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-[#CCE1FF] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#1F7A65] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#17365D]">Kerahasiaan Dijamin Kode Etik:</strong> Guru BK dan konselor kampus terikat etika kerahasiaan (*confidentiality*). Ceritamu tidak akan diumumkan di kelas.
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#CCE1FF] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#1F7A65] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#17365D]">Bukan Tempat Siswa Bermasalah:</strong> BK modern bertugas mendampingi potensi dan kesejahteraan emosional, bukan sekadar penertiban kedisiplinan.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. KOMUNITAS SEBAYA */}
      {activeCategory === "komunitas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF3FF] text-[#2457A7]">
              Pencegahan Bunuh Diri &amp; Advokasi
            </span>
            <h3 className="text-base font-bold text-[#17365D]">Into The Light Indonesia</h3>
            <p className="text-xs text-[#17365D]/80 leading-relaxed">
              Organisasi berbasis orang muda yang fokus pada edukasi kesehatan jiwa, penghapusan stigma, dan panduan pertolongan pertama pada krisis bunuh diri.
            </p>
            <a
              href="https://www.intothelightid.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2457A7] hover:underline pt-1"
            >
              Kunjungi intothelightid.org <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-5 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF3FF] text-[#2457A7]">
              Pemulihan Trauma &amp; Psikososial
            </span>
            <h3 className="text-base font-bold text-[#17365D]">Yayasan Pulih</h3>
            <p className="text-xs text-[#17365D]/80 leading-relaxed">
              Lembaga nirlaba yang berfokus pada penanganan trauma psikologis, kesehatan mental remaja, dan konseling psikososial terjangkau.
            </p>
            <a
              href="https://yayasanpulih.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2457A7] hover:underline pt-1"
            >
              Kunjungi yayasanpulih.org <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* 5. LINGKARAN TERPERCAYA PRIBADI */}
      {activeCategory === "lingkaran_pribadi" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#17365D]">Daftar Kontak Terdekatmu</h2>
              <p className="text-xs text-[#17365D]/75">
                Daftar orang terpercaya yang bisa kamu hubungi saat membutuhkan telinga untuk mendengarkan.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingContact(!isAddingContact)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#2457A7] text-white text-xs font-semibold hover:bg-[#1C4477] transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              {isAddingContact ? "Batal" : "Tambah Kontak"}
            </button>
          </div>

          {isAddingContact && (
            <form onSubmit={handleAddContactSubmit} className="p-4 rounded-2xl bg-white border border-[#CCE1FF] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="Nama / Panggilan"
                  className="rounded-xl border border-[#CCE1FF] px-3 py-2 text-xs text-[#17365D] focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                />
                <input
                  type="text"
                  value={newContactRole}
                  onChange={(e) => setNewContactRole(e.target.value)}
                  placeholder="Peran (mis. Sahabat dekat / Kakak)"
                  className="rounded-xl border border-[#CCE1FF] px-3 py-2 text-xs text-[#17365D] focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                />
                <select
                  value={newContactCategory}
                  onChange={(e) => setNewContactCategory(e.target.value as any)}
                  className="rounded-xl border border-[#CCE1FF] px-3 py-2 text-xs text-[#17365D] focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
                >
                  <option value="sahabat">Sahabat</option>
                  <option value="keluarga">Keluarga</option>
                  <option value="sekolah">Sekolah / Kampus</option>
                  <option value="profesional">Konselor / Tenaga Ahli</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#2457A7] text-white text-xs font-semibold hover:bg-[#1C4477] shadow-sm"
              >
                Simpan Kontak
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {supportContacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 rounded-2xl bg-white border border-[#CCE1FF] shadow-sm flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <strong className="block text-[#17365D] font-bold">{contact.name}</strong>
                  <span className="text-[#17365D]/70">{contact.role}</span>
                </div>
                <button
                  type="button"
                  onClick={() => deleteSupportContact(contact.id)}
                  className="p-1 text-[#B42332] hover:text-[#8e1b27]"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INTERACTIVE CHEAT SHEET: FIRST WORDS WHEN MEETING PROFESSIONAL */}
      <div className="p-6 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
            Alat Bantu Praktis
          </span>
          <h2 className="text-lg font-bold text-[#17365D] mt-0.5">
            Contekan Kalimat Pertama saat Menemui Tenaga Bantuan
          </h2>
          <p className="text-xs text-[#17365D]/75">
            Merasa gugup atau tidak tahu harus mulai dari mana adalah hal yang sangat wajar. Kamu boleh menyalin kalimat ini ke gawaimu atau membacanya langsung saat pertama kali duduk bersama mereka.
          </p>
        </div>

        <div className="space-y-3">
          {starterLines.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-[#CCE1FF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2457A7] block">
                  {item.target}:
                </span>
                <p className="text-[#17365D] italic font-medium leading-relaxed">
                  &ldquo;{item.line}&rdquo;
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopyLine(item.line, idx)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#CCE1FF] bg-[#F7FAFF] hover:bg-[#EBF3FF] text-[11px] font-semibold text-[#17365D] shrink-0 self-start sm:self-auto shadow-sm"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#1F7A65]" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#2457A7]" />
                    <span>Salin Kalimat</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
