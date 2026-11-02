import { loadEnvConfig } from "@next/env";
import { generateGeminiChat, getGeminiConfigStatus } from "../src/lib/ai/geminiService";

// Fictional scenarios only. Run explicitly: npx tsx scripts/evaluate-chat-depth.ts
async function main() {
  loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
  if (!getGeminiConfigStatus().isConfigured) {
    console.log("SKIP: Gemini belum dikonfigurasi untuk pengujian langsung.");
    return;
  }
  const history: { role: "user" | "model"; text: string }[] = [
    { role: "user", text: "Aku capek setelah kelas dan tugas. Pacarku juga baru mutusin aku, jadi bingung." },
    { role: "model", text: "Dari kuliah dan hubungan, mana yang ingin kamu bahas dulu?" },
  ];
  const message = "Hubungan sih yang paling memengaruhi aku.";
  const result = await generateGeminiChat({ userAlias: "Kawan", mode: "guided_story", history, userMessage: message });
  if (result.error) {
    console.log("FAIL: Layanan AI tidak tersedia; kualitas jawaban belum dapat dinilai.");
    process.exitCode = 1;
    return;
  }
  console.log(JSON.stringify({ scenario: "Memperdalam topik yang sudah dipilih", model: result.modelUsed, words: result.reply.split(/\s+/).length, questions: (result.reply.match(/\?/g) || []).length, reply: result.reply }, null, 2));
  const followup = await generateGeminiChat({
    userAlias: "Kawan", mode: "guided_story",
    history: [...history, { role: "user", text: message }, { role: "model", text: result.reply }],
    userMessage: "Aku pengin minta penjelasan ke dia tanpa memaksa balikan. Bantu bikin contoh pesan yang tenang, ya.",
  });
  if (followup.error) {
    console.log("FAIL: Skenario permintaan contoh pesan belum dapat diuji.");
    process.exitCode = 1;
    return;
  }
  console.log(JSON.stringify({ scenario: "Memberi contoh konkret ketika diminta", model: followup.modelUsed, reply: followup.reply }, null, 2));
}
main().catch(() => { console.log("FAIL: Pengujian langsung belum berhasil dijalankan."); process.exitCode = 1; });
