// script.js - Simulator Gacha (UTS Pemrograman Web)
// Variabel data game, diisi dari data.json
let daftarKarakter = [];
let pityCounter = 0;
let batasPity = 80;
let rate5 = 0.8;
let rate4 = 12;

// Ambil daftar karakter dan rate dari data.json (AJAX)
function ambilData() {
  fetch("data/data.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Gagal memuat data");
      return res.json();
    })
    .then(function (data) {
      daftarKarakter = data.karakter;
      rate5 = data.rates.bintang5;
      rate4 = data.rates.bintang4;
      batasPity = data.rates.pity;
    })
    .catch(function (err) {
      console.error(err);
      alert("Gagal memuat data. Jalankan lewat local server.");
    });
}

// Ambil satu karakter acak sesuai rarity
function ambilKarakterAcak(rarity) {
  let kandidat = [];
  for (let i = 0; i < daftarKarakter.length; i++) {
    if (daftarKarakter[i].rarity === rarity) kandidat.push(daftarKarakter[i]);
  }
  return kandidat[Math.floor(Math.random() * kandidat.length)];
}

// Buat teks bintang, contoh rarity 3 jadi "★★★"
function buatBintang(rarity) {
  let b = "";
  for (let i = 0; i < rarity; i++) b += "★";
  return b;
}

// Satu kali undian: cek pity lalu bandingkan angka acak
function undianSatuKartu() {
  pityCounter++;
  let angka = Math.random() * 100;
  let rarity = 3;
  if (pityCounter >= batasPity || angka < rate5) rarity = 5;
  else if (angka < rate5 + rate4) rarity = 4;
  if (rarity === 5) pityCounter = 0; // reset saat dapat 5 bintang
  tampilkanPity();
  return ambilKarakterAcak(rarity);
}

// Tampilkan angka pity di halaman
function tampilkanPity() {
  document.getElementById("pity-count").textContent = pityCounter;
}

// Jalankan pull x1 atau x10 saat tombol diklik
function lakukanPull(jumlah) {
  if (daftarKarakter.length === 0) {
    alert("Data belum termuat. Muat ulang halaman.");
    return;
  }
  let area = document.getElementById("hasil");
  let t1 = document.getElementById("tarik-x1");
  let t10 = document.getElementById("tarik-x10");
  t1.disabled = true;
  t10.disabled = true;
  area.innerHTML = '<p class="memuat">Memanggil bintang...</p>';
  // Tunggu 1 detik sebelum hasil muncul
  setTimeout(function () {
    area.innerHTML = "";
    for (let i = 0; i < jumlah; i++) tampilkanKartu(undianSatuKartu(), area, i);
  }, 1000);
  // Aktifkan tombol lagi setelah kartu terakhir muncul
  setTimeout(function () { t1.disabled = false; t10.disabled = false; }, 1000 + jumlah * 150 + 600);
}

// Buat kartu hasil dengan class rarity dan animasi
function tampilkanKartu(karakter, area, urutan) {
  let kartu = document.createElement("div");
  kartu.className = "kartu rarity-" + karakter.rarity;
  kartu.style.animationDelay = urutan * 150 + "ms"; // muncul bertahap
  kartu.innerHTML = '<div class="bintang">' + buatBintang(karakter.rarity) + "</div>"
    + '<div class="nama">' + karakter.nama + "</div>"
    + '<div class="elemen">' + karakter.elemen + "</div>";
  area.appendChild(kartu);
  tambahRiwayat(karakter);
}

// Tambah satu baris ke riwayat pull
function tambahRiwayat(karakter) {
  let daftar = document.getElementById("riwayat");
  let baris = document.createElement("li");
  baris.textContent = buatBintang(karakter.rarity) + " " + karakter.nama;
  daftar.appendChild(baris);
}

// Reset hasil, riwayat, dan pity
function resetSemua() {
  document.getElementById("hasil").innerHTML = "";
  document.getElementById("riwayat").innerHTML = "";
  pityCounter = 0;
  tampilkanPity();
}

// Validasi form kontak di halaman Tentang
function validasiForm() {
  let nama = document.getElementById("nama").value.trim();
  let email = document.getElementById("email").value.trim();
  let pesan = document.getElementById("pesan").value.trim();
  let eNama = document.getElementById("error-nama");
  let eEmail = document.getElementById("error-email");
  let ePesan = document.getElementById("error-pesan");
  let ok = document.getElementById("pesan-sukses");
  eNama.textContent = "";
  eEmail.textContent = "";
  ePesan.textContent = "";
  ok.textContent = "";
  if (nama === "") eNama.textContent = "Nama wajib diisi.";
  if (email === "") eEmail.textContent = "Email wajib diisi.";
  else if (!email.includes("@") || !email.includes(".")) eEmail.textContent = "Email tidak valid.";
  if (pesan === "") ePesan.textContent = "Pesan wajib diisi.";
  if (eNama.textContent === "" && eEmail.textContent === "" && ePesan.textContent === "") {
    ok.textContent = "Pesan terkirim (simulasi).";
    document.getElementById("kontak-form").reset();
  }
}

// Pasang event saat halaman siap (script di akhir body)
ambilData();
let tombolX1 = document.getElementById("tarik-x1");
let tombolX10 = document.getElementById("tarik-x10");
let tombolReset = document.getElementById("reset");
if (tombolX1) tombolX1.addEventListener("click", function () { lakukanPull(1); });
if (tombolX10) tombolX10.addEventListener("click", function () { lakukanPull(10); });
if (tombolReset) tombolReset.addEventListener("click", resetSemua);
let formKontak = document.getElementById("kontak-form");
if (formKontak) formKontak.addEventListener("submit", function (e) { e.preventDefault(); validasiForm(); });
