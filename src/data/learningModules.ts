export interface LearningModule {
  id: string;
  title: string;
  category: "Memahami Diri" | "Keterampilan Sehari-hari" | "Masa Depan & Langkah Kecil";
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
    title: "Mengenali & Menerima Emosi Diri",
    category: "Memahami Diri",
    duration: "3 menit baca",
    source: "Modul Tentang Kita - BKKBN",
    description: "Membantu menamai apa yang kamu rasakan tanpa merasa bersalah atau menganggap diri lemah.",
    keyPoints: [
      "Semua emosi (marah, sedih, lelah) wajar dan memberi sinyal kebutuhan dirimu.",
      "Menolak atau memendam emosi justru bikin badan dan pikiran makin capek.",
      "Cukup akui apa yang kamu rasakan saat ini, tanpa harus terburu-buru menghilangkannya.",
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
    title: "Komunikasi Asertif: Menyampaikan Batas Diri",
    category: "Keterampilan Sehari-hari",
    duration: "4 menit baca",
    source: "Pedoman Keterampilan Konselor Sebaya - BKKBN & ABKIN",
    description: "Cara menyampaikan unek-unek atau menolak ajakan teman tanpa bikin tersinggung atau bertengkar.",
    keyPoints: [
      "Gunakan sudut pandang perasaanmu sendiri daripada menyalahkan orang lain.",
      "Fokus pada hal spesifik yang terjadi dan apa yang kamu butuhkan.",
      "Tetap tenang dan dengarkan jawaban tanpa langsung merasa bersalah.",
    ],
    practicalExercise: {
      title: "Menyusun Pesan yang Tenang",
      duration: "2 menit",
      steps: [
        "Pikirkan satu hal yang mengganggumu belakangan ini.",
        "Rangkai kalimat: 'Ketika [kejadian], aku merasa [emosi], dan aku butuh [kebutuhan]. Bisa tolong [permintaan]?'",
        "Latih mengucapkannya dengan santai dan intonasi stabil.",
      ],
    },
  },
  {
    id: "mod-3",
    title: "Menghadapi Kekecewaan dengan Tenang",
    category: "Memahami Diri",
    duration: "4 menit baca",
    source: "Panduan Dukungan Kesehatan Jiwa Remaja - Kemendikbud & WHO",
    description: "Belajar melepaskan hal-hal yang di luar kendalimu saat rencana atau harapan tidak sesuai kenyataan.",
    keyPoints: [
      "Pisahkan lingkaran kendali: mana yang murni bisa kamu ubah vs mana yang di luar kuasamu.",
      "Tindakan dan perkataan orang lain di luar kuasamu; responsmu adalah milikmu sendiri.",
      "Fokus pada satu langkah kecil yang bisa kamu lakukan hari ini.",
    ],
    practicalExercise: {
      title: "Pemisahan Lingkaran Kendali",
      duration: "2 menit",
      steps: [
        "Tuliskan 2 hal yang saat ini membuatmu cemas atau kepikiran.",
        "Tandai: apakah hal tersebut bisa kamu kendalikan sendiri 100% atau tidak?",
        "Alihkan perhatianmu hanya kepada hal yang dapat kamu kerjakan hari ini.",
      ],
    },
  },
  {
    id: "mod-4",
    title: "Perkenalan Diri Singkat untuk Wawancara",
    category: "Masa Depan & Langkah Kecil",
    duration: "3 menit baca",
    source: "Kesiapan Kerja Remaja - Kemnaker RI & BKKBN",
    description: "Menyampaikan keahlian, pengalaman nyata, dan minatmu secara percaya diri dalam 1 menit.",
    keyPoints: [
      "Struktur 3 tahap: Siapa kamu, pengalaman terpentingmu, dan apa yang ingin kamu pelajari.",
      "Jeda 1 detik di antara kalimat menunjukkan ketenangan dan rasa percaya diri.",
      "Pengalaman menghadapi masa sulit di sekolah/hidup adalah bukti ketangguhan yang berharga.",
    ],
    practicalExercise: {
      title: "Latihan Bicara 60 Detik",
      duration: "1 menit",
      steps: [
        "Pasang pengatur waktu selama 60 detik.",
        "Ucapkan nama, keahlian utama, dan satu hal yang ingin kamu pelajari.",
        "Dengarkan rekaman suaramu dan pastikan intonasimu jelas tanpa terburu-buru.",
      ],
    },
  },
  {
    id: "mod-5",
    title: "Napas 4-7-8, buat malam yang kepalanya ramai",
    category: "Memahami Diri",
    duration: "2 menit latihan",
    source: "Latihan Relaksasi Mandiri - Rekomendasi Konselor Sebaya",
    description: "Kalau pikiranmu muter terus pas mau tidur, coba ini. Nggak butuh apa-apa selain napasmu.",
    keyPoints: [
      "Tarik napas lewat hidung sambil hitung sampai 4.",
      "Tahan napas perlahan sampai hitungan 7.",
      "Embuskan pelan-pelan lewat mulut sampai hitungan 8.",
    ],
    practicalExercise: {
      title: "Latihan Napas 4-7-8",
      duration: "2 menit",
      steps: [
        "Duduk atau rebahan senyaman mungkin.",
        "Ulangi siklus 4-7-8 sebanyak 3 sampai 4 kali.",
        "Kalau mulai pusing, berhenti dan napas biasa dulu. Nggak ada yang salah, tubuhmu cuma butuh waktu.",
      ],
    },
  },
];
