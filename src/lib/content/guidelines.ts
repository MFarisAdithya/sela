/**
 * FATHERCARE AI - Standard Content Design & Copywriting Guidelines
 * 
 * Aturan baku penyusunan teks untuk seluruh antarmuka dan interaksi AI:
 * 1. Bahasa Indonesia natural, ringkas, tenang, dan terasa ditulis manusia.
 * 2. Tanpa slogan motivasi berlebihan atau jargon pemasaran klise.
 * 3. Tidak mengklaim menyembuhkan, mendiagnosis, atau menggantikan tenaga profesional.
 * 4. Label singkat dan fungsional untuk navigasi, tombol, judul, dan form.
 * 5. Respons Safe Story AI hangat, langsung menanggapi cerita spesifik pengguna, tanpa validasi emosional berulang.
 */

export const CONTENT_RULES = {
  tone: "tenang, hangat, lugas, nonklinis, menghormati batasan pengguna",
  forbiddenPhrases: [
    "Mulai perjalanan menuju versi terbaik dirimu",
    "Kamu tidak pernah sendirian",
    "Temukan potensi luar biasa dalam dirimu",
    "Kami hadir untuk menemani setiap langkahmu",
    "Mari bersama-sama menciptakan masa depan yang lebih baik",
    "Kamu pasti bisa melewati semua ini",
    "Segala sesuatu terjadi karena ada alasannya",
    "Tetaplah tersenyum",
  ],
  standardLabels: {
    dashboardTitle: "Apa kabar hari ini?",
    moodPrompt: "Pilih yang paling menggambarkan keadaanmu.",
    chatButton: "Mulai bercerita",
    journalTitle: "Catatan pribadi",
    moduleButton: "Mulai latihan",
    referralButton: "Cari pendamping",
    growthTitle: "Rencana bertumbuh",
    settingsTitle: "Pengaturan & privasi",
    consentConfirm: "Setuju dan kirim",
    cancelButton: "Batal",
    deleteButton: "Hapus",
    skipButton: "Lewati",
    saveButton: "Simpan",
  },
  aiResponsePrinciples: [
    "Akui situasi pengguna secara singkat tanpa berlebihan.",
    "Jangan gunakan bahasa terapis palsu seperti 'Aku sangat memahami lukamu'.",
    "Ajukan satu pertanyaan terbuka yang relevan dengan cerita.",
    "Tawarkan satu langkah kecil yang realistis.",
    "Beri kendali penuh kepada pengguna untuk lanjut atau berhenti.",
  ],
};
