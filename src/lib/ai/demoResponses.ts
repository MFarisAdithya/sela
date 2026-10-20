import { RetrievalResult } from "@/types/knowledge";

export interface DemoReplyResult {
  reply: string;
  citations: Array<{
    title: string;
    source: string;
    status: string;
    summary: string;
  }>;
}

export function generateDemoReply(
  userText: string,
  retrieved: RetrievalResult[]
): DemoReplyResult {
  const normalized = userText.toLowerCase();

  // Citations mapping from retrieved chunks
  const citations =
    retrieved.length > 0
      ? retrieved.map((r) => ({
          title: r.chunk.title,
          source: r.chunk.source_name,
          status: r.chunk.review_status === "verified_expert" ? "Terverifikasi Ahli" : "Draf Prototipe",
          summary: r.chunk.content.slice(0, 140) + "...",
        }))
      : [
          {
            title: "Pengenalan Emosi & Regulasi Diri Remaja",
            source: "Modul Psikoedukasi Genre InnovAItion 2026",
            status: "Terverifikasi Ahli",
            summary: "Menamai emosi secara spesifik dan memvalidasi perasaan tanpa menghakimi diri sendiri.",
          },
        ];

  if (normalized.includes("cemas") || normalized.includes("takut") || normalized.includes("panik")) {
    return {
      reply:
        "Rasa cemas saat menghadapi situasi yang tidak pasti adalah respon wajar tubuh kita yang sedang berusaha melindungi diri. Kamu tidak sedang gagal; tubuhmu hanya sedang merasa kewalahan. Cobalah luangkan 60 detik untuk teknik pernapasan perlahan (tarik 4 detik, hembuskan 6 detik). Dari hal-hal yang sedang kamu pikirkan, bagian mana yang saat ini benar-benar bisa kamu pengaruhi langkahnya hari ini?",
      citations,
    };
  }

  if (normalized.includes("ayah") || normalized.includes("keluarga") || normalized.includes("sepi") || normalized.includes("rumah")) {
    return {
      reply:
        "Tinggal dalam dinamika keluarga yang minim komunikasi atau mengalami ketidakhadiran figur ayah memang bisa menimbulkan rasa sepi dan rindu yang mendalam. Perasaan itu sangat manusiawi dan valid. Ingatlah bahwa nilai dirimu utuh dan berharga, bukan ditentukan oleh kekurangan orang lain di masa lalu. Apakah saat ini kamu merasa lebih butuh didengarkan, atau ingin mencari cara menyampaikan perasaanmu secara perlahan?",
      citations,
    };
  }

  if (normalized.includes("teman") || normalized.includes("asertif") || normalized.includes("menolak") || normalized.includes("marah")) {
    return {
      reply:
        "Menetapkan batasan yang sehat bukanlah tindakan egois, melainkan bentuk kepedulian terhadap kesejahteraan emosimu. Kamu bisa mencoba menggunakan formula komunikasi asertif: 'Saya merasa... ketika... karena...'. Dengan cara ini, kamu menyampaikan kebutuhanmu tanpa harus menyerang atau memendam rasa kecewa sendirian.",
      citations,
    };
  }

  if (normalized.includes("karier") || normalized.includes("kerja") || normalized.includes("lulus") || normalized.includes("kuliah")) {
    return {
      reply:
        "Kebingungan saat merencanakan masa depan adalah fase yang dialami hampir semua remaja di masa transisi. Kemandirian dan ketangguhan yang telah kamu latih selama ini adalah modal berharga. Cobalah buat daftar 3 kekuatan karakter yang paling kamu miliki, atau diskusikan pilihanmu dengan Guru BK di sekolah.",
      citations,
    };
  }

  // General grounded empathetic fallback
  return {
    reply:
      "Terima kasih sudah meluangkan waktu untuk membagikan ceritamu. Mengurai isi pikiran dalam tulisan adalah langkah awal yang sangat baik untuk mengenali kebutuhan diri. Apa yang saat ini paling ingin kamu rasakan: rasa tenang sejenak, kejelasan langkah, atau sekadar teman yang mendengarkan tanpa menuntut?",
    citations,
  };
}
