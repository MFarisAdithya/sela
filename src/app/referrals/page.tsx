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
  ExternalLink,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput, NeuTextarea } from "@/components/ui/NeuInput";
import { NeuModal } from "@/components/ui/NeuModal";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

interface PartnerService {
  id: string;
  name: string;
  role: string;
  organization: string;
  coverage: string;
  isOfficial: boolean;
  contactChannel: string;
}

const partnerServices: PartnerService[] = [
  {
    id: "part-1",
    name: "Guru Bimbingan & Konseling (BK)",
    role: "Pendamping Perkembangan Siswa",
    organization: "Ruang BK Sekolah Menengah",
    coverage: "Siswa sekolah masing-masing",
    isOfficial: true,
    contactChannel: "Tatap muka langsung di sekolah",
  },
  {
    id: "part-2",
    name: "Konselor Sebaya Forum Genre / PIK-R",
    role: "Pendamping Remaja & Edukasi Sebaya",
    organization: "Forum Genre Provinsi Lampung & BKKBN",
    coverage: "Remaja 15-24 tahun",
    isOfficial: true,
    contactChannel: "Sekretariat Genre / Pusat Informasi Remaja",
  },
  {
    id: "part-3",
    name: "Poli Pelayanan Kesehatan Peduli Remaja (PKPR)",
    role: "Tenaga Medis & Konseling Dasar",
    organization: "Puskesmas Kecamatan",
    coverage: "Masyarakat umum & remaja wilayah kerja",
    isOfficial: true,
    contactChannel: "Fasilitas Kesehatan Tingkat Pertama (FKTP)",
  },
  {
    id: "part-4",
    name: "UPTD Perlindungan Perempuan & Anak (PPA)",
    role: "Layanan Krisis, Hukum & Psikososial",
    organization: "Dinas PPPA Provinsi Lampung",
    coverage: "Korban kekerasan anak & perempuan",
    isOfficial: true,
    contactChannel: "Hotline SAPA 129 / Kantor DP3A",
  },
];

export default function ReferralsPage() {
  const { userName, userAgeRange, referralTickets, createReferralTicket } = useApp();
  const [selectedPartner, setSelectedPartner] = useState<PartnerService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [shareAlias, setShareAlias] = useState(true);
  const [shareAge, setShareAge] = useState(true);
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  const handleOpenReferralModal = (partner: PartnerService) => {
    setSelectedPartner(partner);
    setSummaryText("Membutuhkan ruang bercerita seputar komunikasi keluarga dan rencana setelah lulus.");
    setIsModalOpen(true);
  };

  const handleCreateTicket = () => {
    if (!selectedPartner) return;

    createReferralTicket({
      type: selectedPartner.name,
      contactTarget: selectedPartner.organization,
      sharedData: {
        alias: shareAlias ? userName : "Anonim",
        ageRange: shareAge ? userAgeRange : "Dirahasiakan",
        summary: summaryText.trim(),
      },
    });

    setIsModalOpen(false);
    setTicketSuccess(selectedPartner.name);
    setTimeout(() => setTicketSuccess(null), 5000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="space-y-1 border-b border-border-subtle/80 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Pilihan Rujukan Resmi
        </span>
        <h1 className="text-2xl font-extrabold text-brand-900 tracking-tight">
          Cari pendamping manusia
        </h1>
        <p className="text-xs text-text-muted">
          FATHERCARE AI adalah asisten awal. Ketika masalahmu memerlukan penanganan langsung, terhubunglah dengan pendamping terpercaya.
        </p>
      </div>

      {/* Emergency Notice Card */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 shadow-sm flex items-start gap-3 text-rose-950">
        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <strong className="block font-bold text-rose-900">Dalam situasi bahaya mendesak?</strong>
          <p className="leading-relaxed">
            Jika terjadi kekerasan atau ancaman keselamatan fisik, segera hubungi <strong>Hotline SAPA 129</strong> (Telepon 129 / WA 08111-129-129) atau <strong>Hotline Sejiwa Kemenkes 119 ext 8</strong>.
          </p>
        </div>
      </div>

      {/* Success Notice if Ticket Created */}
      {ticketSuccess && (
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-300 text-teal-950 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-teal-600 shrink-0" />
            <span>
              Tiket simulasi rujukan ke <strong>{ticketSuccess}</strong> berhasil dibuat dan tersimpan di bawah.
            </span>
          </div>
          <Badge variant="success" size="sm">
            Simulasi Tersimpan
          </Badge>
        </div>
      )}

      {/* Partners List */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-brand-900 uppercase tracking-wider">
          Lembaga & Pendamping Tersedia
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {partnerServices.map((p) => (
            <NeuCard key={p.id} variant="raised" className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="verified" size="sm">
                    Lembaga Resmi
                  </Badge>
                  <span className="text-[11px] text-text-muted">{p.coverage}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-900">{p.name}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{p.organization}</p>
                </div>
                <p className="text-xs text-text-main leading-relaxed">
                  Peran: {p.role}
                </p>
              </div>

              <div className="pt-2 border-t border-border-subtle/80 flex items-center justify-between">
                <span className="text-[11px] text-text-muted">{p.contactChannel}</span>
                <NeuButton
                  size="sm"
                  variant="primary"
                  onClick={() => handleOpenReferralModal(p)}
                >
                  Buat tiket rujukan
                </NeuButton>
              </div>
            </NeuCard>
          ))}
        </div>
      </div>

      {/* Created Referral Tickets (Session) */}
      {referralTickets.length > 0 && (
        <div className="space-y-3 pt-3 border-t border-border-subtle/80">
          <h2 className="text-sm font-bold text-brand-900 uppercase tracking-wider">
            Tiket Rujukan Sesi Ini ({referralTickets.length})
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
                  <p><strong>Tujuan:</strong> {t.type} ({t.contactTarget})</p>
                  <p><strong>Nama dibagikan:</strong> {t.sharedData.alias} | <strong>Rentang usia:</strong> {t.sharedData.ageRange}</p>
                  <p><strong>Ringkasan kebutuhan:</strong> {t.sharedData.summary}</p>
                </div>

                <p className="text-[10px] text-text-muted italic pt-1">
                  * Catatan: Ini adalah alur simulasi demonstrasi. Percakapan lengkap tidak pernah dibagikan secara otomatis.
                </p>
              </NeuCard>
            ))}
          </div>
        </div>
      )}

      {/* Referral Modal with Selective Consent */}
      <NeuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Formulir Rujukan Pendamping"
        description={selectedPartner ? `Tujuan rujukan: ${selectedPartner.name}` : ""}
        footer={
          <>
            <NeuButton variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Batal
            </NeuButton>
            <NeuButton variant="primary" size="sm" onClick={handleCreateTicket}>
              Konfirmasi & Buat Tiket
            </NeuButton>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-surface-inset border border-border-subtle text-text-muted space-y-1.5">
            <span className="font-bold text-brand-900 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Kontrol Data yang Dibagikan
            </span>
            <p>
              Kamu memilih sendiri informasi apa yang boleh dibagikan kepada pendamping. Isi percakapan AI tidak dibagikan.
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
              <span className="text-brand-900 font-medium">Bagikan nama samaran ({userName})</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={shareAge}
                onChange={(e) => setShareAge(e.target.checked)}
                className="w-4 h-4 rounded text-brand-700"
              />
              <span className="text-brand-900 font-medium">Bagikan rentang usia ({userAgeRange})</span>
            </label>
          </div>

          <NeuTextarea
            label="Ringkasan kebutuhan (tulis secara singkat)"
            rows={3}
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
            placeholder="Jelaskan hal apa yang ingin kamu diskusikan dengan pendamping..."
          />
        </div>
      </NeuModal>
    </div>
  );
}
