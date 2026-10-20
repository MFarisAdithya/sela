# PROJECT PLAN — FATHERCARE AI WEB APP

**Tujuan:** Membangun web prototype FATHERCARE AI yang responsif di laptop dan HP, memakai dominasi biru dan neumorphism yang halus, dengan pengalaman pengguna yang tenang, nyaman, dan tidak terasa seperti template AI generik.

**Basis produk:** Proposal PDF FATHERCARE AI yang diunggah pengguna, terutama fitur pada lampiran prototype halaman 35–36: Splash Screen, Onboarding dan Persetujuan, Dashboard, Safe Story AI, Jurnal Reflektif, Ruang Belajar, Peta Dukungan, Hubungi Pendamping, dan Rencana Bertumbuh.

**Status target:** Prototype kompetisi yang bisa didemonstrasikan. Jangan klaim sebagai layanan kesehatan mental klinis atau produk siap produksi.

---

## 0. Cara Menggunakan Dokumen Ini di Antigravity App (Standalone Agent, Bukan IDE)

Dokumen ini ditujukan untuk **Google Antigravity App desktop yang berpusat pada AI agent**, bukan workflow editor/IDE. Agent bekerja dalam sebuah Project yang dibatasi oleh folder/repository, dan dapat menghasilkan artifacts seperti implementation plan, perubahan file, serta hasil verifikasi. Nama menu dapat sedikit berbeda menurut versi aplikasi.

### Langkah awal
1. Unduh/simpan dokumen ini ke komputer dengan nama `PROJECT_PLAN_FATHERCARE_AI.md`.
2. Buat folder baru lokal bernama `FATHERCARE-AI` untuk proyek ini. Pastikan folder itu tidak berisi file penting lain karena agent akan membuat dan mengubah file di dalam folder proyek.
3. Buka **Antigravity App** → klik **New Project** → **Add Folder** → pilih folder `FATHERCARE-AI` → **Create**. Untuk folder baru tanpa repository, pilih mode kerja lokal bila diminta. Dokumentasi Antigravity menyebut agent beroperasi dalam Project yang menentukan batas folder, file, dan izin kerja.
4. Pastikan `PROJECT_PLAN_FATHERCARE_AI.md` berada di dalam folder proyek agar agent bisa membacanya. Jika sudah membuat Project, salin file tersebut ke folder tadi sebelum meminta agent mengerjakan kode.
5. Mulai percakapan agent baru. Gunakan `/plan` jika perintah itu tersedia, atau pilih Planning Mode. Kirim prompt pertama di bawah. **Jangan langsung meminta seluruh aplikasi selesai dalam satu langkah.**
6. Periksa Artifact/Implementation Plan yang dibuat agent. Jika ada bagian yang keliru, minta revisi. Baru setelah plan disetujui, minta agent melaksanakan Fase 1.
7. Minta agent menjalankan aplikasi dan memeriksanya lewat browser. Pastikan ia melaporkan URL preview, hasil pengujian, dan fitur yang belum selesai. Jangan memasukkan API key ke chat atau source code; siapkan `.env` secara lokal setelah server siap.

### Prompt pertama untuk Antigravity App

> Kamu bekerja sebagai autonomous coding agent di Google Antigravity App desktop, bukan mengasumsikan saya sedang memakai IDE. Baca file `PROJECT_PLAN_FATHERCARE_AI.md` dari folder Project ini sampai selesai. Untuk respons pertama, jangan membuat atau mengubah kode. Buat artifact Implementation Plan dan Task List yang berurutan; evaluasi persyaratan produk, desain neumorphism biru, responsive laptop/HP, keselamatan, AI integration, dan pengujian. Pastikan RAG dengan basis pengetahuan terverifikasi menjadi bagian MVP, bukan fitur opsional. Laporkan asumsi, risiko, file/folder yang akan dibuat, serta cara menguji di browser. Tunggu persetujuan saya sebelum memulai implementasi.

### Prompt setelah rencana disetujui

> Jalankan Fase 1 saja sesuai plan yang sudah disetujui: siapkan fondasi proyek dan design system responsif. Jangan membuat semua fitur sekaligus. Setelah selesai, jalankan pemeriksaan yang tersedia dan gunakan browser untuk memeriksa tampilan desktop dan mobile. Tampilkan ringkasan perubahan, bukti verifikasi, kendala, dan task berikutnya. Tunggu persetujuan sebelum masuk Fase 2.

---

## 1. Ringkasan Produk

FATHERCARE AI adalah platform pendampingan awal untuk remaja dan dewasa muda yang membantu pengguna memahami emosi dan kebutuhan dukungan, melakukan refleksi, mempelajari life skills, menyusun target pengembangan diri, serta menemukan pilihan pendamping manusia.

AI hanya berperan sebagai **asisten refleksi dan edukasi awal**. AI bukan psikolog, bukan konselor, tidak menetapkan diagnosis, tidak menentukan seseorang “fatherless” secara otomatis, dan tidak menggantikan dukungan manusia.

### Tujuan prototype
1. Memperlihatkan alur pengguna dari persetujuan, check-in emosi, chat, rekomendasi modul, hingga opsi dukungan manusia.
2. Menyediakan interaksi yang benar-benar bisa dicoba, bukan hanya mockup statis.
3. Memisahkan mode demo dari mode AI aktif agar pengguna tidak keliru menganggap jawaban simulasi sebagai jawaban AI sungguhan.
4. Menunjukkan desain responsif dan konsisten di viewport mobile, tablet, dan desktop.
5. Menjadi bukti konsep untuk proposal BPC, bukan menggantikan validasi pasar, validasi profesional, atau pengujian keamanan.

---

## 2. Pengguna dan Kebutuhan

### Pengguna utama
- Remaja/dewasa muda yang ingin memahami emosi atau mengembangkan life skills.
- Pengguna yang ingin bercerita atau melakukan refleksi secara privat.
- Pengguna yang ingin menemukan orang tepercaya atau pendamping manusia.

### Pengguna pendukung pada tahap berikutnya
- Guru BK, fasilitator, konselor, atau institusi pendidikan yang dapat mengarahkan pengguna ke layanan yang sesuai.
- Dashboard institusi **bukan bagian dari MVP pertama** kecuali alur pengguna inti selesai lebih dahulu.

### Prinsip inklusif
- Jangan mengasumsikan semua orang yang tidak mendapat keterlibatan ayah pasti mengalami masalah.
- Jangan menyalahkan pengguna atau anggota keluarganya.
- Gunakan bahasa Indonesia yang hangat, sederhana, tidak menggurui, dan tidak mendiagnosis.
- Berikan kontrol pada pengguna: lanjut, berhenti, melewati pertanyaan, menolak rekomendasi, atau menghapus data.

---

## 3. Scope Produk

### MVP wajib
1. Onboarding dan halaman persetujuan.
2. Dashboard dengan check-in emosi.
3. Safe Story AI / chat reflektif.
4. Jurnal reflektif.
5. Ruang belajar berisi modul life skills.
6. Peta dukungan / daftar tipe orang yang bisa dipercaya.
7. Halaman hubungi pendamping dengan data mitra yang telah diverifikasi atau placeholder yang ditandai jelas.
8. Rencana bertumbuh dengan target mingguan dan progres.
9. Pengaturan privasi yang jelas, termasuk opsi reset sesi/demo.
10. Tampilan responsif dan keadaan UI yang lengkap: loading, error, kosong, berhasil, serta mode demo.

### Ditunda sampai MVP stabil
- Login dan pendaftaran akun.
- Penyimpanan permanen jurnal/percakapan.
- Dashboard admin/institusi.
- Skoring risiko otomatis yang diklaim akurat.
- Integrasi layanan kesehatan atau rujukan otomatis.
- Analitik lintas pengguna.
- Fitur sosial, komunitas publik, atau berbagi jurnal.

**Aturan:** Jangan menambahkan fitur baru di luar scope tanpa meminta persetujuan. Lebih baik 7–9 layar inti yang selesai dan konsisten daripada banyak layar yang hanya dekoratif.

---

## 4. Design Direction

### Arah visual
- **Dominasi biru**, suasana tenang, dewasa, ramah, dan terpercaya.
- Gunakan **soft neumorphism secara selektif** pada kartu, tombol utama, panel check-in, dan elemen terpilih.
- Hindari neumorphism berlebihan pada semua komponen karena dapat menurunkan kontras dan keterbacaan.
- Gunakan latar biru sangat pucat, panel putih kebiruan, teks navy, serta satu aksen biru kuat.
- Hindari tampilan “AI slop”: jangan gunakan gradient ungu-biru di semua area, glow berlebihan, blob dekoratif acak, robot/otak AI klise, glassmorphism berulang, dashboard yang penuh kartu tanpa hierarki, emoji sebagai pengganti ikon UI, atau copywriting hiperbolis.
- Jangan memakai stok gambar yang tidak punya fungsi. Gunakan ikon konsisten dari Lucide dan ilustrasi abstrak sederhana hanya jika membantu pemahaman.
- Micro-animation seperlunya: transisi 150–220 ms, tidak ada gerakan yang mengganggu, hormati `prefers-reduced-motion`.

### Palet awal — simpan sebagai CSS variables
- `--color-primary-900: #17365D` — heading/navy utama.
- `--color-primary-700: #2457A7` — tombol/aksi utama.
- `--color-primary-500: #4C7EDB` — aksen biru.
- `--color-primary-100: #E4EEFC` — panel biru muda.
- `--color-background: #F2F6FC` — latar utama.
- `--color-surface: #F8FAFE` — permukaan kartu.
- `--color-text: #1D2C43` — teks utama.
- `--color-muted: #607089` — teks sekunder, pastikan tetap terbaca.
- `--color-border: #D9E3F1` — garis/batas halus.
- `--color-success: #277A68`; `--color-warning: #946200`; `--color-danger: #B42332`.

Warna ini titik awal, bukan aturan kaku. Periksa rasio kontras teks dan elemen kontrol; jangan menggunakan teks abu-abu pucat di latar terang.

### Prinsip neumorphism
- Gunakan dua bayangan lembut (light top-left dan darker bottom-right) pada permukaan yang relevan.
- Sediakan batas/outline tipis untuk kontrol interaktif agar terlihat sebagai kontrol, bukan sekadar dekorasi.
- Tombol punya state default, hover, focus-visible, active, disabled, dan loading.
- Input tetap terlihat jelas dengan label dan border; jangan gunakan inset shadow yang menghilangkan keterbacaan.
- Seluruh elemen interaktif harus mudah dikenali, termasuk untuk pengguna keyboard.

### Tipografi dan layout
- Gunakan `Inter` atau font sans-serif sistem yang mudah dibaca.
- H1 jelas, body sekitar 16 px, line-height 1.5–1.7.
- Skala spacing 4/8 px; radius 12–18 px; hindari semua elemen menjadi kapsul.
- Konten desktop memiliki lebar baca yang wajar; jangan meregangkan paragraf ke seluruh layar.
- Buat reusable tokens untuk warna, radius, shadow, spacing, ukuran teks, dan breakpoint.

### Responsive behavior
- **Mobile (320–767 px):** satu kolom, navigasi bawah atau menu ringkas, tombol full-width bila sesuai, kartu tidak menumpuk menjadi grid sempit, input aman dari keyboard HP.
- **Tablet (768–1023 px):** grid 2 kolom jika konten sesuai, navigasi dapat berubah menjadi compact sidebar.
- **Desktop (1024 px ke atas):** sidebar kiri, topbar sederhana, area konten utama, panel sekunder hanya bila dibutuhkan.
- Uji minimal di lebar 320, 375, 390, 768, 1024, dan 1440 px.
- Tidak boleh ada horizontal overflow, teks terpotong, tombol terlalu kecil, atau modal yang tidak bisa ditutup di mobile.
- Target sentuh ideal minimal 44 × 44 px.

---

## 5. Rancangan Layar dan Acceptance Criteria

### Layar 1 — Onboarding & Consent
**Elemen:** logo wordmark sederhana; penjelasan fungsi; batas kemampuan AI; ringkasan penggunaan data; checkbox/consent yang jelas; tombol “Lanjut”; tautan privasi.

**Kriteria:** pengguna tidak masuk ke chat tanpa melihat pemberitahuan bahwa AI dapat keliru. Persetujuan tidak boleh dipilih otomatis. Pengguna dapat keluar atau melewati fitur opsional.

### Layar 2 — Dashboard
**Elemen:** sapaan netral; check-in emosi; prompt “Apa yang kamu butuhkan hari ini?”; shortcut ke Safe Story, Jurnal, Ruang Belajar, Peta Dukungan; rekomendasi satu langkah kecil.

**Kriteria:** status emosi tidak digunakan untuk memberi diagnosis. Setelah pilihan emosi, sistem hanya memberi rekomendasi edukasi ringan dan dapat dikoreksi.

### Layar 3 — Safe Story AI
**Elemen:** chat bubble, input multiline, contoh prompt yang tidak memaksa pengguna membahas keluarga, indikator mode `DEMO` atau `AI AKTIF`, loading state, error state, batas penggunaan, tombol “Lihat pilihan bantuan”.

**Kriteria:**
- Mode demo dan AI aktif harus dibedakan secara jelas.
- Jangan menyatakan model “memahami sepenuhnya” perasaan pengguna.
- Jangan memberi diagnosis atau menyalahkan keluarga.
- Jika ada indikasi bahaya, jangan lanjutkan respons motivasional generik; tampilkan pesan singkat yang mengutamakan keselamatan dan opsi bantuan manusia.
- Jangan klaim mekanisme deteksi krisis sudah andal. Pada prototype, jelaskan batas sistem.
- Tambahkan batas panjang input dan error handling.

### Layar 4 — Jurnal Reflektif
**Elemen:** prompt refleksi; area teks; tombol “Simpan di sesi ini” bila diperlukan; tombol hapus; opsi “Bantu aku merefleksikan tulisan ini” yang baru mengirim isi jurnal ke AI setelah persetujuan eksplisit.

**Kriteria:** jangan simpan isi jurnal secara permanen secara default. Jangan mengirim jurnal ke model tanpa tindakan pengguna yang jelas. Sediakan “Hapus” dan status setelah dihapus.

### Layar 5 — Ruang Belajar
**Modul awal:** mengenali emosi; komunikasi asertif; resiliensi; pemecahan masalah; pengambilan keputusan; kepercayaan diri; kesiapan karier.

**Elemen:** daftar modul, durasi perkiraan, tujuan pembelajaran, langkah/latihan, status belum mulai/sedang berlangsung/selesai.

**Kriteria:** materi edukatif, bukan terapi atau pengganti tenaga profesional. Gunakan kemajuan lokal non-sensitif selama prototype.

### Layar 6 — Peta Dukungan
**Elemen:** kategori dukungan: keluarga/kerabat, sahabat tepercaya, guru BK, konselor, psikolog, layanan profesional/organisasi yang relevan.

**Kriteria:** jangan menciptakan nama, alamat, nomor telepon, jam layanan, atau mitra fiktif. Jika direktori wilayah belum diverifikasi, tampilkan kategori dan label “contoh/akan diverifikasi”, bukan detail kontak palsu. Pengguna tetap dapat memilih siapa yang ingin dihubungi.

### Layar 7 — Hubungi Pendamping
**Elemen:** penjelasan fungsi rujukan; pilihan jenis pendamping; persetujuan tentang informasi yang akan dibagikan; tombol kembali/batal.

**Kriteria:** pada MVP, buat flow simulasi yang jelas. Jangan mengklaim rujukan telah terkirim jika belum ada integrasi nyata. Hindari mengirim isi chat lengkap secara default.

### Layar 8 — Rencana Bertumbuh
**Elemen:** pilih 1–3 target pribadi; langkah mingguan; checklist; progres sederhana; pilihan edit/hapus target.

**Kriteria:** target bersifat sukarela dan dapat diubah. Hindari streak atau gamifikasi yang memicu rasa bersalah.

### Layar 9 — Privasi & Pengaturan
**Elemen:** status mode AI; penjelasan data yang diproses; hapus sesi/demo; reset progres lokal; tautan kebijakan privasi dan batasan AI.

**Kriteria:** tindakan hapus/reset memberikan konfirmasi. Jangan mengklaim keamanan produksi atau kerahasiaan absolut.

---

## 6. Teknologi yang Disarankan

Gunakan stack sederhana dan mudah dirawat:
- **Framework:** Next.js App Router + TypeScript.
- **Styling:** Tailwind CSS dengan CSS variables/design tokens; CSS khusus untuk neumorphism.
- **Icons:** `lucide-react`.
- **Form validation:** Zod untuk validasi request dan input.
- **AI:** OpenAI Responses API melalui server-side route, hanya bila API key disediakan tim.
- **Testing:** Playwright untuk alur penting dan ukuran layar; unit test untuk fungsi yang mudah dipisahkan.
- **MVP data:** tanpa akun dan tanpa database untuk pesan/jurnal sensitif. Simpan hanya preferensi UI dan progres modul non-sensitif bila diperlukan. Jurnal/chat harus tetap di memori sesi kecuali pengguna secara eksplisit memilih alur yang menjelaskan konsekuensi data.

**Jangan menambahkan database, autentikasi, analitik pihak ketiga, atau paket besar tanpa alasan yang jelas.** Jika database dibutuhkan pada tahap berikutnya, ajukan rancangan keamanan dan model data terlebih dahulu.

### Struktur folder awal
```text
src/
  app/
    page.tsx
    onboarding/page.tsx
    dashboard/page.tsx
    safe-story/page.tsx
    journal/page.tsx
    learning/page.tsx
    support/page.tsx
    growth-plan/page.tsx
    settings/page.tsx
    api/chat/route.ts
  components/
    layout/
    navigation/
    ui/
    onboarding/
    dashboard/
    chat/
    journal/
    learning/
    support/
    growth-plan/
  features/
    consent/
    mood-checkin/
    safe-story/
    modules/
    referrals/
  lib/
    ai/
    safety/
    validation/
    storage/
  styles/
    globals.css
  types/
```

Folder names boleh disesuaikan oleh agent bila ada alasan teknis; jaga pemisahan komponen, logika fitur, panggilan AI, dan utilitas keamanan.

---

## 6A. Knowledge Base dan RAG — Wajib untuk MVP

RAG bukan sekadar menyebut istilah AI; alur ini harus ada di implementasi MVP agar chat edukatif merujuk pada materi yang dapat diperiksa.

### Basis pengetahuan minimum
- Buat koleksi materi berbahasa Indonesia tentang pengenalan emosi, latihan refleksi, komunikasi asertif, resiliensi, pengambilan keputusan, dukungan sosial, dan kesiapan karier.
- Setiap dokumen/chunk memiliki metadata: `title`, `topic`, `source_name`, `source_url_or_reference`, `review_status`, `reviewed_at` bila diketahui, dan `audience`.
- Hanya materi yang ditandai sudah ditinjau yang boleh dipakai sebagai sumber jawaban definitif. Materi contoh yang belum ditinjau harus diberi label demo dan tidak boleh diklaim sebagai panduan profesional tervalidasi.
- Simpan materi awal di file lokal terstruktur (misalnya Markdown atau JSON) untuk menghindari kebutuhan database pada MVP. Jangan mengarang jurnal, kutipan, penulis, atau URL.

### Alur RAG minimum
1. Pengguna mengirim pertanyaan setelah melihat persetujuan pengiriman teks ke AI.
2. Backend menormalisasi dan memvalidasi input.
3. Sistem mencari potongan materi relevan dari basis pengetahuan.
4. Backend mengirim pertanyaan dan potongan yang relevan ke model dengan instruksi untuk menjawab berdasarkan materi tersebut.
5. UI menampilkan respons serta sumber yang digunakan jika memang ada.
6. Jika tidak ada materi relevan atau model tidak bisa mendasarkan jawaban pada sumber, sistem menyatakan batasan dan menawarkan materi umum yang aman atau opsi bantuan manusia—jangan mengarang sumber.

### Implementasi MVP yang proporsional
- Mulai dari pencarian berbasis kata kunci/TF-IDF sederhana di kumpulan dokumen kecil bila embedding/database terlalu berat. Pilih embeddings/vector store hanya jika dapat dijalankan dan diuji dalam waktu kompetisi.
- Pisahkan `knowledge-base`, retrieval logic, system instructions, dan API route agar dapat diuji terpisah.
- Tambahkan tes: pertanyaan yang ada sumbernya, pertanyaan tanpa sumber relevan, sumber belum ditinjau, dan upaya meminta AI mengarang rujukan.
- Tampilkan indikator `Sumber materi` pada UI. Jangan menampilkan lencana “tervalidasi” jika belum benar-benar ditinjau oleh ahli yang sesuai.

### Acceptance criteria RAG
- [ ] Chat menjalankan retrieval sebelum menghasilkan respons edukatif.
- [ ] Respons dapat ditautkan kembali ke dokumen/chunk yang dipakai.
- [ ] Tidak ada sumber atau kontak yang dibuat-buat.
- [ ] Jika retrieval kosong/lemah, sistem memakai fallback yang jujur.
- [ ] README menerangkan keterbatasan knowledge base prototype dan proses review yang masih dibutuhkan.

---

## 7. Aturan Integrasi AI dan Keamanan

### Backend
- Tambahkan server route `/api/chat` untuk menerima input dan menghubungi model.
- API key hanya dibaca dari environment variable server, misalnya `OPENAI_API_KEY`; jangan pernah menaruhnya di `NEXT_PUBLIC_*`, frontend, repository, atau file yang dikomit.
- Sertakan `.env.example` tanpa secret asli.
- Validasi input dengan Zod; batasi panjang pesan; tangani timeout, rate limit, status API error, dan respons kosong.
- Jangan log isi chat, jurnal, token, atau data identitas di console/server log.
- Jika API key tidak ada atau request gagal, tampilkan fallback demo yang berlabel jelas; jangan diam-diam berpura-pura AI aktif.
- Jelaskan kepada pengguna ketika teks yang ditulis akan dikirim ke layanan AI pihak ketiga.

### Prinsip system prompt AI
AI harus:
1. Menjawab dalam bahasa Indonesia yang hangat, singkat, tidak menggurui, dan tidak menghakimi.
2. Membantu refleksi, mengenali kebutuhan, dan menawarkan satu langkah kecil yang aman.
3. Tidak mendiagnosis depresi, trauma, gangguan mental, atau menetapkan label “fatherless”.
4. Tidak menyuruh pengguna memutus hubungan, menghadapi orang yang berbahaya, atau mengambil langkah yang berisiko tanpa mempertimbangkan keselamatan.
5. Tidak mengklaim sebagai psikolog, terapis, konselor profesional, atau pengganti dukungan manusia.
6. Menyebut batas kemampuan saat tidak yakin; jangan mengarang fakta atau layanan rujukan.
7. Tidak mendorong ketergantungan emosional pada AI.
8. Mengutamakan pilihan bantuan manusia saat kebutuhan melampaui fungsi edukasi/refleksi.

### Konten risiko tinggi
- Prototype bukan layanan krisis. Buat pesan fallback yang ringkas: jika pengguna berada dalam bahaya segera, prioritaskan pergi ke tempat aman bila memungkinkan dan hubungi orang tepercaya atau layanan darurat setempat.
- Jangan menampilkan nomor lokal, organisasi, atau rujukan spesifik sebelum diverifikasi.
- Jangan mengklaim keyword filter sederhana dapat mendeteksi semua kondisi berisiko. Tandai sebagai lapisan prototipe dan butuh validasi pakar.
- Jangan lakukan peluncuran publik untuk pengguna remaja sebelum ditinjau profesional, aturan perlindungan data, dan prosedur eskalasi diuji.

---

## 8. Fase Implementasi

### Fase 0 — Discovery & plan
- Di Antigravity App, periksa Project folder yang telah ditambahkan dan file di dalamnya. Jika folder kosong, siapkan scaffold baru; jangan menganggap repository sudah ada.
- Periksa package manager yang tersedia atau pilih satu yang sesuai dengan setup project.
- Sajikan implementation plan, daftar tugas, trade-off, dan pertanyaan yang memang perlu dijawab.
- Jangan mulai menulis kode sebelum plan disetujui.

### Fase 1 — Foundation & Design System
- Setup app, routing, lint/type-check.
- Implementasi design tokens, typography, button, input, card, modal, nav, toast, empty/loading/error states.
- Buat shell responsif: sidebar desktop dan bottom navigation mobile.
- Verifikasi screenshot desktop dan mobile.

### Fase 2 — UI semua layar inti
- Implementasi onboarding, dashboard, chat, jurnal, belajar, dukungan, rencana bertumbuh, pengaturan.
- Gunakan data contoh sintetis.
- Pastikan setiap tombol penting bekerja atau diberi state disabled dengan penjelasan.

### Fase 3 — State & interaksi
- Implementasi check-in, rekomendasi berbasis aturan sederhana yang dijelaskan, progres modul, checklist target, navigasi, konfirmasi hapus/reset.
- Jurnal/percakapan tidak dipersistenkan secara default.
- Tambahkan empty, loading, error, success, dan state mobile.

### Fase 4 — Integrasi AI
- Implementasi `/api/chat`, validasi, rate limit dasar, timeout, dan error handling.
- Sambungkan Responses API server-side.
- Implementasikan retrieval dari knowledge base kecil sebelum generasi respons (RAG wajib di MVP).
- Tampilkan sumber materi yang benar-benar diambil; jika tidak ada sumber yang memadai, sampaikan keterbatasan.
- Implementasikan fallback demo yang eksplisit.
- Tambahkan pesan batasan AI dan consent sebelum mengirim teks.

### Fase 5 — Safety review
- Uji prompt untuk dukungan emosional ringan, pertanyaan umum, permintaan diagnosis, konflik keluarga, dan contoh risiko tinggi.
- Pastikan AI tidak memberikan diagnosis, fakta rujukan fiktif, janji kerahasiaan absolut, atau arahan berbahaya.
- Catat keterbatasan yang belum tertangani; jangan melabeli sistem sebagai aman/tervalidasi tanpa pengujian yang memadai.

### Fase 6 — Responsive & accessibility QA
- Jalankan tes pada 320, 375, 390, 768, 1024, dan 1440 px.
- Periksa overflow horizontal, tab order, focus visible, label input, modal, keyboard mobile, kontras, ukuran tombol, dan `prefers-reduced-motion`.
- Gunakan browser agent untuk memeriksa alur end-to-end jika tersedia.

### Fase 7 — Delivery
- Perbaiki temuan, dokumentasikan cara instalasi dan run.
- Buat README berisi setup, `.env.example`, scripts, batasan prototype, dan panduan demo BPC.
- Laporkan file yang dibuat/diubah, hasil test, hal yang belum selesai, dan langkah menjalankan aplikasi.

---

## 9. Definition of Done

Pekerjaan dianggap selesai untuk MVP hanya jika:
- [ ] Semua 8–9 layar inti dapat dibuka dan dinavigasi.
- [ ] UI berfungsi di laptop dan mobile, tanpa horizontal overflow pada ukuran uji.
- [ ] Gaya biru dan neumorphism konsisten serta masih punya kontras yang baik.
- [ ] Ada state loading, empty, error, success, dan demo/AI aktif yang jelas.
- [ ] Mode demo tidak menyamar sebagai AI sungguhan.
- [ ] API key tidak pernah muncul pada client bundle atau Git.
- [ ] Chat edukatif melakukan retrieval dari knowledge base sebelum generasi respons dan dapat menampilkan sumber yang dipakai.
- [ ] Jurnal/chat tidak disimpan permanen secara default dan ada kontrol penghapusan yang jelas.
- [ ] AI tidak diberi kewenangan diagnosis dan tidak mengarang direktori pendamping.
- [ ] Navigasi keyboard, focus states, label form, dan tombol mobile dapat digunakan.
- [ ] Unit/type/lint tests yang tersedia berjalan lulus; alur utama diuji di browser.
- [ ] README menjelaskan fitur, setup, AI configuration, batas keamanan, dan langkah demo.
- [ ] Ada catatan eksplisit fitur yang belum siap produksi.

---

## 10. Instruksi Utama untuk Antigravity

Gunakan prompt utama berikut di Agent panel setelah membuka folder project. Jika versi Antigravity yang dipakai mendukung `/plan`, mulai dengan `/plan`. Minta agent membuat implementation plan dan task list terlebih dahulu, lalu tinjau dan setujui sebelum kode diubah.

### MASTER PROMPT — COPY/PASTE

> Bertindak sebagai senior product designer, frontend engineer, dan AI application engineer. Bangun FATHERCARE AI sebagai web prototype yang responsif di laptop dan HP berdasarkan dokumen Project Plan ini dan fitur pada proposal FATHERCARE AI yang tersedia di workspace.
>
> Sebelum coding, baca seluruh dokumen yang relevan dan tampilkan: (1) implementation plan, (2) task list berurutan, (3) struktur folder yang diusulkan, (4) risiko teknis/privasi, dan (5) acceptance criteria. Jangan mengubah file sampai saya menyetujui plan.
>
> Gunakan Next.js App Router, TypeScript, Tailwind CSS dengan CSS variables/design tokens, lucide-react, dan Zod bila sesuai. Terapkan warna dominan biru dan soft neumorphism yang selektif. UI harus tenang, modern, rapi, nyaman dibaca, tidak generik, dan bukan “AI slop”. Hindari gradient/glow dekoratif berlebihan, glassmorphism di mana-mana, robot/otak AI klise, kartu berlebihan, dan animasi yang tidak punya fungsi. Prioritaskan hierarki visual, whitespace, kontras, aksesibilitas, micro-interaction halus, dan responsive layout mobile-first.
>
> Implementasikan onboarding & consent, dashboard & mood check-in, Safe Story AI, jurnal reflektif, ruang belajar, peta dukungan, flow hubungi pendamping, rencana bertumbuh, dan pengaturan privasi. RAG dengan retrieval dari knowledge base kecil dan sumber materi yang dapat dilacak adalah fitur wajib MVP, bukan fitur opsional. Semua fitur harus punya state nyata. Jangan menambah fitur di luar scope tanpa persetujuan.
>
> AI hanya asisten refleksi/edukasi awal. Jangan diagnosis, jangan melabeli seseorang “fatherless” berdasarkan jawaban, jangan menyalahkan keluarga, jangan mengarang kontak atau organisasi pendamping, dan jangan mengklaim sebagai psikolog atau layanan krisis. Bedakan mode DEMO dan AI AKTIF secara eksplisit. Jika API key belum ada, gunakan fallback demo dengan label yang jelas. Integrasikan AI melalui server route saja; jangan pernah menaruh API key dalam kode frontend atau commit ke Git. Minta persetujuan sebelum mengirim isi chat/jurnal ke layanan AI eksternal. Jangan simpan chat/jurnal sensitif secara permanen secara default. Jangan log konten sensitif.
>
> Setelah setiap fase, jalankan typecheck/lint/test yang tersedia dan verifikasi di browser. Gunakan browser untuk menguji lebar 320, 375, 390, 768, 1024, dan 1440 px. Perbaiki overflow, keterbacaan, tombol yang tidak berfungsi, state error/loading, dan aksesibilitas. Jangan mengklaim fitur selesai jika belum diuji. Akhiri dengan README, ringkasan file, langkah run lokal, langkah mengaktifkan AI, test result, keterbatasan, dan panduan demo BPC.

### Prompt fase pertama setelah plan disetujui

> Laksanakan Fase 1 saja: setup project dan design system. Buat token warna, typography, shadows neumorphic, komponen dasar, serta responsive application shell. Jangan implementasikan integrasi AI dahulu. Jalankan checks yang tersedia dan periksa tampilan di browser pada mobile dan desktop. Setelah selesai, laporkan perubahan dan tunggu persetujuan untuk Fase 2.

### Prompt fase integrasi AI

> Laksanakan Fase 4 sesuai Project Plan. Periksa dahulu struktur aplikasi yang sudah ada. Implementasikan server-side AI integration, validasi request, timeout, error handling, fallback DEMO yang eksplisit, dan consent sebelum teks dikirim ke provider. API key hanya di environment server dan `.env.example` harus berisi placeholder. Uji mode tanpa API key dan mode dengan API key dummy yang gagal secara aman. Jangan mengklaim safety atau deteksi krisis sebagai tervalidasi.

### Prompt peninjauan visual

> Lakukan UI audit tanpa menambah fitur baru. Buka aplikasi di browser dan periksa viewport 320, 375, 390, 768, 1024, dan 1440 px. Cari horizontal overflow, kontras lemah, teks terlalu kecil, shadow neumorphism yang menyulitkan batas komponen, whitespace tidak konsisten, tombol yang tidak jelas, navigasi mobile yang mengganggu, dan gaya visual generik. Perbaiki masalah dengan perubahan sekecil mungkin, lalu ulangi uji dan dokumentasikan screenshot/temuan.

---

## 11. Batasan yang Harus Diakui

Ini adalah prototype kompetisi. Sebelum dipakai oleh pengguna sungguhan, tim memerlukan tinjauan profesional dan hukum terkait layanan remaja, validasi konten dan instrumen, keamanan data, kebijakan retensi, direktori rujukan terverifikasi, pemantauan dan evaluasi AI, prosedur insiden, serta pengujian aksesibilitas. Jangan memakai pengalaman nyata atau data identitas remaja untuk demo; gunakan skenario sintetis.
