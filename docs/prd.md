# Product Requirements Document (PRD): Laundrix MVP

## 1. Gambaran Umum
Laundrix adalah sistem manajemen berbasis web terpusat untuk bisnis laundry mandiri (self-service) dengan banyak cabang. Proyek MVP ini bertujuan untuk sepenuhnya menggantikan proses pencatatan manual (buku tulis dan laporan WhatsApp) dengan alur kerja digital yang *real-time* dan *lean*. Sistem dirancang khusus untuk operasional laundry yang menggunakan koin fisik tanpa memerlukan pengelolaan status alur kerja cucian tradisional.

## 2. Tujuan MVP
* Mengganti 100% proses pembukuan berbasis kertas yang ada dengan sistem digital.
* Menyediakan pemantauan dan pelaporan *real-time* untuk Owner di seluruh cabang.
* Menjaga fungsionalitas seminimal mungkin dengan memberlakukan *Scope Freeze* (Pembekuan Lingkup) hanya pada modul operasional inti.

## 3. Modul Sistem (Scope Freeze)
Hanya modul-modul berikut yang termasuk dalam cakupan MVP:
1. Otentikasi
2. Manajemen Cabang
3. Manajemen Karyawan
4. Pencatatan Transaksi
5. Manajemen Inventaris
6. Pelacakan Kehadiran
7. Pelaporan Masalah Mesin
8. Dasbor Pelaporan

## 4. Peran dan Hak Akses (User Roles)

**Aturan Penugasan Cabang (Branch Assignment):**
* Setiap staf hanya terdaftar pada **tepat satu cabang** (*A staff belongs to exactly one branch*).
* Owner memiliki akses ke **seluruh cabang** (*An owner can access all branches*).
* Staf hanya dapat mengakses data yang terkait dengan cabang tempat mereka ditugaskan (*Staff can only access data belonging to their assigned branch*). Aturan ini krusial untuk implementasi RBAC dan keamanan database.

### 4.1. OWNER
Memiliki kontrol komprehensif ke seluruh cabang.
* **Manajemen:** Mengelola data Cabang dan Karyawan.
* **Transaksi:** Dapat melihat, mengedit, dan menghapus *semua* transaksi di cabang mana pun, kapan pun.
* **Inventaris:** Mengelola master data inventaris dan SATU-SATUNYA pihak yang diizinkan mencatat pengisian ulang (*restock*) barang.
* **Pelaporan:** Mengakses dasbor agregat untuk semua aktivitas operasional dan laporan kendala mesin.

### 4.2. STAFF
Hanya memiliki akses operasional harian pada *cabang tempat staf tersebut ditugaskan*.
* **Absensi:** Melakukan *clock-in* dan *clock-out*.
* **Transaksi:** Mencatat transaksi penjualan (Layanan dan Barang retail). Pembayaran adalah **100% Cash Only**.
    * *Edit/Delete:* Staf HANYA dapat mengedit atau menghapus transaksi yang mereka buat sendiri **pada hari yang sama**.
* **Inventaris:** Hanya dapat melihat jumlah stok yang tersedia.
* **Laporan Mesin:** Membuat dan mengirimkan laporan jika terdapat mesin yang bermasalah di cabangnya.

## 5. Kebutuhan Fungsional (Functional Requirements)

### 5.1. Pencatatan Transaksi
* **Penjualan Layanan:** Sistem menyediakan opsi pencatatan layanan berikut:
    * CA (Cuci Aja)
    * CK (Cuci + Kering)
    * KA (Kering Aja)
* **Penjualan Barang:** Sistem menyediakan opsi penjualan tambahan seperti Deterjen, Pelembut Pakaian, dan Kantong Plastik.
* **Otomasi Inventaris:** Setiap kali barang retail terjual, sistem otomatis memotong stok di cabang tersebut.

### 5.2. Pelaporan Masalah Mesin
* Staf dapat membuat laporan dengan detail:
    * Nama / ID Mesin (dipilih dari daftar mesin di cabang tersebut)
    * Deskripsi masalah
    * Foto (Opsional)
* Laporan langsung dapat dilihat oleh Owner pada dasbor.

### 5.3. Manajemen Inventaris
* Owner yang mengontrol pemasukan stok barang (Restock).
* Staf menggunakan data stok tersebut hanya untuk penjualan dan pengecekan fisik ringan (melihat sisa stok pada sistem).

### 5.4. Absensi (Kehadiran)
* Staf dapat melakukan Check In (Masuk Shift).
* Staf dapat melakukan Check Out (Keluar Shift).
* Sistem secara otomatis menyimpan data historis kehadiran berikut:
    * Staf
    * Cabang
    * Tanggal
    * Waktu Check In
    * Waktu Check Out

### 5.5. Jejak Rekam (Audit Fields)
* Setiap *record* data di dalam sistem harus secara wajib menyimpan informasi berikut:
    * `Created By` (Siapa pembuat/penginput data)
    * `Created At` (Kapan data dibuat)
    * `Updated At` (Kapan data terakhir diubah)
* Hal ini mutlak diperlukan agar Owner selalu dapat menelusuri secara pasti "Siapa yang menginput transaksi ini?".

## 6. Di Luar Cakupan MVP (Out of Scope)
Sesuai dengan instruksi *Scope Freeze*, fitur-fitur di bawah ini secara eksplisit **TIDAK DIBANGUN** pada fase MVP:
* Pelacakan inventaris "Koin Fisik". Koin hanya dianggap sebagai alat operasional di luar sistem.
* Rekonsiliasi shift, penyeimbangan laci kas (*cash drawer balancing*), dan alur tutup shift kasir.
* Sistem akun pelanggan atau program loyalitas.
* Manajemen status alur kerja laundry pelanggan (seperti antrean, cucian selesai, dsb).
* Alur kerja (*workflow*) perbaikan/pemeliharaan atau tiket teknisi (hanya sebatas lapor rusak).
* Integrasi *Payment Gateway* / Non-Tunai.
* Layanan antar-jemput pakaian.
