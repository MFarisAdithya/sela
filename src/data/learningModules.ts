export interface LearningModule {
  id: string;
  title: string;
  category: "Psikoedukasi" | "Life Skills" | "Karier";
  duration: string;
  source: string;
  description: string;
  keyPoints: string[];
  practicalExercise: {
    title: string;
    duration: string;
    steps: string[];
  };
}

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "mod-1",
    title: "Mengenali & Memvalidasi Emosi Diri",
    category: "Psikoedukasi",
    duration: "3 menit baca",
    source: "Modul Tentang Kita - Forum Genre & BKKBN (2021)",
    description: "Membantu menamai apa yang kamu rasakan tanpa merasa bersalah atau menganggap diri lemah.",
    keyPoints: [
      "Semua emosi (marah, sedih, kecewa) memiliki fungsi memberi sinyal kebutuhan diri.",
      "Menolak emosi justru memperpanjang rasa lelah emosional.",
      "Menamai perasaan secara spesifik menurunkan intensitas ketegangan di otak.",
    ],
    practicalExercise: {
      title: "Latihan Menamai Perasaan 60 Detik",
      duration: "1 menit",
      steps: [
        "Tarik napas perlahan dan letakkan tangan di dada.",
        "Sebutkan dalam hati: 'Saat ini aku sedang merasakan [emosi]', tanpa mencoba mengubahnya seketika.",
        "Beri izin dirimu untuk bernapas sejenak bersama perasaan tersebut.",
      ],
    },
  },
  {
    id: "mod-2",
    title: "Komunikasi Asertif: Teknik Pesan 'Saya'",
    category: "Life Skills",
    duration: "4 menit baca",
    source: "Pedoman Keterampilan Konselor Sebaya - BKKBN & ABKIN",
    description: "Cara menyampaikan batas diri atau kekecewaan kepada teman atau orang dewasa tanpa memicu pertengkaran.",
    keyPoints: [
      "Gunakan rumus: Peristiwa + Perasaan + Kebutuhan + Permintaan.",
      "Fokus pada dampak perilaku terhadap dirimu, bukan menyerang karakter orang lain.",
      "Tetap tenang dan dengarkan jawaban tanpa langsung memotong.",
    ],
    practicalExercise: {
      title: "Menyusun Kalimat Asertif",
      duration: "2 menit",
      steps: [
        "Pikirkan satu hal yang mengganggumu belakangan ini.",
        "Tuliskan dalam pola: 'Ketika [kejadian], aku merasa [emosi], dan aku butuh [kebutuhan]. Bisakah kita [ajakan]?'",
        "Latih mengucapkannya dengan intonasi stabil.",
      ],
    },
  },
  {
    id: "mod-3",
    title: "Menghadapi Kekecewaan dengan Resiliensi",
    category: "Psikoedukasi",
    duration: "4 menit baca",
    source: "Panduan Dukungan Kesehatan Jiwa Remaja - Kemendikbud & WHO",
    description: "Membangun daya lentur mental saat ekspektasi terhadap keluarga atau rencana masa depan tidak terwujud.",
    keyPoints: [
      "Pisahkan lingkaran kendali: hal yang bisa kamu ubah vs hal di luar kendalimu.",
      "Tindakan orang lain berada di luar kuasamu; responsmu adalah milikmu.",
      "Fokus pada satu langkah yang dapat kamu selesaikan hari ini.",
    ],
    practicalExercise: {
      title: "Pemisahan Lingkaran Kendali",
      duration: "2 menit",
      steps: [
        "Tuliskan 2 hal yang saat ini membuatmu cemas.",
        "Tandai: apakah hal tersebut bisa kamu kendalikan 100% atau tidak?",
        "Alihkan perhatianmu hanya kepada hal yang dapat kamu kerjakan hari ini.",
      ],
    },
  },
  {
    id: "mod-4",
    title: "Perkenalan Diri 60 Detik untuk Wawancara",
    category: "Karier",
    duration: "3 menit baca",
    source: "Kesiapan Kerja Remaja - Kemnaker RI & BKKBN",
    description: "Menyampaikan keahlian, pengalaman nyata, dan minatmu secara percaya diri dalam 1 menit.",
    keyPoints: [
      "Struktur 3 tahap: Siapa kamu, pengalaman terpentingmu, dan apa kontribusi yang ingin kamu berikan.",
      "Hindari berbicara terlalu cepat; jeda 1 detik di antara kalimat menunjukkan ketenangan.",
      "Pengalaman menghadapi rintangan hidup adalah bukti ketangguhan kerja.",
    ],
    practicalExercise: {
      title: "Simulasi Wawancara 60 Detik",
      duration: "1 menit",
      steps: [
        "Pasang pengatur waktu selama 60 detik.",
        "Ucapkan nama, keahlian utama, dan satu hal yang ingin kamu pelajari di tempat kerja.",
        "Evaluasi apakah intonasimu jelas dan tidak terburu-buru.",
      ],
    },
  },
];
