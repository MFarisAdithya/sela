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
    tagline: "From Unspoken Problems to Prepared Conversations.",
    subtitle: "AI-Powered Help-Seeking Navigator untuk Remaja & Dewasa Muda",
    mission:
      "Membantu remaja yang kesulitan mengungkapkan masalahnya untuk mempersiapkan percakapan dan menemukan bantuan yang tepat.",
    sdgBadge: "Fokus Dampak: SDG 3 — Kehidupan Sehat dan Sejahtera",
  },

  landing: {
    eyebrow: "AI-Powered Help-Seeking Navigator",
    headlinePart1: "Bercerita tidak harus langsung ",
    headlineAccent: "sempurna.",
    description:
      "SELA.AI membantumu mengurai apa yang sedang terasa berat, menyusunnya menjadi ringkasan yang jelas, berlatih memulai percakapan, dan melihat pilihan dukungan nyata yang bisa kamu pertimbangkan.",
    cta: "Mulai Gratis",
    secondaryCta: "Lihat Cara Kerja",
    trustNotes: [
      "Bukan alat diagnosis",
      "Kontrol penuh di tanganmu",
      "Jalur bantuan tidak pernah dipaywall",
    ],

    fourStepsTitle: "Empat Langkah Menuju Percakapan yang Siap",
    fourStepsSubtitle:
      "Dari benang kusut di kepala hingga siap berbicara dengan orang yang kamu percayai.",
    fourSteps: [
      {
        number: "01",
        title: "Guided Story",
        subtitle: "Uraikan Masalahmu",
        desc: "Jawab pertanyaan singkat dan bertahap tanpa paksaan. Setiap pertanyaan boleh dilewati kapan saja.",
        href: "/cara-kerja#guided-story",
      },
      {
        number: "02",
        title: "Kartu Cerita Pribadi",
        subtitle: "Rapikan Kebutuhanmu",
        desc: "Dapatkan draf terstruktur: apa yang terjadi, apa yang dirasakan, dan kalimat pembuka yang siap digunakan.",
        href: "/cara-kerja#kartu-cerita",
      },
      {
        number: "03",
        title: "Practice Talk",
        subtitle: "Latihan Memulai Obrolan",
        desc: "Simulasikan percakapan dengan teman, guru BK, atau orang tua sebelum berbicara sungguhan di dunia nyata.",
        href: "/cara-kerja#practice-talk",
      },
      {
        number: "04",
        title: "Support Pathway",
        subtitle: "Temukan Jalur Bantuan",
        desc: "Lihat opsi bantuan nyata yang terverifikasi dan checklist persiapan bicara tanpa biaya apa pun.",
        href: "/cara-kerja#support-pathway",
      },
    ],

    pricingTeaserTitle: "Dukungan yang Jujur dan Terjangkau",
    pricingTeaserDesc:
      "Fitur keselamatan dan informasi bantuan selalu gratis. Paket Premium hadir untuk latihan lebih mendalam.",
    freePlan: {
      name: "Paket Free",
      price: "Rp0",
      period: "selamanya",
      desc: "Manfaat inti untuk refleksi dan mencari bantuan aman.",
      features: [
        "Akses dashboard dan refleksi dasar",
        "Guided Story dengan kuota bulanan",
        "1 Kartu Cerita aktif tersimpan di akun",
        "Sesi Practice Talk dasar per bulan",
        "Modul edukasi keterampilan hidup inti",
        "Support Pathway & kontak darurat tanpa batas",
      ],
      cta: "Mulai Gratis Sekarang",
      href: "/onboarding",
    },
    premiumPlan: {
      name: "Paket Premium",
      price: "Rp19.000",
      period: "per 30 hari (perpanjangan manual)",
      desc: "Latihan lebih intensif dan ruang eksplorasi lebih luas.",
      features: [
        "Kuota Guided Story lebih besar",
        "Hingga 20 Kartu Cerita tersimpan",
        "Variasi skenario Practice Talk lebih lengkap",
        "Akses ke seluruh modul pengembangan diri lanjutan",
        "Opsi ekspor dan cetak ringkasan kartu cerita",
        "Tanpa auto-charge; perpanjangan sepenuhnya manual",
      ],
      cta: "Pilih Premium",
      href: "/harga",
    },

    safetyDisclaimer: {
      title: "Batasan Penting & Privasi Transparan",
      body: "SELA.AI bukan psikolog, psikiater, dokter, atau layanan gawat darurat medis. Kami tidak mendiagnosis dan tidak menjanjikan bahwa semua masalah selesai seketika dengan AI. Ketika kamu menggunakan fitur AI, tulisanmu dikirim ke Google Gemini agar bisa diproses. Data jurnal dan nama panggilanmu tersimpan di perambanmu sendiri.",
      emergencyContacts: [
        { name: "Hotline Kesehatan Jiwa Kemenkes (SEJIWA)", number: "119 ext 8", note: "Bebas pulsa, 24 jam" },
        { name: "Sahabat Perempuan & Anak (SAPA KemenPPPA)", number: "129 / WhatsApp 08111-129-129", note: "Layanan perlindungan dan pendampingan" },
      ],
    },
  },

  howItWorks: {
    title: "Bagaimana SELA.AI Bekerja",
    subtitle:
      "Alur bertahap yang membimbingmu dari kebingungan menjadi rasa percaya diri saat mencari bantuan.",
    steps: [
      {
        id: "guided-story",
        step: "Langkah 1",
        title: "Guided Story: Mengurai Situasi Tanpa Paksaan",
        desc: "Kamu tidak harus langsung tahu dari mana harus mulai. SELA.AI memberikan pertanyaan panduan bertahap (apa yang terjadi, apa yang paling sulit, apa yang kamu butuhkan). Kamu memegang kendali penuh dan dapat melewati pertanyaan apa pun.",
        points: [
          "Pertanyaan ringan dan tidak menghakimi",
          "Dapat dilewati kapan saja tanpa rasa bersalah",
          "Teks hanya dikirim ke AI setelah persetujuanmu",
        ],
      },
      {
        id: "kartu-cerita",
        step: "Langkah 2",
        title: "Kartu Cerita Pribadi: Mengubah Uneg-Uneg Jadi Ringkasan",
        desc: "AI membantu merapikan jawabanmu menjadi draf kartu ringkas dengan 5 elemen: situasi yang dialami, perasaan yang dirasakan, kebutuhan dukungan, kalimat pembuka bicara, dan calon pendamping. Kamu dapat memeriksa dan mengedit semuanya sebelum disimpan.",
        points: [
          "Diberi label 'Draf dari AI — periksa dan edit sebelum digunakan'",
          "Tersimpan di akun hanya setelah persetujuan eksplisit",
          "Bisa diunduh, disalin, atau dihapus permanen kapan saja",
        ],
      },
      {
        id: "practice-talk",
        step: "Langkah 3",
        title: "Practice Talk: Simulasi Percakapan yang Aman",
        desc: "Merasa gugup sebelum bicara? Kamu bisa berlatih menyampaikan kalimat pembuka lewat simulasi lawan bicara (teman sebaya, guru BK, atau orang tua). AI bertindak sebagai mitra latihan dan memberikan 1–3 umpan balik praktis yang suportif.",
        points: [
          "Transparan sebagai simulasi, bukan percakapan nyata",
          "Umpan balik yang tidak mempermalukan atau menyalahkan",
          "Riwayat percakapan tidak disimpan permanen secara default",
        ],
      },
      {
        id: "support-pathway",
        step: "Langkah 4",
        title: "Support Pathway: Menghubungkan ke Bantuan Nyata",
        desc: "Tujuan akhir SELA.AI adalah membantumu terhubung dengan manusia tepercaya. Sistem menyediakan checklist persiapan bicara dan direktori pihak terverifikasi (guru BK, konselor sebaya, puskesmas, psikolog, serta kontak krisis nasional).",
        points: [
          "Selalu gratis dan tidak pernah dikunci di balik paywall",
          "Hanya menampilkan kontak yang benar-benar telah diverifikasi",
          "Tidak mengarang nomor telepon atau fasilitas fiktif",
        ],
      },
    ],
  },

  features: {
    title: "Fitur yang Dirancang dengan Empati dan Batasan Etis",
    subtitle:
      "Bukan sekadar chatbot. Setiap modul dibangun untuk mendukung ketahanan mental dan kecakapan hidup remaja.",
    list: [
      {
        title: "Guided Story AI",
        category: "Navigasi Awal",
        desc: "Panduan pertanyaan berurutan yang membantu mengurai benang kusut di kepala tanpa paksaan membuka trauma.",
      },
      {
        title: "Kartu Cerita Pribadi",
        category: "Komunikasi",
        desc: "Dokumen pegangan pribadi yang memuat kalimat pembuka siap pakai saat kamu butuh bicara dengan orang lain.",
      },
      {
        title: "Practice Talk Simulation",
        category: "Latihan Praktis",
        desc: "Ruang uji coba menyampaikan perasaan kepada figur yang berbeda tanpa rasa takut dihakimi.",
      },
      {
        title: "Support Pathway & Checklist",
        category: "Koneksi Nyata",
        desc: "Daftar opsi bantuan manusia yang realistis beserta panduan langkah demi langkah saat menemui pendamping.",
      },
      {
        title: "Jurnal Reflektif Mandiri",
        category: "Refleksi",
        desc: "Ruang catatan pribadi dengan pertanyaan refleksi harian. Tersimpan lokal di perangkatmu tanpa pelacakan.",
      },
      {
        title: "Ruang Belajar & Life Skills",
        category: "Psikoedukasi",
        desc: "Modul ringkas mengenai komunikasi asertif, regulasi emosi, teknik napas 4-7-8, dan pemecahan masalah.",
      },
    ],
  },

  pricing: {
    title: "Paket & Harga yang Transparan",
    subtitle:
      "Asumsi harga awal untuk validasi produk. Bantuan keselamatan dasar tidak pernah dipaywall.",
    notice:
      "Harga Rp19.000 / 30 hari adalah asumsi awal untuk uji validasi pasar BPC Management Expo 2026. Pembayaran tidak diperpanjang secara otomatis (tidak ada auto-charge).",
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
      "Transparansi penuh mengenai apa yang kami proses, bagaimana data disimpan, dan hak kontrolmu.",
    points: [
      {
        title: "1. Prinsip Minimalisasi Data (Data Minimization)",
        desc: "Kami tidak meminta nomor identitas (NIK), alamat rumah, lokasi presisi, atau data sensitif yang tidak dibutuhkan oleh sistem.",
      },
      {
        title: "2. Pemrosesan Data oleh Google Gemini AI",
        desc: "Saat kamu menggunakan fitur Guided Story, Practice Talk, atau refleksi AI, teks dikirimkan ke Google Gemini API secara aman dari server kami untuk menghasilkan respons. Kami tidak menjual datamu untuk iklan atau melatih model publik.",
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
