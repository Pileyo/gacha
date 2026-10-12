# Software Requirements Specification (SRS)
## Astral Gacha - Simulator Gacha Fan-Made

---

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen ini menjelaskan kebutuhan fungsional dan non-fungsional untuk website Astral Gacha, simulator gacha fan-made bertema fantasi. Website dibuat untuk memenuhi tugas UTS Pemrograman Web semester 3.

### 1.2 Ruang Lingkup
Astral Gacha adalah website interaktif yang memungkinkan pengguna melakukan simulasi pull gacha dengan sistem rarity (3★, 4★, 5★) dan pity counter. Website terdiri dari 2 halaman: Beranda (simulator) dan Tentang (informasi + form kontak).

### 1.3 Target Pengguna
Mahasiswa dan dosen mata kuliah Pemrograman Web, serta siapa saja yang ingin mencoba simulator gacha sederhana berbasis web.

---

## 2. Deskripsi Umum

### 2.1 Perspektif Produk
Website standalone tanpa backend, berjalan sepenuhnya di browser client menggunakan HTML, CSS, dan JavaScript murni. Data karakter disimpan di file JSON lokal.

### 2.2 Fungsi Produk
- Simulasi pull gacha x1 dan x10
- Sistem pity counter (hard pity 80)
- Tampilan kartu hasil pull dengan efek visual sesuai rarity
- Riwayat pull yang dapat direset
- Form kontak dengan validasi client-side
- Informasi rate dan penjelasan sistem pity

### 2.3 Karakteristik Pengguna
Pengguna umum yang familiar dengan browser web modern (Chrome, Firefox, Edge, Safari). Tidak memerlukan instalasi software tambahan.

### 2.4 Batasan
- Tidak ada autentikasi pengguna
- Tidak ada penyimpanan data (localStorage tidak digunakan)
- Tidak ada backend/database
- Tidak ada transaksi uang atau item berharga
- Form kontak tidak mengirim email ke server (simulasi saja)

---

## 3. Kebutuhan Fungsional

### FR-01: Halaman Beranda (Simulator)
**Deskripsi**: Halaman utama yang menampilkan banner, tombol pull, counter pity, area hasil, dan riwayat pull.

**Input**: 
- Klik tombol "Tarik x1" atau "Tarik x10"
- Klik tombol "Reset"

**Proses**: 
- Sistem membaca data karakter dari `data/data.json`
- Sistem melakukan undian dengan algoritma random sesuai rate
- Sistem menambah counter pity setiap pull
- Sistem memberikan 5★ jika counter mencapai 80
- Sistem reset counter jika dapat 5★

**Output**: 
- Kartu karakter muncul di area hasil dengan animasi bertahap
- Counter pity diperbarui
- Entri baru ditambahkan ke riwayat pull
- Tombol disabled sementara saat animasi berjalan

### FR-02: Sistem Pity
**Deskripsi**: Counter yang menjamin karakter 5★ setelah 80 pull tanpa 5★.

**Input**: Setiap pull

**Proses**: 
- Counter bertambah 1
- Jika counter >= 80, pull berikutnya paksa 5★
- Jika dapat 5★ (pity atau random), counter reset ke 0

**Output**: Angka counter ditampilkan di halaman

### FR-03: Halaman Tentang
**Deskripsi**: Halaman informasi yang berisi penjelasan proyek, tabel rate, penjelasan pity, disclaimer, dan form kontak.

**Input**: Navigasi ke halaman via menu

**Proses**: Render halaman statis dengan tabel dan form

**Output**: Halaman tentang dengan 5 section

### FR-04: Form Kontak dengan Validasi
**Deskripsi**: Form untuk mengirim pesan (simulasi) dengan validasi input.

**Input**: 
- Nama (text)
- Email (email)
- Pesan (textarea)
- Submit button

**Proses**: 
- Validasi nama tidak kosong
- Validasi email tidak kosong dan format benar (ada @ dan .)
- Validasi pesan tidak kosong
- Tampilkan pesan error spesifik untuk setiap field yang tidak valid
- Jika semua valid, tampilkan pesan sukses dan reset form

**Output**: 
- Pesan error di bawah field yang invalid
- Pesan sukses jika form valid
- Form kosong kembali setelah sukses

### FR-05: Navigasi Antar Halaman
**Deskripsi**: Menu navigasi untuk berpindah antara Beranda dan Tentang.

**Input**: Klik link menu

**Proses**: Browser memuat halaman baru

**Output**: Halaman berubah, link aktif diberi class `aktif`

### FR-06: Tombol Reset
**Deskripsi**: Tombol untuk mengosongkan hasil pull, riwayat, dan reset counter pity.

**Input**: Klik tombol "Reset"

**Proses**: 
- Kosongkan `#hasil`
- Kosongkan `#riwayat`
- Set `pityCounter = 0`
- Update tampilan counter

**Output**: Area hasil dan riwayat kosong, counter pity kembali ke 0

### FR-07: Load Data dari JSON
**Deskripsi**: Sistem memuat daftar karakter dan rate dari file `data/data.json` via AJAX.

**Input**: Halaman load

**Proses**: 
- Fetch `data/data.json`
- Parse JSON
- Simpan ke variabel global

**Output**: 
- Data karakter tersedia untuk pull
- Alert error jika fetch gagal

---

## 4. Kebutuhan Non-Fungsional

### NFR-01: Usability
- Interface intuitif dengan instruksi jelas
- Animasi smooth dan tidak mengganggu
- Contrast tinggi untuk readability
- Responsive di desktop dan mobile (min. 320px width)

### NFR-02: Performance
- Halaman load < 2 detik di koneksi standar
- Animasi berjalan 60fps di browser modern
- Tidak ada lag saat pull x10

### NFR-03: Kompatibilitas
- Browser modern: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Tidak support Internet Explorer
- Responsif di layar 320px - 1920px

### NFR-04: Maintainability
- Kode terstruktur dengan komentar bahasa Indonesia
- Nama variabel dan fungsi deskriptif
- CSS dengan variables untuk tema warna
- Data karakter terpisah di JSON (mudah diubah)

### NFR-05: Validasi Standar
- HTML lolos W3C Validator
- CSS lolos W3C CSS Validator
- JSON valid format

### NFR-06: Accessibility
- Semantic HTML (header, nav, main, section, footer)
- Heading hierarki benar (h1 → h2)
- `lang="id"` di `<html>`
- `aria-current="page"` di link aktif
- Label jelas di form input

---

## 5. Antarmuka

### 5.1 Antarmuka Pengguna
- **Header**: Judul dengan gradient text, deskripsi singkat
- **Navigasi**: Horizontal menu dengan hover effect
- **Banner Pull**: Area besar dengan border gold, counter pity besar dan jelas
- **Tombol Pull**: Dua tombol (x1 gold, x10 purple) dengan efek tekan
- **Area Hasil**: Grid responsif dengan kartu karakter, glow sesuai rarity
- **Riwayat Pull**: List scrollable max-height 200px
- **Form Kontak**: Input dengan border, placeholder, pesan error merah, pesan sukses hijau
- **Footer**: Teks kecil dengan disclaimer

### 5.2 Antarmuka Hardware
- Mouse/touchpad untuk klik tombol dan link
- Keyboard untuk input form
- Layar minimal 320px width

### 5.3 Antarmuka Software
- Browser modern dengan JavaScript enabled
- Local server untuk development (AJAX requirement)

---

## 6. Diagram Use Case (Deskripsi Tekstual)

**Aktor**: Pengguna

**Use Case 1: Melakukan Pull Gacha**
1. Pengguna membuka halaman Beranda
2. Sistem load data karakter dari JSON
3. Pengguna klik tombol "Tarik x1" atau "Tarik x10"
4. Sistem disable tombol sementara
5. Sistem tampilkan animasi "Memanggil bintang..."
6. Sistem lakukan undian sesuai jumlah
7. Sistem tampilkan kartu hasil dengan animasi bertahap
8. Sistem update counter pity dan riwayat
9. Sistem enable tombol kembali

**Use Case 2: Mengisi Form Kontak**
1. Pengguna membuka halaman Tentang
2. Pengguna scroll ke section Form Kontak
3. Pengguna isi field Nama, Email, Pesan
4. Pengguna klik tombol "Kirim Pesan"
5. Sistem validasi input
6. Jika invalid: sistem tampilkan pesan error
7. Jika valid: sistem tampilkan pesan sukses dan reset form

**Use Case 3: Reset Simulator**
1. Pengguna klik tombol "Reset"
2. Sistem kosongkan area hasil dan riwayat
3. Sistem reset counter pity ke 0

---

## 7. Kesimpulan

Dokumen SRS ini menjelaskan kebutuhan lengkap untuk Astral Gacha, simulator gacha fan-made yang memenuhi kriteria UTS Pemrograman Web. Sistem dirancang sederhana, mudah dipahami, dan dapat didemonstrasikan tanpa server backend.
