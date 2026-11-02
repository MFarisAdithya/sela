# Audit konektivitas SELA.AI

Tanggal: 2 November 2026. Pemeriksaan kode lokal; bukan verifikasi deployment Vercel atau pengujian kualitas Gemini langsung.

## Diperbaiki dalam perubahan ini

- Check-in → percakapan: sebelumnya `sela:checkin_emotions` hanya ditulis, tidak dibaca. Chat sekarang menyambut sesuai perasaan yang dipilih dan mengirim pilihan itu ke server/model. Lewati dan mulai ulang membersihkan pilihan.
- Percakapan refleksi dan latihan: sebelumnya hanya pesan terbaru dikirim. Sekarang membawa maksimal 20 pesan terakhir, dengan peran pengguna/model terpisah dan penyamaran informasi pribadi sebelum dikirim ke AI.
- Rangkuman: sebelumnya memotong seluruh percakapan menjadi 1.000 karakter terakhir. Sekarang memakai riwayat terstruktur, meminta JSON, memvalidasi hasil, dan memakai perkataan pengguna untuk rangkuman lokal. Perasaan negatif tidak otomatis ditambahkan pada rangkuman lokal.
- AI tidak tersedia: halaman refleksi dan latihan sekarang menampilkan bahwa balasan memakai panduan lokal. Respons HTTP gagal masuk penanganan kesalahan.
- Persetujuan pengiriman AI: kedua halaman mengirim preferensi; server menghentikan generation dan embedding jika dinonaktifkan. Ini preferensi sesi, belum penegakan persetujuan tersimpan di akun.
- Kartu contoh: tidak otomatis aktif sebagai latar cerita pribadi. Ngobrol bebas tidak memakai kartu aktif; latihan dari kartu memilih persona sesuai target kartu.
- Langkah Kecilku: penambahan memakai pembaruan state, menggantikan mutasi array langsung.
- Model: default kode dan template environment memakai `gemini-3.8-flash`; `GEMINI_MODEL` pada server tetap diutamakan. Nama model yang berhasil dipakai kini dikembalikan dengan benar. Timer generation dibersihkan setelah permintaan selesai.

## Masih perlu pekerjaan lanjutan

| Prioritas | Temuan | Dampak / arah perbaikan |
| --- | --- | --- |
| Tinggi | AppContext hanya state React; jurnal, kartu, kontak, progres, dan tiket tidak disimpan permanen | Refresh mengembalikan data awal. Perlu penyimpanan per akun, pemisahan antar pengguna, dan penghapusan data yang konsisten. |
| Tinggi | Profil AppContext (`Alex`, rentang usia) terpisah dari AuthContext | Nama di beranda dan percakapan bisa berbeda; perlu satu sumber profil dan sinkronisasi preferensi akun. |
| Tinggi | Riwayat chat masih state halaman | Pindah halaman/refresh menghilangkan percakapan. Perlu sesi percakapan tersimpan dan mekanisme mulai sesi baru yang jelas. |
| Tinggi | Layanan auth memakai map dalam proses dan alur demo; pembayaran/tiket mendukung simulasi | Belum merupakan integrasi akun, transaksi, atau pengiriman bantuan produksi yang tahan restart. Perlu integrasi produksi sebelum mengklaim fungsi nyata. |
| Sedang | Jurnal bebas belum punya tindakan membawa catatan tertentu ke percakapan | Pengguna harus mengulang konteks. Tambahkan pilihan eksplisit “Bahas catatan ini”, tanpa mengirim seluruh jurnal otomatis. |
| Sedang | Modul belajar dan Langkah Kecilku belum saling membentuk tugas/progres | Menyelesaikan modul tidak otomatis memperbarui tugas yang berkaitan. Perlu relasi ID modul/tugas yang eksplisit. |
| Sedang | Kartu/rangkuman → rencana langkah belum membawa langkah spesifik | Rencana masih memakai tugas bawaan; perlu tindakan menyimpan langkah dari rangkuman. |
| Sedang | Kontak/tugas/modul/kartu contoh tampil sebagai data awal pengguna | Bisa disangka kontak atau progres nyata. Pisahkan mode demo dari akun kosong. |
| Sedang | Health check memeriksa keberadaan key saja | Label terhubung belum membuktikan key, kuota, atau model berfungsi. Perlu pemeriksaan operasional tanpa menampilkan rahasia. |
| Sedang | RAG memakai pencarian berbasis pesan terbaru dan klaim status materi bawaan | Perlu evaluasi relevansi, verifikasi sumber materi, dan pengujian jawaban dengan contoh percakapan sebelum klaim kualitas. |

## Cara meningkatkan kualitas AI

Urutan yang disarankan: konteks percakapan dan fitur → model yang berfungsi → instruksi yang natural → materi relevan → evaluasi percakapan. Mengganti model saja tidak mengatasi hilangnya konteks.

Di deployment, periksa `GEMINI_API_KEY` dan `GEMINI_MODEL`, lalu deploy ulang agar konfigurasi dipakai. Jangan menaruh API key di kode browser. Uji skenario perasaan positif/campuran, jawaban singkat yang merujuk pesan sebelumnya, koreksi pengguna, latihan berdasarkan kartu, kegagalan model, dan pilihan menonaktifkan AI. Bandingkan kualitas, waktu respons, dan pemakaian sebelum menentukan model akhir.

Rujukan resmi: https://ai.google.dev/api/generate-content dan https://aistudio.google.com/docs/models/gemini-3.8-flash.

## Validasi perubahan

`scripts/test-chat-context.ts` menjalankan route dengan respons provider simulasi: memeriksa pilihan emosi, riwayat multi giliran, nama model, rangkuman JSON, penolakan riwayat tidak valid, serta tidak adanya panggilan provider saat pengiriman AI dimatikan. Tidak mengukur mutu jawaban Gemini sebenarnya atau tampilan browser.


## Pembaruan prioritas penyimpanan

Penyimpanan per akun di browser sudah diterapkan untuk jurnal, kartu, kontak, modul selesai, tugas, tiket, pilihan perasaan, chat refleksi, dan sesi latihan. Kunci memakai email akun yang dinormalisasi agar tetap sama saat ID akun demo berubah setelah proses server dimulai ulang. Ini pemisahan data aplikasi di browser yang sama, bukan pengamanan akun produksi atau sinkronisasi cloud.

Provider menunggu pemulihan data sebelum menampilkan halaman pribadi, lalu mengganti seluruh state saat akun berganti. Data dengan format rusak/versi tidak dikenal tidak ditimpa otomatis. Kesalahan kuota atau akses penyimpanan diberi pesan. Akun baru tidak mendapat cerita, kontak fiktif, atau progres bawaan. Reset membersihkan data dan tampilan percakapan; respons AI yang kembali setelah halaman dilepas tidak boleh mengisi kembali chat yang direset.

Nama, rentang usia, dan izin AI dibaca dari profil akun. Halaman pengaturan lama menuju editor akun yang sama. Ekspor sekarang mencakup isi catatan/progres/percakapan. Penghapusan akun juga menghapus salinan lokal akun tersebut; akun lain tidak dihapus.

Batasan: data berada di localStorage browser, tidak berpindah perangkat, tidak bertahan jika data situs dibersihkan, dan tidak dienkripsi oleh aplikasi. Sistem login demo masih menerima kredensial bebas, sehingga pemisahan berdasarkan akun ini belum merupakan kontrol akses produksi. Database dan autentikasi produksi tetap diperlukan sebelum menyimpan data nyata lintas perangkat. Draf input dan rangkuman yang belum disimpan menjadi kartu belum dipulihkan setelah refresh. Tab berbeda pada akun yang sama belum melakukan penggabungan perubahan bersamaan.

Validasi tambahan: `scripts/test-account-storage.ts` memeriksa pemulihan seluruh jenis data, pemisahan akun, identitas login ulang, reset, penghapusan satu akun, data rusak/versi lain, storage terblokir, dan kuota penuh. TypeScript dan tes konteks chat tetap harus lolos. Tes ini tidak menggantikan pengujian interaksi browser dan deployment.
