# E-Musyawarah Desa

E-Musyawarah Desa adalah aplikasi administrasi digital untuk memfasilitasi pencatatan, pengelolaan, dan pengesahan hasil rapat musyawarah di tingkat desa atau kelurahan. Aplikasi ini dirancang untuk mendigitalisasi proses absensi warga (dilengkapi tanda tangan elektronik), penyusunan notulen rapat, serta penerbitan Berita Acara resmi secara praktis dan dinamis.

---

## Fitur Utama

Aplikasi ini dilengkapi dengan modul-modul fungsional yang mendukung penuh kegiatan operasional administrasi desa:

1. **Profil Wilayah Dinamis (White-Label Customizer)**
   * Seluruh data administratif (Nama Desa, Kecamatan, Kabupaten, Alamat Kantor, Surel, dan Website) dapat diubah secara dinamis melalui tombol Pengaturan (ikon roda gigi).
   * Perubahan profil daerah ini akan otomatis menyesuaikan format Kop Surat resmi dan lembar cetak Berita Acara.

2. **Pencarian & Filter Rapat Cepat**
   * Pencarian daftar rapat secara instan berdasarkan judul atau lokasi rapat.
   * Filter cepat rapat berdasarkan rumpun bidang musyawarah (Pembangunan Infrastruktur, Pemberdayaan & Sosial, Anggaran ADD, Keamanan, dll.).

3. **Absensi Digital & Validasi NIK Real-Time**
   * Pengisian daftar hadir warga dengan e-Signature (Tanda Tangan Elektronik) langsung menggunakan layar sentuh atau mouse.
   * Validasi format NIK (Nomor Induk Kependudukan) wajib 16 digit angka dengan indikator status real-time.
   * Pencegahan otomatis input NIK ganda dalam satu sesi rapat yang sama.

4. **Notulensi & Rencana Tindak Lanjut**
   * Pengisian ringkasan diskusi umum rapat desa.
   * Penyusunan daftar rencana tindak lanjut (*Action Items*) lengkap dengan Penanggung Jawab (PIC) dan tenggat waktu (*deadline*) pelaksanaan tugas.
   * Pilihan untuk memuat templat notulensi default sesuai kategori rapat demi percepatan administrasi.

5. **Pengesahan Keputusan Sidang**
   * Modul pengesahan keputusan musyawarah secara aklamasi (Mufakat Bulat) maupun pemungutan suara (Voting).
   * Validasi suara voting riil agar total perolehan suara (Setuju + Tolak + Abstain) tidak melebihi jumlah total peserta rapat yang terdaftar hadir.

6. **Unduh Berita Acara ke MS Word (.doc)**
   * Ekspor hasil rapat ke dalam dokumen berformat Microsoft Word (`.doc`) yang rapi, lengkap dengan Kop Surat resmi, tabel notulen, tabel rencana tindak lanjut, dan tanda tangan e-Signature seluruh peserta rapat.

7. **QR Code Verifikasi Dokumen**
   * Kode QR unik untuk verifikasi keabsahan lembar Berita Acara yang dihasilkan secara otomatis di samping kolom tanda tangan resmi.

8. **Pencadangan & Pemulihan Basis Data (Backup/Restore JSON)**
   * Ekspor seluruh data historis rapat desa ke dalam satu file berkas `.json`.
   * Impor berkas `.json` cadangan untuk memulihkan seluruh data secara instan saat berpindah perangkat.

---

## Perlindungan & Keamanan Input Data

Aplikasi menerapkan pengamanan masukan data di tingkat aplikasi untuk menjaga kredibilitas arsip desa:
* **Penyaringan Karakter Khusus**: Memblokir masukan tag HTML, skrip, atau simbol berbahaya (`<`, `>`, `{`, `}`, `[`, `]`, `\`, `|`, `^`, `%`, `*`, `$`, `#`, `~`, `` ` ``) di seluruh kolom teks guna menghindari celah keamanan (XSS / Injection).
* **Validasi Format Karakter**:
  * Nama warga hanya memperbolehkan huruf, spasi, koma, titik, tanda petik tunggal, dan kurung untuk penulisan gelar resmi.
  * Nomor WA/HP disaring ketat hanya berupa angka dan karakter plus (`+`).

---

## Spesifikasi Teknologi

Aplikasi berjalan di sisi klien (*client-side*) secara mandiri dengan spesifikasi sebagai berikut:
* **React 19 & TypeScript**: Menjamin aplikasi berjalan dengan performa rendering optimal dan tipe data yang aman.
* **Vite**: Sebagai alat bantu pengembangan (*build tool*) berkecepatan tinggi.
* **Tailwind CSS v4**: Penyusunan tata letak dan desain visual antarmuka secara presisi.
* **Framer Motion**: Menyediakan efek transisi tab dan modal yang mulus.
* **Lucide React**: Koleksi ikon antarmuka yang bersih dan modern.
* **LocalStorage Engine**: Media penyimpanan data lokal persisten, data rapat tidak akan terhapus saat peramban dimuat ulang.

---

## Panduan Instalasi & Pengembangan

### Prasyarat Sistem
Pastikan komputer Anda telah terpasang:
* [Node.js](https://nodejs.org/) (Sangat direkomendasikan versi LTS 18 atau yang terbaru)

### Langkah Pemasangan
1. Ekstrak berkas proyek E-Musyawarah-Desa ke folder lokal Anda.
2. Jalankan Terminal (PowerShell / Command Prompt) di dalam folder proyek tersebut.
3. Pasang seluruh dependensi proyek:
   ```bash
   npm install
   ```
4. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
5. Buka browser dan akses alamat localhost yang tertera di terminal, biasanya:
   `http://localhost:5173`

### Membangun Bundel Produksi (Build)
Untuk mengompilasi dan mengoptimalkan aset aplikasi agar siap dideploy ke server produksi/publik:
```bash
npm run build
```
Hasil kompilasi akhir akan tersimpan secara otomatis di dalam direktori `/dist` dan siap disajikan.
