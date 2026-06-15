# RBAC (Role-Based Access Control): Laundrix MVP

Dokumen ini mendefinisikan seluruh izin sistem berdasarkan peran pengguna. Dibuat berdasarkan PRD.md, USER_FLOW.md, dan PROJECT_CONTEXT.md. Tidak ada izin di luar yang didokumentasikan di sini yang boleh diasumsikan atau diimplementasikan.

---

## 1. Gambaran Umum

Sistem Laundrix MVP hanya memiliki **dua peran**. Tidak ada peran tambahan (misalnya Super Admin atau Manager) dalam lingkup MVP.

---

## 2. Peran

### OWNER (Pemilik)

Pengguna dengan akses komprehensif ke seluruh sistem tanpa batasan cabang. Owner bertanggung jawab atas pengelolaan master data bisnis, pemantauan operasional lintas cabang secara *real-time*, serta pengambilan keputusan berbasis laporan. Owner adalah satu-satunya peran yang berwenang melakukan restock inventaris dan mengelola data karyawan maupun cabang.

### STAFF (Staf)

Pengguna operasional harian yang terikat pada **tepat satu cabang**. Staf bertanggung jawab mencatat transaksi penjualan harian, melakukan absensi, dan melaporkan kendala mesin. Staf **tidak dapat** mengakses data cabang lain maupun data karyawan lain.

---

## 3. Matriks Izin Sumber Daya

### 3.1. Cabang (Branch)

| Izin | Owner | Staf |
|---|:---:|:---:|
| Lihat Semua Cabang | ✅ | ❌ |
| Lihat Cabang Sendiri (konteks) | ✅ | ✅ |
| Buat Cabang | ✅ | ❌ |
| Perbarui Cabang | ✅ | ❌ |
| Hapus Cabang | ✅ | ❌ |

> **Catatan:** Staf tidak mengakses modul manajemen Cabang. Sistem secara otomatis menetapkan konteks cabang saat Staf login.

---

### 3.2. Karyawan / Manajemen Staf (Employee)

| Izin | Owner | Staf |
|---|:---:|:---:|
| Lihat Semua Karyawan (semua cabang) | ✅ | ❌ |
| Lihat Profil Sendiri | ✅ | ✅ |
| Buat Akun Karyawan Baru | ✅ | ❌ |
| Perbarui Data Karyawan | ✅ | ❌ |
| Hapus / Nonaktifkan Karyawan | ✅ | ❌ |
| Menetapkan Branch Assignment | ✅ | ❌ |

> **Aturan:** Staf hanya dapat melihat profil dirinya sendiri. Staf tidak dapat melihat daftar karyawan lain, termasuk rekan satu cabang.

---

### 3.3. Transaksi

| Izin | Owner | Staf |
|---|:---:|:---:|
| Lihat Semua Transaksi (semua cabang) | ✅ | ❌ |
| Lihat Transaksi Milik Sendiri | ❌ | ✅ |
| Buat Transaksi | ✅ | ✅ |
| Perbarui Transaksi Sendiri (hari yang sama) | ✅ | ✅ |
| Perbarui Transaksi Staf Lain / Hari Sebelumnya | ✅ | ❌ |
| Hapus Transaksi Sendiri (hari yang sama) | ✅ | ✅ |
| Hapus Transaksi Staf Lain / Hari Sebelumnya | ✅ | ❌ |

> **Aturan Visibilitas Staf:** Staf **hanya dapat melihat transaksi yang mereka buat sendiri** (`created_by = dirinya sendiri`). Staf tidak dapat melihat transaksi yang dibuat oleh staf lain, meskipun berada di cabang yang sama.

> **Aturan Edit/Hapus Staf:** Staf hanya dapat mengedit atau menghapus transaksi yang `created_by = dirinya sendiri` **DAN** `created_at` berada pada tanggal hari ini (same calendar day). Kedua kondisi harus terpenuhi secara bersamaan.

---

### 3.4. Inventaris (Inventory Items)

| Izin | Owner | Staf |
|---|:---:|:---:|
| Lihat Inventaris Semua Cabang | ✅ | ❌ |
| Lihat Inventaris Cabang Sendiri | ✅ | ✅ |
| Buat Item Inventaris Baru | ✅ | ❌ |
| Perbarui Data Item Inventaris | ✅ | ❌ |
| Hapus Item Inventaris | ✅ | ❌ |

> **Catatan:** Staf hanya melihat data stok yang tersedia di cabangnya. Staf tidak bisa membuat, mengubah, atau menghapus master data inventaris.

---

### 3.5. Pengisian Ulang Inventaris (Inventory Restock)

| Izin | Owner | Staf |
|---|:---:|:---:|
| Lihat Riwayat Restock Semua Cabang | ✅ | ❌ |
| Lihat Riwayat Restock Cabang Sendiri | ✅ | ❌ |
| Buat Catatan Restock | ✅ | ❌ |
| Perbarui Catatan Restock | ✅ | ❌ |
| Hapus Catatan Restock | ✅ | ❌ |

> **Aturan Mutlak:** Restock inventaris adalah **eksklusif Owner**. Staf tidak memiliki akses ke modul ini dalam bentuk apapun, termasuk hanya untuk membaca riwayat restock.

---

### 3.6. Kehadiran / Absensi (Attendance)

| Izin | Owner | Staf |
|---|:---:|:---:|
| Lihat Kehadiran Semua Cabang | ✅ | ❌ |
| Lihat Kehadiran Cabang Sendiri | ✅ | ❌ |
| Lihat Kehadiran Milik Sendiri | ❌ | ✅ |
| Check In (Buat Record Absensi) | ❌ | ✅ |
| Check Out (Perbarui Record Absensi) | ❌ | ✅ |
| Perbarui / Hapus Record Kehadiran Staf Lain | ✅ | ❌ |

> **Aturan:** Owner **bukan pekerja shift** dan tidak melakukan absensi. Owner hanya memiliki akses untuk memantau data kehadiran seluruh staf lintas cabang. Hanya Staf yang dapat melakukan Check In dan Check Out.

---

### 3.7. Laporan Masalah Mesin (Machine Report)

| Izin | Owner | Staf |
|---|:---:|:---:|
| Lihat Semua Laporan (semua cabang) | ✅ | ❌ |
| Lihat Laporan Milik Sendiri | ❌ | ✅ |
| Buat Laporan Masalah | ❌ | ✅ |
| Perbarui Laporan (semua) | ✅ | ❌ |
| Perbarui Laporan Milik Sendiri | ❌ | ✅ |
| Hapus Laporan (semua) | ✅ | ❌ |

> **Aturan Pembuat:** Yang menemukan dan melaporkan mesin rusak adalah Staf. Owner **tidak membuat** laporan, namun berwenang penuh untuk mengelola (update/delete) semua laporan yang masuk.

> **Aturan Visibilitas Staf:** Staf hanya dapat melihat laporan dengan kondisi `created_by = dirinya sendiri`. Staf tidak dapat melihat laporan mesin dari staf lain, bahkan di cabang yang sama.

---

### 3.8. Dasbor (Dashboard)

| Izin | Owner | Staf |
|---|:---:|:---:|
| Akses Dasbor Owner (agregat semua cabang) | ✅ | ❌ |
| Akses Dasbor Staf (ringkasan pribadi) | ❌ | ✅ |

**Konten Dasbor Owner:**
- Total penjualan real-time per cabang
- Status kehadiran staf aktif
- Laporan mesin rusak terbaru (semua cabang)

**Konten Dasbor Staf:**
- Total transaksi yang dicatat oleh staf sendiri hari ini
- Total nilai penjualan yang dicatat hari ini
- Status absensi sendiri (Belum Check In / Sedang Bertugas / Selesai)
- Peringatan stok menipis di cabang sendiri

---

### 3.9. Laporan Penjualan (Reports)

| Izin | Owner | Staf |
|---|:---:|:---:|
| Akses Modul Laporan | ✅ | ❌ |
| Lihat Laporan Harian | ✅ | ❌ |
| Lihat Laporan Mingguan | ✅ | ❌ |
| Lihat Laporan Bulanan | ✅ | ❌ |
| Filter Laporan per Cabang | ✅ | ❌ |

> **Catatan:** Modul Laporan adalah eksklusif Owner. Staf mendapatkan ringkasan data pribadinya melalui Dashboard Staf, bukan melalui modul Laporan.

---

## 4. Aturan Akses Data

### 4.1. Aturan Isolasi Cabang (Branch Isolation)

- Setiap Staf terikat pada **tepat satu cabang** (`branch_id` pada record karyawan).
- Semua query data yang dilakukan oleh Staf **wajib** difilter secara otomatis oleh sistem dengan kondisi `branch_id = cabang_staf_tersebut`.
- Staf tidak dapat memilih, mengganti, atau mengakses cabang lain melalui antarmuka maupun API.

### 4.2. Aturan Akses Lintas Cabang (Cross-Branch Access)

- Owner dapat mengakses data dari **semua cabang** tanpa pembatasan.
- Owner dapat memilih filter cabang pada dasbor dan modul laporan untuk membandingkan performa antar cabang.

### 4.3. Aturan Kepemilikan (Ownership Rule)

- Setiap record transaksi, laporan mesin, dan absensi menyimpan `created_by` yang merujuk ke `user_id` pembuatnya.
- Izin edit/hapus Staf hanya berlaku jika `created_by = user_id_staf_yang_sedang_login`.

### 4.4. Aturan Pengeditan Transaksi (Transaction Edit Rule)

Sebuah Staf dapat mengedit atau menghapus sebuah transaksi **hanya jika kedua kondisi berikut terpenuhi secara bersamaan:**

```
kondisi_1: created_by == current_user.id
kondisi_2: DATE(created_at) == DATE(now())  # Hari kalender yang sama
```

Jika salah satu kondisi tidak terpenuhi, tombol Edit/Hapus tidak boleh ditampilkan dan endpoint API harus menolak request dengan HTTP `403 Forbidden`.

### 4.5. Aturan Visibilitas Laporan Mesin

| Peran | Record yang dapat dilihat |
|---|---|
| Owner | Semua laporan dari semua cabang |
| Staf | Hanya laporan dengan `created_by = dirinya sendiri` |

---

## 5. Aturan Keamanan

### 5.1. Persyaratan Otentikasi

- Semua endpoint sistem **wajib** memerlukan otentikasi. Tidak ada halaman yang dapat diakses tanpa login yang valid.
- Sesi pengguna harus memiliki batas waktu (session timeout) untuk mencegah akses tidak sah dari perangkat yang ditinggalkan.
- Kredensial sensitif (password) harus di-hash menggunakan algoritma yang aman (bcrypt atau argon2). Plain-text password tidak boleh disimpan.

### 5.2. Persyaratan Otorisasi

- Setiap request ke API harus memvalidasi **dua hal secara berurutan:**
  1. **Autentikasi:** Apakah token/sesi valid? (Siapa kamu?)
  2. **Otorisasi:** Apakah peran pengguna memiliki izin untuk aksi ini? (Apakah kamu boleh melakukan ini?)
- Otorisasi berbasis peran harus divalidasi di **sisi server (backend)**. Validasi sisi klien (frontend) hanya bersifat UX — bukan pengganti validasi server.
- Branch isolation harus divalidasi di **level query database**, bukan hanya di level UI.

### 5.3. Tindakan yang Dilarang (Forbidden Actions)

Tindakan berikut harus selalu ditolak sistem dengan HTTP `403 Forbidden`, terlepas dari kondisi apapun:

| Tindakan | Oleh |
|---|---|
| Membuat / mengubah / menghapus data Cabang | Staf |
| Membuat / mengubah / menghapus data Karyawan | Staf |
| Membuat catatan Restock Inventaris | Staf |
| Mengakses data Cabang lain | Staf |
| Mengedit transaksi milik Staf lain | Staf |
| Mengedit transaksi sendiri yang dibuat pada hari sebelumnya | Staf |
| Menghapus Laporan Mesin (milik sendiri maupun orang lain) | Staf |
| Mengakses modul Laporan Penjualan | Staf |
| Melihat laporan mesin dari Staf lain | Staf |

### 5.4. Persyaratan Audit (Audit Requirements)

Setiap record data pada seluruh tabel **wajib** memiliki kolom audit berikut:

| Kolom | Tipe | Deskripsi |
|---|---|---|
| `created_by` | FK → users.id | ID pengguna yang membuat record |
| `created_at` | Timestamp | Waktu record dibuat |
| `updated_at` | Timestamp | Waktu record terakhir diperbarui |

- `created_by` tidak boleh diubah setelah record dibuat (immutable).
- `updated_at` harus diperbarui secara otomatis oleh sistem setiap kali record dimodifikasi.
- Data audit tidak boleh dapat dihapus atau dimanipulasi oleh Staf.

---

*Dokumen ini adalah sumber kebenaran tunggal (Single Source of Truth) untuk implementasi RBAC sistem Laundrix MVP. Setiap implementasi yang menyimpang dari dokumen ini memerlukan persetujuan tertulis dari Product Owner.*
