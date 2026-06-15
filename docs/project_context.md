# Laundrix - Konteks Proyek

## Gambaran Umum

Laundrix adalah sistem manajemen berbasis web untuk bisnis laundry dengan banyak cabang.

Tujuannya adalah untuk menggantikan pembukuan manual, pencatatan stok manual, dan pelaporan manual melalui WhatsApp dengan sistem terpusat secara real-time.

Proyek ini dirancang khusus untuk laundry yang beroperasi menggunakan koin laundry fisik.

---

## Proses Bisnis Saat Ini

Saat ini, setiap cabang beroperasi secara manual.

Staf mencatat transaksi dalam buku catatan fisik.

Untuk setiap transaksi pelanggan, staf secara manual menulis:

* Waktu
* Jenis layanan
* Kuantitas

Layanan yang tersedia:

* CA (Cuci Aja)
* CK (Cuci + Kering)
* KA (Kering Aja)

Staf juga secara manual mencatat penjualan:

* Deterjen
* Pelembut pakaian
* Kantong plastik

Pada akhir hari, staf menghitung total secara manual dan mengirim laporan kepada Owner melalui WhatsApp.

---

## Masalah

Proses saat ini menyebabkan beberapa masalah:

1. Perhitungan manual rentan terhadap kesalahan.

2. Owner tidak dapat memantau cabang secara real-time.

3. Pelacakan stok sulit dilakukan.

4. Data historis sulit dicari.

5. Pelaporan tidak konsisten di seluruh cabang.

---

## Solusi yang Ditargetkan

Buat aplikasi web terpusat di mana:

* Staf mencatat transaksi secara digital.

* Inventaris diperbarui secara otomatis.

* Kehadiran dilacak secara digital.

* Owner dapat memantau semua cabang secara real-time.

* Laporan dihasilkan secara otomatis.

---

## Struktur Bisnis

Bisnis memiliki banyak cabang.

Setiap cabang memiliki banyak staf.

Seorang anggota staf hanya tergabung dalam satu cabang.

Owner dapat mengakses semua cabang.

---

## Peran

### OWNER

Dapat mengakses:

* Semua cabang
* Laporan
* Karyawan
* Inventaris
* Transaksi
* Kehadiran

### STAF

Dapat mengakses:

* Hanya cabang sendiri
* Membuat transaksi
* Melihat riwayat transaksi
* Melihat inventaris
* Absensi masuk/keluar
* Melaporkan status mesin rusak kepada Owner

---

## Catatan Penting

Ini BUKAN sistem manajemen laundry tradisional.

Pelanggan tidak meninggalkan pakaian untuk diproses.

Pelanggan membeli koin laundry fisik dan menggunakan mesin layanan mandiri.

Operasi bisnis utama adalah pencatatan transaksi dan manajemen cabang.

Tidak diperlukan:

* Akun pelanggan
* Pelacakan status laundry
* Pengambilan dan pengiriman
* Manajemen alur kerja laundry
* Integrasi payment gateway (Metode pembayaran HANYA Tunai / Cash Only)

untuk versi MVP.

---

## Tujuan MVP

Mengganti 100% proses pembukuan berbasis kertas yang ada dengan alur kerja digital yang sederhana.