"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { copy, greetingFor } from "@/lib/copy";
import { useApp } from "@/context/AppContext";

// Samakan dengan key yang dipakai halaman onboarding untuk menyimpan nama panggilan.
const NICKNAME_KEY = "sela:nickname";

const lora = { fontFamily: "var(--font-lora), Lora, Georgia, serif" };
const raised = "shadow-[6px_6px_14px_rgba(23,54,93,0.11),-6px_-6px_14px_rgba(255,255,255,0.95)]";
const pressed = "shadow-[inset_4px_4px_10px_rgba(23,54,93,0.10),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]";

export default function DashboardPage() {
  const t = copy.dashboard;
  const { userName, currentMood, setCurrentMood } = useApp();
  const [hello, setHello] = useState("Hai");
  const [mood, setMood] = useState<string | null>(currentMood || null);

  // Dihitung setelah mount supaya tidak bentrok dengan render server.
  useEffect(() => {
    let name = userName;
    try {
      const stored = sessionStorage.getItem(NICKNAME_KEY);
      if (stored) name = stored;
    } catch {
      // penyimpanan peramban tidak tersedia; pakai sapaan tanpa nama
    }
    const greeting = greetingFor(new Date().getHours());
    setHello(name ? `${greeting}, ${name}` : greeting);
  }, [userName]);

  const handleSelectMood = (id: string) => {
    setMood(id);
    setCurrentMood(id as any);
  };

  return (
    <div className="max-w-2xl mx-auto py-2 space-y-10 animate-in fade-in duration-150">
      <header>
        <h1 className="text-3xl font-semibold text-brand-900 tracking-tight">{hello}</h1>
        <p className="mt-1 text-xl italic text-[#2457A7]" style={lora}>
          {t.subtitle}
        </p>
      </header>

      <section aria-labelledby="mood-title">
        <h2 id="mood-title" className="text-xl font-semibold text-brand-900">
          {t.moodTitle}
        </h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {t.moods.map((m) => {
            const active = mood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={active}
                onClick={() => handleSelectMood(m.id)}
                className={`rounded-2xl bg-[#F7FAFF] p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6FB1FF] border border-border-subtle/80 ${
                  active ? `${pressed} bg-brand-100/70 border-brand-300 font-medium` : raised
                }`}
              >
                <span className="block font-semibold text-brand-900">{m.label}</span>
                <span className="mt-0.5 block text-sm text-[#17365D]/75">{m.hint}</span>
              </button>
            );
          })}
        </div>

        {mood && (
          <p className="mt-4 text-[#17365D]/85 leading-relaxed" role="status">
            {t.moodThanks}{" "}
            <Link href="/safe-story" className="font-semibold text-[#2457A7] underline underline-offset-4 hover:text-brand-900">
              Cerita ke SELA →
            </Link>
          </p>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2" aria-label="Mau ke mana?">
        {t.features.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className={`rounded-3xl bg-[#F7FAFF] p-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6FB1FF] border border-border-subtle/70 hover:scale-[1.01] transition-transform ${raised}`}
          >
            <span className="block text-lg font-semibold text-brand-900">{f.title}</span>
            <span className="mt-1 block leading-relaxed text-[#17365D]/75 text-sm">{f.desc}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
