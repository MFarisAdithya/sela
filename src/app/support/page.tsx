"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Heart,
  Shield,
  LifeBuoy,
  PhoneCall,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput } from "@/components/ui/NeuInput";
import { NeuModal } from "@/components/ui/NeuModal";
import { Badge } from "@/components/ui/Badge";
import { useApp, TrustedContact } from "@/context/AppContext";

export default function SupportMapPage() {
  const { trustedContacts, addTrustedContact } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactRole, setNewContactRole] = useState("");
  const [newContactCategory, setNewContactCategory] = useState<TrustedContact["category"]>("sahabat");

  const handleAddContact = () => {
    if (!newContactName.trim()) return;

    addTrustedContact({
      name: newContactName.trim(),
      role: newContactRole.trim() || "Orang Tepercaya",
      category: newContactCategory,
    });

    setNewContactName("");
    setNewContactRole("");
    setIsAddModalOpen(false);
  };

  const categoryColor = {
    sahabat: "bg-teal-100 text-teal-800 border-teal-200",
    keluarga: "bg-rose-100 text-rose-800 border-rose-200",
    guru_bk: "bg-blue-100 text-brand-800 border-brand-200",
    konselor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    profesional: "bg-amber-100 text-amber-800 border-amber-200",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
            <Users className="w-3.5 h-3.5" />
            <span>Jejaring Penguat Emosional</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
            Peta Dukungan Sosial
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Memetakan orang-orang aman di sekitarmu yang bisa menjadi tempat bersandar saat kamu butuh teman bicara.
          </p>
        </div>

        <NeuButton
          size="sm"
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<UserPlus className="w-3.5 h-3.5" />}
        >
          Tambah Orang Terpercaya
        </NeuButton>
      </div>

      {/* Visual Concentric Support Circle Representation */}
      <NeuCard variant="raised" className="p-6 sm:p-8 bg-surface space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider">
            Lingkaran Rasa Aman Konsentris
          </h2>
          <p className="text-xs text-text-muted max-w-md mx-auto">
            Setiap lapisan mewakili jarak kedekatan sosial dan jenis dukungan yang dapat kamu andalkan.
          </p>
        </div>

        {/* Concentric Visualization Circles */}
        <div className="relative max-w-md mx-auto aspect-square flex items-center justify-center p-4">
          {/* Outer Layer: Layanan Profesional & Sekolah */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-200/80 bg-brand-50/20 flex items-start justify-center pt-3">
            <span className="text-[10px] font-bold text-brand-700 uppercase tracking-widest bg-surface px-2 rounded-md shadow-sm">
              Layanan & Guru BK
            </span>
          </div>

          {/* Middle Layer: Konselor Sebaya & Keluarga */}
          <div className="absolute inset-8 sm:inset-12 rounded-full border-2 border-dashed border-teal-200/80 bg-teal-50/20 flex items-start justify-center pt-3">
            <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest bg-surface px-2 rounded-md shadow-sm">
              Keluarga / Kerabat
            </span>
          </div>

          {/* Inner Layer: Sahabat Terdekat */}
          <div className="absolute inset-16 sm:inset-24 rounded-full border-2 border-brand-300 bg-brand-100/50 flex items-start justify-center pt-3">
            <span className="text-[10px] font-bold text-brand-900 uppercase tracking-widest bg-surface px-2 rounded-md shadow-sm">
              Sahabat
            </span>
          </div>

          {/* Center: Kamu */}
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-neu-raised flex flex-col items-center justify-center text-center p-2 border-2 border-white">
            <Heart className="w-5 h-5 fill-white/30" />
            <span className="text-xs font-bold mt-1">Kamu</span>
            <span className="text-[9px] opacity-80">Pusat Diri</span>
          </div>
        </div>

        {/* Explanation Note */}
        <div className="p-4 rounded-xl bg-surface-inset shadow-neu-inset text-xs text-text-muted space-y-1 border border-border-subtle/80">
          <div className="flex items-center gap-1.5 font-semibold text-brand-900 text-xs">
            <Shield className="w-3.5 h-3.5 text-brand-600" />
            <span>Privasi Peta Dukungan:</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Daftar orang terpercaya ini 100% tersimpan lokal di perangkatmu. Fathercare AI tidak pernah mengirimkan daftar nama ini ke orang lain tanpa izinmu.
          </p>
        </div>
      </NeuCard>

      {/* Support Contacts Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider px-1">
          Daftar Support System Terdaftar ({trustedContacts.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {trustedContacts.map((contact) => (
            <NeuCard key={contact.id} variant="raised-sm" className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border ${categoryColor[contact.category]}`}
                >
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-900 leading-tight">
                    {contact.name}
                  </h3>
                  <span className="text-xs text-text-muted">{contact.role}</span>
                </div>
              </div>

              <Badge variant="info" size="sm">
                {contact.category.replace("_", " ")}
              </Badge>
            </NeuCard>
          ))}
        </div>
      </div>

      {/* Referral CTA Banner */}
      <NeuCard variant="raised-sm" className="p-5 bg-gradient-to-r from-surface to-brand-50/60 border border-brand-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-brand-900">
              Belum Menemukan Orang Terdekat yang Nyaman Diajak Bicara?
            </h3>
            <p className="text-xs text-text-muted">
              Kamu bisa memanfaatkan alur rujukan ke Guru BK, Konselor Sebaya Genre, atau Puskesmas secara terstruktur.
            </p>
          </div>
          <Link href="/referrals">
            <NeuButton size="sm" variant="secondary" rightIcon={<PhoneCall className="w-3.5 h-3.5" />}>
              Buka Halaman Rujukan &rarr;
            </NeuButton>
          </Link>
        </div>
      </NeuCard>

      {/* Modal: Tambah Orang Terpercaya */}
      <NeuModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Orang Terpercaya"
        description="Catat siapa saja yang bisa kamu hubungi saat kamu memerlukan dukungan emosional."
        footer={
          <>
            <NeuButton
              variant="secondary"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </NeuButton>
            <NeuButton
              variant="primary"
              size="sm"
              disabled={!newContactName.trim()}
              onClick={handleAddContact}
            >
              Simpan ke Peta Dukungan
            </NeuButton>
          </>
        }
      >
        <div className="space-y-4">
          <NeuInput
            label="Nama / Panggilan"
            placeholder="Contoh: Rian, Ibu, Bu Rahma"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
          />

          <NeuInput
            label="Peran / Hubungan"
            placeholder="Contoh: Sahabat Sejak SMP, Guru Wali Kelas"
            value={newContactRole}
            onChange={(e) => setNewContactRole(e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
              Kategori Lingkaran Dukungan
            </label>
            <select
              value={newContactCategory}
              onChange={(e) => setNewContactCategory(e.target.value as TrustedContact["category"])}
              className="w-full px-4 py-3 text-sm rounded-xl bg-surface-inset shadow-neu-inset text-text-main border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              <option value="sahabat">Sahabat / Teman Dekat</option>
              <option value="keluarga">Keluarga / Kerabat Suportif</option>
              <option value="guru_bk">Guru BK Sekolah</option>
              <option value="konselor">Konselor Sebaya PIK-R / Genre</option>
              <option value="profesional">Tenaga Profesional (Psikolog/Puskesmas)</option>
            </select>
          </div>
        </div>
      </NeuModal>
    </div>
  );
}
