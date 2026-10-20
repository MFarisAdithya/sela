# FATHERCARE AI — Platform Pendampingan Awal Remaja Nonklinis

> **Inovasi Program Genre InnovAItion AI Challenge &bull; ADUJAKNAS 2026**  
> *"Dukungan aman untuk jiwa muda yang hebat. Kami di sini untuk mendengarkan, memahami, dan mendukungmu di setiap langkah."*

---

## 1. Tentang Proyek

**FATHERCARE AI** adalah web prototype pendampingan awal nonklinis bagi remaja dan dewasa muda (usia 15–24 tahun) yang dirancang berdasarkan proposal resmi Forum Genre Provinsi Lampung untuk ajang ADUJAKNAS 2026.

Platform ini hadir untuk membantu remaja mengurai emosi, memahami kebutuhan dukungan terkait keterlibatan pengasuhan/figur ayah secara sehat tanpa menyalahkan, melatih *life skills* interpersonal, menyusun target perkembangan sukarela, serta menghubungkan pengguna ke pendamping manusia (*human-in-the-loop*).

### Prinsip Utama (Ethical & Responsible AI)
1. **Non-Diagnosis:** AI bukan psikolog/dokter dan tidak pernah menetapkan diagnosis medis/gangguan mental.
2. **Anti-Pelabelan:** Sistem tidak menentukan seseorang "pasti fatherless" atau "keluarga bermasalah" secara sepihak.
3. **Anti-Halusinasi:** Sistem tidak mengarang kontak, nama konselor, atau nomor fiktif. Seluruh rujukan awal berlabel jelas.
4. **Grounded RAG (Wajib MVP):** Setiap jawaban psikoedukasi merujuk pada basis pengetahuan terstruktur yang dapat ditelusuri sumbernya.
5. **Pemisahan Mode Transparan:** Mode DEMO (simulasi RAG lokal berlabel) dipisahkan secara tegas dari Mode AI AKTIF (model eksternal).
6. **Privacy by Design & Zero Server Persistence:** Isi chat privat dan jurnal tidak disimpan di database server publik. Semua data sesi berada di memori browser lokal (*Session Storage*).

---

## 2. Fitur 9 Layar Inti (Sesuai Lampiran Proposal Hal 35–36)

| No | Layar & Rute | Fungsi Utama |
| :--- | :--- | :--- |
| 1 | **Splash Screen** (`/`) | Tampilan sambutan awal, logo neumorphic, slogan utama, dan tombol mulai. |
| 2 | **Onboarding & Consent** (`/onboarding`) | Identitas samaran, rentang usia, penjelasan batas AI, dan persetujuan bertingkat. |
| 3 | **Dashboard** (`/dashboard`) | Sapaan ramah ("Hai, Alex! 👋"), check-in emosi 5 level, rekomendasi 1 langkah kecil, dan kartu pintasan. |
| 4 | **Safe Story AI** (`/safe-story`) | Percakapan empatik nonklinis, filter triage risiko darurat, kutipan sumber materi RAG, dan persetujuan transmisi AI. |
| 5 | **Jurnal Reflektif** (`/journal`) | Penulisan catatan harian dengan prompt panduan, opsi "Bantu Refleksi AI", dan kontrol hapus data tuntas. |
| 6 | **Ruang Belajar** (`/learning`) | Modul psikoedukasi, komunikasi asertif, resiliensi, dan latihan aksi 60 detik mandiri. |
| 7 | **Peta Dukungan** (`/support`) | Visualisasi konsentris orang terpercaya (Sahabat, Keluarga, Guru BK, Konselor Sebaya) dan formulir lokal tambah kontak aman. |
| 8 | **Hubungi Pendamping** (`/referrals`) | Simulasi alur tiket rujukan dengan kontrol pembagian data personal (nama samaran, usia, topik). |
| 9 | **Rencana Bertumbuh** (`/growth-plan`) | Target mingguan sukarela, circular progress neumorphic (67%), dan checklist bebas tekanan *streak-loss*. |
| 10| **Privasi & Pengaturan** (`/settings`) | Switch Mode AI AKTIF vs Mode DEMO, transparansi penyimpanan sesi, nomor darurat resmi, dan tombol reset tuntas. |

---

## 3. Teknologi yang Digunakan

* **Frontend Framework:** Next.js 15 (App Router) + React 19
* **Bahasa:** TypeScript (Strict Type Safety)
* **Styling & Design System:** Tailwind CSS v3 + Custom CSS Variables untuk Neumorphism Halus (*Raised*, *Inset*, *Pressed*)
* **Ikon:** Lucide React (Ikon rapi dan profesional, tanpa emoji klise)
* **Validasi Skema:** Zod (Runtime validation untuk payload chat dan form)
* **Retrieval Engine (RAG):** In-Memory BM25 / Token Matching pada JSON terstruktur di `src/data/knowledge-base/`
* **Keamanan & Sanitasi:** Heuristic 3-Tier Safety Classifier & Regex PII Sanitizer
* **Pengujian:** Node.js Native Test Runner (`tsx --test`) + Playwright Headless Multi-Viewport Browser Audit

---

## 4. Panduan Menjalankan Proyek Secara Lokal

### Prasyarat:
* Node.js v20.x atau v24.x
* npm v10.x atau v11.x

### Langkah Instalasi:
```bash
# 1. Klon atau buka folder proyek
cd "e:\MANAJEMEN S5\FATHERCARE-AI"

# 2. Instalasi dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev
```

Aplikasi akan aktif di **`http://localhost:3000`**.

---

## 5. Konfigurasi Mode AI (DEMO vs AKTIF)

Secara default, FATHERCARE AI langsung aktif dalam **Mode DEMO (Simulasi Lokal Berbasis RAG)** sehingga siap dipresentasikan dan diuji secara instan **tanpa memerlukan API Key** dan tanpa risiko kuota habis.

Jika Anda ingin mengaktifkan model generatif cloud OpenAI secara langsung:
1. Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Isi kunci API Anda di file `.env.local`:
   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
   OPENAI_MODEL=gpt-4o-mini
   ```
3. Buka menu **Privasi & Pengaturan** (`/settings`), lalu ubah switch mode menjadi **AI AKTIF**.
4. Sistem akan otomatis memanggil backend `/api/chat` dengan model OpenAI yang dilindungi RAG dan filter privasi PII.

---

## 6. Verifikasi & Pengujian

### A. Uji Logika & Unit Test
Menjalankan pengujian otomatis unit untuk Safety Classifier, PII Sanitizer, dan RAG Retrieval:
```bash
npm test
```
*Hasil: 9/9 tes lulus dalam <250ms.*

### B. Uji Audit Responsif Viewport (Playwright)
Menguji otomatis 10 rute pada 6 titik henti layar krusial (320px, 375px, 390px, 768px, 1024px, 1440px) dan memastikan 0 horizontal overflow:
```bash
npm run audit:viewport
```
*Hasil: 60/60 pengujian viewport lulus (0 horizontal overflow). Tangkapan layar otomatis disimpan di `.test-results/screenshots/`.*

### C. Type Check & Production Build
```bash
npm run type-check
npm run build
```

---

## 7. Batasan Prototipe (Fitur yang Belum Siap Produksi)

Sebagai bentuk integritas akademis dan kepatuhan proposal BPC:
1. **Lapisan Deteksi Krisis:** Menggunakan detektor kata kunci heuristik terstruktur; belum divalidasi oleh dewan psikolog klinis independen.
2. **Direktori Kontak & Rujukan:** Data pendamping berstatus mock/simulasi prototipe; belum terintegrasi API SIM Bimbingan Konseling atau DP3A.
3. **Penyimpanan Permanen:** Sengaja ditiadakan pada prototipe awal demi meminimalisasi risiko kebocoran data remaja.
4. **Skoring Father Involvement:** Skema kuesioner memerlukan standarisasi psikometrik lanjutan pada populasi remaja sebelum diterapkan secara formal.

---

## 8. Panduan Skenario Demo untuk Juri ADUJAKNAS 2026

1. **Buka Halaman Splash (`/`):** Tunjukkan identitas tenang, neumorphism biru yang ramah, dan penafian etis nonklinis.
2. **Masuk ke Onboarding (`/onboarding`):** Tunjukkan nama samaran "Alex", pilih rentang usia, dan centang persetujuan bertingkat (*Tiered Consent Gate*).
3. **Check-in Emosi di Dashboard (`/dashboard`):** Klik emosi "Sedih" atau "Bersemangat", perhatikan langkah kecil kontekstual yang direkomendasikan secara instan.
4. **Interaksi Safe Story AI (`/safe-story`):**
   * Pilih contoh prompt: *"Aku merasa cemas menghadapi ujian dan takut mengecewakan orang lain."*
   * Perhatikan bahwa AI merujuk pada materi terverifikasi di bawah respon (*RAG Citation Accordion*).
   * Uji coba skenario krisis darurat (ketik: *"aku ingin menyakiti diri"*), perhatikan AI langsung menghentikan mode santai dan menampilkan nomor darurat 119 ext 8.
5. **Jurnal Reflektif (`/journal`):** Tulis refleksi, simpan di sesi browser, dan uji opsi *"Bantu Aku Merefleksikan Tulisan Ini"*.
6. **Eksplorasi Ruang Belajar (`/learning`):** Buka modul *"Komunikasi Asertif"*, baca panduan, dan coba latihan 60 detik.
7. **Peta Dukungan (`/support`) & Hubungi Pendamping (`/referrals`):** Tunjukkan simulasi lingkaran konsentris orang terpercaya dan alur tiket rujukan dengan kontrol data.
8. **Pengaturan Privasi (`/settings`):** Tunjukkan transparansi data sesi dan tombol 1-klik untuk menghapus semua data jejak peramban.

---
*Dibuat dengan dedikasi untuk remaja Indonesia &bull; Forum Genre Provinsi Lampung 2026.*
