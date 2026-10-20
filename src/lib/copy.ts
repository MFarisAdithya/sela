// Semua teks yang dibaca pengguna ada di sini.
// File ini TIDAK menyentuh /api/chat, RAG, timeout, atau triase krisis.

export const crisisLine =
  "Butuh bicara dengan orang sekarang? Hubungi 119 ext 8 (SEJIWA) atau SAPA 129.";

export function greetingFor(hour: number): string {
  if (hour >= 4 && hour < 11) return "Selamat pagi";
  if (hour >= 11 && hour < 15) return "Selamat siang";
  if (hour >= 15 && hour < 18) return "Selamat sore";
  return "Selamat malam";
}

export const copy = {
  landing: {
    eyebrow: "Pendampingan Awal Nonklinis & Ruang Refleksi",
    tagline: "Ruang untuk dirimu.",
    description:
      "Kadang kepalamu terasa terlalu bising. Di sini, kamu boleh berhenti sebentar, mengurai apa yang terasa mengganjal, atau sekadar bernapas tanpa harus pura-pura kuat.",
    cta: "Masuk ke SELA",
    secondaryCta: "Lihat cara kerja",
    featuresEyebrow: "Tiga Cara Beristirahat",
    featuresTitle: "Temukan ritme yang pas untuk suasana hatimu saat ini.",
    features: [
      {
        id: "chat",
        category: "Bercerita",
        title: "Cerita ke SELA",
        desc: "Obrolan hangat dan empatik didampingi Safe Story AI nonklinis. Tempat mengurai benang kusut tanpa takut dihakimi, dilengkapi latihan pernapasan saat dada terasa sesak.",
        action: "Mulai bercerita",
        href: "/onboarding",
      },
      {
        id: "journal",
        category: "Menulis",
        title: "Tumpahkan ke Kertas",
        desc: "Ruang menulis hening berpandukan pertanyaan reflektif harian. Catatanmu tersimpan di perambanmu sendiri dan tidak pernah dikirim ke server mana pun.",
        action: "Tulis refleksimu",
        href: "/onboarding",
      },
      {
        id: "learning",
        category: "Belajar",
        title: "Sudut Baca & Latihan",
        desc: "Modul psikoedukasi dan keterampilan hidup praktis: dari mengenali emosi, teknik grounding 4-7-8, hingga langkah-langkah kecil merawat diri sehari-hari.",
        action: "Eksplorasi materi",
        href: "/onboarding",
      },
    ],
    howItWorksEyebrow: "Alur Sederhana",
    howItWorksTitle: "Cara kerja SELA mendampingimu",
    steps: [
      {
        step: "01",
        title: "Pilih kebutuhanmu",
        desc: "Bercerita santai saat kepala bising, menumpahkan uneg-uneg lewat jurnal pribadi, atau membaca latihan keterampilan hidup yang kamu butuhkan.",
      },
      {
        step: "02",
        title: "Luangkan waktu tanpa tekanan",
        desc: "Ruang hening yang tidak menilai, tidak mendiagnosis, dan tidak terburu-buru. Kamu memegang kendali penuh atas ritmemu sendiri.",
      },
      {
        step: "03",
        title: "Dapatkan arahan & langkah kecil",
        desc: "Mulai dari teknik regulasi diri praktis hingga informasi rujukan profesional nyata jika kamu membutuhkan bantuan langsung.",
      },
    ],
    privacyTitle: "Soal ceritamu & batas AI",
    privacySummary:
      "Ceritamu tidak disimpan di server kami dan tidak ada yang menilai. Saat kamu bercerita, tulisanmu dikirim ke AI supaya bisa dibalas. SELA bukan psikolog dan tidak mendiagnosis. Kalau terasa terlalu berat, SELA akan mengajakmu menghubungi orang yang bisa membantu langsung.",
    privacyPoints: [
      {
        title: "Batas Layanan Nonklinis",
        desc: "SELA bukan psikolog, psikiater, dokter, atau unit gawat darurat. SELA dirancang sebagai teman refleksi awal dan latihan ketahanan diri mandiri.",
      },
      {
        title: "Pemrosesan Aman AI",
        desc: "Percakapan Safe Story dikirim ke API AI (Google Gemini) agar bisa merespons percakapanmu. Tidak disimpan sebagai arsip permanen di server SELA.",
      },
      {
        title: "Penyimpanan Lokal",
        desc: "Jurnal pribadi dan nama panggilanmu tersimpan di peramban perangkatmu saja. Tidak ada pelacakan identitas pihak ketiga.",
      },
    ],
  },

  onboarding: {
    title: "Kenalan dulu, yuk.",
    intro:
      "SELA adalah teman untuk berhenti sejenak dan mengenali perasaanmu. Baca dua hal ini dulu ya.",
    nicknameLabel: "Mau dipanggil apa?",
    nicknameHelp: "Boleh pakai nama samaran. Namamu hanya tersimpan di peramban ini.",
    consentLimits:
      "Aku paham SELA bukan psikolog, bukan psikiater, dan bukan layanan darurat.",
    consentPrivacy:
      "Aku paham catatan dan obrolanku tersimpan di peramban ini, dan aku bisa berhenti atau menghapusnya kapan saja.",
    submit: "Lanjut ke beranda",
    back: "Kembali ke halaman awal",
  },

  dashboard: {
    subtitle: "Tempatmu beristirahat sebentar.",
    moodTitle: "Bagaimana rasanya hari ini?",
    moodThanks: "Makasih sudah jujur pada dirimu sendiri. Kalau mau, ceritakan sedikit ke SELA.",
    moods: [
      { id: "lelah", label: "Lelah", hint: "Banyak hal yang numpuk di kepala." },
      { id: "sedih", label: "Sedih", hint: "Lagi ngerasa berat atau hampa." },
      { id: "biasa", label: "Biasa", hint: "Tenang, lagi nggak mikir apa-apa." },
      { id: "baik", label: "Baik", hint: "Cukup lega dan ada semangat kecil." },
      { id: "senang", label: "Senang", hint: "Lagi ngerasa bersyukur hari ini." },
    ],
    // href: samakan dengan route yang sudah ada di proyek
    features: [
      { href: "/safe-story", title: "Cerita ke SELA", desc: "Keluarkan apa yang bikin sesak, biar nggak sendirian menanggungnya." },
      { href: "/journal", title: "Tumpahkan ke Kertas", desc: "Menulis bebas, tanpa takut dibaca siapa pun." },
      { href: "/learning", title: "Sudut Baca & Latihan", desc: "Hal-hal kecil tentang menghadapi orang lain dan memahami diri." },
      { href: "/support", title: "Cari Bantuan Nyata", desc: "Kontak profesional dan orang dewasa terpercaya saat kamu butuh pegangan." },
    ],
  },

  safeStory: {
    welcome: (name?: string) =>
      `${name ? `Hai ${name}.` : "Hai."} Anggap ini pojokan tenangmu. Kalau ada yang mengganjal di hati, mau cerita soal rumah, sekolah, pertemanan, atau cuma pengen ngetik unek-unek tanpa dihakimi, tulis aja di sini ya.`,
    starters: [
      "Rasanya capek banget harus selalu terlihat baik-baik saja.",
      "Gimana cara nolak ajakan teman tanpa bikin mereka tersinggung?",
      "Aku ngerasa sering overthinking tiap malam sebelum tidur.",
      "Pengen ngomong ke orang tua soal rasa tertekan, tapi takut mereka marah.",
    ],
    placeholder: "Tulis apa saja yang ada di kepalamu saat ini...",
    citationsLabel: "Catatan yang mungkin relevan untukmu",
  },

  learning: {
    title: "Sudut Baca & Latihan",
    categories: {
      psikoedukasi: "Memahami Diri",
      lifeSkills: "Keterampilan Sehari-hari",
      karier: "Masa Depan & Langkah Kecil",
    },
    // Contoh gaya "kakak suportif" untuk isi modul
    sample: {
      title: "Napas 4-7-8, buat malam yang kepalanya ramai",
      body: [
        "Kalau pikiranmu muter terus pas mau tidur, coba ini. Nggak butuh apa-apa selain napasmu.",
        "Tarik napas lewat hidung sambil hitung sampai 4. Tahan sampai 7. Embuskan pelan lewat mulut sampai 8.",
        "Ulangi 3 sampai 4 kali. Kalau mulai pusing, berhenti dan napas biasa dulu. Nggak ada yang salah, tubuhmu cuma butuh waktu.",
      ],
    },
  },

  journal: {
    prompts: [
      "Hal apa yang diam-diam menguras energimu hari ini?",
      "Kalau tidak ada yang menilaimu, apa hal pertama yang ingin kamu katakan?",
      "Apa satu hal kecil yang berhasil kamu lewati hari ini, sekecil apa pun itu?",
    ],
    saved: "Tersimpan di peramban ini saja. Tidak dikirim ke mana pun.",
  },
} as const;
