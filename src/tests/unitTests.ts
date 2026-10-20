import assert from "node:assert";
import { test, describe } from "node:test";
import { classifySafetyRisk } from "../lib/safety/classifier";
import { maskPii } from "../lib/safety/piiMasker";
import { searchKnowledgeBase } from "../lib/ai/ragEngine";

describe("Safety Classifier Unit Tests", () => {
  test("mendeteksi indikasi risiko tinggi (keinginan menyakiti diri)", () => {
    const input = "Aku merasa sangat putus asa dan ingin menyakiti diri";
    const res = classifySafetyRisk(input);
    assert.strictEqual(res.level, "tinggi");
    assert.ok(res.triggeredKeywords.includes("menyakiti diri"));
    assert.ok(res.recommendedHotline?.includes("119"));
  });

  test("mendeteksi indikasi risiko sedang (kekerasan fisik berulang)", () => {
    const input = "Aku merasa tidak aman di rumah karena selalu dipukul terus";
    const res = classifySafetyRisk(input);
    assert.strictEqual(res.level, "sedang");
    assert.ok(res.triggeredKeywords.includes("dipukul terus") || res.triggeredKeywords.includes("tidak aman di rumah"));
  });

  test("mengklasifikasikan percakapan normal reflektif sebagai risiko rendah", () => {
    const input = "Hari ini aku merasa cemas menghadapi ujian sekolah";
    const res = classifySafetyRisk(input);
    assert.strictEqual(res.level, "rendah");
    assert.strictEqual(res.triggeredKeywords.length, 0);
  });
});

describe("PII Masker Sanitization Tests", () => {
  test("menyamarkan nomor telepon seluler Indonesia", () => {
    const input = "Hubungi aku di 081234567890 jika ada kabar.";
    const { sanitizedText, maskedCount } = maskPii(input);
    assert.ok(sanitizedText.includes("[NOMOR_TELEPON_DISAMARKAN]"));
    assert.strictEqual(sanitizedText.includes("081234567890"), false);
    assert.strictEqual(maskedCount, 1);
  });

  test("menyamarkan NIK 16 digit", () => {
    const input = "NIK saya adalah 1871012345678901 untuk verifikasi.";
    const { sanitizedText, maskedCount } = maskPii(input);
    assert.ok(sanitizedText.includes("[NIK_DISAMARKAN]"));
    assert.strictEqual(sanitizedText.includes("1871012345678901"), false);
    assert.strictEqual(maskedCount, 1);
  });

  test("menyamarkan alamat email", () => {
    const input = "Kirim ke alex.genre@example.com terima kasih.";
    const { sanitizedText, maskedCount } = maskPii(input);
    assert.ok(sanitizedText.includes("[EMAIL_DISAMARKAN]"));
    assert.strictEqual(sanitizedText.includes("alex.genre@example.com"), false);
    assert.strictEqual(maskedCount, 1);
  });
});

describe("RAG Knowledge Base Retrieval Tests", () => {
  test("mengambil modul komunikasi asertif untuk kueri terkait", () => {
    const query = "Bagaimana cara bicara asertif dan menetapkan batas?";
    const results = searchKnowledgeBase(query, 2);
    assert.ok(results.length > 0);
    assert.strictEqual(results[0].chunk.id, "ls-01");
    assert.strictEqual(results[0].chunk.title, "Komunikasi Asertif dan Formula 'Saya Merasa...'");
    assert.strictEqual(results[0].chunk.review_status, "verified_expert");
  });

  test("mengambil modul father absence untuk kueri keterlibatan ayah", () => {
    const query = "Aku merasa sepi karena ayah tidak pernah hadir";
    const results = searchKnowledgeBase(query, 2);
    assert.ok(results.length > 0);
    assert.strictEqual(results[0].chunk.id, "psy-02");
    assert.ok(results[0].chunk.title.includes("Ketidakhadiran Figur Ayah"));
  });

  test("mengembalikan array kosong secara aman untuk input acak tanpa match", () => {
    const query = "xyzqwerty12345 nonexistentword";
    const results = searchKnowledgeBase(query, 2);
    assert.strictEqual(results.length, 0);
  });
});
