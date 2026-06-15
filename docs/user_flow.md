# User Flow: Laundrix MVP

Dokumen ini menjelaskan alur kerja (User Flow) untuk peran **Owner** dan **Staf** di dalam sistem Laundrix MVP berdasarkan Product Requirements Document (PRD).

---

## 1. Flow Utama: Staf (Kasir/Operator Harian)

Staf hanya dapat berinteraksi dengan sistem pada ruang lingkup (scope) cabang tempat mereka ditugaskan.

### 1.1. Memulai Shift (Clock In)
1. Staf membuka aplikasi web Laundrix.
2. Staf memasukkan kredensial login (Email/Username dan Password).
3. Sistem memverifikasi kredensial dan mengenali Cabang (Branch) dari Staf tersebut (berdasarkan *Branch Assignment*).
4. Staf masuk ke menu **Absensi**.
5. Staf menekan tombol **Check In**.
6. Sistem menyimpan rekaman absensi dengan detail: Staf, Cabang, Tanggal, dan Waktu Check In.

### 1.2. Dashboard Staf (Setelah Login)
Setelah login berhasil, sistem mengarahkan Staf ke **Dashboard** yang menampilkan ringkasan harian:
* **Total Transaksi Saya** — Jumlah transaksi yang dicatat oleh staf ini hari ini.
* **Total Penjualan Saya** — Nilai total penjualan yang diinput hari ini.
* **Status Absensi** — Menampilkan status: Belum Check In / Sedang Bertugas (Check In jam HH:MM) / Selesai.
* **Stok Menipis** — Peringatan untuk barang inventaris di cabang yang stoknya di bawah batas minimum.

### 1.3. Mencatat Transaksi Penjualan
1. Pelanggan meminta layanan laundry kepada staf.
2. Staf membuka menu **Transaksi Baru**.
3. Staf mencatat layanan yang diminta beserta barang retail tambahan (opsional):
    * **Layanan:** CA (Cuci Aja), CK (Cuci+Kering), atau KA (Kering Aja).
    * **Barang Retail:** Deterjen, Pelembut Pakaian, Kantong Plastik, dll.
4. Sistem otomatis menghitung total tagihan. Pembayaran adalah **100% Cash Only** — tidak ada integrasi payment gateway.
5. Staf menyimpan transaksi.
6. **Otomasi Sistem:**
    * Menyimpan data transaksi ke database, lengkap dengan *Audit Fields* (`Created By`, `Created At`, `Updated At`).
    * Mengurangi stok inventaris cabang secara otomatis untuk setiap barang retail yang terjual.

### 1.4. Mengedit/Menghapus Transaksi (Hanya Hari yang Sama)
1. Staf menyadari ada kesalahan input pada transaksi yang baru saja dibuat.
2. Staf masuk ke menu **Riwayat Transaksi**.
3. Staf memilih transaksi miliknya pada hari ini (*Today*).
4. Staf melakukan Edit atau Hapus transaksi.
5. Sistem mengembalikan stok barang (jika dibatalkan/dihapus) dan mengupdate nilai `Updated At`.

> **Catatan:** Staf hanya dapat melihat dan mengedit transaksi yang mereka buat sendiri. Transaksi hari sebelumnya tidak dapat diubah oleh Staf.

### 1.5. Melaporkan Masalah Mesin
1. Staf atau Pelanggan menemukan mesin yang tidak berfungsi.
2. Staf membuka menu **Lapor Mesin**.
3. Staf memilih Mesin yang bermasalah (dari *dropdown* daftar mesin khusus di cabangnya).
4. Staf memasukkan deskripsi masalah dan secara opsional melampirkan foto.
5. Staf menyimpan laporan. Laporan langsung masuk ke dasbor Owner.

### 1.6. Melihat Riwayat Laporan Mesin Sendiri
1. Staf ingin mengecek apakah mesin yang bermasalah sudah pernah dilaporkan.
2. Staf membuka menu **Lapor Mesin** dan beralih ke tab/halaman **Riwayat Laporan Saya**.
3. Sistem menampilkan daftar semua laporan yang pernah dibuat oleh staf tersebut.
4. Staf dapat melihat detail setiap laporan (Mesin, Deskripsi, Foto, Tanggal Lapor).

> **Catatan:** Staf hanya dapat melihat laporan yang **mereka buat sendiri**. Laporan dari staf lain tidak ditampilkan.

### 1.7. Mengakhiri Shift (Clock Out)
1. Setelah jam kerja berakhir, Staf membuka menu **Absensi**.
2. Staf menekan tombol **Check Out**.
3. Sistem mengupdate *record* absensi yang sama dengan mengisi Waktu Check Out dan `Updated At`.
4. Staf melakukan *Logout*.

---

## 2. Flow Utama: Owner (Manajemen & Pemantauan)

Owner memiliki akses global lintas cabang (Cross-Branch Access).

### 2.1. Memantau Dasbor Real-time
1. Owner membuka aplikasi dan melakukan login.
2. Sistem mengarahkan Owner ke **Dasbor Utama**.
3. Owner dapat memantau data agregat maupun mem-filter per cabang:
    * Total penjualan *real-time*.
    * Status kehadiran staf (*siapa yang sedang Check In*).
    * Notifikasi / Laporan mesin rusak terbaru.

### 2.2. Manajemen Master Data (Cabang & Staf)
1. Owner masuk ke menu **Manajemen Cabang**.
2. Owner menambah Cabang baru beserta daftar mesin (misal: Mesin Cuci 1, Pengering 1) yang beroperasi di sana.
3. Owner masuk ke menu **Manajemen Karyawan**.
4. Owner membuat akun Staf baru dan melakukan *Branch Assignment* (menautkan staf tersebut ke 1 cabang secara spesifik).

### 2.3. Manajemen Inventaris & Restock
1. Owner membeli suplai barang operasional/retail.
2. Owner masuk ke menu **Inventaris**.
3. Owner memilih Cabang tujuan dan mencatat jumlah penambahan stok (*Restock*).
4. Sistem mengupdate stok di cabang tersebut sehingga Staf bisa langsung menggunakannya untuk berjualan. Data di-log dengan *Audit Fields* (`Created By` = Owner).

### 2.4. Audit Transaksi (Kontrol Penuh)
1. Owner melihat adanya kejanggalan pada total penjualan suatu cabang.
2. Owner masuk ke menu **Semua Transaksi**.
3. Owner mengecek daftar transaksi dan melihat detail *Audit Fields* (khususnya kolom `Created By`) untuk mengetahui siapa staf yang melakukan input.
4. Jika diperlukan pembetulan paksa, Owner melakukan Edit atau Hapus pada transaksi tersebut, meskipun transaksi itu dibuat pada hari-hari sebelumnya atau di cabang mana pun.

### 2.5. Laporan Penjualan (Reporting)
Laporan adalah salah satu alasan utama aplikasi ini dibuat — menggantikan laporan WhatsApp manual yang tidak konsisten.

1. Owner masuk ke menu **Laporan**.
2. Owner memilih rentang waktu yang ingin dilihat:
    * **Harian** — Laporan total penjualan hari ini atau tanggal tertentu.
    * **Mingguan** — Laporan agregat 7 hari terakhir atau minggu tertentu.
    * **Bulanan** — Laporan agregat per bulan.
3. Owner dapat mem-filter laporan berdasarkan **Cabang** (satu cabang spesifik atau semua cabang).
4. Laporan menampilkan data berikut:
    * Total penjualan per layanan (CA, CK, KA).
    * Total penjualan barang retail (Deterjen, Pelembut, Kantong Plastik).
    * Staf yang paling banyak mencatat transaksi.
5. *(Fitur masa depan, di luar MVP):* Ekspor laporan ke format PDF atau CSV.

