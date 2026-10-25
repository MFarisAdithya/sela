# SELA.AI — AI-Powered Help-Seeking Navigator
> *"From Unspoken Problems to Prepared Conversations"*  
> Platform navigasi nonklinis untuk membantu remaja dan dewasa muda (15–24 tahun) mengurai beban pikiran yang sulit diungkapkan, menyusunnya menjadi ringkasan yang jelas, berlatih berbicara secara asertif, dan menemukan jalur bantuan nyata yang tepat.

---

## 🌟 4 Pilar Inti SELA.AI

SELA.AI tidak dirancang sebagai chatbot teman curhat tanpa ujung atau pengganti tenaga profesional. Setiap alur dioptimalkan untuk memindahkan pengguna dari **masalah yang terpendam menuju percakapan nyata yang siap dihadapi**:

1. **Pilar 1: Guided Story (`/safe-story`)**  
   Pengurai beban pikiran terpandu 4 langkah (*Lawan Bicara & Fakta, Emosi yang Dirasa, Kebutuhan Nyata, dan Kalimat Pembuka*). Membantu pengguna memisahkan fakta objektif dari kecemasan sebelum berbicara. Dilengkapi opsi obrolan bebas dengan pendamping AI dan intersepsi krisis darurat.
2. **Pilar 2: Kartu Cerita Pribadi (`/journal`)**  
   Generator ringkasan 4 kuadran yang rapi dan terstruktur. Pengguna dapat mengedit langsung, menyalin ke papan klip, mengunduh salinan teks aman (`.TXT`), serta membawanya langsung ke sesi simulasi bicara.
3. **Pilar 3: Practice Talk (`/dashboard`)**  
   Simulasi percakapan *turn-by-turn* dengan 4 persona realistis: *Orang Tua, Guru / Dosen, Teman Sebaya, dan Konselor Profesional*. Dilengkapi laci contekkan Kartu Cerita dan catatan pembinaan komunikasi asertif (*[Tips Komunikasi]*).
4. **Pilar 4: Support Pathway (`/support`)**  
   Navigasi bantuan nyata yang **selalu 100% gratis tanpa paywall**: panduan 4 langkah konsultasi kesehatan mental di Puskesmas menggunakan BPJS Kesehatan, contekkan kata pembuka pertama untuk dokter umum, dan hotline darurat nasional (SEJIWA 119 ext 8, SAPA 129, Halo Kemenkes 1500-567).

---

## 🛡️ Batas AI & Prinsip Keselamatan Nonklinis

- **Bukan Alat Diagnosis:** SELA.AI secara tegas menolak pertanyaan spekulasi medis (*"apakah aku depresi?"*, *"diagnosa bipolar"*), memberikan penegasan batas nonklinis, dan menyediakan sitasi resmi rujukan faskes.
- **Intersepsi Krisis Otomatis:** Deteksi indikasi bahaya mendesak langsung menghentikan alur promosi/simulasi dan memunculkan banner darurat SEJIWA 119 ekstensi 8 (Bebas pulsa, 24 jam).
- **Penyaring Data Pribadi (PII Masker):** Secara otomatis menyamarkan NIK 16 digit, nomor telepon Indonesia (+62 8xx / 08xx), alamat surel, dan nama legal sebelum teks diproses oleh model bahasa.
- **Kepatuhan Privasi (UU No. 27/2022 PDP):** Persetujuan terpisah antara Ketentuan Layanan, Kebijakan Privasi, dan Izin Pemrosesan AI. Pengguna memiliki kendali penuh untuk mengekspor atau menghapus akun dan datanya secara permanen.
- **Tanpa Auto-Charge:** Model *Supporter* (Rp19.000 / 30 hari) bersifat perpanjangan manual; tidak ada penagihan kartu kredit otomatis atau perpanjangan paksa.

---

## 🛠️ Arsitektur Teknologi & Tech Stack

- **Frontend & App Framework:** Next.js 15.5 (App Router, Server & Client Components, Route Groups)
- **Desain & UI:** Tailwind CSS, Soft Neumorphism terkurasi, Palet Resmi SELA (Navy `#17365D`, Royal Blue `#2457A7`, Ice Blue `#E3EEFF`), Lucide React Icons
- **AI & RAG Engine:** Google Gen AI SDK (Gemini 1.5 Flash), Hybrid In-Memory Retrieval (BM25 Keyword Scoring + Semantic Domain Mapping) dengan 24 artikel terkurasi resmi
- **Gerbang Pembayaran:** Abstraksi Midtrans Snap Sandbox terverifikasi dengan penanganan webhook idempoten
- **Pengujian & QA:** Puppeteer headless testing suite (Multi-viewport: 320, 375, 390, 768, 1024, 1440 px)

---

## 🚀 Panduan Menjalankan Secara Lokal

### Prasyarat Sistem:
- **Node.js:** Versi 18 ke atas (Direkomendasikan v20 atau v24)
- **npm:** Versi 9 ke atas

### Langkah Instalasi:
```bash
# 1. Masuk ke direktori proyek
cd FATHERCARE-AI

# 2. Pasang dependensi
npm install

# 3. Konfigurasikan Environment Variables (Salin template)
cp .env.example .env.local

# 4. Jalankan server pengembangan lokal
npm run dev
```

Buka peramban pada tautan: **http://localhost:3000**

---

## 🔑 Konfigurasi Environment (`.env.local`)

File `.env.local` digunakan untuk mengatur integrasi backend. Salin dari `.env.example`:

```env
# 1. Google Gemini AI (Server-Side Only)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
GEMINI_TIMEOUT_MS=60000

# 2. Gerbang Pembayaran Sandbox (Midtrans Snap)
PAYMENT_PROVIDER=midtrans
PAYMENT_MODE=sandbox
MIDTRANS_SERVER_KEY=your_midtrans_server_key_here
MIDTRANS_CLIENT_KEY=your_midtrans_client_key_here
MIDTRANS_IS_PRODUCTION=false

# 3. Aplikasi
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Catatan Sandbox & AI Fallback:**  
> Jika `GEMINI_API_KEY` atau `MIDTRANS_SERVER_KEY` belum diisi, platform secara otomatis beralih ke mode **Simulasi Terpandu Offline** dan **SELA Sandbox Payment Simulator** tanpa error atau klaim fiktif.

---

## 🧪 Menjalankan Suite Pengujian & QA Otomatis

Proyek dilengkapi script pengujian verifikasi berbasis headless browser Microsoft Edge:

```bash
# Uji reposisi & arsitektur publik (Fase 1)
node scripts/verify-phase1.mjs

# Uji autentikasi, persetujuan UU PDP, & route guard (Fase 2)
node scripts/verify-phase2.mjs

# Uji 4 Pilar Inti & 24 cek multi-viewport (Fase 3)
node scripts/verify-phase3.mjs

# Uji RAG Knowledge Base, PII Sanitizer, & Refusal Guardrail (Fase 4)
node scripts/verify-phase4.mjs

# Uji Freemium Entitlements, Webhook Idempotensi, & 18 cek viewport billing (Fase 5)
node scripts/verify-phase5.mjs

# Uji Keamanan Lintas Akun, Kebocoran Kunci, Intersepsi Krisis, & E2E QA (Fase 6)
node scripts/verify-phase6-security-qa.mjs
```

---

## 📦 Kompilasi Produksi & Deployment

```bash
# Build aplikasi produksi
npm run build

# Menjalankan build produksi secara lokal
npm run start
```

### Deployment ke Vercel:
1. Hubungkan repositori GitHub: `https://github.com/MFarisAdithya/sela.git`.
2. Masukkan Environment Variables di dashboard Vercel (`GEMINI_API_KEY`, `MIDTRANS_SERVER_KEY`, dll.).
3. Pilih framework preset **Next.js**.
4. Klik **Deploy**.

---

## 📄 Lisensi & Hak Cipta
Hak Cipta © 2026 SELA.AI. Seluruh hak cipta dilindungi undang-undang.
