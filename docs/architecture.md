# Architecture: Laundrix MVP

Dokumen ini mendefinisikan keputusan arsitektur teknis untuk sistem Laundrix MVP. Setiap keputusan dibuat berdasarkan pertimbangan PRD.md, RBAC.md, dan DATABASE.md.

---

## 1. Tech Stack Final

| Lapisan | Teknologi | Alasan |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | SSR native, Server Actions, Route Groups untuk isolasi peran |
| **Bahasa** | TypeScript | Type safety untuk RBAC dan schema database |
| **Database** | PostgreSQL via Supabase | Managed, RLS built-in, Realtime, Storage dalam satu platform |
| **Auth** | Supabase Auth | JWT terintegrasi, session management, mudah dikombinasikan dengan RLS |
| **ORM** | Prisma | Type-safe query, schema migration terstruktur, cocok dengan PostgreSQL |
| **Styling** | Tailwind CSS | Utility-first, rapid development untuk MVP |
| **Component Library** | shadcn/ui | Built on Radix UI, aksesibel, dapat dikustomisasi penuh |
| **State Management** | Zustand (minimal) + TanStack Query | Zustand untuk UI state ringan, TanStack Query untuk server state & caching |
| **File Storage** | Supabase Storage | Foto laporan mesin — terintegrasi dengan project Supabase yang sama |
| **Deployment** | Vercel (Next.js) + Supabase Cloud | Zero-config untuk Next.js, managed PostgreSQL |

---

## 2. Folder Structure

```
laundrix/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group: halaman tanpa sidebar
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Layout minimal (hanya logo + form)
│   │
│   ├── (owner)/                  # Route group: hanya dapat diakses oleh OWNER
│   │   ├── layout.tsx            # Sidebar Owner, breadcrumb, auth guard
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── branches/
│   │   │   ├── page.tsx          # Daftar cabang
│   │   │   ├── new/page.tsx      # Form tambah cabang
│   │   │   └── [id]/page.tsx     # Detail & edit cabang
│   │   ├── employees/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── inventory/
│   │   │   ├── page.tsx          # Master data inventaris + stok per cabang
│   │   │   ├── restock/page.tsx  # Form restock
│   │   │   └── [id]/page.tsx
│   │   ├── transactions/
│   │   │   ├── page.tsx          # Semua transaksi lintas cabang
│   │   │   └── [id]/page.tsx
│   │   ├── attendance/
│   │   │   └── page.tsx          # Rekap kehadiran semua staf
│   │   ├── machine-reports/
│   │   │   ├── page.tsx          # Semua laporan mesin
│   │   │   └── [id]/page.tsx
│   │   └── reports/
│   │       └── page.tsx          # Laporan harian/mingguan/bulanan
│   │
│   ├── (staff)/                  # Route group: hanya dapat diakses oleh STAFF
│   │   ├── layout.tsx            # Sidebar Staff, auth guard
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Ringkasan harian staf
│   │   ├── transactions/
│   │   │   ├── page.tsx          # Transaksi milik sendiri
│   │   │   ├── new/page.tsx      # Form transaksi baru
│   │   │   └── [id]/page.tsx     # Detail + edit/hapus (hari yang sama)
│   │   ├── inventory/
│   │   │   └── page.tsx          # Lihat stok cabang sendiri (read-only)
│   │   ├── attendance/
│   │   │   └── page.tsx          # Check In / Check Out
│   │   └── machine-reports/
│   │       ├── page.tsx          # Riwayat laporan milik sendiri
│   │       └── new/page.tsx      # Form laporan baru
│   │
│   ├── api/                      # Minimal API Routes
│   │   └── storage/
│   │       └── upload/route.ts   # Generate signed URL untuk upload foto
│   │
│   └── layout.tsx                # Root layout (font, metadata global)
│
├── components/
│   ├── ui/                       # shadcn/ui base components
│   ├── shared/                   # Komponen yang digunakan oleh Owner dan Staff
│   │   ├── data-table.tsx
│   │   ├── page-header.tsx
│   │   └── confirm-dialog.tsx
│   ├── owner/                    # Komponen eksklusif Owner
│   │   ├── branch-form.tsx
│   │   ├── employee-form.tsx
│   │   └── reports-chart.tsx
│   └── staff/                    # Komponen eksklusif Staff
│       ├── transaction-form.tsx
│       ├── attendance-button.tsx
│       └── machine-report-form.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client (untuk Realtime & Storage upload)
│   │   └── server.ts             # Server client (untuk Server Actions & Server Components)
│   ├── actions/                  # Semua Server Actions diorganisir per domain
│   │   ├── auth.actions.ts
│   │   ├── branch.actions.ts
│   │   ├── employee.actions.ts
│   │   ├── transaction.actions.ts
│   │   ├── inventory.actions.ts
│   │   ├── attendance.actions.ts
│   │   └── machine-report.actions.ts
│   ├── db/
│   │   └── queries/              # Fungsi query Prisma yang dapat digunakan ulang
│   │       ├── transactions.ts
│   │       ├── inventory.ts
│   │       └── reports.ts
│   └── utils/
│       ├── rbac.ts               # Helper untuk validasi peran
│       └── format.ts             # Currency, tanggal, dll
│
├── types/
│   ├── database.types.ts         # Auto-generated dari Supabase CLI
│   └── app.types.ts              # Tipe domain aplikasi (Transaction, Staff, dll)
│
├── middleware.ts                 # Auth guard & role-based redirect
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── docs/                         # Semua dokumen product & arsitektur
```

---

## 3. Auth Flow

### 3.1. Login

```
User mengisi form login (email + password)
      ↓
Server Action: supabase.auth.signInWithPassword()
      ↓
Supabase mengembalikan session (JWT access token + refresh token)
      ↓
Token disimpan di cookie (httpOnly, secure) oleh Supabase Auth helper
      ↓
Server Action membaca role user dari tabel users (users.role)
      ↓
Redirect berdasarkan role:
  OWNER → /dashboard (owner)
  STAFF → /dashboard (staff)
```

### 3.2. Route Protection (Middleware)

`middleware.ts` berjalan pada setiap request dan melakukan:

```
Request masuk ke route tertentu
      ↓
Middleware membaca session dari cookie
      ↓
[Tidak ada session] → Redirect ke /login
      ↓
[Ada session] → Baca role dari JWT claims atau DB
      ↓
[Role = STAFF mengakses route /owner/*] → Redirect ke /staff/dashboard (403)
[Role = OWNER mengakses route /staff/*] → Redirect ke /owner/dashboard (403)
[Role sesuai] → Lanjutkan request
```

### 3.3. Logout

```
User klik Logout
      ↓
Server Action: supabase.auth.signOut()
      ↓
Cookie session dihapus
      ↓
Redirect ke /login
```

---

## 4. Database Access Pattern

### Prinsip Utama

1. **Prisma sebagai query layer utama** di Server Actions dan Server Components.
2. **Supabase RLS sebagai lapisan kedua** — berfungsi sebagai jaring pengaman di level database, bukan pengganti validasi di Server Actions.
3. **Validasi otorisasi di Server Actions** — sesuai RBAC.md: "validasi sisi klien hanya bersifat UX, bukan pengganti validasi server."
4. **Tidak ada akses database dari Client Components** — semua interaksi database melalui Server Actions.

### Pola Akses per Lapisan

| Lapisan | Cara Akses DB | Digunakan Untuk |
|---|---|---|
| **Server Components** | Prisma (server-side) | Fetch data awal untuk halaman (SSR) |
| **Server Actions** | Prisma (server-side) | Semua operasi tulis dan query yang diproteksi |
| **Client Components** | TanStack Query → Server Actions | Data yang perlu re-fetch (dashboard real-time) |
| **Middleware** | Supabase server client | Validasi session & role untuk route protection |

### Branch Isolation di Query

Setiap query Prisma yang dijalankan dalam konteks Staff **wajib** menyertakan filter `branch_id`:

```typescript
// Contoh: Staff melihat transaksinya sendiri
const transactions = await prisma.transaction.findMany({
  where: {
    created_by: session.user.id,          // Hanya milik sendiri
    branch_id: session.user.branch_id,    // Hanya cabang sendiri
  },
});

// Contoh: Owner melihat semua transaksi
const transactions = await prisma.transaction.findMany({
  where: {
    ...(branchFilter ? { branch_id: branchFilter } : {}), // Filter opsional
  },
});
```

---

## 5. Server Actions vs API Routes

### Keputusan: Utamakan Server Actions

Seluruh operasi CRUD menggunakan **Server Actions**. API Routes hanya digunakan untuk kasus yang tidak dapat ditangani oleh Server Actions.

| Operasi | Mekanisme | Alasan |
|---|---|---|
| Login / Logout | Server Action | Mutasi session, tidak perlu API Route |
| Buat Transaksi | Server Action | Form submission, validasi RBAC di server |
| Edit / Hapus Transaksi | Server Action | Validasi aturan "hari yang sama" di server |
| Check In / Check Out | Server Action | Mutasi absensi langsung |
| Buat Laporan Mesin | Server Action | Form submission dengan validasi |
| Restock Inventaris | Server Action | Mutasi stok, validasi role OWNER |
| Generate Upload URL | **API Route** | Client perlu URL signed dari Supabase Storage sebelum upload file |
| Data Dashboard (Realtime) | Supabase Realtime (client) | Subscribe perubahan data live via WebSocket |

### Contoh Struktur Server Action

```typescript
// lib/actions/transaction.actions.ts
'use server';

export async function createTransaction(formData: FormData) {
  const session = await getServerSession(); // Ambil session user

  // 1. Validasi autentikasi
  if (!session) redirect('/login');

  // 2. Validasi otorisasi (RBAC)
  if (session.role !== 'STAFF') throw new Error('Forbidden');

  // 3. Validasi bisnis (branch isolation sudah otomatis dari session)
  const data = parseFormData(formData);

  // 4. Eksekusi query dengan Prisma
  const transaction = await prisma.transaction.create({
    data: {
      branch_id: session.branch_id, // Dipaksa dari session, bukan dari input user
      created_by: session.user.id,
      ...data,
    },
  });

  revalidatePath('/staff/transactions');
  return transaction;
}
```

---

## 6. State Management

### Strategi: Minimal Client State

Sistem Laundrix adalah aplikasi berbasis data dengan sedikit interaksi kompleks di sisi klien. State management dijaga seminimal mungkin.

| Tipe State | Teknologi | Contoh |
|---|---|---|
| **Server State (data dari DB)** | TanStack Query + Server Actions | Daftar transaksi, stok inventaris |
| **UI State sederhana** | React `useState` | Modal buka/tutup, tab aktif |
| **UI State lintas komponen** | Zustand (hanya jika diperlukan) | Filter cabang yang dipilih Owner di halaman reports |
| **Form State** | React Hook Form | Semua form (transaksi, laporan, dll) |
| **Session / Auth State** | Supabase Auth (built-in) | Data user yang sedang login |

### Real-time Dashboard

Dashboard Owner menampilkan data real-time menggunakan **Supabase Realtime**:

```
Supabase Realtime Channel subscribe ke tabel transactions
      ↓
Setiap INSERT/UPDATE/DELETE pada transactions di cabang manapun
      ↓
Client menerima event → TanStack Query invalidate cache
      ↓
Dashboard Owner otomatis ter-refresh tanpa full page reload
```

---

## 7. File Upload Strategy

Digunakan untuk: **foto opsional pada laporan masalah mesin**.

### Alur Upload

```
Staff memilih foto dari device
      ↓
Client request ke API Route: GET /api/storage/upload
      ↓
Server generate Supabase Storage signed URL (berlaku 60 detik)
      ↓
Client upload file langsung ke Supabase Storage menggunakan signed URL
(tidak melalui server Next.js — mengurangi beban server)
      ↓
Supabase mengembalikan URL publik foto
      ↓
URL foto disertakan dalam payload Server Action createMachineReport()
      ↓
URL disimpan di kolom machine_reports.photo_url
```

### Konfigurasi Storage

- **Bucket:** `machine-report-photos`
- **Akses:** Private (hanya dapat diakses melalui signed URL atau service role)
- **Batasan file:** Maksimal 5MB, hanya format gambar (`image/jpeg`, `image/png`, `image/webp`)
- **Naming:** `{branch_id}/{report_id}/{timestamp}.{ext}`

---

## 8. Deployment Strategy

### Lingkungan

| Lingkungan | Platform | Tujuan |
|---|---|---|
| **Production** | Vercel + Supabase Cloud | Aplikasi live untuk Owner dan Staff |
| **Development** | `localhost:3000` + Supabase local (`supabase start`) | Development dan testing lokal |

### Vercel (Next.js)

- Deploy otomatis dari branch `main` ke Production
- Environment variables dikelola di Vercel Dashboard:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `DATABASE_URL` (untuk Prisma)
  - `DIRECT_URL` (untuk Prisma migration)

### Supabase Cloud

- Database PostgreSQL managed (tidak perlu mengelola server sendiri)
- Auth, Storage, dan Realtime sudah terintegrasi dalam satu project
- Migrasi database dilakukan via Prisma:
  ```bash
  npx prisma migrate deploy
  ```

### CI/CD (Sederhana untuk MVP)

```
Developer push ke branch main
      ↓
Vercel otomatis trigger build & deploy
      ↓
Prisma migrate deploy berjalan via post-build hook (opsional)
      ↓
Aplikasi live di production URL
```

---

## 9. Keputusan Arsitektur yang Sengaja Tidak Diambil (MVP)

| Fitur | Keputusan | Alasan |
|---|---|---|
| Multi-tenant isolation di DB level | ❌ Tidak diimplementasikan | Branch isolation cukup ditegakkan via query filter dan RLS |
| Redis / caching layer | ❌ Tidak digunakan | Volume data MVP terlalu kecil untuk membutuhkan caching eksternal |
| WebSocket custom | ❌ Tidak dibuat | Supabase Realtime sudah mencukupi |
| Background jobs / queues | ❌ Tidak ada | Tidak ada proses async berat dalam MVP |
| Docker / self-hosted | ❌ Tidak digunakan | Vercel + Supabase Cloud lebih efisien untuk MVP |
| Monitoring / observability | ❌ Di luar MVP | Ditambahkan setelah MVP berjalan stabil |
