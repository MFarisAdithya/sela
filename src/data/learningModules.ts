export interface LearningModule {
  id: string;
  slug: string;
  title: string;
  category: "Psikoedukasi" | "Life Skills" | "Resiliensi" | "Karier";
  duration: string;
  description: string;
  objectives: string[];
  contentSections: Array<{
    heading: string;
    body: string;
  }>;
  microExercise: {
    title: string;
    instruction: string;
    suggestedReflection: string;
  };
  disclaimer: string;
}

export const learningModules: LearningModule[] = [
  {
    id: "mod-1",
    slug: "mengenali-emosi",
    title: "Mengenali & Memvalidasi Emosi Diri",
    category: "Psikoedukasi",
    duration: "4 menit baca",
    description: "Belajar menamai apa yang dirasakan tanpa rasa bersalah atau terburu-buru menolaknya.",
    objectives: [
      "Mampu mengidentifikasi 5 emosi dasar dan variasinya.",
      "Memahami bahwa semua emosi adalah pesan alami tubuh, bukan tanda kelemahan.",
      "Mempraktikkan jeda 60 detik saat gelombang emosi intens datang.",
    ],
    contentSections: [
      {
        heading: "Mengapa Menamai Emosi Itu Penting?",
        body: "Seringkali kita merasa tidak nyaman tetapi hanya bisa berkata 'aku lagi bad mood' atau 'aku bingung'. Ketika kita bisa menamai emosi secara spesifik—seperti sedih, sepi, kecewa, takut, atau lelah—otak kita mulai beralih dari mode reaktif menjadi mode memahami. Emosi adalah sinyal kebutuhan yang belum terpenuhi, bukan vonis siapa diri kita.",
      },
      {
        heading: "Prinsip Validasi Emosi",
        body: "Validasi bukan berarti menyetujui semua tindakan, melainkan mengakui bahwa apa yang kamu rasakan itu nyata dan masuk akal berdasarkan situasi yang kamu alami. Kamu berhak merasa terluka tanpa harus merasa bersalah karena merasakannya.",
      },
    ],
    microExercise: {
      title: "Latihan Napas & Penamaan 60 Detik",
      instruction: "Tutup matamu sejenak. Letakkan tangan di dada. Tanyakan pada dirimu: 'Saat ini, emosi apa yang paling hadir di dadaku?'.",
      suggestedReflection: "Tuliskan 1 nama emosi tersebut di jurnal harianmu.",
    },
    disclaimer: "Materi ini bersifat edukasi literasi emosional dan bukan terapi klinis.",
  },
  {
    id: "mod-2",
    slug: "komunikasi-asertif",
    title: "Komunikasi Asertif: Menetapkan Batas yang Sehat",
    category: "Life Skills",
    duration: "5 menit baca",
    description: "Cara menyampaikan pendapat dan batas diri tanpa agresif atau memendam rasa secara pasif.",
    objectives: [
      "Membedakan respon pasif, agresif, dan asertif.",
      "Menguasai formula kalimat 'Saya merasa...'",
      "Berani berkata tidak dengan sopan dan tegas.",
    ],
    contentSections: [
      {
        heading: "Perbedaan Tiga Gaya Komunikasi",
        body: "Komunikasi pasif mengabaikan hak diri sendiri demi menyenangkan orang lain. Komunikasi agresif memaksakan kehendak dan melukai orang lain. Komunikasi asertif menghargai hak diri sendiri sekaligus menghormati martabat orang lain secara seimbang.",
      },
      {
        heading: "Formula Kalimat 'Saya Merasa...'",
        body: "Cobalah gunakan rumus: 'Saat [kejadian spesifik], saya merasa [emosi saya], karena [dampaknya bagi saya]. Ke depannya, saya berharap [permintaan yang jelas].' Formula ini meminimalkan rasa tersinggung pada lawan bicara.",
      },
    ],
    microExercise: {
      title: "Praktik Kalimat Asertif",
      instruction: "Pikirkan satu situasi di mana kamu ingin menolak ajakan yang membebanimu. Susun kalimat penolakan sopanmu.",
      suggestedReflection: "'Terima kasih sudah mengajakku, tapi saat ini jadwalku cukup padat sehingga aku tidak bisa ikut.'",
    },
    disclaimer: "Materi life skills untuk komunikasi interpersonal sehari-hari.",
  },
  {
    id: "mod-3",
    slug: "membangun-resiliensi",
    title: "Membangun Resiliensi & Penerimaan Diri",
    category: "Resiliensi",
    duration: "6 menit baca",
    description: "Menemukan kekuatan internal saat menghadapi situasi hidup yang tidak ideal.",
    objectives: [
      "Memahami bahwa ketidakhadiran figur tertentu tidak mengurangi nilai dirimu.",
      "Memetakan lingkaran kendali (apa yang bisa dikontrol vs tidak bisa dikontrol).",
      "Menumbuhkan rasa sayang pada diri sendiri (self-compassion).",
    ],
    contentSections: [
      {
        heading: "Nilai Dirimu Utuh dan Berharga",
        body: "Dampak keterlibatan orang tua memang nyata dalam fase tumbuh kembang, namun itu bukan penentu mutlak masa depanmu. Nilai dirimu tidak berkurang hanya karena situasi keluarga yang belum ideal. Kamu memiliki kapasitas untuk bertumbuh dan membentuk identitasmu sendiri.",
      },
      {
        heading: "Fokus pada Lingkaran Kendali",
        body: "Kita tidak bisa mengontrol masa lalu, sikap orang lain, atau takdir keluarga. Yang bisa kita kontrol adalah respon kita hari ini: bagaimana kita merawat diri, memilih teman yang baik, belajar hal baru, dan meminta pertolongan saat butuh.",
      },
    ],
    microExercise: {
      title: "Lingkaran Kendali Cepat",
      instruction: "Tuliskan 1 hal yang sedang mencemaskanmu. Tanya diri: 'Apakah ini dalam kendaliku hari ini?' Jika tidak, lepaskan beban itu perlahan.",
      suggestedReflection: "Fokuskan tenagamu pada hal kecil yang bisa kamu kerjakan sekarang.",
    },
    disclaimer: "Materi psikoedukasi resiliensi nonklinis.",
  },
  {
    id: "mod-4",
    slug: "pemecahan-masalah",
    title: "Pemecahan Masalah & Pengambilan Keputusan",
    category: "Life Skills",
    duration: "5 menit baca",
    description: "Langkah terstruktur mengatasi kebuntuan pikiran tanpa tergesa-gesa.",
    objectives: [
      "Mengenal 4 langkah pemecahan masalah sederhana.",
      "Mengurangi 'analysis paralysis' atau overthinking berlebihan.",
      "Menentukan opsi terbaik berdasarkan nilai pribadimu.",
    ],
    contentSections: [
      {
        heading: "Uraikan Masalah Menjadi Bagian Kecil",
        body: "Masalah besar seringkali terasa menakutkan karena kita melihatnya secara bertumpuk. Cobalah uraikan: apa faktanya, apa yang dirasakan, apa opsi yang ada, dan apa konsekuensi paling realistis dari setiap pilihan.",
      },
    ],
    microExercise: {
      title: "Uraian 2 Opsi",
      instruction: "Tuliskan 1 keputusan yang sedang kamu timbang. Buat pro dan kontra singkat untuk masing-masing.",
      suggestedReflection: "Pilihlah langkah yang paling aman dan mendekatkanmu pada tujuan hidupmu.",
    },
    disclaimer: "Panduan pemecahan masalah mandiri.",
  },
  {
    id: "mod-5",
    slug: "kesiapan-karier",
    title: "Mengenali Potensi Diri & Kesiapan Karier",
    category: "Karier",
    duration: "7 menit baca",
    description: "Menemukan bakat terpendam dan mempersiapkan langkah pendidikan atau dunia kerja dengan percaya diri.",
    objectives: [
      "Memetakan kekuatan karakter dan keterampilan yang kamu miliki.",
      "Menyusun perkenalan diri 60 detik untuk wawancara magang/kerja.",
      "Menemukan mentor atau role model positif di sekitarmu.",
    ],
    contentSections: [
      {
        heading: "Kekuatan yang Tumbuh dari Kemandirian",
        body: "Remaja yang terbiasa mandiri seringkali memiliki ketangguhan kerja, empati tinggi, dan kemampuan adaptasi yang luar biasa di tempat kerja. Kenali ini sebagai kekuatan kompetitifmu.",
      },
    ],
    microExercise: {
      title: "Perkenalan Diri 60 Detik",
      instruction: "Praktikkan perkenalan singkat: 'Nama saya..., kelebihan saya adalah..., dan saya tertarik mengembangkan keterampilan dalam bidang...'.",
      suggestedReflection: "Latihlah di depan cermin atau rekam suaramu selama 1 menit.",
    },
    disclaimer: "Panduan orientasi karier remaja.",
  },
];
