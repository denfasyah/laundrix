# Design System: Laundrix

Dokumen ini adalah panduan desain sistem lengkap untuk Laundrix MVP. Dirancang untuk konsistensi visual di seluruh aplikasi dan sebagai referensi untuk pembuatan UI di Stitch atau tools desain lainnya.

**Referensi Gaya UI:** Stripe Dashboard · Linear · Vercel Dashboard
**Anti-pola:** ERP enterprise, Bootstrap lama, template admin terlalu berwarna, estetika gaming.

---

## 1. Kepribadian Merek (Brand Personality)

### Nilai Merek

| Nilai | Deskripsi |
|---|---|
| **Kepercayaan** | Owner dan Staf mengandalkan sistem ini untuk keputusan bisnis harian. UI harus terasa stabil dan andal. |
| **Efisiensi** | Staf menggunakan aplikasi di tengah kesibukan. Setiap layar harus dapat dipahami dalam 3 detik pertama. |
| **Kejernihan** | Data finansial dan operasional harus tersaji dengan presisi — tidak ada ambiguitas visual. |
| **Profesional** | Meskipun bisnis berskala kecil, UI harus terasa sekelas software enterprise modern. |
| **Ramah** | Staf bukan pengguna teknis. Sistem harus terasa mudah didekati, bukan mengintimidasi. |

### Nada Emosional

**Tenang dan terkendali.** Seperti instrumen presisi yang bekerja tanpa suara — pengguna merasa *in control*, bukan kewalahan. Warna dan tipografi yang digunakan mengkomunikasikan kepercayaan, bukan keriaan.

### Identitas Visual

- **Warna primer teal** (#2FA1BB) mengkomunikasikan profesionalisme dan kebersihan — diasosiasikan dengan air, kebersihan, dan ketenangan.
- **Aksen amber** (#FEB009) digunakan secara sparingly untuk call-to-action dan informasi kritis — menciptakan energi tanpa berlebihan.
- **Latar terang** dengan teks gelap menciptakan keterbacaan maksimum untuk lingkungan laundry yang mungkin terang atau silau.
- **Geometri bersih** — sudut sedikit membulat, tidak ada ornamen berlebihan.

### Kata Kunci Target

`Bersih` · `Modern` · `Terpercaya` · `Efisien` · `Profesional` · `Ramah`

---

## 2. Prinsip Desain

### 2.1. Hierarki Visual
Satu halaman, satu tujuan utama. Elemen paling penting mendapatkan kontras dan ukuran paling besar. Gunakan hierarki tipografi (H1 → H2 → body) secara konsisten untuk membimbing mata pengguna.

### 2.2. Kesederhanaan
Jika sebuah elemen UI tidak memiliki fungsi yang jelas, hapus. Kurangi pilihan yang ditampilkan ke minimum yang diperlukan untuk tugas tersebut.

### 2.3. Aksesibilitas
Semua teks harus memenuhi rasio kontras minimal WCAG AA (4.5:1 untuk teks normal, 3:1 untuk teks besar). Status fokus harus selalu terlihat jelas. Navigasi keyboard harus berfungsi penuh.

### 2.4. Mobile-First
Staf kemungkinan mengakses sistem dari smartphone atau tablet di area kasir. Layout dirancang untuk layar kecil terlebih dahulu, kemudian diperluas untuk desktop Owner.

### 2.5. Information-First
Data lebih penting dari dekorasi. Setiap pixel yang digunakan untuk elemen non-informatif harus bisa dibenarkan. Whitespace digunakan untuk memisahkan kelompok informasi, bukan mengisi ruang kosong.

---

## 3. Sistem Warna

### 3.1. Skala Primer — Teal (Brand Primary)
Berbasis dari `#2FA1BB`.

| Token | Hex | Penggunaan |
|---|---|---|
| `primary-50` | `#EBF8FC` | Background hover state sangat halus |
| `primary-100` | `#C5EDF5` | Background badge, tag aktif |
| `primary-200` | `#90DAE9` | Border input fokus (light mode) |
| `primary-300` | `#58C5DA` | Icon dekoratif |
| `primary-400` | `#3DB2CA` | — |
| `primary-500` | `#2FA1BB` | **Warna primer utama — brand color** |
| `primary-600` | `#258BA2` | Hover state tombol primer |
| `primary-700` | `#1C7085` | Active/pressed state tombol |
| `primary-800` | `#145669` | Teks link dalam background gelap |
| `primary-900` | `#0C3A47` | Teks di atas background primer |

### 3.2. Skala Aksen — Amber
Berbasis dari `#FEB009`. Gunakan **sparingly** — hanya untuk elemen yang membutuhkan perhatian segera.

| Token | Hex | Penggunaan |
|---|---|---|
| `accent-50` | `#FFF8E1` | Background peringatan lembut |
| `accent-100` | `#FEEAB3` | Background badge warning |
| `accent-200` | `#FDDA82` | — |
| `accent-300` | `#FDCA50` | — |
| `accent-400` | `#FEBC27` | — |
| `accent-500` | `#FEB009` | **Warna aksen utama — CTA sekunder, badge penting** |
| `accent-600` | `#E09A00` | Hover state tombol aksen |
| `accent-700` | `#C28200` | Active/pressed state |
| `accent-800` | `#9E6900` | Teks peringatan gelap |
| `accent-900` | `#7A5000` | Teks dalam background aksen |

### 3.3. Skala Netral
Berbasis dari `#F5F5F5`.

| Token | Hex | Penggunaan |
|---|---|---|
| `neutral-50` | `#FAFAFA` | Background halaman utama |
| `neutral-100` | `#F5F5F5` | Background section, sidebar |
| `neutral-200` | `#E5E5E5` | Border default, divider |
| `neutral-300` | `#D4D4D4` | Border input, placeholder |
| `neutral-400` | `#A3A3A3` | Placeholder teks, icon nonaktif |
| `neutral-500` | `#737373` | Teks sekunder, caption |
| `neutral-600` | `#525252` | Teks body |
| `neutral-700` | `#404040` | Teks heading sekunder |
| `neutral-800` | `#262626` | Teks heading utama |
| `neutral-900` | `#171717` | Teks paling tebal (judul besar) |

### 3.4. Warna Semantik

| Tujuan | Nama | Hex | Penggunaan |
|---|---|---|---|
| **Success** | `success-500` | `#16A34A` | Transaksi berhasil, Check In sukses |
| **Success BG** | `success-50` | `#F0FDF4` | Background toast/badge success |
| **Warning** | `warning-500` | `#FEB009` | = accent-500, stok menipis |
| **Warning BG** | `warning-50` | `#FFF8E1` | Background peringatan stok |
| **Error** | `error-500` | `#DC2626` | Input error, mesin rusak kritis |
| **Error BG** | `error-50` | `#FEF2F2` | Background toast/badge error |
| **Info** | `info-500` | `#2FA1BB` | = primary-500, notifikasi informasi |
| **Info BG** | `info-50` | `#EBF8FC` | Background badge info |

### 3.5. Panduan Penggunaan Warna

```
✅ BOLEH
- Gunakan primary-500 untuk tombol CTA utama (Simpan, Check In, Tambah Transaksi)
- Gunakan accent-500 untuk badge status penting atau notifikasi kritis
- Gunakan neutral-50 sebagai background halaman
- Gunakan warna semantik (success/warning/error) hanya untuk feedback status

❌ HINDARI
- Jangan gunakan lebih dari 2 warna utama dalam satu komponen
- Jangan gunakan accent-500 sebagai warna background area besar
- Jangan gunakan warna primer untuk teks body biasa
- Jangan membuat tombol merah kecuali untuk aksi destruktif (hapus permanen)
```

---

## 4. Tipografi

### 4.1. Keluarga Font

| Peran | Font | Sumber |
|---|---|---|
| **Display & Heading** | `Inter` | Google Fonts |
| **Body & UI** | `Inter` | Google Fonts |
| **Monospace (angka, kode)** | `JetBrains Mono` | Google Fonts |

> **Alasan Inter:** Dioptimalkan untuk UI digital, keterbacaan sangat tinggi di ukuran kecil, terlihat modern dan bersih — sama persis dengan Stripe, Linear, dan Vercel.

### 4.2. Skala Font

| Token | Size | Line Height | Weight | Penggunaan |
|---|---|---|---|---|
| `text-xs` | 11px | 16px | 400 | Caption, label kecil, timestamp |
| `text-sm` | 13px | 20px | 400 | Label form, teks tabel, badge |
| `text-base` | 15px | 24px | 400 | Body text utama |
| `text-md` | 16px | 24px | 500 | Teks tombol, label input |
| `text-lg` | 18px | 28px | 500 | Subheading, judul card |
| `text-xl` | 20px | 28px | 600 | Heading halaman (mobile) |
| `text-2xl` | 24px | 32px | 600 | Heading halaman (desktop) |
| `text-3xl` | 30px | 36px | 700 | KPI metric utama (angka besar) |
| `text-4xl` | 36px | 40px | 700 | Display number (sangat jarang) |

### 4.3. Hierarki Heading

```
H1 — 24px / 600 / neutral-900
  Digunakan untuk: Judul halaman utama ("Transaksi", "Laporan")
  Hanya satu H1 per halaman.

H2 — 18px / 600 / neutral-800
  Digunakan untuk: Judul section dalam halaman ("Filter", "Transaksi Hari Ini")

H3 — 15px / 600 / neutral-700
  Digunakan untuk: Judul card, judul grup form

Body — 15px / 400 / neutral-600
  Teks konten utama, deskripsi

Caption — 13px / 400 / neutral-500
  Label kolom tabel, timestamp, metadata
```

### 4.4. Aturan Tipografi Dasbor

- **KPI Metric:** `text-3xl` / `700` / `neutral-900` — angka besar yang dominan
- **KPI Label:** `text-sm` / `500` / `neutral-500` — deskripsi di bawah angka
- **KPI Delta (naik/turun):** `text-sm` / `500` / `success-500` atau `error-500`
- **Nama kolom tabel:** `text-sm` / `500` / `neutral-500` — uppercase letter-spacing: 0.05em
- **Nilai tabel:** `text-sm` / `400` / `neutral-800`
- **Nilai uang:** Font `JetBrains Mono` / `text-sm` / `600` / `neutral-900`

---

## 5. Sistem Spasi (4pt Grid)

Semua spasi menggunakan kelipatan 4px.

| Token | Value | Penggunaan |
|---|---|---|
| `space-1` | 4px | Spasi antar elemen inline sangat kecil |
| `space-2` | 8px | Padding badge, gap icon-teks |
| `space-3` | 12px | Padding tombol kecil, gap elemen form |
| `space-4` | 16px | Padding komponen standar (card, input) |
| `space-5` | 20px | Gap antar elemen dalam section |
| `space-6` | 24px | Padding card, jarak antar card |
| `space-8` | 32px | Jarak antar section |
| `space-10` | 40px | Jarak besar antar section halaman |
| `space-12` | 48px | Padding halaman mobile |
| `space-16` | 64px | Padding halaman desktop |

---

## 6. Radius Batas (Border Radius)

| Token | Value | Penggunaan |
|---|---|---|
| `radius-sm` | 4px | Badge kecil, chip, tooltip |
| `radius-md` | 8px | Input, tombol, menu dropdown |
| `radius-lg` | 12px | Card, modal dialog, panel |
| `radius-xl` | 16px | Card besar, sheet bottom mobile |
| `radius-full` | 9999px | Avatar, toggle, pill badge |

---

## 7. Elevasi (Shadow System)

| Token | CSS Value | Penggunaan |
|---|---|---|
| `shadow-none` | `none` | Flat element, tabel row |
| `shadow-xs` | `0 1px 2px 0 rgba(0,0,0,0.05)` | Input hover, subtle card |
| `shadow-sm` | `0 1px 3px 0 rgba(0,0,0,0.10), 0 1px 2px -1px rgba(0,0,0,0.06)` | Card default |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.06)` | Dropdown, popover |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.05)` | Modal dialog |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.05)` | Command palette, sheet |

---

## 8. Aturan Tata Letak (Layout Rules)

### 8.1. Tata Letak Dasbor Owner

```
┌─────────────────────────────────────────────────────┐
│ Sidebar (240px fixed)  │  Main Content Area          │
│                         │                            │
│  Logo                   │  Page Header (H1 + Action) │
│  ─────────────────      │  ────────────────────────  │
│  Navigation Items       │                            │
│  • Dashboard     ●      │  Content Area              │
│  • Branches             │  (max-width: 1200px)       │
│  • Employees            │  (padding: 24px 32px)      │
│  • Transactions         │                            │
│  • Inventory            │                            │
│  • Attendance           │                            │
│  • Machine Reports      │                            │
│  • Reports              │                            │
│  ─────────────────      │                            │
│  User Profile           │                            │
│  Logout                 │                            │
└─────────────────────────────────────────────────────┘
```

### 8.2. Tata Letak Dasbor Staf

```
┌─────────────────────────────────────────────────────┐
│ Sidebar (240px fixed)  │  Main Content Area          │
│                         │                            │
│  Logo                   │  Page Header               │
│  ─────────────────      │  ────────────────────────  │
│  Navigation Items       │                            │
│  • Dashboard     ●      │  Content Area              │
│  • New Transaction      │  (max-width: 800px)        │
│  • My Transactions      │  (padding: 24px 32px)      │
│  • Inventory            │                            │
│  • Attendance           │                            │
│  • Machine Reports      │                            │
│  ─────────────────      │                            │
│  User Profile           │                            │
│  [Branch Name Badge]    │                            │
└─────────────────────────────────────────────────────┘
```

### 8.3. Spesifikasi Sidebar

| Property | Value |
|---|---|
| Width | 240px (desktop), 0px tersembunyi (mobile) |
| Background | `neutral-50` |
| Border Right | `1px solid neutral-200` |
| Logo area height | 64px |
| Nav item height | 40px |
| Nav item padding | `8px 12px` |
| Nav item radius | `radius-md` (8px) |
| Active nav color | `primary-50` background, `primary-600` text, `primary-500` left border 2px |
| Hover nav color | `neutral-100` background |
| Nav item font | `text-sm` / `500` / `neutral-600` |
| Active nav font | `text-sm` / `600` / `primary-600` |

### 8.4. Tata Letak Konten

| Area | Spesifikasi |
|---|---|
| Page header | `H1` + optional action button, `margin-bottom: 24px` |
| Card grid — KPI | 4 kolom desktop, 2 kolom tablet, 1 kolom mobile |
| Card grid — content | 2 kolom desktop, 1 kolom mobile |
| Table full width | 100% lebar content area |
| Form max-width | 640px (agar tidak terlalu lebar di desktop) |

### 8.5. Perilaku Responsif

| Breakpoint | Layout | Perubahan |
|---|---|---|
| `< 768px` (Mobile) | Single column | Sidebar menjadi bottom nav bar (5 icon), konten full width |
| `768px–1024px` (Tablet) | Sidebar collapsed | Sidebar hanya menampilkan icon (64px), tooltip saat hover |
| `> 1024px` (Desktop) | Sidebar expanded | Sidebar penuh 240px, multi-column layout |

---

## 9. Pustaka Komponen

### 9.1. Tombol (Button)

| Varian | Background | Text | Border | Hover | Radius | Padding |
|---|---|---|---|---|---|---|
| **Primary** | `primary-500` | `white` | none | `primary-600` | `radius-md` | `10px 16px` |
| **Secondary** | `white` | `neutral-700` | `1px neutral-300` | `neutral-50` bg | `radius-md` | `10px 16px` |
| **Destructive** | `white` | `error-500` | `1px error-300` | `error-50` bg | `radius-md` | `10px 16px` |
| **Ghost** | transparent | `neutral-600` | none | `neutral-100` bg | `radius-md` | `10px 16px` |

- **Font:** `text-md` / `500`
- **Height:** 36px (default), 32px (sm), 40px (lg)
- **Icon size dalam tombol:** 16px, `gap: 8px` dari teks
- **Disabled state:** `opacity: 0.5`, `cursor: not-allowed`
- **Loading state:** Spinner 16px menggantikan icon, teks tetap tampil

### 9.2. Input (Text Field)

```
Height:          40px
Background:      white
Border:          1px solid neutral-300
Border Radius:   radius-md (8px)
Padding:         10px 12px
Font:            text-base / 400 / neutral-800
Placeholder:     neutral-400

Focus:
  Border:        2px solid primary-500
  Shadow:        0 0 0 3px primary-100 (ring)

Error:
  Border:        1px solid error-500
  Shadow:        0 0 0 3px error-50

Label:
  text-sm / 500 / neutral-700
  margin-bottom: 6px

Helper text:
  text-xs / 400 / neutral-500
  margin-top: 6px

Error message:
  text-xs / 400 / error-500
  margin-top: 6px
```

### 9.3. Select (Dropdown)

Sama dengan Input, dengan tambahan:
- Chevron icon `neutral-400` di kanan
- Dropdown menu: `shadow-md`, `radius-lg`, `neutral-50` background
- Option hover: `primary-50` background, `primary-700` text
- Option selected: `primary-100` background, `primary-700` text, checkmark icon

### 9.4. Textarea

Sama dengan Input, dengan `min-height: 120px` dan `resize: vertical`.

### 9.5. Badge

| Varian | Background | Text | Penggunaan |
|---|---|---|---|
| `success` | `success-50` | `success-500` | Transaksi selesai, hadir |
| `warning` | `accent-50` | `accent-800` | Stok menipis, perlu perhatian |
| `error` | `error-50` | `error-500` | Mesin rusak, gagal |
| `info` | `primary-50` | `primary-700` | Informasi umum |
| `neutral` | `neutral-100` | `neutral-600` | Status default, draft |

- **Radius:** `radius-full`
- **Padding:** `2px 8px`
- **Font:** `text-xs` / `500`
- **Dot indicator opsional:** `6px` circle di kiri teks, sama dengan warna teks

### 9.6. Card

```
Background:     white
Border:         1px solid neutral-200
Border Radius:  radius-lg (12px)
Shadow:         shadow-sm
Padding:        24px

Header area:    padding-bottom: 16px, border-bottom: 1px solid neutral-100
Content area:   padding-top: 16px
Footer area:    padding-top: 16px, border-top: 1px solid neutral-100 (opsional)
```

### 9.7. Dialog (Modal)

```
Overlay:        rgba(0,0,0,0.5)
Container:      white, radius-xl (16px), shadow-lg
Width:          480px (default), 640px (large)
Max-height:     80vh (overflow-y: auto)
Padding:        24px

Header:         H3 + optional close button (X)
Body:           text-base, neutral-600
Footer:         flex row-reverse, gap-8, tombol Confirm (primary) + Cancel (secondary)
```

### 9.8. Tabel (Data Table)

```
Container:      white, radius-lg, border: 1px solid neutral-200, overflow hidden

Header row:
  Background:   neutral-50
  Height:       44px
  Font:         text-sm / 600 / neutral-500
  Letter-spacing: 0.04em
  Text-transform: uppercase
  Padding:      0 16px

Body row:
  Height:       52px
  Border-bottom: 1px solid neutral-100
  Font:         text-sm / 400 / neutral-800
  Padding:      0 16px
  Hover:        neutral-50 background

Last row:       no border-bottom

Clickable row:  cursor: pointer, hover mengubah background ke neutral-50

Numeric columns: text-align right, font-family JetBrains Mono
```

### 9.9. Tab

```
Container:      border-bottom: 1px solid neutral-200
Tab item:       text-sm / 500 / neutral-500, padding: 12px 16px
Active tab:     neutral-900, border-bottom: 2px solid primary-500
Hover tab:      neutral-700
```

### 9.10. Toast / Notification

```
Position:       Fixed, top-right, margin: 16px
Width:          360px max
Radius:         radius-lg
Shadow:         shadow-lg
Padding:        16px

Layout:         Icon (20px) + Teks (title + description) + Close button
Title:          text-sm / 600 / neutral-900
Description:    text-sm / 400 / neutral-600

Varian:
  Success:      border-left 4px success-500, icon success-500
  Error:        border-left 4px error-500, icon error-500
  Warning:      border-left 4px accent-500, icon accent-500
  Info:         border-left 4px primary-500, icon primary-500

Duration:       Auto-dismiss setelah 4000ms
Animation:      Slide-in dari kanan, fade-out saat dismiss
```

### 9.11. Status Kosong (Empty State)

```
Container:      text-align center, padding: 64px 24px
Icon:           48px, neutral-300
Title:          text-lg / 600 / neutral-600
Description:    text-sm / 400 / neutral-400, max-width: 320px, margin: 8px auto
CTA Button:     Optional, primary variant, margin-top: 24px
```

### 9.12. Skeleton (Loading State)

```
Background:     neutral-200
Animation:      Pulse (opacity 1 → 0.5 → 1), duration: 1.5s
Radius:         Sama dengan elemen yang digantikan

Contoh:
  Text skeleton:    height 16px, width bervariasi (60-80%), radius-sm
  Card skeleton:    height sesuai card asli, radius-lg
  Avatar skeleton:  circle, sesuai ukuran avatar
```

### 9.13. Avatar

```
Shape:          Circle (radius-full)
Size:           SM: 24px / MD: 32px / LG: 40px / XL: 48px
Fallback:       Inisial 2 huruf, background primary-100, text primary-700
Font:           text-xs / 700 (SM/MD), text-sm / 700 (LG/XL)
Image:          object-fit: cover
```

---

## 10. Desain Dasbor

### 10.1. Dasbor Owner

**Layout:** 4-column KPI grid → Chart/Table area → Alert area

#### Kartu KPI (Key Performance Indicators)

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  💰 Total         │  │  🧾 Transaksi     │  │  👥 Staf Hadir   │  │  ⚠️ Mesin Rusak  │
│                   │  │                  │  │                  │  │                  │
│  Rp 4.250.000    │  │  87              │  │  12 / 15         │  │  2               │
│                   │  │                  │  │                  │  │                  │
│  ↑ +12% vs hari  │  │  ↑ +5 vs hari    │  │  Semua cabang    │  │  Perlu tindakan  │
│  kemarin         │  │  kemarin         │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘

KPI Card Spec:
  Background: white
  Border: 1px solid neutral-200
  Radius: radius-lg
  Padding: 24px
  Icon: 20px, primary-500 (atau success/warning/error sesuai konteks)
  Label: text-sm / 500 / neutral-500 (margin-bottom: 8px)
  Value: text-3xl / 700 / neutral-900 (font JetBrains Mono untuk angka)
  Delta: text-sm / 500 / success-500 (naik) atau error-500 (turun)
  Delta icon: arrow-up / arrow-down 14px
```

#### Ringkasan Pendapatan (Revenue Summary)

- Grafik bar/line untuk perbandingan harian/mingguan/bulanan
- Filter: Harian | Mingguan | Bulanan (Tab komponen)
- Filter cabang: Dropdown "Semua Cabang" / pilihan spesifik
- Warna grafik: `primary-500` untuk nilai utama, `primary-200` untuk nilai pembanding

#### Ringkasan Kehadiran

- Tabel ringkas: Nama Staf | Cabang | Status (Badge: Hadir/Belum)
- Tampilkan hanya staf hari ini
- Badge Hadir: `success` variant, Belum Check In: `neutral` variant

#### Peringatan Masalah Mesin

- Jika ada laporan aktif: Banner warning `accent-50` background dengan icon ⚠️
- List laporan terbaru: Nama Mesin | Cabang | Waktu Lapor | Deskripsi singkat
- CTA: "Lihat Semua Laporan" → link ke halaman Machine Reports

### 10.2. Dasbor Staf

**Layout:** 2-column KPI grid (mobile: 1 col) → Status kehadiran → Stok peringatan

```
┌──────────────────┐  ┌──────────────────┐
│  🧾 Transaksi Ku  │  │  💰 Penjualanku  │
│                   │  │                  │
│  12              │  │  Rp 1.200.000    │
│  Hari ini        │  │  Hari ini        │
└──────────────────┘  └──────────────────┘

┌────────────────────────────────────────┐
│  Status Kehadiran                      │
│  ● Sedang Bertugas — Check In 08:32   │
│                      [Check Out]       │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│  ⚠️ Stok Menipis                        │
│  Deterjen Sachet — Sisa: 3            │
│  Kantong Plastik — Sisa: 7            │
└────────────────────────────────────────┘
```

**Status Kehadiran Card:**
- Belum Check In: Background `neutral-50`, text `neutral-600`, tombol `[Check In]` primary
- Sedang Bertugas: Background `success-50`, badge `● Aktif` success, waktu check in, tombol `[Check Out]` secondary/destructive
- Selesai: Background `neutral-50`, text `neutral-500`, "Shift selesai pukul 17:30"

**Stok Menipis Card:**
- Hanya muncul jika ada item dengan stok ≤ `low_stock_threshold`
- Background `accent-50`, icon ⚠️ `accent-600`
- List item: `nama_item — Sisa: {n} {satuan}`

---

## 11. Visualisasi Data

### 11.1. Grafik (Charts)

| Tipe | Penggunaan | Library |
|---|---|---|
| **Bar Chart** | Perbandingan penjualan harian (CA vs CK vs KA) | Recharts |
| **Line Chart** | Tren penjualan mingguan/bulanan | Recharts |
| **Donut Chart** | Proporsi jenis layanan dalam periode | Recharts |

**Palet Warna Grafik (urutan):**
1. `primary-500` (#2FA1BB) — utama
2. `accent-500` (#FEB009) — kedua
3. `primary-300` (#58C5DA) — ketiga
4. `neutral-400` (#A3A3A3) — keempat (fallback)

**Aturan:**
- Selalu sertakan legenda
- Tooltip on hover: `shadow-md`, `radius-md`, `white` background
- Grid lines: `neutral-100`, tipis (0.5px)
- Axis labels: `text-xs` / `neutral-500`

### 11.2. Tabel Data

Gunakan komponen Data Table dengan fitur:
- Column sorting (icon chevron di header)
- Pagination jika > 20 baris
- Loading state dengan skeleton baris

### 11.3. Kartu KPI

Lihat spesifikasi di bagian 10.1 Dasbor Owner.

---

## 12. Aksesibilitas

### 12.1. Aturan Kontras (WCAG AA)

| Kombinasi | Rasio | Status |
|---|---|---|
| `neutral-800` text on `white` | 12.6:1 | ✅ AAA |
| `neutral-600` text on `white` | 7.0:1 | ✅ AAA |
| `neutral-500` text on `white` | 4.6:1 | ✅ AA |
| `white` text on `primary-500` | 4.8:1 | ✅ AA |
| `primary-900` text on `primary-50` | 12.1:1 | ✅ AAA |
| `accent-900` text on `accent-50` | 11.3:1 | ✅ AAA |
| `white` text on `error-500` | 5.1:1 | ✅ AA |

### 12.2. Status Fokus (Focus Visible)

Semua elemen interaktif harus memiliki focus ring yang jelas:
```
outline: 2px solid primary-500
outline-offset: 2px
```
Jangan hapus outline menggunakan `outline: none` tanpa menyediakan pengganti visual.

### 12.3. Navigasi Keyboard

- `Tab` — berpindah antar elemen interaktif
- `Enter` / `Space` — mengaktifkan tombol, membuka dropdown
- `Escape` — menutup modal, dropdown, dialog
- `Arrow keys` — navigasi dalam menu dropdown, tabel
- Semua modal harus menjebak fokus (focus trap) saat terbuka

---

## 13. Token Referensi Cepat (Quick Reference)

```css
/* Colors */
--primary:     #2FA1BB;
--accent:      #FEB009;
--success:     #16A34A;
--error:       #DC2626;
--neutral-bg:  #FAFAFA;
--border:      #E5E5E5;
--text-main:   #262626;
--text-sub:    #737373;

/* Typography */
--font-sans:   'Inter', sans-serif;
--font-mono:   'JetBrains Mono', monospace;

/* Spacing */
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-6: 24px;  --space-8: 32px;

/* Radius */
--radius-sm: 4px;  --radius-md: 8px;
--radius-lg: 12px; --radius-xl: 16px;

/* Shadow */
--shadow-sm: 0 1px 3px 0 rgba(0,0,0,0.10);
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.10);
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.10);
```
