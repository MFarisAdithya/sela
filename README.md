# FATHERCARE AI — Web Platform Pendampingan Awal Remaja

Platform berbasis web responsif untuk pendampingan awal nonklinis bagi remaja dan dewasa muda (15–24 tahun), dirancang dengan pendekatan *Youth-centered*, *Strength-based*, dan *Privacy & Safety by Design*.

---

## 1. Fitur Utama Aplikasi

1. **Splash & Welcome Gate (`/`):** Pengenalan batasan platform secara jujur, privasi data, dan navigasi awal.
2. **Onboarding & Persetujuan Bertingkat (`/onboarding`):** Persetujuan eksplisit batas nonklinis dan kendali privasi sesi sebelum masuk ke aplikasi.
3. **Beranda & Check-in Emosi (`/dashboard`):** Sapaan netral, 5 level check-in emosi interaktif dengan langkah kecil realistis, dan 4 tombol akses cepat fungsional.
4. **Safe Story AI (`/safe-story`):** Ruang percakapan terintegrasi RAG knowledge base lokal, penelusuran sumber rujukan resmi, penanganan krisis darurat otomatis, dan status konfigurasi API transparan.
5. **Catatan Pribadi / Jurnal (`/journal`):** Pertanyaan pemandu harian, penulisan refleksi, penyimpanan lokal sesi, dan tombol konsultasi ke Cerita AI.
6. **Ruang Belajar (`/learning`):** Modul psikoedukasi, komunikasi asertif, resiliensi, dan kesiapan karier dengan latihan praktis 60 detik serta pelacak progres.
7. **Peta Dukungan (`/support`):** Visualisasi konsentris orang terpercaya (sahabat, keluarga, guru BK, konselor) dengan fitur penambahan kontak lokal secara privat.
8. **Cari Pendamping (`/referrals`):** Direktori layanan resmi (Guru BK, Konselor Sebaya Forum Genre/PIK-R, PKPR Puskesmas, UPTD PPA) dan generator tiket simulasi rujukan dengan persetujuan selektif data yang dibagikan.
9. **Rencana Bertumbuh (`/growth-plan`):** Target mingguan sukarela dengan indikator progres sirkular tanpa sistem hukuman streak.
10. **Pengaturan & Privasi (`/settings`):** Pusat kendali data, status konfigurasi AI backend, toggle izin transmisi AI, dan tombol reset seluruh sesi dengan satu klik.

---

## 2. Cara Menjalankan Proyek Secara Lokal

### Kebutuhan Sistem:
* Node.js v18 ke atas (Direkomendasikan v20 / v24)
* npm v9 ke atas

### Langkah Instalasi:
```bash
# 1. Masuk ke direktori proyek
cd FATHERCARE-AI

# 2. Instal seluruh dependensi
npm install

# 3. Jalankan server lokal
npm run dev
```
Buka browser pada: **http://localhost:3000**

---

## 3. Cara Mengaktifkan AI Sungguhan (OpenAI API)

Aplikasi dibangun untuk bekerja secara aktif dengan model AI di backend, bukan simulasi statis.

1. Buat file `.env.local` pada root direktori proyek (salin dari `.env.example`):
   ```bash
   cp .env.example .env.local
   ```
2. Isi `OPENAI_API_KEY` dengan kunci API OpenAI Anda:
   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
   OPENAI_MODEL=gpt-4o-mini
   ```
3. Muat ulang server (`npm run dev`).
4. Status pada navigasi akan otomatis berubah dari **"API Belum Dikonfigurasi"** menjadi **"AI Aktif"**.

> **Keamanan Kunci API:**  
> Kunci API dibaca **hanya di sisi server** (`src/app/api/chat/route.ts` dan `src/lib/ai/openAiService.ts`). Kunci **tidak pernah** dikirim atau terekspos ke bundle JavaScript di peramban pengguna.

---

## 4. Basis Pengetahuan RAG & Sumber Terverifikasi

Setiap respons di Safe Story AI diperiksa terlebih dahulu terhadap dokumen materi terverifikasi di `src/data/knowledge-base/`:
* **Psikoedukasi:** Modul *Tentang Kita* Forum Genre & BKKBN (2021), Kajian *Fatherless* Ashari (2018), Panduan Pengasuhan Positif KemenPPPA.
* **Life Skills:** Panduan Konselor Sebaya Remaja Indonesia, ABKIN (2020), Modul Keterampilan Hidup UNICEF.
* **Karier:** Pedoman Pelatihan Vokasi Kemendikbudristek & Kesiapan Kerja Kemnaker RI.
* **Protokol Keselamatan:** Layanan Kesehatan Jiwa SEJIWA Kemenkes RI (119 ext 8) & SAPA 129 KemenPPPA.
* **Rujukan:** Jejaring Ruang BK, PIK-R Forum Genre Lampung, Poli PKPR Puskesmas, UPTD PPA Provinsi Lampung.

---

## 5. Protokol Keselamatan & Perlindungan Data

* **Deteksi Krisis & Self-Harm:** Jika terdeteksi indikasi bahaya mendesak atau keinginan menyakiti diri, sistem **seketika menghentikan generasi AI** dan menampilkan kartu keselamatan darurat berisi nomor telepon resmi nasional (119 ext 8, 112, SAPA 129).
* **Sanitasi Data Pribadi (PII Masking):** Pola nomor telepon, surel, dan NIK disamarkan secara otomatis sebelum teks diproses oleh model bahasa.
* **Batas Nonklinis:** Sistem tidak mendiagnosis penyakit mental, tidak melabeli pengguna, dan tidak mengarang nama atau nomor pendamping palsu.
* **Zero Server Storage:** Catatan pribadi dan isi percakapan tidak disimpan permanen di basis data server.

---

## 6. Hasil Pengujian Browser & Viewport

Aplikasi telah diaudit secara otomatis di Microsoft Edge pada 6 titik henti (*breakpoints*) untuk 10 rute inti (total **60/60 uji lulus**):
* **320 px** (iPhone SE 1st gen) &bull; Nol horizontal overflow
* **375 px** (iPhone 8 / SE gen 2–3) &bull; Nol horizontal overflow
* **390 px** (iPhone 14/15/16 Pro) &bull; Nol horizontal overflow
* **768 px** (iPad / Tablet Potret) &bull; Nol horizontal overflow
* **1024 px** (Laptop Ringkas / Lanskap) &bull; Sidebar desktop aktif
* **1440 px** (Desktop HD) &bull; Tata letak terpusat proporsional

Jalankan pengujian ulang kapan saja dengan perintah:
```bash
npm run test:viewports
```
