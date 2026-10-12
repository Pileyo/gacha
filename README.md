# Astral Gacha - Simulator Gacha Fan-Made

Website simulator gacha bergaya fantasi untuk UTS Pemrograman Web.

## Identitas

- **Nama**: [NAMA]
- **NIM**: [NIM]
- **GitHub Username**: [USERNAME]
- **Nama Repository**: [NAMA-REPO]
- **Link GitHub Pages**: `https://[USERNAME].github.io/[NAMA-REPO]/`

## Deskripsi

Astral Gacha adalah simulator gacha fan-made bertema fantasi gelap. Pengguna dapat menarik kartu karakter dengan dua opsi: Tarik x1 atau Tarik x10. Setiap kartu memiliki rarity 3★, 4★, atau 5★ yang ditentukan secara acak berdasarkan rate dan sistem pity.

Website ini dibuat menggunakan HTML, CSS, dan JavaScript murni tanpa framework, library, atau backend sesuai ketentuan tugas UTS Pemrograman Web.

## Cara Menjalankan Lokal

Karena website menggunakan `fetch()` untuk memuat `data/data.json`, diperlukan local server untuk menghindari CORS error.

### Menggunakan Live Server (VS Code)
1. Install extension "Live Server" di VS Code
2. Klik kanan `index.html` → "Open with Live Server"
3. Browser otomatis membuka website

### Menggunakan Python
```bash
# Python 3
python -m http.server 8000

# Buka browser ke http://localhost:8000
```

### Menggunakan Node.js
```bash
npx http-server

# Buka browser ke http://localhost:8080
```

## Struktur Proyek

```
/
├── index.html        # Halaman beranda (simulator)
├── tentang.html      # Halaman tentang (info, form kontak)
├── css/
│   └── style.css     # Semua styling (308 baris)
├── js/
│   └── script.js     # Semua interaksi JS (150 baris)
├── data/
│   └── data.json     # Daftar karakter dan rate
├── README.md         # Dokumentasi ini
└── SRS.md            # Software Requirements Specification
```

## Penjelasan Struktur HTML

### index.html (Beranda)
- `<header>`: Judul website dan deskripsi singkat
- `<nav>`: Menu navigasi Beranda dan Tentang, halaman aktif ditandai class `aktif`
- `<main>`: Konten utama dengan 3 section:
  - Banner pull dengan tombol Tarik x1 dan x10, counter pity
  - Area hasil pull (`#hasil`) untuk menampilkan kartu
  - Daftar riwayat pull (`#riwayat`) dan tombol reset
- `<footer>`: Disclaimer dan copyright
- `<script>`: Load script.js di akhir body

### tentang.html (Tentang)
- `<header>`: Judul halaman tentang
- `<nav>`: Menu navigasi (sama seperti index.html)
- `<main>`: Konten dengan 5 section:
  - Tentang Proyek: penjelasan singkat
  - Tabel Rate: tabel 3 kolom (Rarity, Peluang, Keterangan)
  - Penjelasan Pity: cara kerja sistem pity
  - Disclaimer: pernyataan fan-made
  - Form Kontak: input nama, email, pesan dengan validasi
- `<footer>`: Disclaimer dan copyright
- `<script>`: Load script.js di akhir body

## Penjelasan Teknik CSS

File `css/style.css` (308 baris) menerapkan:

### Tema Dark Fantasi
- CSS variables di `:root` untuk palet warna (--bg1, --bg2, --ungu, --biru, --emas, --teks, --kartu)
- Background gradient gelap (`linear-gradient` dari #0d0b1e ke #1a1440)
- Header dengan radial gradient untuk efek cahaya

### Glow per Rarity
- `.rarity-3`: border cyan, box-shadow 8px cyan (0 0 8px rgba(56, 189, 248, 0.4))
- `.rarity-4`: border purple, box-shadow 18px purple (0 0 18px rgba(168, 85, 247, 0.8))
- `.rarity-5`: border gold, box-shadow 28px gold (0 0 28px rgba(251, 191, 36, 0.9)) + animasi kilau

### Animasi
- `@keyframes muncul`: kartu muncul dari bawah (translateY 20px → 0, opacity 0 → 1, 0.5s ease)
- `@keyframes kilau`: kartu 5★ berkilau (box-shadow pulse 18px → 36px, infinite alternate)
- `@keyframes denyut`: animasi teks saat pull (scale 0.9 → 1.05 → 1, opacity 0.2 → 1)
- Hover kartu: `translateY(-6px) scale(1.03)` dengan transition 0.3s
- Tombol: hover dengan glow (box-shadow 20px), active dengan scale(0.94) untuk efek tekan

### Layout Responsif
- Flexbox untuk nav, tombol-grup
- Grid untuk `.hasil` (auto-fill, minmax(140px, 1fr), gap 1rem)
- Media query @media (max-width: 600px): grid 2 kolom, tombol full-width, font lebih kecil

## Penjelasan 5 Interaksi JavaScript

File `js/script.js` (150 baris) memuat 5 interaksi wajib:

### 1. Event Handling
**Lokasi**: Baris 145-155 (akhir file)

Event listener dipasang untuk:
- Tombol "Tarik x1" → memanggil `lakukanPull(1)`
- Tombol "Tarik x10" → memanggil `lakukanPull(10)`
- Tombol "Reset" → memanggil `resetSemua()`
- Form kontak → `event.preventDefault()` + `validasiForm()`

**Cara kerja**: Setiap tombol/form mendapat event listener via `addEventListener()`. Ketika di-klik/submit, fungsi callback dijalankan.

### 2. DOM Manipulation
**Lokasi**: Baris 89-108 (`tampilkanKartu` dan `tambahRiwayat`)

Membuat elemen HTML baru secara dinamis:
- `createElement("div")` untuk kartu karakter
- `createElement("li")` untuk entri riwayat
- `appendChild()` untuk menambahkan ke container
- `innerHTML` untuk mengisi konten (bintang, nama, elemen)

**Cara kerja**: Setiap pull menghasilkan data karakter, lalu JS membuat elemen `<div class="kartu">` dengan struktur HTML di dalamnya dan menambahkan ke `#hasil` dan `#riwayat`.

### 3. Style & Animation
**Lokasi**: Baris 93-95 (`tampilkanKartu`)

Menambahkan class CSS dan inline style via JS:
- `className = "kartu rarity-" + karakter.rarity` → menambahkan class dinamis (rarity-3, rarity-4, rarity-5)
- `style.animationDelay = urutan * 150 + "ms"` → delay animasi bertahap antar kartu

**Cara kerja**: Class rarity memicu glow dan warna sesuai CSS. Delay animasi membuat kartu x10 muncul satu per satu dengan jarak 150ms.

### 4. Form Validation
**Lokasi**: Baris 118-143 (`validasiForm`)

Validasi form kontak di halaman Tentang:
- Cek nama: tidak boleh kosong
- Cek email: tidak boleh kosong, harus ada "@" dan "."
- Cek pesan: tidak boleh kosong
- Tampilkan pesan error spesifik di `<p class="error">`
- Jika valid: tampilkan pesan sukses dan reset form

**Cara kerja**: Fungsi membaca value input dengan `.value.trim()`, lalu cek kondisi. Pesan error ditulis ke elemen error via `.textContent`. Tidak ada pengiriman ke server (simulasi saja).

### 5. AJAX (Fetch API)
**Lokasi**: Baris 10-23 (`ambilData`)

Memuat data karakter dari `data/data.json`:
- `fetch("data/data.json")` → request AJAX
- `.then(response => response.json())` → parsing JSON
- `.then(data => { ... })` → simpan ke variabel global `daftarKarakter`, `rate5`, `rate4`
- `.catch(error => { ... })` → tangani error dengan alert

**Cara kerja**: Saat halaman load, `ambilData()` dipanggil. Fetch berjalan asynchronous dengan `.then()` chain. Jika berhasil, data karakter disimpan untuk dipakai fungsi pull. Jika gagal (CORS atau file tidak ada), muncul alert.

## Logika Pull dan Pity

- **Counter pity**: bertambah 1 setiap pull
- **Hard pity 80**: jika counter = 80, pull berikutnya dijamin 5★
- **Rate normal**: 
  - 5★: 0.8% (angka random < 0.8)
  - 4★: 12% (angka random < 12.8)
  - 3★: sisanya
- **Reset counter**: setiap dapat 5★ (pity atau keberuntungan), counter kembali ke 0
- **Pull x10**: memanggil undian 10 kali, kartu muncul bertahap dengan delay 150ms antar kartu

## Catatan Penting

- Tidak ada gambar, logo, atau aset resmi dari game apa pun yang digunakan
- Semua visual dibuat murni dengan CSS (gradient, glow, bintang ★, emoji)
- Nama karakter di `data/data.json` bersifat fiktif dan dapat diganti
- Website ini fan-made dan tidak berafiliasi dengan Kuro Games
- Tidak ada framework, library, backend, atau localStorage sesuai ketentuan tugas

## Validasi

- HTML: Lolos validator W3C (https://validator.w3.org/)
- CSS: Lolos validator W3C (https://jigsaw.w3.org/css-validator/)
- JSON: Valid format (dapat dicek di jsonlint.com)

## Hosting GitHub Pages

1. Push semua file ke repository GitHub
2. Buka Settings repository → Pages
3. Pilih branch `main`, folder `/ (root)`
4. Klik Save
5. Tunggu beberapa menit, website live di `https://[USERNAME].github.io/[NAMA-REPO]/`
