# E-Musyawarah Desa 🏛️

**E-Musyawarah Desa** adalah platform administrasi digital mutakhir yang dirancang khusus untuk mendukung prinsip transparansi, keteraturan, dan keabsahan dalam musyawarah mufakat di kancah kemasyarakatan desa. Platform ini mendigitalisasi proses dokumentasi, verifikasi, serta formalisasi keputusan rapat desa secara real-time.

Aplikasi ini mengintegrasikan administrasi tata kelola pemerintahan desa dalam satu dasbor terpadu, menjembatani pamong desa, kader posyandu, tokoh masyarakat, hingga warga umum dalam satu alur kerja yang kredibel, aman, dan dilengkapi dengan tanda tangan elektronik basah yang sah.

---

## 🔥 Fitur Utama

### 1. 📅 Registrasi & Manajemen Agenda Musyawarah
* **Daftar Sidang Aktif**: Manajemen rapat yang efisien dengan kemampuan menambahkan dan menghapus agenda musyawarah.
* **Klasifikasi Kategori Terpadu**: Pengkategorian sidang otomatis mulai dari *Pembangunan & Infrastruktur*, *Pemberdayaan & Sosial*, *Anggaran (ADD)*, *Keamanan & Ketertiban*, hingga *Darurat & Regulasi Hukum Desa*.
* **Status Berjalan & Deskripsi Detail**: Menampilkan status sidang secara dinamis, tanggal pelaksanaan, lokasi, serta identitas Pimpinan Sidang dan Notulis.

### 2. ✍️ Formulir Kehadiran Mandiri & Tanda Tangan Digital Basah
* **Tanda Tangan Elektronik Asli**: Warga dan delegasi rapat dapat membubuhkan tanda tangan digital secara langsung menggunakan mouse maupun layar sentuh (*touchscreen*).
* **Validasi Identitas Kependudukan**: Dilengkapi kolom wajib 16-Digit NIK (Nomor Induk Kependudukan) untuk menjaga integritas keabsahan data kehadiran.
* **Isi Warga Instan**: Fitur simulasi cerdas untuk mempopulasi daftar hadir warga secara cepat untuk pemutakhiran demonstrasi sistem.
* **Arsip Kehadiran Terverifikasi**: Menampilkan tanda tangan basah warga yang terenkripsi dan tercatat secara kronologis lengkap dengan penomoran waktu (WIB).

### 3. 📝 Notulensi Digital & Penyusunan Berita Acara
* **Templat Muat Cepat**: Akses instan ke draf berita acara standar untuk percepatan perumusan notulensi berdasarkan bidang (*Infrastruktur*, *Sosial*, *Audit Anggaran*).
* **Sinkronisasi Otomatis**: Setiap perubahan rangkuman umum langsung tersimpan secara aman dalam memori lokal.
* **Bahan Pokok Bahasan**: Menampung butir-butir opini, saran, dan jalannya dialektika musyawarah secara dinamis.
* **Daftar Rencana Tindak Lanjut (*Action Items*)**: Memformulasikan peta mandat kerja beserta penanggung jawab (PIC) dan tenggat waktu (*deadline*) yang jelas.

### 4. 🗳️ Lembar Ketetapan Hukum & Rekapitulasi Suara Desa
* **Dua Aturan Pengambilan Keputusan**: Mendukung pengambilan keputusan berbasis asas *Mufakat Bulat (Aklamasi)* maupun *Voting (Pemungutan Suara)*.
* **Formulasi Suara Real-Time**: Input langsung perolehan suara (Setuju, Tolak, Abstain) dengan verifikasi sinkronisasi jumlah daftar hadir terdaftar.
* **Publikasi Surat Keputusan (SK)**: Penerbitan lembar keputusan hukum resmi lengkap dengan register kode acak unik (*Unique Registry Code*) yang mengikat seluruh delegasi daerah.

---

## 🛠️ Teknologi & Pustaka

Aplikasi ini dibangun menggunakan arsitektur modern berkecepatan tinggi dengan tingkat kestabilan optimal:

* **React 19 & TypeScript**: Basis aplikasi berorientasi komponen dengan tipe data statis (*strictly-typed*) guna menghindari celah galat.
* **Tailwind CSS v4 & @tailwindcss/vite**: Framework gaya utilitas mutakhir untuk performa rendering antarmuka visual yang ultra-cepat.
* **Framer Motion**: Menghasilkan efek animasi transisi tabulator dan pembukaan modal yang elegan dan mulus (*smooth layouts & micro-animations*).
* **Lucide-React**: Set ikon vektor modern dengan kontras tinggi untuk fleksibilitas kontrol visual navigasi.
* **LocalStorage Engine**: Penyimpanan lokal persisten untuk menjaga konsistensi data musyawarah desa agar tidak hilang meskipun browser dimuat ulang.

---

## 🚀 Panduan Pengembangan

### Prasyarat
Pastikan mesin lokal Anda telah terinstalasi:
* [Node.js](https://nodejs.org/) (Sangat direkomendasikan versi LTS 18 atau lebih baru)
* npm atau yarn

### Cara Instalasi & Menjalankan Aplikasi
1. Clone repositori ini atau ekspor file proyek ke lokal Anda.
2. Buka terminal di dalam folder proyek tersebut.
3. Jalankan perintah instalasi dependensi:
   ```bash
   npm install
   ```
4. Putar server pengembangan lokal:
   ```bash
   npm run dev
   ```
5. Buka peramban (browser) Anda dan akses alamat yang tertera pada terminal:
   `http://localhost:3000`

### Perintah Pembangunan Produksi (Build)
Untuk mendapatkan bundel produksi statis yang optimal dan siap dideploy ke server publik:
```bash
npm run build
```
Hasil file akhir akan masuk ke dalam direktori `/dist`.

---

## 🔒 Integritas Data & Validasi Hukum
Aplikasi ini menerapkan standardisasi administrasi e-Government lokal:
1. **Integritas Tanda Tangan**: Goresan tanda tangan digital disimpan dalam format terkompresi beresolusi tinggi dengan filter kontras tajam.
2. **Kriptografi NIK Lokal**: Penanganan NIK dilakukan secara sensitif dan hanya dapat didekripsi serta ditampilkan sebagian untuk menjaga privasi warga (6 karakter pertama).
3. **Sinar Raya E-Gov Standard**: Mengacu pada format tata naskah dinas resmi lingkungan Pemerintah Kabupaten Sinar Raya.
