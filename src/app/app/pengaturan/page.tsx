"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  Lock,
  Download,
  Trash2,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Mail,
  RefreshCw,
  Sparkles,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { AgeBand } from "@/types/auth";

export default function PengaturanAkunPage() {
  const { user, updateProfile, updateConsent, logout, deleteAccount } = useAuth();
  const { journalEntries, supportContacts, growthTasks } = useApp();

  const [displayName, setDisplayName] = useState(user?.displayName || "Alex");
  const [ageBand, setAgeBand] = useState<AgeBand>(user?.ageBand || "15-18 tahun");
  const [aiConsent, setAiConsent] = useState(user?.consent?.aiProcessingConsent ?? true);
  const [marketingOptIn, setMarketingOptIn] = useState(user?.consent?.marketingOptIn ?? false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await updateProfile({
      displayName: displayName.trim() || "Kawan",
      ageBand,
    });
    await updateConsent({
      aiProcessingConsent: aiConsent,
      marketingOptIn,
    });

    setIsSaving(false);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 3000);
  };

  const handleExportData = () => {
    const exportPayload = {
      profile: {
        id: user?.id,
        displayName: user?.displayName,
        email: user?.email,
        ageBand: user?.ageBand,
        plan: user?.plan,
        createdAt: user?.createdAt,
      },
      consents: user?.consent,
      exportedAt: new Date().toISOString(),
      disclaimer: "Data ini adalah salinan catatan lokal SELA.AI milik pengguna.",
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sela-data-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    await deleteAccount();
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-2 text-[#17365D]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border-subtle/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17365D]">
            Pengaturan Akun &amp; Privasi
          </h1>
          <p className="mt-1 text-sm text-[#17365D]/75">
            Kontrol profil, status persetujuan, ekspor catatan, dan keamanan datamu.
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#CCE1FF] bg-white text-xs font-semibold text-[#B42332] hover:bg-[#FFEBEB] transition-colors shadow-sm self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar (Logout)</span>
        </button>
      </div>

      {saveNotice && (
        <div className="p-4 rounded-2xl bg-[#E6F4EA] border border-[#B7E1CD] text-xs sm:text-sm text-[#1F7A65] flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Profil dan preferensi privasimu berhasil diperbarui!</span>
        </div>
      )}

      {/* 0. Paket & Status Langganan */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2457A7]" />
            <h2 className="text-lg font-bold text-[#17365D]">Paket &amp; Kontribusi Supporter</h2>
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                user?.plan === "premium"
                  ? "bg-[#17365D] text-white"
                  : "bg-[#EBF3FF] text-[#2457A7] border border-[#CCE1FF]"
              }`}
            >
              {user?.plan === "premium" ? "Supporter Aktif ⭐" : "Paket Free"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#17365D]/75 max-w-lg leading-relaxed">
            {user?.plan === "premium"
              ? "Akunmu aktif sebagai SELA Supporter dengan kuota interaksi AI jauh lebih besar, kapasitas Kartu Cerita luas, dan akses penuh ke seluruh modul premium."
              : "Kamu menggunakan akses dasar SELA.AI. Bantuan darurat dan Support Pathway selalu dapat diakses gratis."}
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
          <Link
            href="/app/paket"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2457A7] text-white text-xs font-semibold hover:bg-[#1C4477] transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lihat Kuota &amp; Paket</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
          <Link
            href="/app/pembayaran"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-[#CCE1FF] bg-white text-xs font-semibold text-[#17365D] hover:bg-[#EBF3FF] transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Riwayat Transaksi</span>
          </Link>
        </div>
      </div>

      {/* 1. Profil Pengguna */}
      <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#CCE1FF]/70">
          <User className="w-5 h-5 text-[#2457A7]" />
          <h2 className="text-lg font-bold text-[#17365D]">Data Pengguna</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
              Alamat Email (Akun)
            </label>
            <input
              type="email"
              disabled
              value={user?.email || "alex@sela.ai"}
              className="w-full rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D]/70 cursor-not-allowed"
            />
            <span className="text-[11px] text-[#17365D]/60 mt-1 block">
              Status email: {user?.emailVerified ? "Terverifikasi ✓" : "Menunggu verifikasi"}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
              Nama Panggilan
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D] focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
            />
            <span className="text-[11px] text-[#17365D]/60 mt-1 block">
              Boleh nama samaran; digunakan untuk sapaan di ruang aplikasimu.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
              Kelompok Usia
            </label>
            <select
              value={ageBand}
              onChange={(e) => setAgeBand(e.target.value as AgeBand)}
              className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D] focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
            >
              <option value="15-18 tahun">15 – 18 tahun (Remaja)</option>
              <option value="19-24 tahun">19 – 24 tahun (Dewasa Muda)</option>
              <option value="Di atas 24 tahun">Di atas 24 tahun</option>
            </select>
          </div>
        </div>

        {/* 2. Status Persetujuan & Privasi */}
        <div className="pt-6 border-t border-[#CCE1FF]/70 space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#2457A7]" />
            <h2 className="text-lg font-bold text-[#17365D]">Status Persetujuan Dokumen</h2>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#CCE1FF] space-y-2 text-xs text-[#17365D]/85">
            <div className="flex justify-between items-center py-1 border-b border-[#CCE1FF]/40">
              <span>Ketentuan Layanan (Versi {user?.consent?.termsVersion || "2026.1"})</span>
              <span className="font-semibold text-[#1F7A65]">Disetujui ✓</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-[#CCE1FF]/40">
              <span>Pemberitahuan Privasi (Versi {user?.consent?.privacyVersion || "2026.1"})</span>
              <span className="font-semibold text-[#1F7A65]">Telah Dibaca ✓</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Persetujuan Orang Tua/Wali</span>
              <span className="text-[#17365D]/70 capitalize">{user?.consent?.guardianConsentStatus || "Skenario Demo"}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#17365D]">
              <input
                type="checkbox"
                checked={aiConsent}
                onChange={(e) => setAiConsent(e.target.checked)}
                className="mt-0.5 rounded text-[#2457A7] focus:ring-[#2457A7]"
              />
              <span>
                Izinkan pengiriman teks ke <strong>Google Gemini API</strong> saat menggunakan fitur AI SELA.AI.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#17365D]">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-0.5 rounded text-[#2457A7] focus:ring-[#2457A7]"
              />
              <span>
                Kirimkan materi edukasi resiliensi dan kabar rilis berkala ke email saya.
              </span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-[#CCE1FF]/70">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3 px-6 text-sm font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md disabled:opacity-50"
          >
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>

      {/* 3. Ekspor Data Pribadi */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-base font-bold text-[#17365D]">
            <Download className="w-4 h-4 text-[#2457A7]" />
            <h2>Ekspor Data SELA.AI</h2>
          </div>
          <p className="text-xs sm:text-sm text-[#17365D]/75 max-w-md leading-relaxed">
            Unduh salinan data profil dan persetujuan akunmu dalam format JSON standar.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportData}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#2457A7] bg-white text-xs font-semibold text-[#2457A7] hover:bg-[#EBF3FF] transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Unduh File Data (.json)</span>
        </button>
      </div>

      {/* 4. Danger Zone: Hapus Akun */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFF8F8] border border-[#F5A9A9] shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-base font-bold text-[#B42332]">
            <Trash2 className="w-4 h-4" />
            <h2>Hapus Akun &amp; Seluruh Data</h2>
          </div>
          <p className="text-xs sm:text-sm text-[#17365D]/75 max-w-md leading-relaxed">
            Menghapus profil, kartu cerita, dan riwayat akunmu secara permanen. Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#B42332] text-xs font-semibold text-white hover:bg-[#8F1A26] transition-colors shadow-sm"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Hapus Akun Saya</span>
        </button>
      </div>

      {/* Modal Konfirmasi Hapus Akun */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#CCE1FF] space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FFEBEB] text-[#B42332] flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#17365D]">Hapus Akun Permanen?</h3>
            <p className="text-xs sm:text-sm text-[#17365D]/80 leading-relaxed">
              Apakah kamu yakin ingin menghapus akun SELA.AI milikmu? Seluruh sesi dan data profil akan dibersihkan dari sistem.
            </p>
            <div className="pt-4 border-t border-[#CCE1FF]/70 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-full border border-[#CCE1FF] text-xs font-semibold text-[#17365D] hover:bg-[#F7FAFF]"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteAccount}
                className="px-5 py-2 rounded-full bg-[#B42332] text-xs font-semibold text-white hover:bg-[#8F1A26] disabled:opacity-50"
              >
                {isDeleting ? "Menghapus..." : "Ya, Hapus Sekarang"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
