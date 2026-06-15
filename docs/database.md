# Database Design: Laundrix MVP

Dokumen ini mendeskripsikan skema database PostgreSQL (Supabase) untuk sistem Laundrix MVP. Dibuat berdasarkan PRD.md, USER_FLOW.md, dan RBAC.md. Hanya mencakup entitas yang dibutuhkan oleh modul MVP yang sudah dibekukan (*scope freeze*).

---

## 1. Ikhtisar

- **Database Engine:** PostgreSQL (via Supabase)
- **Strategi ID:** `UUID` menggunakan `gen_random_uuid()` sebagai primary key untuk semua tabel
- **Timezone:** Semua nilai `TIMESTAMP` disimpan dalam UTC
- **Soft Delete:** Tidak digunakan. Record dihapus secara permanen (*hard delete*), kecuali untuk entitas master (Branch, User, Machine, Inventory Item) yang menggunakan flag `is_active`

---

## 2. Asumsi yang Didokumentasikan

> Berikut adalah asumsi yang dibuat karena tidak didefinisikan secara eksplisit dalam PRD, namun dibutuhkan untuk kelengkapan skema.

1. **Harga Layanan:** PRD mendefinisikan layanan CA, CK, KA tetapi tidak menyebutkan mekanisme penetapan harga. Diasumsikan harga bersifat **global** (berlaku sama di semua cabang) dan dikelola oleh Owner. Tabel `service_prices` ditambahkan sebagai master data.
2. **Harga Barang Retail:** Disimpan sebagai kolom `unit_price` pada tabel `inventory_items` (master global).
3. **Snapshot Harga:** `unit_price` pada `transaction_items` adalah **snapshot harga saat transaksi terjadi**, bukan referensi ke harga saat ini. Ini mencegah perubahan harga di masa depan merusak data historis.
4. **Satu Absensi per Hari:** Setiap staf hanya dapat memiliki satu record absensi per hari kalender (`UNIQUE(staff_id, date)`).
5. **Foto Laporan Mesin:** URL foto disimpan sebagai string (diasumsikan file diunggah ke Supabase Storage dan URL-nya yang disimpan di database).

---

## 3. Ringkasan Hubungan Entitas (ERD Teks)

```
branches
  ├── users (staff) [1 branch → many users]
  ├── machines [1 branch → many machines]
  ├── inventory_stock [1 branch → many stock records]
  ├── transactions [1 branch → many transactions]
  ├── attendance [1 branch → many attendance records]
  └── inventory_restock_logs [1 branch → many restock logs]

users
  ├── transactions [1 user → many transactions (created_by)]
  ├── attendance [1 user → many attendance records]
  ├── machine_reports [1 user → many reports (reported_by)]
  └── inventory_restock_logs [1 user → many restock logs (created_by)]

transactions
  └── transaction_items [1 transaction → many items]

inventory_items
  ├── inventory_stock [1 item → many stock records (per branch)]
  ├── inventory_restock_logs [1 item → many restock logs]
  └── transaction_items [1 item → many transaction items (retail only)]

machines
  └── machine_reports [1 machine → many reports]

service_prices
  └── transaction_items [1 service → many transaction items (service only)]
```

---

## 4. Tabel

---

### 4.1. `users`

**Tujuan:** Menyimpan semua pengguna sistem — Owner dan Staff. Satu tabel untuk kedua peran.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik pengguna |
| `name` | `VARCHAR(100)` | `NOT NULL` | Nama lengkap pengguna |
| `email` | `VARCHAR(255)` | `NOT NULL, UNIQUE` | Email untuk login |
| `password_hash` | `TEXT` | `NOT NULL` | Hash password (bcrypt/argon2) |
| `role` | `user_role` | `NOT NULL` | Enum: `OWNER` atau `STAFF` |
| `branch_id` | `UUID` | `FK → branches.id, NULLABLE` | Cabang penugasan. `NULL` jika `role = OWNER` |
| `is_active` | `BOOLEAN` | `NOT NULL, DEFAULT TRUE` | Soft-disable akun staf |
| `created_by` | `UUID` | `FK → users.id, NULLABLE` | Siapa yang membuat akun ini. `NULL` untuk akun Owner pertama |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu pembuatan record |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu update terakhir |

**Enum:**
```sql
CREATE TYPE user_role AS ENUM ('OWNER', 'STAFF');
```

**Aturan Bisnis:**
- Jika `role = STAFF`, maka `branch_id` WAJIB diisi (NOT NULL secara logika, ditegakkan via CHECK constraint atau trigger).
- Jika `role = OWNER`, maka `branch_id` HARUS NULL.
- `email` harus unik di seluruh sistem.

**CHECK Constraint:**
```sql
CONSTRAINT chk_staff_branch CHECK (
  (role = 'STAFF' AND branch_id IS NOT NULL) OR
  (role = 'OWNER' AND branch_id IS NULL)
)
```

---

### 4.2. `branches`

**Tujuan:** Menyimpan data semua cabang laundry yang terdaftar dalam sistem.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik cabang |
| `name` | `VARCHAR(100)` | `NOT NULL` | Nama cabang (misal: "Cabang Sudirman") |
| `address` | `TEXT` | `NULLABLE` | Alamat fisik cabang |
| `is_active` | `BOOLEAN` | `NOT NULL, DEFAULT TRUE` | Status aktif cabang |
| `created_by` | `UUID` | `NOT NULL, FK → users.id` | Owner yang membuat cabang |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu pembuatan record |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu update terakhir |

---

### 4.3. `machines`

**Tujuan:** Menyimpan daftar mesin yang beroperasi di setiap cabang. Digunakan sebagai referensi saat staf membuat laporan masalah mesin.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik mesin |
| `branch_id` | `UUID` | `NOT NULL, FK → branches.id` | Cabang tempat mesin berada |
| `name` | `VARCHAR(100)` | `NOT NULL` | Nama mesin (misal: "Mesin Cuci 1") |
| `type` | `machine_type` | `NOT NULL` | Enum: `WASHER` atau `DRYER` |
| `is_active` | `BOOLEAN` | `NOT NULL, DEFAULT TRUE` | Status operasional mesin |
| `created_by` | `UUID` | `NOT NULL, FK → users.id` | Owner yang menambahkan mesin |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu pembuatan record |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu update terakhir |

**Enum:**
```sql
CREATE TYPE machine_type AS ENUM ('WASHER', 'DRYER');
```

---

### 4.4. `service_prices`

**Tujuan:** Menyimpan harga master untuk setiap jenis layanan laundry (CA, CK, KA). Harga bersifat global (berlaku di semua cabang). Hanya Owner yang dapat mengubah.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik |
| `service_type` | `service_type` | `NOT NULL, UNIQUE` | Enum: `CA`, `CK`, atau `KA` |
| `price` | `NUMERIC(10, 2)` | `NOT NULL, CHECK (price >= 0)` | Harga saat ini |
| `created_by` | `UUID` | `NOT NULL, FK → users.id` | Owner yang menetapkan harga |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu pembuatan record |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu update terakhir |

**Enum:**
```sql
CREATE TYPE service_type AS ENUM ('CA', 'CK', 'KA');
```

> **Catatan:** UNIQUE pada `service_type` memastikan hanya ada satu harga aktif per jenis layanan. Perubahan harga dilakukan dengan UPDATE, bukan INSERT baru.

---

### 4.5. `inventory_items`

**Tujuan:** Master data global untuk semua item inventaris/barang retail yang dijual (Deterjen, Pelembut, Kantong Plastik, dll). Dikelola oleh Owner.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik item |
| `name` | `VARCHAR(100)` | `NOT NULL, UNIQUE` | Nama item (misal: "Deterjen Sachet") |
| `unit` | `VARCHAR(50)` | `NOT NULL` | Satuan item (misal: "sachet", "botol", "lembar") |
| `unit_price` | `NUMERIC(10, 2)` | `NOT NULL, CHECK (unit_price >= 0)` | Harga jual per satuan saat ini |
| `is_active` | `BOOLEAN` | `NOT NULL, DEFAULT TRUE` | Apakah item masih dijual |
| `created_by` | `UUID` | `NOT NULL, FK → users.id` | Owner yang membuat item |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu pembuatan record |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu update terakhir |

---

### 4.6. `inventory_stock`

**Tujuan:** Menyimpan jumlah stok aktual per item per cabang. Ini adalah representasi stok fisik yang ada di setiap cabang, yang otomatis berkurang saat terjadi penjualan.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik |
| `branch_id` | `UUID` | `NOT NULL, FK → branches.id` | Cabang pemilik stok |
| `inventory_item_id` | `UUID` | `NOT NULL, FK → inventory_items.id` | Item yang distok |
| `current_stock` | `INTEGER` | `NOT NULL, DEFAULT 0, CHECK (current_stock >= 0)` | Jumlah stok saat ini |
| `low_stock_threshold` | `INTEGER` | `NOT NULL, DEFAULT 5` | Batas minimum sebelum peringatan "Stok Menipis" muncul di Dashboard Staf |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu stok terakhir diperbarui |

**UNIQUE Constraint:**
```sql
CONSTRAINT uq_stock_branch_item UNIQUE (branch_id, inventory_item_id)
```

> **Catatan:** Tabel ini tidak memiliki `created_by`/`created_at` karena bukan merupakan log aksi pengguna, melainkan representasi *state* stok saat ini yang dikelola oleh sistem secara otomatis.

---

### 4.7. `inventory_restock_logs`

**Tujuan:** Log historis setiap kali Owner menambahkan stok barang ke suatu cabang (Restock). Setiap catatan restock secara otomatis menambah nilai `current_stock` di tabel `inventory_stock`.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik log |
| `branch_id` | `UUID` | `NOT NULL, FK → branches.id` | Cabang yang direstok |
| `inventory_item_id` | `UUID` | `NOT NULL, FK → inventory_items.id` | Item yang direstok |
| `quantity_added` | `INTEGER` | `NOT NULL, CHECK (quantity_added > 0)` | Jumlah item yang ditambahkan |
| `notes` | `TEXT` | `NULLABLE` | Catatan opsional dari Owner |
| `created_by` | `UUID` | `NOT NULL, FK → users.id` | Owner yang melakukan restock |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu restock dilakukan |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu update terakhir |

---

### 4.8. `transactions`

**Tujuan:** Header transaksi penjualan. Satu record mewakili satu sesi kunjungan pelanggan. Detail item yang dijual disimpan di `transaction_items`.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik transaksi |
| `branch_id` | `UUID` | `NOT NULL, FK → branches.id` | Cabang tempat transaksi terjadi |
| `total_amount` | `NUMERIC(10, 2)` | `NOT NULL, DEFAULT 0` | Total nilai transaksi (denormalisasi untuk performa query laporan) |
| `notes` | `TEXT` | `NULLABLE` | Catatan opsional dari staf |
| `transaction_date` | `DATE` | `NOT NULL, DEFAULT CURRENT_DATE` | Tanggal transaksi (untuk filter laporan harian/mingguan/bulanan) |
| `created_by` | `UUID` | `NOT NULL, FK → users.id` | Staf yang mencatat transaksi |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu transaksi dicatat |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu transaksi terakhir diubah |

> **Catatan:** `transaction_date` disimpan terpisah dari `created_at` untuk memudahkan filter laporan berdasarkan tanggal tanpa perlu konversi timezone.

---

### 4.9. `transaction_items`

**Tujuan:** Detail line-item untuk setiap transaksi. Satu transaksi dapat memiliki banyak item — baik layanan (CA/CK/KA) maupun barang retail.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik item |
| `transaction_id` | `UUID` | `NOT NULL, FK → transactions.id ON DELETE CASCADE` | Transaksi induk |
| `item_type` | `transaction_item_type` | `NOT NULL` | Enum: `SERVICE` atau `RETAIL` |
| `service_type` | `service_type` | `NULLABLE` | Diisi jika `item_type = SERVICE`. Enum: `CA`, `CK`, `KA` |
| `inventory_item_id` | `UUID` | `NULLABLE, FK → inventory_items.id` | Diisi jika `item_type = RETAIL` |
| `quantity` | `INTEGER` | `NOT NULL, DEFAULT 1, CHECK (quantity > 0)` | Jumlah item |
| `unit_price` | `NUMERIC(10, 2)` | `NOT NULL, CHECK (unit_price >= 0)` | Harga per satuan saat transaksi terjadi (snapshot) |
| `subtotal` | `NUMERIC(10, 2)` | `NOT NULL, CHECK (subtotal >= 0)` | `quantity × unit_price` (disimpan untuk performa) |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu item dibuat |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu item terakhir diubah |

**Enum:**
```sql
CREATE TYPE transaction_item_type AS ENUM ('SERVICE', 'RETAIL');
```

**CHECK Constraint:**
```sql
-- Memastikan item bertipe SERVICE memiliki service_type, bukan inventory_item_id
CONSTRAINT chk_item_type_consistency CHECK (
  (item_type = 'SERVICE' AND service_type IS NOT NULL AND inventory_item_id IS NULL) OR
  (item_type = 'RETAIL' AND inventory_item_id IS NOT NULL AND service_type IS NULL)
)
```

> **ON DELETE CASCADE:** Jika transaksi dihapus, semua `transaction_items`-nya ikut terhapus secara otomatis.

---

### 4.10. `attendance`

**Tujuan:** Menyimpan data absensi harian setiap staf. Satu record per staf per hari kalender. Record dibuat saat Check In dan diperbarui saat Check Out.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik |
| `staff_id` | `UUID` | `NOT NULL, FK → users.id` | Staf yang bersangkutan |
| `branch_id` | `UUID` | `NOT NULL, FK → branches.id` | Cabang tempat staf bertugas (denormalisasi dari `users.branch_id`) |
| `date` | `DATE` | `NOT NULL, DEFAULT CURRENT_DATE` | Tanggal absensi |
| `check_in_time` | `TIMESTAMPTZ` | `NOT NULL` | Waktu Check In |
| `check_out_time` | `TIMESTAMPTZ` | `NULLABLE` | Waktu Check Out. NULL jika staf belum Check Out |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu record dibuat |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu record terakhir diperbarui |

**UNIQUE Constraint:**
```sql
CONSTRAINT uq_attendance_staff_date UNIQUE (staff_id, date)
```

**CHECK Constraint:**
```sql
-- Check Out harus terjadi setelah Check In
CONSTRAINT chk_checkout_after_checkin CHECK (
  check_out_time IS NULL OR check_out_time > check_in_time
)
```

---

### 4.11. `machine_reports`

**Tujuan:** Menyimpan laporan masalah mesin yang dibuat oleh Staf. Owner dapat melihat dan mengelola semua laporan.

| Kolom | Tipe Data | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `UUID` | `PK, DEFAULT gen_random_uuid()` | Identifier unik laporan |
| `machine_id` | `UUID` | `NOT NULL, FK → machines.id` | Mesin yang bermasalah |
| `branch_id` | `UUID` | `NOT NULL, FK → branches.id` | Cabang mesin (denormalisasi untuk kemudahan query lintas cabang oleh Owner) |
| `description` | `TEXT` | `NOT NULL` | Deskripsi masalah yang dilaporkan |
| `photo_url` | `TEXT` | `NULLABLE` | URL foto dari Supabase Storage (opsional) |
| `created_by` | `UUID` | `NOT NULL, FK → users.id` | Staf yang membuat laporan |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu laporan dibuat |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL, DEFAULT now()` | Waktu laporan terakhir diperbarui |

---

## 5. Strategi Pengindeksan

Index ditambahkan pada kolom yang sering digunakan sebagai filter dalam query operasional dan pelaporan.

```sql
-- users
CREATE INDEX idx_users_branch_id ON users(branch_id);
CREATE INDEX idx_users_role ON users(role);

-- transactions (paling sering diquery untuk laporan)
CREATE INDEX idx_transactions_branch_id ON transactions(branch_id);
CREATE INDEX idx_transactions_created_by ON transactions(created_by);
CREATE INDEX idx_transactions_transaction_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_branch_date ON transactions(branch_id, transaction_date);

-- transaction_items
CREATE INDEX idx_transaction_items_transaction_id ON transaction_items(transaction_id);
CREATE INDEX idx_transaction_items_inventory_item_id ON transaction_items(inventory_item_id);

-- inventory_stock
CREATE INDEX idx_inventory_stock_branch_id ON inventory_stock(branch_id);

-- inventory_restock_logs
CREATE INDEX idx_restock_logs_branch_id ON inventory_restock_logs(branch_id);

-- attendance
CREATE INDEX idx_attendance_staff_id ON attendance(staff_id);
CREATE INDEX idx_attendance_branch_id ON attendance(branch_id);
CREATE INDEX idx_attendance_date ON attendance(date);

-- machine_reports
CREATE INDEX idx_machine_reports_branch_id ON machine_reports(branch_id);
CREATE INDEX idx_machine_reports_created_by ON machine_reports(created_by);
CREATE INDEX idx_machine_reports_machine_id ON machine_reports(machine_id);

-- machines
CREATE INDEX idx_machines_branch_id ON machines(branch_id);
```

---

## 6. Audit Fields

Sesuai ketentuan RBAC.md, setiap tabel (kecuali `inventory_stock` yang merupakan representasi *state*) memiliki kolom audit berikut:

| Kolom | Tipe | Aturan |
|---|---|---|
| `created_by` | `UUID FK → users.id` | Wajib ada. Diisi saat INSERT. **Tidak boleh diubah setelah dibuat (immutable).** |
| `created_at` | `TIMESTAMPTZ DEFAULT now()` | Wajib ada. Diisi otomatis oleh database. |
| `updated_at` | `TIMESTAMPTZ DEFAULT now()` | Wajib ada. Diperbarui otomatis oleh trigger setiap kali row dimodifikasi. |

**Trigger untuk `updated_at` (berlaku untuk semua tabel):**
```sql
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## 7. Aturan Bisnis (Ditegakkan di Database)

### B1. Branch Assignment Staf
```sql
-- Di tabel users
CONSTRAINT chk_staff_branch CHECK (
  (role = 'STAFF' AND branch_id IS NOT NULL) OR
  (role = 'OWNER' AND branch_id IS NULL)
)
```

### B2. Konsistensi Tipe Item Transaksi
```sql
-- Di tabel transaction_items
CONSTRAINT chk_item_type_consistency CHECK (
  (item_type = 'SERVICE' AND service_type IS NOT NULL AND inventory_item_id IS NULL) OR
  (item_type = 'RETAIL' AND inventory_item_id IS NOT NULL AND service_type IS NULL)
)
```

### B3. Stok Tidak Boleh Negatif
```sql
-- Di tabel inventory_stock
CONSTRAINT chk_stock_non_negative CHECK (current_stock >= 0)
```

### B4. Check Out Setelah Check In
```sql
-- Di tabel attendance
CONSTRAINT chk_checkout_after_checkin CHECK (
  check_out_time IS NULL OR check_out_time > check_in_time
)
```

### B5. Satu Absensi per Staf per Hari
```sql
-- Di tabel attendance
CONSTRAINT uq_attendance_staff_date UNIQUE (staff_id, date)
```

### B6. Harga Tidak Boleh Negatif
```sql
-- Di tabel inventory_items dan service_prices
CONSTRAINT chk_price_non_negative CHECK (unit_price >= 0)
CONSTRAINT chk_service_price_non_negative CHECK (price >= 0)
```

---

## 8. Batasan Integritas Data

| Skenario | Mekanisme | Perilaku |
|---|---|---|
| Staf dihapus | `ON DELETE RESTRICT` pada FK `users.id` | Diblokir jika staf memiliki transaksi/absensi/laporan terkait |
| Cabang dihapus | `ON DELETE RESTRICT` pada FK `branches.id` | Diblokir jika cabang memiliki data terkait |
| Mesin dihapus | `is_active = FALSE` (soft disable) | Mesin yang memiliki laporan aktif tidak bisa dihapus secara fisik |
| Transaksi dihapus | `ON DELETE CASCADE` ke `transaction_items` | Semua item dalam transaksi ikut terhapus otomatis |
| Penjualan item retail | Trigger pada `transaction_items INSERT` | `inventory_stock.current_stock` dikurangi secara otomatis |
| Restock barang | Trigger pada `inventory_restock_logs INSERT` | `inventory_stock.current_stock` ditambah secara otomatis |
| Rollback penjualan (transaksi dihapus) | Trigger pada `transaction_items DELETE` | `inventory_stock.current_stock` dikembalikan secara otomatis |

---

## 9. Ringkasan Tabel

| Tabel | Baris Perkiraan (MVP) | Catatan |
|---|---|---|
| `users` | < 50 | Owner + seluruh staf semua cabang |
| `branches` | < 20 | Satu entri per cabang |
| `machines` | < 100 | 3–10 mesin per cabang |
| `service_prices` | 3 | CA, CK, KA (fixed) |
| `inventory_items` | 10–30 | Master data barang retail |
| `inventory_stock` | `branches × items` | Record stok per cabang per item |
| `inventory_restock_logs` | Tumbuh seiring waktu | Log setiap aksi restock |
| `transactions` | Tumbuh seiring waktu | ~10–50 transaksi per hari per cabang |
| `transaction_items` | Tumbuh seiring waktu | Rata-rata 1–3 item per transaksi |
| `attendance` | Tumbuh seiring waktu | 1 record per staf per hari kerja |
| `machine_reports` | Jarang | Hanya saat ada mesin rusak |
