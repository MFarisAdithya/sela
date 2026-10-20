import Image from "next/image";
import Link from "next/link";
import { copy, crisisLine } from "@/lib/copy";

// Asumsi: Tailwind aktif, dan font Source Sans 3 sudah jadi font dasar (body).
// Lora dipanggil lewat variabel next/font; ganti --font-lora jika namanya berbeda.
const lora = { fontFamily: "var(--font-lora), Lora, Georgia, serif" };

const raised = "shadow-[7px_7px_16px_rgba(23,54,93,0.12),-7px_-7px_16px_rgba(255,255,255,0.95)]";
const pressed = "shadow-[inset_5px_5px_12px_rgba(23,54,93,0.10),inset_-5px_-5px_12px_rgba(255,255,255,0.9)]";

export default function LandingPage() {
  const t = copy.landing;

  return (
    <main className="min-h-dvh bg-[#E3EEFF] px-6 py-14 text-[#17365D]">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .sela-breathe { animation: sela-breathe 7s ease-in-out infinite; }
        }
        @keyframes sela-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>

      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className={`sela-breathe rounded-full bg-[#F7FAFF] p-5 ${raised}`}>
          <Image src="/images/sela-logo.png" alt="" width={64} height={64} priority />
        </div>

        <h1 className="mt-8 text-6xl font-semibold tracking-tight">sela</h1>
        <p className="mt-2 text-2xl italic text-[#2457A7]" style={lora}>
          {t.tagline}
        </p>

        <p className="mt-8 max-w-md text-lg leading-relaxed text-[#17365D]/85">{t.description}</p>

        <Link
          href="/onboarding"
          className={`mt-10 rounded-full bg-[#2457A7] px-9 py-3.5 text-lg font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6FB1FF] ${raised}`}
        >
          {t.cta}
        </Link>

        <section className={`mt-14 w-full rounded-3xl bg-[#F7FAFF] p-6 text-left ${pressed}`}>
          <h2 className="text-lg font-semibold">{t.privacyTitle}</h2>
          <p className="mt-2 leading-relaxed text-[#17365D]/80">{t.privacyBody}</p>
        </section>

        <p className="mt-6 text-sm text-[#17365D]/70">{crisisLine}</p>
      </div>
    </main>
  );
}
