"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Trash2,
  Heart,
  ShieldCheck,
  PhoneCall,
  UserCheck,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput } from "@/components/ui/NeuInput";
import { Badge } from "@/components/ui/Badge";
import { useApp, SupportContact } from "@/context/AppContext";

export default function SupportMapPage() {
  const { supportContacts, addSupportContact, deleteSupportContact } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState<SupportContact["category"]>("sahabat");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addSupportContact({
      name: name.trim(),
      role: role.trim() || "Orang terpercaya",
      category,
    });

    setName("");
    setRole("");
    setIsAdding(false);
  };

  const getCategoryBadge = (cat: SupportContact["category"]) => {
    switch (cat) {
      case "sahabat":
        return <Badge variant="info" size="sm">Sahabat</Badge>;
      case "sekolah":
        return <Badge variant="verified" size="sm">Sekolah / BK</Badge>;
      case "profesional":
        return <Badge variant="active" size="sm">Konselor / Ahli</Badge>;
      default:
        return <Badge variant="prototype" size="sm">Keluarga</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-subtle/80 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Jejaring Sosial Pribadi
          </span>
          <h1 className="text-2xl font-extrabold text-brand-900 tracking-tight">
            Peta dukungan
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Daftar orang terdekat yang dapat kamu ajak bicara saat membutuhkan tempat bercerita.
          </p>
        </div>

        <NeuButton
          size="sm"
          variant="primary"
          onClick={() => setIsAdding(!isAdding)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="self-start sm:self-auto"
        >
          {isAdding ? "Batal" : "Tambah kontak"}
        </NeuButton>
      </div>

      {/* Add New Contact Form */}
      {isAdding && (
        <NeuCard variant="raised" className="p-5 space-y-4 animate-in fade-in duration-150">
          <h2 className="text-sm font-bold text-brand-900">Tambah Orang Terpercaya</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <NeuInput
                label="Nama atau Panggilan"
                placeholder="Contoh: Rian, Ibu Rahma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <NeuInput
                label="Peran / Hubungan"
                placeholder="Contoh: Sahabat sebangku, Guru BK"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                Kategori Lingkaran
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "sahabat", label: "Sahabat / Teman Dekat" },
                  { id: "keluarga", label: "Keluarga / Kerabat" },
                  { id: "sekolah", label: "Sekolah / Guru BK" },
                  { id: "profesional", label: "Konselor / Profesional" },
                ].map((catItem) => (
                  <button
                    key={catItem.id}
                    type="button"
                    onClick={() => setCategory(catItem.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      category === catItem.id
                        ? "bg-brand-700 text-white border-brand-800 shadow-neu-raised-sm"
                        : "bg-surface text-text-muted border-border-subtle hover:text-brand-900"
                    }`}
                  >
                    {catItem.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <NeuButton type="button" variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                Batal
              </NeuButton>
              <NeuButton type="submit" variant="primary" size="sm">
                Simpan ke peta
              </NeuButton>
            </div>
          </form>
        </NeuCard>
      )}

      {/* Visual Support Representation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Concentric Visual Overview */}
        <NeuCard variant="raised" className="p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-48 h-48 rounded-full border-2 border-dashed border-brand-300 flex items-center justify-center bg-brand-50/30">
            {/* Outer Circle: Professional */}
            <div className="w-36 h-36 rounded-full border border-brand-400/80 flex items-center justify-center bg-brand-100/30">
              {/* Mid Circle: School/BK */}
              <div className="w-24 h-24 rounded-full border border-brand-600/60 flex items-center justify-center bg-brand-200/40">
                {/* Core: You */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-brand-900">Lingkaran Dukungan</span>
            <p className="text-[11px] text-text-muted max-w-xs">
              Mulai dari orang terdekat hingga layanan resmi di sekolah dan komunitas.
            </p>
          </div>
        </NeuCard>

        {/* Right: Contact Cards List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-bold text-brand-900 uppercase tracking-wider">
            Daftar Orang Terpercaya ({supportContacts.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {supportContacts.map((contact) => (
              <NeuCard key={contact.id} variant="raised-sm" className="p-4 flex flex-col justify-between space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    {getCategoryBadge(contact.category)}
                    <h3 className="text-sm font-bold text-brand-900">{contact.name}</h3>
                    <p className="text-xs text-text-muted">{contact.role}</p>
                  </div>
                  <button
                    onClick={() => deleteSupportContact(contact.id)}
                    className="p-1 text-text-muted hover:text-state-danger transition-colors"
                    aria-label="Hapus kontak ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 border-t border-border-subtle/60 flex items-center justify-between text-xs text-text-subtle">
                  <span>Tersimpan lokal</span>
                  <Link href="/referrals" className="text-brand-700 hover:text-brand-900 font-semibold flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" />
                    <span>Layanan resmi</span>
                  </Link>
                </div>
              </NeuCard>
            ))}
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-xl bg-surface-inset text-xs text-text-muted border border-border-subtle/80 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
            <span>Kontak yang kamu tulis hanya tersimpan di peramban ini dan tidak diunggah ke internet.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
