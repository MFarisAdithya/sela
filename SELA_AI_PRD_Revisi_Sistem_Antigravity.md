# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# SELA.AI — Revisi Konsep, Alur Pengguna, Akun, AI, Premium, dan Pembayaran

**Versi:** 1.0  
**Tanggal:** 25 Oktober 2026  
**Tujuan dokumen:** sumber utama implementasi untuk Google Antigravity App (standalone AI agent)  
**Status:** PRD produk/prototype BPC Management Expo 2026; beberapa asumsi harga dan fitur masih perlu validasi  
**Nama produk yang digunakan:** SELA.AI  
**Tagline kerja:** *From Unspoken Problems to Prepared Conversations.*

---

## 0. Instruksi Penting untuk Antigravity

Dokumen ini menjelaskan **perubahan sistem dari konsep lama menjadi SELA.AI sebagai AI-Powered Help-Seeking Navigator**. Jangan hanya mengganti nama dan warna. Arsitektur informasi, interaksi pengguna, data yang dikumpulkan, fitur AI, batas paket, serta alur pembayaran harus mengikuti PRD ini.

Sebelum mengubah kode:
1. Baca PRD ini seluruhnya.
2. Audit proyek yang sudah ada: framework, folder, routing, autentikasi, database, integrasi Gemini, deployment, dan komponen UI. Jangan mengasumsikan stack tertentu tanpa memeriksa file proyek.
3. Identifikasi bagian yang sudah berfungsi, yang masih berupa mockup, dan yang perlu diubah.
4. Buat **Implementation Plan** berisi fase, file yang akan disentuh, migrasi data, risiko, pengujian, serta hal yang membutuhkan environment variable atau akun provider.
5. Jangan menulis ulang aplikasi dari nol bila proyek saat ini dapat diperbaiki. Pertahankan design system biru dan soft neumorphism yang sudah ada selama masih konsisten dengan spesifikasi.
6. Jangan menghapus fitur atau data proyek lama tanpa melaporkan rencana migrasi terlebih dahulu.
7. Tunggu persetujuan sebelum melakukan implementasi besar. Setelah itu kerjakan satu fase per satu fase.

**Aturan nonnegosiasi:** jangan mengarang status pembayaran, sumber pengetahuan, kontak bantuan, metrik AI, klaim klinis, atau status integrasi. Bila credential belum tersedia, buat integrasi sandbox atau mode demo yang jelas dan dokumentasikan batasannya.

---

# 1. Ringkasan Produk

## 1.1 Masalah yang ingin diselesaikan

Sebagian remaja dan dewasa muda mengetahui bahwa mereka membutuhkan dukungan, tetapi kesulitan mengidentifikasi apa yang terjadi, mengungkapkan perasaan, menentukan bantuan yang dibutuhkan, atau memulai percakapan dengan orang tepercaya. SELA.AI membantu pengguna menyiapkan langkah tersebut tanpa mengklaim dapat menggantikan konselor, psikolog, atau tenaga profesional.

## 1.2 Solusi

**SELA.AI adalah platform berbasis AI yang membantu remaja menyusun cerita pribadi, berlatih meminta bantuan, dan menemukan jalur dukungan yang sesuai.** Sistem bukan sekadar chatbot curhat dan bukan alat diagnosis.

Pengalaman inti disusun dalam empat langkah:
1. **Guided Story** — pengguna menjawab pertanyaan singkat dan opsional untuk menguraikan situasi.
2. **Kartu Cerita Pribadi** — sistem membantu menyusun ringkasan yang bisa diperiksa, diedit, disimpan secara eksplisit, atau dihapus oleh pengguna.
3. **Practice Talk** — pengguna berlatih menyampaikan cerita atau meminta dukungan melalui simulasi percakapan.
4. **Support Pathway** — pengguna melihat pilihan orang/layanan yang dapat dihubungi berdasarkan informasi yang benar-benar tersedia dan telah diverifikasi.

Fitur pendukung: check-in reflektif, jurnal privat, modul edukasi keterampilan hidup, serta rencana langkah kecil.

## 1.3 Nilai utama

> **SELA.AI membantu remaja yang kesulitan mengungkapkan masalahnya untuk mempersiapkan percakapan dan menemukan bantuan yang tepat.**

SELA.AI tidak menjanjikan bahwa semua masalah selesai setelah menggunakan AI. Hasil utama yang dijanjikan adalah **membantu pengguna mempersiapkan komunikasi dan mengenali pilihan bantuan**, bukan menyembuhkan atau mendiagnosis.

## 1.4 Sasaran dampak

Fokus dampak adalah **SDG 3 — Kehidupan Sehat dan Sejahtera**, khususnya dukungan terhadap kesejahteraan mental dan akses awal ke sumber dukungan. Jangan menambahkan SDG lain pada copy utama tanpa persetujuan pemilik produk.

## 1.5 Tujuan MVP

MVP kompetisi harus mendemonstrasikan alur berikut secara utuh:
- pengguna baru memahami fungsi, batasan, dan privasi SELA.AI;
- pengguna dapat membuat akun dan masuk;
- pengguna menyelesaikan onboarding dengan persetujuan yang jelas;
- pengguna bisa menyusun Kartu Cerita Pribadi dan mencoba Practice Talk;
- pengguna dapat menemukan Support Pathway tanpa harus membayar;
- pengguna dapat melihat batas Free dan manfaat Premium;
- pengguna dapat melakukan proses pembayaran di sandbox/test mode;
- status premium hanya berubah setelah backend mengonfirmasi pembayaran;
- pengguna dapat melihat status paket dan riwayat transaksi.

## 1.6 Bukan tujuan MVP

- Diagnosis atau skrining klinis otomatis.
- Klaim terapi, penyembuhan, atau pengganti profesional.
- Komunitas publik, social feed, atau fitur berbagi cerita antarpengguna.
- Mengirim isi chat kepada sekolah, orang tua, institusi, atau pihak lain tanpa alur persetujuan yang jelas.
- Menjual atau menggunakan percakapan untuk iklan.
- Menampilkan direktori rujukan yang belum diverifikasi.
- Menyimpan seluruh riwayat chat secara permanen secara default.
- Dashboard institusi yang dapat melihat cerita individual.
- Auto-renew/penagihan berulang pada fase pertama.

---

# 2. Persona, Prinsip, dan Batas Keamanan

## 2.1 Persona utama

### Persona A — Pengguna yang bingung harus mulai bercerita dari mana
- Ingin menyampaikan masalah tetapi sulit menyusun kata-kata.
- Membutuhkan langkah singkat dan tidak menghakimi.
- Perlu tetap memiliki kendali atas apa yang disimpan atau dibagikan.

### Persona B — Pengguna yang ingin berlatih sebelum meminta bantuan
- Ingin berbicara dengan teman, anggota keluarga, guru BK, konselor, atau orang tepercaya.
- Khawatir tidak tahu harus mengatakan apa.
- Memerlukan simulasi yang tidak mempermalukan atau menyalahkan dirinya.

### Persona C — Pengguna yang ingin mencari opsi dukungan
- Membutuhkan informasi mengenai jenis bantuan yang mungkin tersedia.
- Tidak boleh diberikan nama, nomor telepon, alamat, atau jam layanan yang tidak terverifikasi.

## 2.2 Prinsip desain produk
- Pengguna boleh melewati pertanyaan atau keluar dari alur kapan saja.
- Hindari memaksa pengguna menjelaskan trauma, latar belakang keluarga, atau hal sensitif.
- Jangan mengasumsikan masalah seseorang disebabkan ayah, ibu, atau struktur keluarga tertentu.
- Pengguna dapat mengubah ringkasan yang dibuat AI sebelum menyimpan atau menggunakannya.
- Bantuan keselamatan dasar, pilihan menghubungi manusia, dan informasi jalur bantuan tidak boleh dikunci di balik paywall.
- Hindari streak, hukuman, notifikasi yang menekan, atau copy yang membuat pengguna merasa bersalah.
- Jangan menjanjikan kerahasiaan absolut. Jelaskan data apa yang diproses dan tujuan pemrosesannya.

## 2.3 Pengamanan pengguna di bawah umur

Produk ditujukan kepada remaja/dewasa muda, sehingga sistem perlu merancang pemrosesan data anak secara khusus. UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi mengatur bahwa pemrosesan data pribadi anak memerlukan perlakuan khusus dan persetujuan orang tua/wali sesuai ketentuan. Ini bukan pengganti tinjauan hukum.

Persyaratan produk:
- Jangan meluncurkan pendaftaran publik bagi pengguna di bawah umur sebagai layanan nyata sebelum alur persetujuan wali, kebijakan privasi, retensi, dan eskalasi ditinjau oleh pihak yang kompeten.
- Untuk demo kompetisi, gunakan data/skenario sintetis dan mode sandbox.
- Desain halaman usia/kelompok usia sebagai gerbang konfigurasi. Jangan meminta tanggal lahir lengkap bila kelompok usia sudah memadai.
- Bila alur persetujuan wali belum benar-benar tersedia, jangan menyatakan bahwa sistem telah memperoleh persetujuan tersebut. Tampilkan pemberitahuan demo dan jangan mengumpulkan cerita sensitif dari pengguna nyata pada alur yang belum disetujui.
- Bedakan persetujuan syarat layanan, pemrosesan data akun, dan pengiriman teks ke provider AI. Jangan menggabungkannya menjadi satu checkbox yang ambigu.

---

# 3. Arsitektur Informasi dan Peta Halaman

Nama route boleh disesuaikan dengan pola framework yang sudah digunakan, tetapi semua halaman dan alurnya harus ada.

## 3.1 Halaman publik (tanpa login)

| Route/halaman | Tujuan | Aksi utama |
|---|---|---|
| `/` — Beranda | Menjelaskan nilai SELA.AI dan alur empat langkah | Mulai Gratis, Lihat Cara Kerja |
| `/cara-kerja` | Menjelaskan Guided Story → Kartu Cerita → Practice Talk → Support Pathway | Mulai Gratis |
| `/fitur` | Detail fitur, batasan AI, dan kontrol privasi | Coba SELA.AI |
| `/harga` | Membandingkan Free dan Premium | Pilih Paket |
| `/tentang` | Misi dan fokus dampak SDG 3 | Mulai Gratis |
| `/privasi` | Informasi pengolahan, penyimpanan, penghapusan data | Kembali/daftar |
| `/syarat` | Ketentuan penggunaan, keterbatasan layanan, ketentuan paket | Kembali/daftar |
| `/masuk` | Login | Masuk, Lupa Kata Sandi |
| `/daftar` | Pembuatan akun | Buat Akun, Masuk |
| `/lupa-password` | Meminta tautan reset password | Kirim Instruksi |
| `/verifikasi-email` | Menjelaskan status verifikasi dan opsi kirim ulang | Verifikasi/Kirim Ulang |

## 3.2 Halaman dalam aplikasi (login diperlukan)

| Route/halaman | Tujuan | Free/Premium |
|---|---|---|
| `/app` — Dashboard | Ringkasan aktivitas dan pilihan langkah berikutnya | Semua |
| `/app/guided-story` | Menguraikan cerita dengan pertanyaan bertahap | Semua, kuota berbeda |
| `/app/kartu-cerita` | Membuat, melihat, mengedit, menghapus kartu cerita tersimpan | Semua, batas jumlah berbeda |
| `/app/practice-talk` | Latihan percakapan dengan skenario | Semua, skenario/kuota berbeda |
| `/app/support-pathway` | Pilihan dukungan manusia dan direktori terverifikasi | Semua, tidak dipaywall |
| `/app/jurnal` | Refleksi privat | Semua |
| `/app/ruang-belajar` | Modul edukasi keterampilan hidup | Semua, beberapa modul Premium |
| `/app/rencana-langkah` | Menyusun tindakan kecil | Semua; analisis tambahan Premium |
| `/app/paket` | Paket saat ini, masa aktif, upgrade/perpanjang | Semua |
| `/app/pembayaran` | Riwayat pembayaran dan status transaksi | Semua |
| `/app/pengaturan` | Profil, preferensi, data, privasi, keamanan, logout | Semua |
| `/app/bantuan` | FAQ, cara menghubungi tim, kebijakan pembatalan/refund yang berlaku | Semua |

## 3.3 Halaman checkout dan status pembayaran

| Route/halaman | Fungsi |
|---|---|
| `/checkout` | Ringkasan paket, harga, durasi, ketentuan, dan tombol lanjut bayar |
| `/pembayaran/proses` | Status menunggu pembayaran dan instruksi sesuai gateway |
| `/pembayaran/hasil` | Memeriksa status final dari backend, tidak percaya query parameter saja |
| `/pembayaran/berhasil` | Konfirmasi bahwa backend telah mencatat pembayaran berhasil |
| `/pembayaran/pending` | Instruksi menyelesaikan pembayaran atau menunggu pembaruan status |
| `/pembayaran/gagal` | Penjelasan transaksi gagal/kedaluwarsa dan tombol coba lagi |

Jangan jadikan halaman “berhasil” dapat diakses dengan query URL sebagai satu-satunya dasar untuk mengaktifkan Premium. Semua state harus diverifikasi server-side.

---

# 4. User Journey: Pengguna Baru dari Nol sampai Menggunakan Aplikasi

## 4.1 Alur utama

1. Pengunjung membuka beranda SELA.AI.
2. Pengunjung membaca ringkasan fungsi, cara kerja, batasan AI, dan kebijakan privasi.
3. Pengunjung menekan **Mulai Gratis**.
4. Sistem membuka halaman Daftar atau Login. Untuk pengguna baru, pilih Daftar.
5. Pengguna mengisi nama panggilan, email, password, kelompok usia jika memang dibutuhkan, dan persetujuan yang relevan.
6. Sistem memvalidasi input, membuat akun melalui provider autentikasi yang digunakan, lalu meminta verifikasi email jika diaktifkan.
7. Setelah email terverifikasi, pengguna masuk ke onboarding.
8. Onboarding menjelaskan bahwa SELA.AI membantu menyiapkan percakapan, bukan layanan diagnosis/terapi.
9. Pengguna memilih tujuan umum secara opsional: “menyusun cerita”, “berlatih bicara”, “mencari dukungan”, atau “belajar keterampilan hidup”.
10. Pengguna membaca ringkasan data yang akan disimpan. Persetujuan pemrosesan data dicatat dengan versi dan waktu.
11. Persetujuan pengiriman teks ke Gemini diminta saat pengguna pertama kali akan memakai fitur AI, bukan dianggap otomatis dari pembuatan akun.
12. Dashboard ditampilkan dengan empat aksi inti.
13. Pengguna menyelesaikan alur Guided Story dan melihat preview Kartu Cerita.
14. Pengguna mengedit isi kartu dan memilih apakah akan menyimpan. Tidak ada penyimpanan permanen tanpa tindakan eksplisit.
15. Pengguna dapat melanjutkan ke Practice Talk atau Support Pathway.
16. Pengguna dapat membuka halaman Paket untuk melihat manfaat Free dan Premium.
17. Jika memilih Premium, pengguna masuk ke checkout dan mengikuti flow pembayaran di bagian 10.
18. Setelah pembayaran sukses dan dikonfirmasi server, Premium diaktifkan dan pengguna menerima status paket yang jelas.

## 4.2 Alur untuk pengguna yang sudah punya akun

1. Buka `/masuk`.
2. Masukkan email dan password atau metode login resmi lain yang memang telah dikonfigurasi.
3. Tampilkan loading, kesalahan kredensial, dan tautan lupa password secara jelas.
4. Setelah autentikasi sukses, periksa status email, status consent yang wajib, dan status paket.
5. Arahkan ke dashboard atau langkah consent yang belum selesai.
6. Jangan mengarahkan pengguna ke halaman checkout berulang kali jika paket Premium masih aktif.

## 4.3 Lupa password

- Pengguna mengisi email.
- Sistem mengirim tautan reset melalui provider autentikasi.
- UI memberikan pesan netral agar tidak membocorkan apakah email terdaftar.
- Tautan harus memiliki masa berlaku yang ditetapkan provider.
- Setelah reset berhasil, arahkan kembali ke Login dengan notifikasi sukses.
- Jangan menyimpan password dalam database aplikasi sendiri atau menulisnya ke log.

## 4.4 Logout dan sesi

- Menu profil menyediakan tombol Logout.
- Logout mengakhiri sesi autentikasi sesuai provider.
- Jika ada data sementara di browser, bersihkan sesuai aturan retensi; jangan menghapus data tersimpan yang secara eksplisit dipilih pengguna tanpa konfirmasi.
- Setelah logout, halaman aplikasi privat tidak boleh dapat diakses hanya dengan tombol Back browser.

---

# 5. Onboarding dan Persetujuan

## 5.1 Layar onboarding

Urutan yang disarankan:
1. **Selamat datang:** “Kamu tidak harus langsung tahu harus mulai dari mana.”
2. **Apa yang dilakukan SELA.AI:** menyusun cerita, berlatih percakapan, dan menemukan pilihan dukungan.
3. **Batasan AI:** AI dapat keliru, bukan konselor, tidak membuat diagnosis, dan tidak menggantikan bantuan manusia.
4. **Pilihan tujuan:** boleh dilewati.
5. **Kontrol data:** cerita dan jurnal sensitif tidak dikirim atau disimpan secara diam-diam.
6. **Persetujuan:** pisahkan persetujuan wajib dan opsional.

## 5.2 Jenis consent

- `terms_accepted`: menerima ketentuan penggunaan.
- `privacy_notice_acknowledged`: telah membaca pemberitahuan privasi.
- `ai_processing_consent`: menyetujui pengiriman teks tertentu ke provider AI saat menggunakan fitur AI.
- `guardian_consent_status`: status persetujuan orang tua/wali bila diperlukan, sesuai desain yang telah ditinjau.
- `marketing_opt_in`: persetujuan komunikasi pemasaran, opsional dan tidak dicentang secara default.

Catat versi dokumen, waktu, dan status persetujuan. Persetujuan dapat dicabut sesuai fungsi dan batas hukum yang relevan; sistem harus menjelaskan dampaknya.

---

# 6. Detail Fitur Inti

## 6.1 Dashboard

### Konten
- Sapaan menggunakan nama panggilan jika tersedia.
- Pesan singkat yang tidak mengasumsikan kondisi emosi pengguna.
- Kartu aksi: **Susun Ceritaku**, **Latihan Bicara**, **Cari Dukungan**, **Ruang Belajar**.
- Ringkasan Kartu Cerita yang tersimpan (jangan menampilkan isi sensitif langsung di dashboard).
- Ringkasan status paket Free/Premium.
- Satu rekomendasi langkah kecil yang bisa ditutup atau diabaikan.

### Perilaku
- Jangan menampilkan skor kesehatan mental atau indikator diagnosis.
- Check-in emosi hanya refleksi pilihan pengguna, bukan pengukuran klinis.
- Shortcut bantuan tetap terlihat untuk seluruh pengguna dan tidak terpengaruh status pembayaran.
- Dashboard berfungsi baik pada laptop dan ponsel.

## 6.2 Guided Story

### Tujuan
Membantu pengguna menguraikan situasi secara bertahap tanpa memaksa bercerita panjang.

### Flow UI
1. Halaman menjelaskan bahwa pertanyaan boleh dilewati.
2. Pertanyaan satu per satu, misalnya:
   - “Apa yang sedang ingin kamu ceritakan?”
   - “Bagian mana yang paling terasa sulit?”
   - “Apa yang kamu rasakan atau pikirkan?”
   - “Apa yang kamu butuhkan saat ini?”
   - “Adakah orang yang membuatmu merasa aman untuk diajak bicara?”
3. Input bebas dan pilihan “Lewati pertanyaan”.
4. Tombol “Bantu susun ceritaku”.
5. Sebelum teks dikirim ke Gemini, tampilkan penjelasan singkat dan persetujuan AI jika belum ada.
6. Sistem menyusun draf berdasarkan input pengguna, bukan mengarang fakta baru.
7. Pengguna bisa mengedit, membuat ulang, membatalkan, atau melanjutkan membuat kartu.

### Acceptance criteria
- Pertanyaan tidak memaksa pengguna mengungkap trauma atau identitas sensitif.
- AI tidak menambahkan peristiwa, emosi, atau kesimpulan yang tidak dinyatakan pengguna seolah-olah fakta.
- Draf diberi label **Draf dari AI — periksa dan edit sebelum digunakan**.
- Jika AI gagal, pengguna tetap bisa membuat kartu dengan formulir manual.
- Pengguna boleh menghapus seluruh input sementara.

## 6.3 Kartu Cerita Pribadi

### Tujuan
Mengubah cerita yang kompleks menjadi catatan singkat yang dapat dipakai pengguna untuk menyampaikan kebutuhan kepada orang yang dipilih.

### Field kartu
- `title`: judul yang dapat diedit.
- `what_happened`: situasi yang ingin diceritakan.
- `what_i_feel`: perasaan/pikiran versi pengguna.
- `what_i_need`: jenis dukungan yang diharapkan.
- `what_i_want_to_say`: kalimat pembuka percakapan.
- `who_i_might_talk_to`: opsional, kategori orang/pendamping; bukan kontak otomatis.
- `created_at`, `updated_at`.

### Aksi
- Buat kartu dari Guided Story atau secara manual.
- Edit sebelum simpan.
- Simpan ke akun hanya setelah konfirmasi yang menjelaskan data akan disimpan.
- Buka kembali, edit, duplikasi, ekspor/cetak bila tersedia, dan hapus.
- Jika menyalin/membagikan, pengguna melakukan aksi secara eksplisit; sistem tidak mengirim ke orang lain secara otomatis.

### Privasi
- Kartu dapat berisi data sensitif. Terapkan kontrol akses pemilik data di backend.
- Jangan tampilkan kartu milik satu pengguna kepada pengguna lain atau admin institusi.
- Jangan gunakan isi kartu untuk analitik pemasaran atau training model.
- Jangan log isi field kartu pada server.
- Hapus permanen atau lakukan proses penghapusan sesuai kebijakan produk saat pengguna meminta penghapusan akun/data.

## 6.4 Practice Talk

### Tujuan
Membantu pengguna berlatih menyampaikan cerita atau meminta dukungan sebelum percakapan sungguhan.

### Skenario awal
- Berbicara dengan teman tepercaya.
- Memulai percakapan dengan guru BK/konselor.
- Meminta waktu bicara kepada anggota keluarga/orang dewasa tepercaya.
- Mengatakan “aku butuh didengarkan, bukan langsung diberi solusi”.
- Menetapkan batas pribadi dengan cara yang aman.

### Flow
1. Pengguna memilih skenario dan siapa lawan bicara simulasi.
2. Sistem menjelaskan latihan ini bersifat simulasi, bukan percakapan nyata.
3. Pengguna bisa memilih gaya latihan: pemula, percakapan singkat, atau ketika merasa gugup.
4. AI bertindak sebagai lawan bicara simulasi dan tidak mengaku sebagai orang nyata/profesional.
5. Setelah latihan, sistem memberi 1–3 umpan balik yang praktis dan tidak menghakimi.
6. Pengguna dapat menyimpan ringkasan latihan jika diinginkan; transcript lengkap tidak disimpan secara default.

### Premium boundary
- Free: sejumlah latihan dasar per bulan yang ditampilkan dengan jelas.
- Premium: variasi skenario lebih banyak dan latihan lebih sering.
- Ketersediaan Support Pathway dan opsi bantuan manusia tidak dipengaruhi kuota Practice Talk.

## 6.5 Support Pathway

### Tujuan
Menunjukkan pilihan dukungan yang relevan, tanpa membuat rujukan palsu atau memaksa pengguna menghubungi seseorang.

### Isi awal
- Orang tepercaya yang dipilih pengguna.
- Teman/keluarga/kerabat yang aman.
- Guru BK atau konselor sekolah/kampus.
- Psikolog/tenaga profesional berlisensi.
- Organisasi atau layanan bantuan yang benar-benar diverifikasi.

### Aturan sumber
- Setiap kontak/organisasi publik yang ditampilkan harus punya sumber, pemilik verifikasi, dan tanggal pemeriksaan.
- Data contoh harus diberi label **Contoh demo — belum untuk dihubungi** dan tidak tampil sebagai layanan nyata.
- Jangan membuat kontak, alamat, jam layanan, nomor darurat, harga, atau klaim ketersediaan.
- Bila direktori belum tersedia, tampilkan kategori dukungan dan checklist menyiapkan percakapan. Jangan pura-pura mempunyai peta layanan lengkap.
- Jangan minta geolokasi pengguna secara otomatis.

### Safety state
Bila pengguna menuliskan bahwa ia berada dalam bahaya langsung, UI harus menghentikan alur promosi/upsell dan menampilkan pesan singkat yang mengutamakan keselamatan, menyarankan menghubungi orang tepercaya atau layanan darurat setempat yang sudah diverifikasi. Prototype tidak boleh mengklaim sebagai layanan krisis. Jangan mengarang nomor kontak.

## 6.6 Jurnal Reflektif

- Jurnal adalah alat bantu refleksi tambahan, bukan pusat produk.
- Pengguna dapat menulis, mengedit, atau menghapus catatan.
- Default: catatan disimpan lokal/sesi sesuai kemampuan sistem, dengan keterangan yang jujur. Jangan mengklaim sinkron lintas perangkat jika belum ada penyimpanan server.
- Jika tersedia penyimpanan akun, minta pilihan eksplisit **Simpan di akun ini** dan terangkan bahwa isi jurnal dapat sensitif.
- Tombol “Bantu refleksikan” mengirim isi catatan ke Gemini hanya setelah konfirmasi yang jelas.
- Jangan otomatis menyimpan prompt, jawaban AI, atau seluruh riwayat chat.

## 6.7 Ruang Belajar

Modul awal:
- mengenali emosi;
- komunikasi asertif;
- meminta bantuan;
- pengambilan keputusan;
- pemecahan masalah;
- resiliensi dan kepercayaan diri;
- kesiapan karier sebagai modul pendukung opsional.

Setiap modul memiliki tujuan, ringkasan, langkah, latihan pendek, sumber materi, dan label status tinjauan. Jangan menulis “tervalidasi ahli” jika belum ada review yang dapat dibuktikan. Materi keselamatan dan cara mencari bantuan harus tetap gratis.

## 6.8 Rencana Langkah Kecil

- Pengguna membuat satu sampai tiga langkah sukarela.
- Contoh: “menulis satu kalimat pembuka”, “memilih orang yang mungkin diajak bicara”, atau “mempelajari modul komunikasi asertif”.
- Pengguna bisa mengubah, menunda, menyelesaikan, atau menghapus target.
- Tidak ada hukuman, streak memaksa, atau bahasa yang mempermalukan.
- Insight/rekap tambahan dapat menjadi manfaat Premium, tetapi semua alat bantuan inti tetap dapat diakses.

---

# 7. Login, Profil, dan Manajemen Akun

## 7.1 Form daftar

Field minimum:
- Nama panggilan (wajib; bukan harus nama legal).
- Email (wajib, validasi format).
- Password (jika menggunakan email/password; jangan ditangani manual di database sendiri).
- Konfirmasi password bila provider tidak menyediakan validasi memadai.
- Kelompok usia hanya jika diperlukan untuk keselamatan/kepatuhan; hindari tanggal lahir lengkap bila tidak perlu.
- Checkbox ketentuan dan pemberitahuan privasi terpisah.

Jangan meminta alamat rumah, nomor identitas, sekolah, lokasi presisi, atau nama orang lain jika tidak dibutuhkan untuk fungsi inti.

## 7.2 Validasi dan error state

Sediakan pesan error yang spesifik tetapi tidak membocorkan data akun:
- Email tidak valid.
- Password tidak memenuhi aturan provider.
- Persetujuan wajib belum dicentang.
- Email perlu diverifikasi.
- Terlalu banyak percobaan; coba kembali nanti.
- Koneksi/server bermasalah.

Jangan menghilangkan input pengguna ketika validasi gagal tanpa alasan.

## 7.3 Profil dan pengaturan akun

Pengguna dapat:
- mengubah nama panggilan;
- mengubah preferensi non-sensitif;
- melihat status email terverifikasi;
- melihat dan mengubah preferensi komunikasi opsional;
- melihat status persetujuan dan tautan ke kebijakan;
- meminta ekspor data yang didukung;
- menghapus Kartu Cerita dan data tersimpan;
- menghapus akun dengan konfirmasi ulang;
- logout.

Penghapusan akun harus memutus akses, menghentikan penyimpanan data baru, serta menghapus/anonymize data sesuai kebijakan retensi yang disetujui. Jelaskan jika catatan transaksi wajib disimpan berdasarkan kewajiban yang relevan; jangan menjanjikan semua data terhapus seketika bila bukan kenyataannya.

---

# 8. Paket, Harga, dan Entitlement

Harga berikut adalah **asumsi awal untuk validasi bisnis**, bukan hasil riset kesediaan membayar atau harga final. Jangan menampilkan kata “harga terbukti” atau klaim sejenis.

## 8.1 Paket Free

Tujuan: pengguna tetap memperoleh manfaat inti dan aman tanpa harus membayar.

Termasuk:
- akses dashboard dan refleksi/check-in dasar;
- Guided Story dengan kuota AI bulanan yang terlihat;
- satu Kartu Cerita aktif tersimpan di akun (bisa diedit/dihapus);
- sejumlah sesi Practice Talk dasar per bulan;
- modul inti gratis;
- Rencana Langkah Kecil dasar;
- Support Pathway dan informasi keselamatan dasar tanpa batas berbayar;
- akses ke privasi, penghapusan data, dan bantuan.

## 8.2 Paket Premium

**Harga uji awal: Rp19.000 per 30 hari.** Paket tidak otomatis diperpanjang pada fase pertama; pengguna memperpanjang secara manual. Jangan melakukan auto-charge.

Calon manfaat Premium:
- kuota Guided Story lebih besar;
- lebih banyak Kartu Cerita tersimpan;
- variasi skenario Practice Talk lebih lengkap;
- akses ke modul pengembangan diri lanjutan;
- riwayat progres/rencana langkah yang lebih lengkap;
- opsi ekspor/cetak Kartu Cerita jika aman dan telah diimplementasikan;
- pengalaman tanpa gangguan upsell berulang.

Batas kuota harus disimpan di konfigurasi entitlement di server, bukan hanya disembunyikan di UI. Rancangan awal yang dapat disesuaikan setelah audit biaya: Free = 10 respons AI/bulan, 2 sesi Practice Talk/bulan, 1 Kartu Cerita aktif; Premium = 100 respons AI/bulan, 10 sesi Practice Talk/bulan, maksimal 20 kartu. Kuota ini **bukan standar final** dan harus dapat diubah lewat konfigurasi. Setelah kuota habis, pengguna tetap bisa membuka kartu tersimpan, mengakses Support Pathway, melihat konten keselamatan, dan memilih bantuan manusia.

## 8.3 Institusi (B2B)

Untuk sekolah, kampus, atau organisasi kepemudaan:
- jangan membuat checkout self-service di MVP;
- tampilkan CTA **Ajukan Demo Institusi** atau **Hubungi Tim**;
- kumpulkan data institusi yang minimal melalui form kontak;
- jangan mengirim detail cerita individual ke dashboard institusi;
- jangan membuat harga institusi sebagai harga pasar final. Harga pilot harus disusun dan divalidasi terpisah.

## 8.4 Perbandingan di halaman harga

Tampilkan tabel yang mudah dibaca:
- nama paket;
- harga dan periode;
- fitur yang termasuk;
- batas/kuota yang relevan;
- tombol Pilih Free / Upgrade ke Premium;
- pengingat bahwa bantuan dasar tidak pernah dikunci;
- tautan ketentuan pembayaran dan masa aktif.

Untuk Free, gunakan CTA **Gunakan Paket Free** atau **Mulai Gratis**. Untuk Premium, gunakan **Pilih Premium**. Hindari CTA membingungkan seperti “Buka semua” jika pengguna belum memahami harga.

---

# 9. Kapan dan di Mana Pengguna Melihat Pembayaran

Pembayaran harus mudah ditemukan tetapi tidak agresif.

## 9.1 Titik masuk upgrade

1. Halaman publik `/harga`.
2. Menu profil: **Paket & Pembayaran**.
3. Banner status paket di halaman `/app/paket`.
4. Ketika pengguna memilih fitur Premium yang memang terkunci, tampilkan paywall kontekstual dengan manfaat dan harga yang jelas.

Jangan tampilkan pop-up pembelian ketika pengguna sedang menggunakan Support Pathway, membaca pesan keselamatan, atau sedang berada pada alur risiko tinggi.

## 9.2 Halaman `/app/paket`

Untuk pengguna Free:
- status **Paket Free**;
- batas penggunaan dan reset kuota yang benar;
- ringkasan fitur yang tetap bisa dipakai;
- tombol **Lihat Premium**.

Untuk pengguna Premium:
- status **Premium Aktif**;
- tanggal mulai dan tanggal berakhir;
- harga terakhir dan ID transaksi terakhir;
- indikator **Perpanjangan manual — tidak ada auto-charge**;
- tombol **Perpanjang Premium**;
- riwayat transaksi;
- tautan bantuan jika pembayaran bermasalah.

Untuk Premium yang kedaluwarsa:
- status **Premium berakhir**;
- fitur Free tetap tersedia;
- tombol **Aktifkan Lagi**;
- jangan menghapus Kartu Cerita milik pengguna hanya karena paket berubah menjadi Free. Bila jumlah kartu melebihi limit Free, pertahankan data yang sudah ada dengan akses baca/hapus dan jelaskan batas membuat kartu baru; jangan mengunci akses ke informasi keselamatan.

---

# 10. PRD Checkout dan Pembayaran

## 10.1 Pilihan gateway

Untuk MVP Indonesia, **Midtrans Snap dalam Sandbox/Test Mode** menjadi pilihan implementasi awal yang direkomendasikan karena menyediakan halaman pembayaran hosted dan alur backend-token → checkout → notifikasi status. Namun, agent wajib memeriksa apakah proyek sudah menggunakan payment provider lain dan melaporkan sebelum mengganti provider.

Jika credential Midtrans tidak tersedia:
- bangun abstraksi adapter pembayaran;
- siapkan konfigurasi sandbox dan `.env.example`;
- berikan status **DEMO / Sandbox** yang jelas;
- jangan menampilkan pembayaran produksi seolah sudah aktif;
- jangan mengaktifkan Premium dengan tombol frontend yang hanya mengubah state lokal.

## 10.2 Alur checkout lengkap

1. Pengguna menekan **Pilih Premium**.
2. Jika belum login, sistem menyimpan tujuan kembali secara aman dan mengarahkan ke Login/Daftar. Setelah login, kembali ke checkout.
3. Sistem memeriksa apakah pengguna memiliki Premium aktif. Jika masih aktif, tampilkan status aktif dan jangan membuat order ganda tanpa alasan.
4. Checkout menampilkan:
   - paket Premium;
   - harga Rp19.000;
   - masa aktif 30 hari;
   - perpanjangan manual, tanpa auto-charge;
   - metode pembayaran yang tersedia berdasarkan gateway;
   - ketentuan pembatalan/refund yang telah ditetapkan tim;
   - checkbox persetujuan ketentuan transaksi (tidak dicentang otomatis).
5. Pengguna menekan **Lanjut ke Pembayaran**.
6. Frontend memanggil endpoint backend yang memverifikasi session pengguna dan mengambil harga resmi dari konfigurasi server. Harga yang dikirim browser tidak boleh dipercaya.
7. Backend membuat order ID unik dan record pembayaran berstatus `pending`.
8. Backend meminta token/redirect checkout ke gateway dengan secret key yang hanya ada di server.
9. Frontend membuka Snap modal atau mengarahkan pengguna ke halaman pembayaran hosted.
10. Pengguna menyelesaikan, membatalkan, atau meninggalkan pembayaran.
11. UI dapat menerima callback untuk pengalaman pengguna, tetapi callback browser hanya sinyal awal, bukan bukti pembayaran final.
12. Gateway mengirim webhook/notification ke backend.
13. Backend memverifikasi keaslian notifikasi sesuai dokumentasi provider, memeriksa order ID, nominal, currency, status, dan hubungan dengan user/order. Handler harus idempotent.
14. Hanya setelah notifikasi/server verification menyatakan pembayaran berhasil, backend mengubah payment menjadi `paid` dan membuat/memperpanjang entitlement Premium.
15. Halaman hasil melakukan polling status dari backend dengan batas waktu dan menampilkan state sebenarnya.
16. Pengguna melihat status **Premium Aktif** di `/app/paket` dan transaksi tercatat di `/app/pembayaran`.

## 10.3 Masa aktif

- Durasi awal adalah 30 hari per pembayaran berhasil.
- Jika pengguna membayar ketika tidak memiliki Premium aktif, masa aktif dimulai berdasarkan waktu pembayaran berhasil dikonfirmasi server.
- Jika pengguna memperpanjang sebelum Premium kedaluwarsa, tanggal akhir baru dihitung mulai dari tanggal akhir yang sudah ada agar sisa masa aktif tidak hilang.
- Tidak ada recurring billing dan tidak ada auto-charge pada MVP.
- Setelah masa aktif habis, entitlement berubah ke Free; data pengguna tidak dihapus.
- Sistem harus menangani kasus webhook terlambat, webhook duplikat, browser ditutup setelah membayar, dan redirect tanpa konfirmasi pembayaran.

## 10.4 State transaksi

Status internal yang disarankan:
- `pending` — order dibuat, menunggu pembayaran atau notifikasi final;
- `paid` — pembayaran terkonfirmasi server;
- `failed` — gateway mengonfirmasi kegagalan;
- `expired` — batas pembayaran habis;
- `cancelled` — dibatalkan sesuai status yang dapat dibuktikan;
- `refunded` — pengembalian dana telah dikonfirmasi jika proses refund tersedia.

Petakan status provider ke status internal dengan aturan yang terdokumentasi. Jangan ubah `pending` menjadi `paid` hanya karena browser mengunjungi URL sukses.

## 10.5 Riwayat pembayaran

Setiap baris transaksi menampilkan:
- tanggal dan waktu;
- nomor pesanan;
- paket;
- nominal dan mata uang;
- metode pembayaran jika tersedia dari provider;
- status transaksi;
- masa aktif yang didapat jika paid;
- tombol lihat detail atau coba lagi untuk transaksi yang dapat diulang.

Jangan menampilkan secret, token provider, signature webhook, atau informasi kartu penuh.

## 10.6 Kegagalan dan penanganannya

| Kondisi | Perilaku UI/backend |
|---|---|
| API key provider belum ada | Tampilkan pesan konfigurasi/demo; tidak membuat pembayaran produksi |
| Gagal membuat token checkout | Order tetap tercatat sebagai gagal/pending sesuai keadaan nyata; sediakan tombol coba lagi |
| Pengguna menutup checkout | Status tetap pending sampai diperbarui provider atau kedaluwarsa |
| Pembayaran pending | Tampilkan instruksi dari gateway dan tombol periksa status |
| Pembayaran gagal | Tidak mengaktifkan Premium; sediakan transaksi baru |
| Webhook dikirim ulang | Handler idempotent; tidak memperpanjang masa aktif dua kali |
| Browser redirect sukses tetapi webhook belum tiba | Tampilkan “Sedang memverifikasi pembayaran”; polling backend; jangan langsung memberikan Premium |
| Nominal atau order ID tidak cocok | Tolak update entitlement, catat event aman tanpa data pribadi, tandai untuk investigasi |
| Webhook tidak valid | Tolak; jangan memperbarui pembayaran |
| Pembayaran untuk order kedaluwarsa datang terlambat | Periksa kebijakan provider; jangan otomatis mengaktifkan tanpa rekonsiliasi yang benar |

## 10.7 Keamanan pembayaran

- Secret key hanya di server-side environment variable.
- Client key yang memang dirancang untuk frontend boleh digunakan sesuai instruksi resmi provider; jangan pernah membundel server key.
- Validasi session dan kepemilikan order pada semua endpoint.
- Harga/nominal dihitung server-side dari plan ID.
- Gunakan order ID unik, event idempotency, signature/notification verification, dan pencatatan status.
- Jangan menyimpan nomor kartu, CVV, PIN, OTP, atau kredensial pembayaran pengguna.
- Jangan mengandalkan data pembayaran dari URL query string.
- Jangan mencatat secret atau payload sensitif lengkap ke log.
- Pembayaran produksi hanya boleh diaktifkan setelah akun merchant, URL webhook publik, konfigurasi, pengujian sandbox, dan peninjauan operasional tersedia.

---

# 11. Gemini AI, Knowledge Base, dan RAG

## 11.1 Provider

Gunakan provider yang telah dipakai proyek saat ini jika valid. Konteks proyek menggunakan Gemini; jangan mengganti provider ke OpenAI tanpa persetujuan.

- Integrasi dilakukan server-side menggunakan SDK resmi Google Gen AI yang sesuai dengan versi proyek.
- Gunakan environment variable seperti `GEMINI_API_KEY` dan `GEMINI_MODEL` di server.
- Jangan menaruh API key di `NEXT_PUBLIC_*`, source code, browser bundle, screenshot, chat log, atau repository.
- Sediakan `.env.example` dengan placeholder, bukan secret asli.
- Jika key tidak ada, UI harus menunjukkan **Mode Demo**; tidak boleh memberi label “AI Aktif”.

## 11.2 RAG untuk jawaban edukasi

Knowledge base berisi materi yang relevan dengan komunikasi asertif, refleksi, resiliensi, pengambilan keputusan, dukungan sosial, dan cara meminta bantuan.

Setiap sumber memiliki:
- `id`;
- judul;
- organisasi/penulis bila tercantum;
- URL atau referensi sumber;
- tanggal publikasi jika tersedia;
- status review;
- tanggal review jika memang dilakukan;
- kategori dan kelompok sasaran.

Alur:
1. Validasi input.
2. Retrieval dari knowledge base.
3. Pilih chunk yang relevan.
4. Kirim prompt + chunk terpilih ke Gemini.
5. Tampilkan sumber hanya jika sumber tersebut benar-benar digunakan.
6. Jika tidak ada sumber relevan, nyatakan batasan; jangan mengarang sitasi.

Tidak boleh ada label “terverifikasi ahli” kecuali proses review benar-benar ada dan terdokumentasi.

## 11.3 Perbedaan mode AI

- `DEMO`: respons contoh yang sudah ditulis, harus terlihat jelas sebagai simulasi; tidak menyatakan bahwa model baru saja menjawab.
- `AI AKTIF`: hanya jika backend berhasil menghubungi Gemini. Tidak boleh menentukan status aktif berdasarkan keberadaan API key di frontend.
- Error: jelaskan bahwa AI sedang tidak tersedia dan sediakan jalur manual untuk menyusun kartu.

## 11.4 Batas AI

- Tidak membuat diagnosis.
- Tidak menyatakan pengguna memiliki gangguan tertentu.
- Tidak menambahkan kejadian yang tidak disampaikan pengguna.
- Tidak mengaku sebagai psikolog, terapis, atau manusia.
- Tidak menjanjikan kerahasiaan absolut.
- Tidak membuat nomor/tautan kontak bantuan.
- Tidak mendorong ketergantungan kepada AI.
- Tidak mengirim chat/jurnal ke AI tanpa informasi dan persetujuan yang jelas.
- Jangan memproses cerita sensitif untuk iklan atau analitik pihak ketiga.

---

# 12. Privasi, Keamanan, dan Retensi Data

## 12.1 Prinsip data minimization

Kumpulkan hanya data yang benar-benar dibutuhkan. Jangan menyimpan raw transcript chat secara default. Pisahkan data akun, entitlement, pembayaran, Kartu Cerita, dan jurnal. Gunakan akses berdasarkan user ID dan periksa authorization di backend.

## 12.2 Pengelompokan data

### Data akun (minimum)
- user ID dari auth provider;
- nama panggilan;
- email yang dikelola provider;
- kelompok usia bila diperlukan;
- status verifikasi;
- timestamp dan versi consent.

### Data produk
- progres modul non-sensitif;
- rencana langkah kecil;
- preferensi tampilan.

### Data sensitif yang dipilih pengguna untuk disimpan
- Kartu Cerita Pribadi;
- jurnal jika pengguna secara eksplisit memilih sinkronisasi/penyimpanan akun.

### Data pembayaran
- ID order internal/provider;
- nominal, currency, status, timestamp, dan plan;
- jangan menyimpan data kartu/CVV/OTP.

## 12.3 Retensi dan penghapusan

- Raw chat/Practice Talk transcript tidak disimpan permanen secara default.
- Draft yang belum disimpan dihapus saat sesi berakhir atau sesuai kebijakan lokal yang dijelaskan.
- Kartu Cerita hanya disimpan di akun setelah tindakan eksplisit.
- Jurnal harus memiliki kontrol simpan/hapus yang jelas.
- Penghapusan akun menghapus atau menganonimkan data yang tidak wajib dipertahankan sesuai kebijakan yang telah ditinjau.
- Data transaksi bisa memiliki kebutuhan retensi terpisah; jelaskan dengan jujur dalam kebijakan privasi.
- Jangan menulis isi Kartu Cerita/jurnal di server console, error tracker, analitik, atau log pembayaran.

## 12.4 Database dan akses

Sebelum memilih atau menambah database, audit stack yang ada. Jika belum ada backend penyimpanan/auth yang layak, usulkan opsi seperti Supabase Auth + PostgreSQL/RLS atau layanan sebanding untuk persetujuan tim. Jangan menambahkan database baru diam-diam.

Jika menggunakan database dengan row-level security:
- user hanya dapat membaca/mengubah data miliknya;
- policy harus diuji, bukan sekadar diasumsikan;
- endpoint server tetap memeriksa sesi dan kepemilikan;
- tabel transaksi tidak dapat diedit pengguna melalui query client;
- entitlement Premium tidak boleh diubah langsung dari frontend.

---

# 13. Model Data Minimum (Usulan)

Nama tabel dapat menyesuaikan teknologi, tetapi pemisahan logis wajib ada.

## 13.1 `profiles`
- `id` — identitas user yang sesuai dengan auth provider;
- `display_name`;
- `age_band` (opsional bila perlu);
- `onboarding_completed_at`;
- `created_at`, `updated_at`.

## 13.2 `consent_records`
- `id`;
- `user_id`;
- `consent_type`;
- `document_version`;
- `status`;
- `recorded_at`;
- metadata persetujuan wali hanya bila memang diperlukan dan telah ditinjau.

## 13.3 `story_cards`
- `id`, `user_id`, `title`;
- `what_happened`, `what_i_feel`, `what_i_need`, `what_i_want_to_say`;
- `who_i_might_talk_to` (opsional);
- `created_at`, `updated_at`.

## 13.4 `learning_progress`
- `id`, `user_id`, `module_id`, `status`, `progress`, `updated_at`.

## 13.5 `growth_actions`
- `id`, `user_id`, `title`, `status`, `target_date` (opsional), `created_at`, `updated_at`.

## 13.6 `plans`
- `id`, `code`, `name`, `price_amount`, `currency`, `duration_days`, `active`;
- entitlements/configuration tidak boleh diambil dari client sebagai sumber kebenaran.

## 13.7 `subscriptions`
- `id`, `user_id`, `plan_id`, `status`, `starts_at`, `ends_at`, `created_at`, `updated_at`.
- Status mencakup Free/active/expired sesuai rancangan sistem. Riwayat lama jangan hilang ketika subscription baru dibuat.

## 13.8 `payment_orders`
- `id`, `user_id`, `plan_id`, `provider`, `provider_order_id`, `amount`, `currency`, `status`, `checkout_reference` (bila diperlukan), `created_at`, `paid_at`, `expires_at`.
- Jangan menyimpan server key atau raw sensitive payload.

## 13.9 `payment_webhook_events`
- `id`, `provider`, `event_reference`/idempotency key, `order_id`, `processed_at`, `result_status`.
- Simpan data seperlunya untuk audit; redaksi payload sensitif.

## 13.10 `knowledge_sources` atau file knowledge base
- `id`, `title`, `source_name`, `source_url`, `review_status`, `reviewed_at`, `category`, `content/chunks`.

Raw chat dan raw journal tidak perlu dimasukkan ke database sebagai log percakapan secara default.

---

# 14. API/Backend Requirements

Route berikut bersifat konseptual; sesuaikan dengan framework/backend yang telah ada.

## 14.1 Auth/profile
- Registrasi, login, verifikasi email, reset password dikelola provider auth.
- `GET/PATCH profile` memerlukan sesi valid dan hanya mengizinkan field yang diperbolehkan.
- Endpoint penghapusan data harus memeriksa ulang otorisasi.

## 14.2 AI
- `POST /api/ai/guided-story` — validasi input, cek consent dan entitlement, retrieval, panggil Gemini, kembalikan draft dan sumber yang dipakai.
- `POST /api/ai/practice-talk` — validasi scenario, consent, entitlement, dan safety rules.
- `POST /api/ai/reflect` — refleksi terhadap teks setelah persetujuan eksplisit.
- Rate limiting dan batas panjang input harus di server.

## 14.3 Kartu Cerita
- Buat/simpan hanya bila sesi valid dan pengguna mengonfirmasi simpan.
- Baca/edit/hapus selalu memeriksa `user_id` pemilik kartu.
- Jangan percaya user ID yang dikirim dari browser tanpa memeriksa sesi.

## 14.4 Pembayaran
- `POST /api/payments/create-order` — autentikasi, plan valid, harga di server, order ID unik, create transaction pada provider.
- `GET /api/payments/status/:orderId` — pengguna hanya dapat melihat order miliknya.
- `GET /api/payments/history` — riwayat pembayaran milik user.
- `POST /api/payments/webhook` — endpoint server-to-server; validasi provider notification, nominal, status, order, dan idempotensi.
- `POST /api/subscriptions/renew` — membuat order baru; aktivasi tetap menunggu webhook/status server.

Jangan membangun endpoint yang menerima `isPremium: true` dari client. Jangan pernah memberikan Premium hanya karena frontend mengirim status pembayaran.

---

# 15. Design System dan Responsivitas

## 15.1 Visual
- Pertahankan identitas SELA.AI: dominasi biru, tenang, dewasa, nyaman dan tidak terasa seperti template AI generik.
- Soft neumorphism hanya digunakan secara selektif; jaga batas kontrol dan kontras.
- Gunakan tipografi sans-serif yang mudah dibaca. Jika font proyek sudah ditentukan, pertahankan konsistensinya.
- Hindari glow/gradient berlebihan, kartu berlebihan, ornamen robot/otak AI, emoji sebagai ikon UI, serta animasi tanpa fungsi.
- Gunakan kata-kata Bahasa Indonesia natural dan suportif, tidak hiperbolis.

## 15.2 Navigasi
- Desktop: sidebar ringkas atau navigasi lateral sesuai UI saat ini; menu inti dan status paket mudah ditemukan.
- Mobile: bottom navigation atau menu mobile yang jelas; jangan menjejalkan seluruh fitur ke bilah kecil.
- Menu akun berisi Profil, Paket & Pembayaran, Privasi/Pengaturan, Bantuan, dan Logout.

## 15.3 Keadaan UI wajib
Setiap halaman memiliki state relevan: loading, kosong, error, berhasil, akses ditolak, dan disabled. State tersebut tidak boleh hanya dekoratif.

## 15.4 Uji layar
Uji minimal lebar 320, 375, 390, 768, 1024, dan 1440 px. Tidak boleh ada horizontal overflow, modal yang tak bisa ditutup, input tertutup keyboard HP, atau teks/button yang terpotong.

---

# 16. Acceptance Criteria End-to-End

## 16.1 Pengguna dan autentikasi
- [ ] Pengguna baru dapat membuat akun dengan validasi yang sesuai.
- [ ] Pengguna dapat masuk, logout, dan reset password.
- [ ] Halaman privat tidak dapat dibuka tanpa session.
- [ ] Consent wajib dan opsional ditangani secara terpisah.
- [ ] Profil tidak meminta data yang tidak diperlukan.

## 16.2 Fungsi produk inti
- [ ] Guided Story bisa dijalankan, dilewati, diedit, dan gagal dengan fallback manual.
- [ ] Kartu Cerita dapat disimpan hanya setelah tindakan eksplisit.
- [ ] Pengguna hanya dapat melihat dan memodifikasi kartu miliknya.
- [ ] Practice Talk menampilkan label simulasi, kuota, dan umpan balik yang aman.
- [ ] Support Pathway selalu dapat diakses tanpa Premium.
- [ ] Tidak ada kontak/organisasi rekaan yang tampak nyata.
- [ ] Jurnal dan transcript tidak disimpan permanen secara diam-diam.

## 16.3 AI dan RAG
- [ ] Integrasi memakai provider Gemini yang dikonfigurasi server-side.
- [ ] Tidak ada API key pada browser bundle atau repo.
- [ ] Demo dan AI aktif dibedakan secara jujur.
- [ ] Retrieval dijalankan sebelum jawaban edukatif yang memerlukan sumber.
- [ ] Sumber yang ditampilkan benar-benar sumber yang digunakan.
- [ ] Fallback bekerja ketika key hilang, rate limit, timeout, atau sumber tidak relevan.

## 16.4 Paket dan pembayaran
- [ ] Harga, durasi, dan fitur paket muncul dengan jelas di halaman Harga.
- [ ] Pengguna yang belum login diarahkan ke autentikasi dan kembali ke checkout.
- [ ] Checkout menampilkan Rp19.000/30 hari dan keterangan perpanjangan manual.
- [ ] Nominal dihitung server-side.
- [ ] Order ID unik dibuat dan status awal `pending`.
- [ ] Tombol checkout membuka provider sandbox sungguhan jika credential tersedia.
- [ ] Jika credential tidak tersedia, status Demo/Sandbox dijelaskan; tidak ada klaim pembayaran nyata.
- [ ] Premium tidak aktif sebelum status paid dikonfirmasi server/webhook.
- [ ] Webhook diverifikasi dan idempotent.
- [ ] Status pending, failed, expired, paid, dan kondisi terlambat ditangani.
- [ ] Riwayat transaksi hanya menampilkan transaksi milik user.
- [ ] Masa aktif berakhir setelah 30 hari dan tidak ada auto-charge.
- [ ] Ketika masa aktif habis, fitur Free kembali aktif dan data pengguna tidak dihapus.

## 16.5 Privasi, keselamatan, dan QA
- [ ] Tidak ada konten sensitif di log aplikasi.
- [ ] Pengguna bisa menghapus kartu dan mengajukan penghapusan akun/data.
- [ ] Persetujuan AI muncul sebelum teks sensitif pertama kali dikirim.
- [ ] Konten keselamatan/Support Pathway tidak dipaywall dan tidak berisi upsell mengganggu.
- [ ] Semua rute utama diuji di browser dan layar mobile/desktop.
- [ ] Test type/lint/unit/integrasi yang tersedia berjalan atau status kegagalannya dilaporkan dengan jujur.
- [ ] README mendokumentasikan env, setup, sandbox payment, batasan prototype, dan cara demonstrasi.

---

# 17. Rencana Implementasi Bertahap

## Fase 0 — Audit dan rencana (tanpa coding)
- Baca seluruh repo dan konfigurasi.
- Petakan route yang sudah ada ke route PRD.
- Identifikasi stack, backend, database/auth, Gemini, deployment, dan payment status yang ada.
- Tandai komponen UI yang dapat digunakan kembali.
- Buat task list, risiko, migrasi, dan test plan.
- Jangan mengubah kode sebelum rencana ditinjau.

## Fase 1 — Reposisi produk dan information architecture
- Ganti framing FATHERCARE AI atau konsep lama menjadi SELA.AI di seluruh UI yang terlihat.
- Hilangkan copy yang membuat produk seolah berfokus khusus pada hubungan ayah atau sekadar chatbot curhat.
- Bangun beranda, Cara Kerja, Fitur, Harga, Privasi, Syarat.
- Pastikan navigasi empat fitur inti mudah dipahami.

## Fase 2 — Auth, consent, profil, dan shell aplikasi
- Implementasikan login/daftar, reset password, status email, logout, guard route, profil.
- Implementasikan onboarding dan persetujuan terpisah.
- Tambahkan state error/loading/empty.
- Jangan menyimpan cerita sensitif di fase ini.

## Fase 3 — Pengalaman inti
- Implementasikan Guided Story dengan form manual fallback.
- Implementasikan preview Kartu Cerita dan kontrol save/edit/delete.
- Implementasikan Practice Talk dengan label simulasi dan kuota.
- Implementasikan Support Pathway dengan informasi demo yang tidak diklaim nyata bila belum diverifikasi.
- Implementasikan jurnal dan modul belajar dengan kontrol privasi.

## Fase 4 — Gemini dan RAG
- Implementasikan route server-side dan consent sebelum kirim teks.
- Hubungkan Gemini melalui env server.
- Implementasikan knowledge base dan retrieval.
- Tangani demo/error/rate-limit/timeout.
- Pastikan sumber dan label AI sesuai keadaan sebenarnya.

## Fase 5 — Paket, billing, dan pembayaran sandbox
- Implementasikan entitlements di server.
- Buat halaman Harga, Paket, Checkout, hasil pembayaran, history.
- Implementasikan Midtrans Snap sandbox atau provider yang sudah ada.
- Implementasikan webhook notification verification, idempotensi, status transaction, dan subscription expiry.
- Uji paid, pending, failed, expired, duplikasi webhook, browser return lebih cepat dari webhook, dan user logout.

## Fase 6 — Pengujian keselamatan dan QA
- Uji penggunaan di laptop dan ponsel.
- Uji authorization antar-akun.
- Uji request tanpa autentikasi dan manipulasi harga/plan dari browser.
- Uji key leakage.
- Uji respons AI untuk permintaan diagnosis, sumber palsu, kontak palsu, dan contoh risiko.
- Uji Support Pathway saat status Free dan saat kuota AI habis.
- Jangan mengklaim keamanan klinis atau legal compliance final hanya karena tes UI lulus.

## Fase 7 — Dokumentasi dan demo
- Perbarui README.
- Buat `.env.example` tanpa secret.
- Jelaskan setup lokal dan deployment.
- Jelaskan cara menggunakan Gemini test key dengan aman, dan Midtrans Sandbox.
- Catat feature flags, keterbatasan dan pekerjaan yang perlu dilakukan sebelum publik.
- Siapkan demo dengan akun serta skenario sintetis.

---

# 18. Environment Variables dan Mode Demo

Buat daftar variable sesuai teknologi yang ditemukan; minimum konsepnya:

```env
# AI — server only
GEMINI_API_KEY=
GEMINI_MODEL=

# Auth/database — only if the chosen service requires them
# AUTH_PROVIDER_URL=
# AUTH_PROVIDER_PUBLIC_KEY=
# DATABASE_URL=
# SERVICE_ROLE_KEY=  # server only; never expose to browser

# Payment — Midtrans Sandbox, server-side credentials
PAYMENT_PROVIDER=midtrans
PAYMENT_MODE=sandbox
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false

# Application
APP_BASE_URL=http://localhost:3000
```

Catatan:
- Placeholder di atas bukan credential valid.
- Gunakan nama variable sesuai framework/provider aktual.
- `MIDTRANS_SERVER_KEY`, `DATABASE_URL`, service-role keys, dan Gemini secret hanya boleh dibaca server.
- Gunakan `.gitignore` untuk `.env`, credential lokal, file log, serta output yang mungkin berisi rahasia.
- Jangan minta pengguna menempelkan secret ke percakapan Antigravity. Sarankan memasukkannya melalui pengaturan environment lokal/hosting.
- Payment sandbox dan Demo mode harus dibedakan. Sandbox dapat memanggil provider uji yang sesungguhnya; Demo hanya simulasi dan tidak boleh membuat record paid palsu.

---

# 19. Konten Copy yang Disarankan

## Hero
**Bercerita tidak harus langsung sempurna.**  
SELA.AI membantumu menyusun apa yang ingin disampaikan, berlatih memulai percakapan, dan melihat pilihan dukungan yang bisa kamu pertimbangkan.

CTA utama: **Mulai Gratis**  
CTA sekunder: **Lihat Cara Kerja**

## Empat langkah
1. **Susun ceritamu** — mulai dari beberapa pertanyaan ringan yang boleh dilewati.
2. **Buat kartu cerita** — rapikan apa yang terjadi, apa yang dirasakan, dan bantuan yang dibutuhkan.
3. **Berlatih bicara** — coba kalimat pembuka sebelum berbicara dengan seseorang.
4. **Pilih dukungan** — lihat pilihan orang atau layanan yang dapat dipertimbangkan.

## Batasan AI
SELA.AI adalah alat bantu refleksi dan persiapan percakapan. AI dapat keliru dan bukan pengganti psikolog, konselor, tenaga medis, atau layanan darurat. Kamu tetap memegang kendali atas apa yang disimpan atau dibagikan.

## Harga Premium
**Premium — Rp19.000 / 30 hari**  
Lebih banyak latihan, kartu cerita, dan modul pengembangan diri. Perpanjangan dilakukan manual; tidak ada auto-charge pada versi ini. Bantuan dasar dan Support Pathway tetap tersedia di paket Free.

## Status demo
Jika provider AI atau pembayaran belum terhubung, gunakan copy yang jujur:
- “Mode Demo — respons ini adalah contoh simulasi.”
- “Pembayaran Sandbox — transaksi uji, tidak memproses pembayaran produksi.”
- “Direktori demo — informasi ini belum diverifikasi untuk digunakan sebagai kontak nyata.”

---

# 20. Master Prompt untuk Antigravity (Copy/Paste)

> Bertindak sebagai senior product manager, product designer, full-stack engineer, dan AI application engineer untuk proyek SELA.AI. Baca file `SELA_AI_PRD_Revisi_Sistem_Antigravity.md` sampai selesai dan audit seluruh source code yang saat ini ada di folder proyek sebelum melakukan perubahan.
>
> **Untuk respons pertama, jangan coding.** Buat Implementation Plan dan task list yang berurutan. Petakan halaman/fungsi yang ada terhadap PRD ini; laporkan stack, auth/database, integrasi Gemini, deployment, payment provider, file yang akan diubah, migration risk, dan acceptance test. Bedakan fitur yang benar-benar berfungsi dari mockup. Jangan menganggap provider atau credential sudah tersedia jika belum diperiksa.
>
> Reposisikan SELA.AI menjadi AI-Powered Help-Seeking Navigator dengan alur utama Guided Story → Kartu Cerita Pribadi → Practice Talk → Support Pathway. Ini bukan sekadar chatbot curhat, alat diagnosis, atau produk khusus masalah hubungan ayah. Pertahankan design system biru dan soft neumorphism yang sudah ada bila bisa digunakan ulang; jangan merombak seluruh aplikasi tanpa alasan yang jelas.
>
> Bangun alur pengguna lengkap dari halaman publik, daftar/login, verifikasi email/reset password, onboarding/consent, dashboard, semua fitur inti, halaman Harga, akun Paket & Pembayaran, checkout, status pembayaran, riwayat transaksi, sampai penghapusan akun. Fitur keselamatan dan Support Pathway tidak boleh dikunci di balik paywall.
>
> Untuk paket, gunakan Free dan asumsi harga Premium Rp19.000 per 30 hari, dengan perpanjangan manual dan tanpa auto-charge pada MVP. Harga/kuota harus configurable di server. Jangan klaim harga sudah tervalidasi pasar. Institusi diarahkan ke formulir permintaan demo, bukan checkout otomatis.
>
> Untuk pembayaran, audit integrasi yang sudah ada. Jika belum ada provider, usulkan Midtrans Snap Sandbox sebagai pilihan awal dan jelaskan file/config yang diperlukan. Buat order melalui backend, hitung nominal di server, verifikasi notifikasi/webhook dan idempotensi, dan aktifkan Premium hanya setelah status pembayaran terkonfirmasi server. Jangan pernah menandai paid hanya dari redirect atau state frontend. Jika credential tidak tersedia, mode demo/sandbox harus diberi label jelas dan tidak boleh mengaktifkan Premium secara palsu.
>
> Untuk AI, gunakan provider Gemini yang sudah menjadi arah proyek. Integrasikan server-side saja melalui SDK Google Gen AI yang sesuai versi project, gunakan `GEMINI_API_KEY`/`GEMINI_MODEL` melalui environment server, dan jangan mengekspos secret di client bundle. Pertahankan retrieval/RAG untuk jawaban edukatif, tampilkan hanya sumber yang benar-benar digunakan, dan bedakan Demo dari AI Aktif. Jangan mengarang kontak atau sumber. Minta persetujuan sebelum teks cerita/jurnal dikirim ke layanan AI eksternal.
>
> Lindungi data pribadi: jangan menyimpan raw chat/jurnal secara permanen secara default; Kartu Cerita disimpan hanya setelah tindakan eksplisit; jangan log isi cerita; validasi otorisasi di server; semua data harus dibatasi kepada pemiliknya. Karena sasaran mencakup remaja, jelaskan bahwa alur persetujuan wali dan tinjauan privasi harus diselesaikan sebelum peluncuran publik bagi pengguna di bawah umur. Gunakan skenario sintetis untuk demo.
>
> Kerjakan satu fase per satu fase. Setelah setiap fase, jalankan pemeriksaan yang tersedia, uji melalui browser pada lebar 320, 375, 390, 768, 1024, dan 1440 px, laporkan file yang berubah, test results, screenshot/hasil visual jika tersedia, masalah yang belum selesai, dan tunggu persetujuan sebelum fase berikutnya. Jangan mengklaim selesai atau aman jika belum diuji.
>
> Hasil akhir mencakup README, `.env.example` tanpa secret, dokumentasi alur akun/AI/pembayaran, panduan Midtrans Sandbox, daftar keterbatasan, dan skenario demo BPC.

---

# 21. Prompt Implementasi per Fase

## Setelah Implementation Plan disetujui

> Laksanakan Fase 1 dari PRD saja: reposisi produk dan Information Architecture. Audit perubahan visual yang dibutuhkan, pertahankan komponen yang masih sesuai, perbarui copy dan navigasi menjadi SELA.AI Help-Seeking Navigator, dan siapkan halaman publik utama. Jangan mengerjakan pembayaran atau menambah database/auth baru pada fase ini. Jalankan pemeriksaan visual dan laporkan perubahan sebelum menunggu persetujuan.

## Fase autentikasi

> Laksanakan Fase 2 sesuai PRD. Gunakan auth provider yang sudah ada jika layak; bila belum ada, usulkan pilihan dan jelaskan perubahan sebelum integrasi. Implementasikan daftar, login, email verification, reset password, logout, route guard, consent terpisah, dan profil. Jangan menyimpan cerita sensitif selama fase ini. Pastikan error states tidak membocorkan apakah suatu email terdaftar.

## Fase fitur inti

> Laksanakan Fase 3. Bangun Guided Story, preview/edit/save/delete Kartu Cerita, Practice Talk, Support Pathway, jurnal, modul edukasi, dan rencana langkah. Kartu Cerita hanya disimpan setelah pengguna memilih simpan. Semua jalur harus dapat dicoba dan punya state loading/error/empty. Jangan membuat kontak rujukan palsu; informasi yang belum diverifikasi harus jelas sebagai demo.

## Fase Gemini + RAG

> Laksanakan Fase 4 sesuai PRD. Periksa provider dan struktur server yang sudah ada; integrasikan Gemini secara server-side. Implementasikan consent sebelum kirim teks, validasi request, retrieval knowledge base, sumber yang nyata, timeout, rate limit, error handling dan mode DEMO yang jujur. Uji tanpa API key, key tidak valid, retrieval kosong, prompt yang meminta diagnosis, dan permintaan mengarang referensi.

## Fase billing/payment

> Laksanakan Fase 5. Sebelum coding, petakan database dan backend yang ada. Implementasikan plan/entitlement server-side, halaman Harga, Paket, Checkout, status transaksi, riwayat, dan Midtrans Sandbox jika tidak ada provider lain yang sudah dipakai. Jangan mengaktifkan Premium dari callback frontend. Tambahkan create-order server-side, validasi nominal, order ID unik, webhook verification, idempotensi, status pending/failed/expired/paid, masa aktif 30 hari, dan perpanjangan manual tanpa auto-charge. Uji semua skenario yang ditentukan PRD dan laporkan apa yang masih membutuhkan credential/konfigurasi dashboard provider.

## Fase QA akhir

> Audit seluruh aplikasi sesuai acceptance criteria PRD. Uji alur lengkap pengguna baru dan lama, batas paket, akses antar-akun, delete data, consent AI, seluruh status transaksi dan webhook, mode DEMO, key leakage, tampilan mobile/desktop, serta Support Pathway saat kuota habis. Jangan hanya melaporkan “berhasil”; sebutkan langkah tes dan bukti yang tersedia. Perbaiki bug yang ditemukan dan perbarui README serta batasan prototype.

---

# 22. Definition of Done

SELA.AI belum dianggap selesai hanya karena semua halaman terlihat. MVP dinyatakan siap untuk demo BPC jika:
- seluruh halaman penting dapat dinavigasi;
- pengguna dapat daftar/login/logout dan pulih dari kesalahan autentikasi;
- alur inti dari Guided Story sampai Kartu Cerita dapat dicoba;
- Practice Talk membedakan simulasi dari percakapan nyata;
- Support Pathway tidak memuat rujukan palsu dan selalu dapat diakses;
- mode AI aktif hanya dinyatakan aktif jika request server ke Gemini benar-benar berhasil;
- RAG dan sumber dapat dilacak untuk jawaban edukatif;
- halaman Harga menjelaskan kuota, harga, durasi, dan batas fitur secara jujur;
- checkout Sandbox bekerja bila credential tersedia, atau mode demo diberi label nyata;
- Premium hanya aktif dari status pembayaran terverifikasi di backend;
- riwayat transaksi dan masa aktif sesuai dengan record server;
- data sensitif tidak ditulis ke log dan tidak dipersistenkan diam-diam;
- layout dapat digunakan di mobile dan desktop;
- README menjelaskan setup, env, auth, AI, pembayaran, keterbatasan, dan demo;
- tim memahami bahwa ini adalah prototype dan belum boleh diklaim sebagai layanan klinis/krisis atau peluncuran publik siap pakai tanpa review lanjutan.

---

# 23. Referensi Teknis Resmi

Referensi ini digunakan sebagai titik awal implementasi, bukan pengganti dokumentasi versi SDK/provider yang benar-benar dipakai oleh proyek.

1. **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (JDIH Komdigi):** https://jdih.komdigi.go.id/produk_hukum/view/id/832/t/crc32/
2. **Gemini API — Getting Started (Google AI for Developers):** https://ai.google.dev/gemini-api/docs/get-started
3. **Gemini API Keys — penggunaan environment variable (Google AI for Developers):** https://ai.google.dev/gemini-api/docs/api-key
4. **Midtrans Snap Overview:** https://docs.midtrans.com/docs/snap
5. **Midtrans Snap Integration Guide:** https://docs.midtrans.com/docs/snap-snap-integration-guide
6. **Midtrans HTTP(S) Notification/Webhooks:** https://docs.midtrans.com/docs/https-notification-webhooks

**Catatan akhir:** Harga, kuota, provider pembayaran, alur persetujuan wali, dan kebijakan retensi harus diverifikasi sebelum peluncuran nyata. Untuk demo BPC gunakan data sintetis, credential sandbox, dan pernyataan batasan yang transparan.
