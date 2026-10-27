"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  UserCheck,
  ShieldAlert,
  Building2,
  FileCheck2,
  Lock,
  ArrowRight,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput, NeuTextarea } from "@/components/ui/NeuInput";
import { NeuModal } from "@/components/ui/NeuModal";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

interface SupportTypeCategory {
  id: string;
  name: string;
  category: string;
  description: string;
  officialScope: string;
  configStatus: "belum_dikonfigurasi" | "terverifikasi_nasional";
}

const supportCategories: SupportTypeCategory[] = [
  {
    id: "sup-bk",
    name: "Guru Bimbingan dan Konseling (BK)",
    category: "Lingkungan Sekolah",
    description: "Pendampingan terkait masalah adaptasi sosial, hambatan belajar, hubungan pertemanan, dan rencana karier.",
    officialScope: "Ruang BK di sekolah masing-masing",
    configStatus: "belum_dikonfigurasi",
  },
  {
    id: "sup-peer",
    name: "Konselor Sebaya (PIK-R / Komunitas Remaja)",
    category: "Komunitas Remaja",
    description: "Rekan sebaya terlatih untuk mendengarkan, berbagi informasi life skills, dan mendiskusikan tantangan masa remaja.",
    officialScope: "Pusat Informasi & Konseling Remaja (PIK-R)",
    configStatus: "belum_dikonfigurasi",
  },
  {
    id: "sup-puskesmas",
    name: "Poli Kesehatan Peduli Remaja (PKPR)",
    category: "Layanan Kesehatan Primer",
    description: "Pemeriksaan fisik dan konseling psikologis dasar yang ramah remaja di fasilitas kesehatan tingkat pertama.",
    officialScope: "Puskesmas Kecamatan",
    configStatus: "belum_dikonfigurasi",
  },
  {
    id: "sup-ppa",
    name: "Layanan Perlindungan Perempuan & Anak (SAPA 129)",
    category: "Layanan Perlindungan Resmi",
    description: "Layanan resmi Kementerian PPPA untuk pengaduan, pendampingan hukum, dan perlindungan korban kekerasan anak/remaja.",
    officialScope: "Hotline Nasional SAPA 129 & UPTD PPA Daerah",
    configStatus: "terverifikasi_nasional",
  },
];

export default function ReferralsPage() {
  const { userName, userAgeRange, referralTickets, createReferralTicket } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<SupportTypeCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [shareAlias, setShareAlias] = useState(true);
  const [shareAge, setShareAge] = useState(true);
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  const handleOpenReferralModal = (category: SupportTypeCategory) => {
    setSelectedCategory(category);
    setSummaryText("Membutuhkan pendampingan seputar komunikasi keluarga dan rencana setelah lulus.");
    setIsModalOpen(true);
  };

  const handleCreateTicket = () => {
    if (!selectedCategory) return;

    createReferralTicket({
      type: selectedCategory.name,
      contactTarget: selectedCategory.officialScope,
      sharedData: {
        alias: shareAlias ? userName : "Anonim",
        ageRange: shareAge ? userAgeRange : "Dirahasiakan",
        summary: summaryText.trim(),
      },
    });

    setIsModalOpen(false);
    setTicketSuccess(selectedCategory.name);
    setTimeout(() => setTicketSuccess(null), 5000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="space-y-1 border-b border-border-subtle/80 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Pilihan Pendamping Manusia
        </span>
        <h1 className="text-2xl font-extrabold text-brand-900 tracking-tight">
          Cari pendamping
        </h1>
        <p className="text-xs text-text-muted">
          SELA bukan pengganti manusia. Saat masalahmu memerlukan penanganan nyata, hubungi pendamping resmi yang kompeten.
        </p>
      </div>

      {/* Emergency Hotline Alert */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 shadow-sm flex items-start gap-3 text-rose-950">
        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <strong className="block font-bold text-rose-900">Butuh bantuan darurat segera?</strong>
          <p className="leading-relaxed">
            Jika kamu sedang berada dalam bahaya, ancaman kekerasan, atau krisis mendesak: Hubungi <strong>Hotline SAPA 129</strong> (Telepon 129 / WhatsApp 08111-129-129) atau <strong>Hotline SEJIWA Kemenkes 119 ext 8</strong> (Gratis, 24 Jam).
          </p>
        </div>
      </div>

      {/* Transparent Disclaimer on No Fabricated Data */}
      <div className="p-3.5 rounded-xl bg-surface-inset border border-border-subtle/80 text-xs text-text-muted flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Prinsip Anti-Halusinasi:</strong> SELA tidak mengarang nama pendamping, nomor telepon pribadi, atau alamat fiktif. Rujukan lokal akan aktif setelah diverifikasi bersama sekolah mitra dan jejaring resmi komunitas remaja.
        </p>
      </div>

      {/* Success Notification */}
      {ticketSuccess && (
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-300 text-teal-950 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-teal-600 shrink-0" />
            <span>
              Tiket simulasi rujukan ke <strong>{ticketSuccess}</strong> berhasil dibuat dan tersimpan di bawah.
            </span>
          </div>
          <Badge variant="success" size="sm">
            Tersimpan di Sesi
          </Badge>
        </div>
      )}

      {/* Categories of Support */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-brand-900 uppercase tracking-wider">
          Jenis Dukungan yang Dapat Diakses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportCategories.map((item) => (
            <NeuCard key={item.id} variant="raised" className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold text-text-muted">{item.category}</span>
                  {item.configStatus === "terverifikasi_nasional" ? (
                    <Badge variant="verified" size="sm">
                      Nasional Terverifikasi
                    </Badge>
                  ) : (
                    <Badge variant="warning" size="sm">
                      Belum Dikonfigurasi
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-brand-900">{item.name}</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-surface-inset text-[11px] text-text-muted">
                  <strong>Lingkup Layanan:</strong> {item.officialScope}
                </div>
              </div>

              <div className="pt-2 border-t border-border-subtle/80 flex items-center justify-between">
                <span className="text-[11px] text-text-subtle">
                  {item.configStatus === "terverifikasi_nasional" ? "Layanan Resmi KemenPPPA" : "Perlu verifikasi sekolah"}
                </span>

                <NeuButton
                  size="sm"
                  variant="primary"
                  onClick={() => handleOpenReferralModal(item)}
                >
                  Simulasi Tiket Rujukan
                </NeuButton>
              </div>
            </NeuCard>
          ))}
        </div>
      </div>

      {/* Simulated Referral Tickets List */}
      {referralTickets.length > 0 && (
        <div className="space-y-3 pt-3 border-t border-border-subtle/80">
          <h2 className="text-sm font-bold text-brand-900 uppercase tracking-wider">
            Simulasi Tiket Rujukan Sesi Ini ({referralTickets.length})
          </h2>

          <div className="space-y-3">
            {referralTickets.map((t) => (
              <NeuCard key={t.id} variant="raised-sm" className="p-4 space-y-2 bg-surface">
                <div className="flex items-center justify-between border-b border-border-subtle/70 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-brand-900">{t.id}</span>
                    <Badge variant="prototype" size="sm">
                      Simulasi Prototipe
                    </Badge>
                  </div>
                  <span className="text-[11px] text-text-muted">{t.date}</span>
                </div>

                <div className="text-xs text-text-main space-y-1">
                  <p><strong>Jenis Layanan:</strong> {t.type} ({t.contactTarget})</p>
                  <p><strong>Identitas Dibagikan:</strong> Nama: {t.sharedData.alias} | Rentang Usia: {t.sharedData.ageRange}</p>
                  <p><strong>Ringkasan Kebutuhan:</strong> {t.sharedData.summary}</p>
                </div>

                <p className="text-[10px] text-text-muted italic pt-1">
                  * Catatan demonstrasi: Tiket ini dibuat sebagai simulasi alur rujukan. Isi percakapan tidak pernah dibagikan ke pihak ketiga secara otomatis.
                </p>
              </NeuCard>
            ))}
          </div>
        </div>
      )}

      {/* Modal Referral Simulator */}
      <NeuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Simulasi Alur Rujukan Pendamping"
        description={selectedCategory ? `Jenis rujukan: ${selectedCategory.name}` : ""}
        footer={
          <>
            <NeuButton variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Batal
            </NeuButton>
            <NeuButton variant="primary" size="sm" onClick={handleCreateTicket}>
              Buat Tiket Simulasi
            </NeuButton>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-surface-inset border border-border-subtle text-text-muted space-y-1.5">
            <span className="font-bold text-brand-900 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Prinsip Persetujuan Selektif
            </span>
            <p>
              Pilihlah informasi yang bersedia kamu bagikan kepada pendamping. Sistem tidak pernah membagikan riwayat obrolan lengkap secara otomatis.
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={shareAlias}
                onChange={(e) => setShareAlias(e.target.checked)}
                className="w-4 h-4 rounded text-brand-700"
              />
              <span className="text-brand-900 font-medium">Sertakan nama samaran ({userName})</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={shareAge}
                onChange={(e) => setShareAge(e.target.checked)}
                className="w-4 h-4 rounded text-brand-700"
              />
              <span className="text-brand-900 font-medium">Sertakan rentang usia ({userAgeRange})</span>
            </label>
          </div>

          <NeuTextarea
            label="Ringkasan kebutuhan (tulis secara singkat)"
            rows={3}
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
            placeholder="Tuliskan poin penting yang ingin kamu diskusikan dengan pendamping..."
          />
        </div>
      </NeuModal>
    </div>
  );
}
