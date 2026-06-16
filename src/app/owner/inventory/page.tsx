'use client';

import { Package, AlertTriangle, Banknote, Plus, Download, Filter, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';

const inventoryItems = [
  {
    name: 'Deterjen Cair Premium (5L)',
    unit: 'Jerigen',
    stock: 12,
    price: 85000,
    status: 'Available',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMjcDuRB0Jlcwvrg-bxIlr_gHzUtVO6yOcHzzx7Dgy5YIqUVzlsrZC8CncHRzmaiKVeh1juQyi9wqc9IlNOIq00Pj1E8IpTQnHjdFAl6Xl2uFLVhfQ2hf6L-dYVQd9TPYhnf4lYvZgwgANVUI0hq46o6mS3FXfl8pBKQ64p8_IV2SrtB5VbJogrzkyr_KVLjsoAZoldnQl4-XzlMBi4kvjfLgPDX-mXlp23X1EXHIGl81zSWn3PbIZAV2etc2_BN9dl7Xe-cTUuSA',
  },
  {
    name: 'Softener Lavender (5L)',
    unit: 'Jerigen',
    stock: 2,
    price: 75000,
    status: 'Low Stock',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSLyPJIS5HNnzT80gHJaJo07v3nz1-IckEMD0zCfSq6Kd8H0KO7zqNdKv2K-0ygOIJkVB8SFUu_X1HPQqimO8nTvhb5dazNf94aYU1ylgZTeQQBdaS5cXXtWlMpxS_a8E2oMlE_6_PppGYqbmOUW8KPFkpxMCmJLe-auj4WDs8RXqasT5j8E_sGquNz_f8nGE7Luf3kYc277jkaOyvfaHWibsZMwgYbpYalTqPJas536-nd70vB33157KRFEQ7V6YMcfyCP_IjmG8',
  },
  {
    name: 'Hanger Plastik Hitam',
    unit: 'Lusin',
    stock: 45,
    price: 12000,
    status: 'Available',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8ywnmD9j7n7yQ4sh1DSEqwogl0CJMsjurSVE57kGaV-baa3W0UGRCTuBSQHsRktJ0RDNKEabaABgom3ITtk5lvEXeNdaxRry0nV6LcbZPbzKDpzBzoBDKqKyPhyXQjI8OPtg7eJJyPRv5SAdGOJgx_os43Qy8VaUYTfMF4Cfq0mej1Ic--tWykDAsHEliCxI0sbfAa1f_bwpCxHdS66pR0KDetCZNbp4fha6WrN0-Baq2arSHg2f6JpeswcVn9XdLIywnK4-y4BY',
  },
  {
    name: 'Plastik Packing (40x60)',
    unit: 'Pack',
    stock: 1,
    price: 25000,
    status: 'Low Stock',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjUWfmGfg349p8Fhm56lfv15EoISsqcSpcKfbFob7w_WtS_p2iOcZj33_UXDI9u-V88FYt-HLI6oldKRfkvqso_vB2sY6pe747LXSaMBc8Dm9H3E4SnQ9xEJ9MARGG00180GUJoaTXWVO8Esixa3V3KXOVzul1-RTU4xvDehQMR859razFknIxM2YstcwilU0q8S_7okjy_-QhdHm12RX8p0rzTJ0dp0ySEajPzb_ZzX9N067z4O-Hf5Dxo0p77u9M2e0RCsKQlYE',
  },
];

const barData = [
  { day: 'Sen', value: 40 },
  { day: 'Sel', value: 65 },
  { day: 'Rab', value: 45 },
  { day: 'Kam', value: 85 },
  { day: 'Jum', value: 55 },
  { day: 'Sab', value: 75 },
  { day: 'Min', value: 95, active: true },
];

function formatRupiah(v: number) {
  return `Rp ${v.toLocaleString('id-ID')}`;
}

export default function OwnerInventoryPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Manajemen Inventaris</h2>
          <p className="text-[15px] text-[#3e484c]">Pantau dan kelola stok barang retail di seluruh cabang.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <select className="bg-white border border-[#c3cdd1] rounded-lg px-3 py-2 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#00687b]/20 focus:border-[#00687b] transition-all">
            <option>Semua Cabang</option>
            <option>Cabang Jakarta Selatan</option>
            <option>Cabang Tangerang</option>
            <option>Cabang Depok</option>
          </select>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold hover:bg-[#004e5d] transition-all shadow-sm active:scale-95">
            <Plus className="w-4 h-4" />
            Tambah Stok (Restock)
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#EBF8FC] flex items-center justify-center text-[#00687b] shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-0.5">Total Item</p>
            <div className="flex items-baseline gap-1">
              <p className="font-mono text-[30px] font-bold text-[#1b1c1c] leading-none">8</p>
              <span className="text-[13px] text-[#6e797d]">Jenis</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#c3cdd1] border-l-4 border-l-[#DC2626] p-6 rounded-xl shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#DC2626] shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-0.5">Stok Menipis</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-[30px] font-bold text-[#1b1c1c] leading-none">3</p>
              <span className="px-2 py-0.5 bg-red-50 text-[#DC2626] rounded-md text-[10px] font-bold uppercase tracking-wider border border-red-200">Perlu Tindakan</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#805600] shrink-0">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-0.5">Nilai Inventaris</p>
            <p className="font-mono text-[26px] font-bold text-[#1b1c1c] leading-none">Rp 2.450.000</p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-[#c3cdd1] rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-white">
          <h3 className="text-[18px] font-semibold text-[#1b1c1c]">Daftar Stok Barang</h3>
          <div className="flex gap-2">
            <button className="p-2 text-[#6e797d] hover:bg-[#f5f3f3] rounded-lg transition-colors" title="Export CSV">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#6e797d] hover:bg-[#f5f3f3] rounded-lg transition-colors" title="Filter">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Nama Item</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Satuan</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Stok Total</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Harga Jual</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {inventoryItems.map((item, i) => {
                const isLow = item.status === 'Low Stock';
                return (
                  <tr key={i} className="hover:bg-[#FAFAFA] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#e9e8e7] flex items-center justify-center overflow-hidden shrink-0">
                          <img alt={item.name} className="w-full h-full object-cover" src={item.img} />
                        </div>
                        <span className="text-[14px] font-semibold text-[#1b1c1c]">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#6e797d]">{item.unit}</td>
                    <td className={`px-6 py-4 font-mono text-[14px] font-bold ${isLow ? 'text-[#DC2626]' : 'text-[#1b1c1c]'}`}>{item.stock}</td>
                    <td className="px-6 py-4 font-mono text-[13px] text-[#1b1c1c]">{formatRupiah(item.price)}</td>
                    <td className="px-6 py-4">
                      {isLow ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-[#DC2626] border border-red-200">Low Stock</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-[#16A34A] border border-green-200">Available</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-[#6e797d] hover:text-[#00687b] hover:bg-[#EBF8FC] rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <Pencil className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#E5E5E5] flex items-center justify-between">
          <p className="text-[13px] text-[#6e797d]">Menampilkan <span className="font-bold text-[#1b1c1c]">4</span> dari <span className="font-bold text-[#1b1c1c]">8</span> item</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 border border-[#E5E5E5] rounded-lg text-[#6e797d] hover:bg-white disabled:opacity-40 transition-colors" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00687b] text-white text-[13px] font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E5E5] text-[#1b1c1c] hover:bg-white text-[13px] font-medium transition-colors">2</button>
            <button className="p-1.5 border border-[#E5E5E5] rounded-lg text-[#6e797d] hover:bg-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Bar Chart */}
        <div className="lg:col-span-3 bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm">
          <h3 className="text-[18px] font-semibold text-[#1b1c1c] mb-6">Aliran Stok 7 Hari Terakhir</h3>
          <div className="h-52 w-full flex items-end gap-3 px-2 pb-2">
            {barData.map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center relative group">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1b1c1c] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {bar.value * 3}
                  </span>
                  <div
                    className={`w-full rounded-t-lg transition-all ${bar.active ? 'bg-[#00687b]' : 'bg-[#00687b]/20 hover:bg-[#00687b]/40'}`}
                    style={{ height: `${bar.value * 2}px` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 px-2">
            {barData.map((bar) => (
              <span key={bar.day} className={`flex-1 text-center text-[11px] font-bold uppercase ${bar.active ? 'text-[#00687b]' : 'text-[#6e797d]'}`}>
                {bar.day}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Recommendation Card */}
          <div className="bg-gradient-to-br from-[#0C3A47] to-[#00687b] text-white p-6 rounded-xl shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h3 className="text-[18px] font-bold">Saran Pengadaan</h3>
              <svg className="w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <p className="text-[13px] text-white/80 leading-relaxed">Berdasarkan data 30 hari terakhir, Anda sebaiknya memesan <span className="font-bold text-white">Deterjen Premium</span> sekarang untuk menghindari kekosongan stok di akhir pekan.</p>
            <button className="w-full bg-white text-[#00687b] font-bold py-3 rounded-lg hover:bg-[#EBF8FC] transition-all text-[13px] active:scale-[0.98]">
              Pesan Stok Otomatis
            </button>
          </div>

          {/* Most Active Branches */}
          <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex-1">
            <h3 className="text-[16px] font-semibold text-[#1b1c1c] mb-4">Cabang Teraktif</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00687b]"></div>
                  <span className="text-[13px] font-semibold text-[#1b1c1c]">Jakarta Selatan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00687b] rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="font-mono text-[12px] text-[#6e797d] w-16 text-right">45% Penggunaan</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#fdaf06]"></div>
                  <span className="text-[13px] font-semibold text-[#1b1c1c]">Tangerang</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#fdaf06] rounded-full" style={{ width: '32%' }}></div>
                  </div>
                  <span className="font-mono text-[12px] text-[#6e797d] w-16 text-right">32% Penggunaan</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#bdc8cd]"></div>
                  <span className="text-[13px] font-semibold text-[#1b1c1c]">Depok</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#bdc8cd] rounded-full" style={{ width: '23%' }}></div>
                  </div>
                  <span className="font-mono text-[12px] text-[#6e797d] w-16 text-right">23% Penggunaan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
