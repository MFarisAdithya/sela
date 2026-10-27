// SELA.AI — Sumber Utama Teks & Content Copy
// Reposisi: AI-Powered Help-Seeking Navigator
// Tagline: "From Unspoken Problems to Prepared Conversations"
// File ini TIDAK menyentuh /api/chat, RAG, timeout, atau triase krisis.

export const crisisLine =
  "Butuh bicara dengan orang sekarang? Hubungi 119 ext 8 (SEJIWA Kemenkes) atau SAPA 129.";

export function greetingFor(hour: number): string {
  if (hour >= 4 && hour < 11) return "Selamat pagi";
  if (hour >= 11 && hour < 15) return "Selamat siang";
  if (hour >= 15 && hour < 18) return "Selamat sore";
  return "Selamat malam";
}

export const copy = {
  brand: {
    name: "SELA.AI",
    tagline: "Cerita Kamu, Langkah Nyata",
    subtitle: "Pemandu Persiapan Obrolan untuk Remaja & Dewasa Muda",
    mission: "Membantu remaja merapikan pikiran, menyusun kata-kata, dan menemukan bantuan nyata.",
    sdgBadge: "Fokus Dampak: SDG 3 — Kehidupan Sehat dan Sejahtera",
  },

  landing: {
    eyebrow: "Pemandu Persiapan Obrolan",
    headlinePart1: "Bercerita tidak harus langsung ",
    headlineAccent: "sempurna.",
    description: "Urai uneg-uneg, latih caramu bicara, dan temukan bantuan saat kamu siap.",
    cta: "Mulai Gratis",
    secondaryCta: "Lihat Cara Kerja",
    trustNotes: [
      "Bukan alat diagnosis",
      "Kontrol penuh di tanganmu",
      "Bantuan darurat selalu gratis",
    ],

    fourStepsTitle: "Empat Langkah Menuju Percakapan yang Siap",
    fourStepsSubtitle: "Langkah bertahap agar kamu lebih tenang saat bicara.",
    fourSteps: [
      {
        number: "01",
        title: "Guided Story",
        subtitle: "Uraikan Masalahmu",
        desc: "Jawab pertanyaan santai sebisamu. Boleh lewati kapan saja.",
        href: "/cara-kerja#guided-story",
      },
      {
        number: "02",
        title: "Kartu Cerita Pribadi",
        subtitle: "Rapikan Kebutuhanmu",
        desc: "Dapatkan rangkuman perasaan dan kalimat pembuka obrolan.",
        href: "/cara-kerja#kartu-cerita",
      },
      {
        number: "03",
        title: "Practice Talk",
        subtitle: "Latihan Memulai Obrolan",
        desc: "Latihan simulasi peran dengan lawan bicara sebelum obrolan sungguhan.",
        href: "/cara-kerja#practice-talk",
      },
      {
        number: "04",
        title: "Support Pathway",
        subtitle: "Temukan Jalur Bantuan",
        desc: "Temukan kontak bantuan resmi dan daftar persiapan bicara gratis.",
        href: "/cara-kerja#support-pathway",
      },
    ],

    pricingTeaserTitle: "Pilihan Paket yang Jelas",
    pricingTeaserDesc: "Bantuan darurat tetap gratis. Paket Supporter untuk latihan ekstra.",
    freePlan: {
      name: "Paket Gratis",
      price: "Rp0",
      period: "selamanya",
      desc: "Mulai rapikan uneg-uneg tanpa bayar apa pun.",
      features: [
        "10 respons Guided Story per bulan",
        "2 sesi latihan Practice Talk per bulan",
        "Simpan 1 Kartu Cerita aktif",
        "Modul belajar kelola emosi dasar",
        "Support Pathway & kontak darurat gratis",
      ],
      cta: "Mulai Gratis Sekarang",
      href: "/onboarding",
    },
    premiumPlan: {
      name: "SELA Supporter",
      price: "Rp19.000",
      period: "buat 30 hari",
      desc: "Sekali bayar · Tanpa tagihan otomatis",
      features: [
        "100 respons Guided Story per bulan",
        "10 sesi Practice Talk (4 peran)",
        "Simpan sampai 20 Kartu Cerita",
        "Buka semua modul kelola emosi & konflik",
        "Rangkuman pola bicara & tips praktis",
        "Daftar langkah sebelum mulai obrolan",
      ],
      cta: "Pilih Supporter",
      href: "/harga",
    },

    safetyDisclaimer: {
      title: "Batas Layanan & Privasi",
      body: "SELA.AI adalah alat bantu latihan, bukan psikolog atau layanan darurat medis. Catatan jurnal dan namamu tersimpan dengan aman di perangkatmu sendiri.",
      emergencyContacts: [
        { name: "Hotline Kesehatan Jiwa Kemenkes (SEJIWA)", number: "119 ext 8", note: "Bebas pulsa, 24 jam" },
        { name: "Sahabat Perempuan & Anak (SAPA KemenPPPA)", number: "129 / WhatsApp 08111-129-129", note: "Layanan perlindungan dan pendampingan" },
      ],
    },
  },

  howItWorks: {
    title: "Cara Kerja SELA.AI",
    subtitle: "Alur bertahap agar kamu lebih percaya diri mencari bantuan.",
    steps: [
      {
        id: "guided-story",
        step: "Langkah 1",
        title: "Guided Story: Mengurai Situasi Tanpa Paksaan",
        desc: "Jawab pertanyaan panduan bertahap saat pikiranmu sedang penuh. Kamu bebas melewati pertanyaan apa pun.",
        points: [
          "Pertanyaan ringan dan tidak menghakimi",
          "Boleh dilewati kapan saja tanpa beban",
          "Teks hanya disimpan atas persetujuanmu",
        ],
      },
      {
        id: "kartu-cerita",
        step: "Langkah 2",
        title: "Kartu Cerita Pribadi: Ringkasan Pegangan Bicara",
        desc: "Ceritamu dirapikan menjadi kartu ringkas berisi situasi, perasaan, kebutuhan, dan kalimat pembuka.",
        points: [
          "Draf kartu yang bisa kamu edit bebas",
          "Tersimpan hanya jika kamu setujui",
          "Bisa disalin atau dihapus kapan saja",
        ],
      },
      {
        id: "practice-talk",
        step: "Langkah 3",
        title: "Practice Talk: Simulasi Percakapan yang Aman",
        desc: "Latih kalimat pembukamu bareng simulasi lawan bicara (teman, guru/dosen, orang tua) sebelum bicara sungguhan.",
        points: [
          "Simulasi peran tanpa takut dihakimi",
          "Tips komunikasi praktis dan suportif",
          "Riwayat percakapan tidak disimpan permanen",
        ],
      },
      {
        id: "support-pathway",
        step: "Langkah 4",
        title: "Support Pathway: Menghubungkan ke Bantuan Nyata",
        desc: "Temukan checklist persiapan dan kontak bantuan resmi: guru BK, konselor sebaya, puskesmas, dan hotline krisis.",
        points: [
          "Selalu gratis dan tanpa paywall",
          "Hanya kontak resmi terverifikasi",
          "Panduan faskes BPJS yang jelas",
        ],
      },
    ],
  },

  features: {
    title: "Fitur yang Dirancang Aman",
    subtitle: "Membantu melatih keberanian bicara dan kecakapan hidup remaja.",
    list: [
      {
        title: "Guided Story",
        category: "Navigasi Awal",
        desc: "Pertanyaan bertahap untuk merapikan isi kepala tanpa paksaan.",
      },
      {
        title: "Kartu Cerita Pribadi",
        category: "Komunikasi",
        desc: "Ringkasan situasi dan kalimat pembuka siap pakai saat bicara.",
      },
      {
        title: "Practice Talk Simulation",
        category: "Latihan Praktis",
        desc: "Simulasi latihan bicara dengan berbagai peran lawan bicara.",
      },
      {
        title: "Support Pathway & Checklist",
        category: "Koneksi Nyata",
        desc: "Pilihan bantuan manusia nyata dan checklist sebelum bertemu pendamping.",
      },
      {
        title: "Jurnal Reflektif Mandiri",
        category: "Refleksi",
        desc: "Catatan harian pribadi yang tersimpan di perangkatmu sendiri.",
      },
      {
        title: "Ruang Belajar & Life Skills",
        category: "Edukasi",
        desc: "Modul ringkas kelola emosi, komunikasi tegas, dan pernapasan 4-7-8.",
      },
    ],
  },

  pricing: {
    title: "Pilihan Paket SELA.AI",
    subtitle: "Bantuan darurat selalu gratis. Paket Supporter untuk latihan lebih banyak.",
    notice: "Rp19.000 untuk 30 hari. Bayar sekali dan tidak ada tagihan otomatis.",
  },

  about: {
    title: "Tentang SELA.AI",
    subtitle:
      "Lahir dari kesadaran bahwa mencari bantuan sering kali adalah langkah paling menakutkan bagi remaja.",
    missionTitle: "Misi Kami",
    missionBody:
      "Banyak remaja mengalami masa sulit namun tidak tahu harus mulai bercerita dari mana atau takut dihakimi. SELA.AI hadir bukan untuk menggantikan peran manusia atau konselor, melainkan sebagai jembatan: membantu remaja merapikan pikiran, menyusun kata-kata, dan merasa cukup percaya diri untuk mencari bantuan nyata.",
    sdgTitle: "Komitmen SDG 3: Kehidupan Sehat dan Sejahtera",
    sdgBody:
      "SELA.AI secara khusus mendukung target kesehatan mental remaja dan perluasan akses awal terhadap layanan dukungan sosial dan profesional di Indonesia.",
  },

  privacyPolicy: {
    title: "Kebijakan Privasi & Perlindungan Data",
    subtitle:
      "Informasi jelas mengenai apa yang diproses, bagaimana data disimpan, dan hak kontrolmu.",
    points: [
      {
        title: "1. Prinsip Minimalisasi Data (Data Minimization)",
        desc: "Kami tidak meminta nomor identitas (NIK), alamat rumah, lokasi presisi, atau data sensitif yang tidak dibutuhkan oleh sistem.",
      },
      {
        title: "2. Pemrosesan Teks & Keamanan Privasi",
        desc: "Saat kamu menggunakan fitur Guided Story atau Practice Talk, teks diproses secara aman untuk menghasilkan tanggapan latihan. Kami tidak menjual datamu untuk iklan atau pihak ketiga.",
      },
      {
        title: "3. Penyimpanan Catatan & Kartu Cerita",
        desc: "Kartu Cerita hanya disimpan jika kamu memilih tombol simpan secara eksplisit. Jurnal pribadi tersimpan di penyimpanan lokal perambanmu secara default.",
      },
      {
        title: "4. Perlindungan Pengguna Remaja (UU No. 27 Tahun 2022)",
        desc: "Untuk demo publik, kami menggunakan skenario sintetis. Layanan nyata di masa depan akan menyertakan alur persetujuan orang tua/wali sesuai regulasi PDP.",
      },
      {
        title: "5. Hak Pengguna: Edit & Hapus Kapan Saja",
        desc: "Kamu memiliki kendali penuh untuk melihat, memperbarui, mengunduh, maupun menghapus kartu cerita dan akunmu kapan saja.",
      },
    ],
  },

  termsOfService: {
    title: "Ketentuan Layanan & Batas Layanan",
    subtitle:
      "Pedoman penggunaan SELA.AI yang aman, bertanggung jawab, dan nonklinis.",
    points: [
      {
        title: "1. Batas Layanan Nonklinis",
        desc: "SELA.AI adalah alat bantu refleksi dan persiapan komunikasi. SELA.AI bukan fasilitas kesehatan mental, bukan rumah sakit, dan tidak menyediakan diagnosis psikiatris, psikoterapi berlisensi, atau intervensi krisis.",
      },
      {
        title: "2. Kondisi Darurat",
        desc: "Jika kamu atau orang lain berada dalam bahaya cedera fisik, kekerasan, atau ancaman hidup mendesak, segera hubungi layanan darurat 112 atau Hotline Kesehatan Jiwa Kemenkes 119 ext 8.",
      },
      {
        title: "3. Ketentuan Paket & Pembayaran",
        desc: "Paket Premium berlaku selama 30 hari kalender sejak konfirmasi pembayaran server. Tidak ada penagihan berulang otomatis (auto-renew). Jika masa aktif habis, akunmu akan kembali ke Paket Free tanpa menghapus data kartu yang sudah tersimpan.",
      },
      {
        title: "4. Penggunaan yang Bertanggung Jawab",
        desc: "Pengguna dilarang menyalahgunakan sistem untuk menyebarkan ancaman, pelecehan, atau materi ilegal.",
      },
    ],
  },

  onboarding: {
    title: "Kenalan dulu, yuk.",
    intro:
      "SELA.AI adalah teman untuk berhenti sejenak dan menyiapkan percakapan pentingmu. Baca dua hal ini dulu ya.",
    nicknameLabel: "Mau dipanggil apa?",
    nicknameHelp: "Boleh pakai nama samaran. Namamu hanya tersimpan di peramban ini.",
    consentLimits:
      "Aku paham SELA.AI bukan psikolog, bukan psikiater, dan bukan layanan darurat medis.",
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
