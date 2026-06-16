'use client';

import { useState } from 'react';
import {
  ReceiptText,
  Banknote,
  Calculator,
  TrendingUp,
  Minus,
  Search,
  CalendarDays,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const transactions = [
  { time: '14:20', date: 'Hari ini', id: '#TRX-9402', branch: 'Sudirman', service: 'CA', retail: '-', payment: 'Tunai', total: 45000, staff: 'Lisa K.', initials: 'LK' },
  { time: '13:55', date: 'Hari ini', id: '#TRX-9401', branch: 'Ahmad Yani', service: 'CA', retail: 'Detergen (1)', payment: 'Tunai', total: 32500, staff: 'Agus S.', initials: 'AS' },
  { time: '13:30', date: 'Hari ini', id: '#TRX-9400', branch: 'Sudirman', service: 'CK (1)', retail: '-', payment: 'Tunai', total: 125000, staff: 'Lisa K.', initials: 'LK' },
  { time: '13:12', date: 'Hari ini', id: '#TRX-9399', branch: 'Sudirman', service: 'KA (1)', retail: 'Plastik (2)', payment: 'Tunai', total: 88200, staff: 'Lisa K.', initials: 'LK' },
  { time: '12:45', date: 'Hari ini', id: '#TRX-9398', branch: 'Ahmad Yani', service: 'KA (2)', retail: '-', payment: 'Tunai', total: 90000, staff: 'Agus S.', initials: 'AS' },
];

function formatRupiah(amount: number) {
  return amount.toLocaleString('id-ID');
}

export default function OwnerTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Semua Transaksi</h2>
          <p className="text-[15px] text-[#3e484c]">Pantau aktivitas finansial di seluruh cabang Laundrix.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#c3cdd1] rounded-lg text-[13px] font-semibold text-[#1b1c1c] hover:bg-[#f5f3f3] transition-all shadow-sm">
            <CalendarDays className="w-4 h-4 text-[#3e484c]" />
            Hari Ini
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold hover:bg-[#004e5d] transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Ekspor Laporan
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-[#c3cdd1] shadow-sm hover:border-[#2fa1bb] hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#EBF8FC] text-[#00687b] rounded-lg flex items-center justify-center">
              <ReceiptText className="w-5 h-5" />
            </div>
            <span className="text-[#16A34A] flex items-center gap-1 text-[13px] font-semibold">
              <TrendingUp className="w-4 h-4" />
              +12.5%
            </span>
          </div>
          <p className="text-[13px] text-[#6e797d] mb-1 font-medium">Total Transaksi (Hari Ini)</p>
          <p className="font-mono text-[28px] font-bold text-[#1b1c1c] leading-none">482</p>
          <p className="text-[11px] text-[#6e797d] mt-2">vs 428 transaksi kemarin</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#c3cdd1] shadow-sm hover:border-[#2fa1bb] hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#EBF8FC] text-[#00687b] rounded-lg flex items-center justify-center">
              <Banknote className="w-5 h-5" />
            </div>
            <span className="text-[#16A34A] flex items-center gap-1 text-[13px] font-semibold">
              <TrendingUp className="w-4 h-4" />
              +8.2%
            </span>
          </div>
          <p className="text-[13px] text-[#6e797d] mb-1 font-medium">Total Pendapatan (Hari Ini)</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[13px] font-semibold text-[#1b1c1c]">Rp</span>
            <p className="font-mono text-[26px] font-bold text-[#1b1c1c] leading-none">12.450.800</p>
          </div>
          <p className="text-[11px] text-[#6e797d] mt-2">vs Rp 11.506.000 kemarin</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#c3cdd1] shadow-sm hover:border-[#2fa1bb] hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#EBF8FC] text-[#00687b] rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-[#6e797d] flex items-center gap-1 text-[13px] font-semibold">
              <Minus className="w-4 h-4" />
              0.0%
            </span>
          </div>
          <p className="text-[13px] text-[#6e797d] mb-1 font-medium">Rata-rata Transaksi</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[13px] font-semibold text-[#1b1c1c]">Rp</span>
            <p className="font-mono text-[26px] font-bold text-[#1b1c1c] leading-none">25.800</p>
          </div>
          <p className="text-[11px] text-[#6e797d] mt-2">Nilai keranjang rata-rata</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-5 rounded-xl border border-[#c3cdd1] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          {/* Search */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[12px] font-semibold text-[#3e484c] uppercase tracking-wider">Cari Transaksi</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e797d] w-4 h-4" />
              <input
                className="w-full pl-10 pr-4 py-2 bg-[#f5f3f3] border border-[#bdc8cd] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00687b]/20 focus:border-[#00687b] transition-all"
                placeholder="ID Transaksi atau nama pelanggan..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Branch */}
          <div className="flex flex-col gap-1.5 w-full lg:w-44">
            <label className="text-[12px] font-semibold text-[#3e484c] uppercase tracking-wider">Cabang</label>
            <select
              className="w-full py-2 px-3 bg-[#f5f3f3] border border-[#bdc8cd] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00687b]/20 focus:border-[#00687b] transition-all"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="all">Semua Cabang</option>
              <option value="sudirman">Cabang Sudirman</option>
              <option value="ahmad-yani">Cabang Ahmad Yani</option>
              <option value="gatot-subroto">Cabang Gatot Subroto</option>
            </select>
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-1.5 w-full lg:w-44">
            <label className="text-[12px] font-semibold text-[#3e484c] uppercase tracking-wider">Metode Bayar</label>
            <select
              className="w-full py-2 px-3 bg-[#f5f3f3] border border-[#bdc8cd] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00687b]/20 focus:border-[#00687b] transition-all"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="all">Semua Metode</option>
              <option value="tunai">Tunai</option>
              <option value="qris">QRIS</option>
              <option value="transfer">Transfer Bank</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex flex-col gap-1.5 w-full lg:w-52">
            <label className="text-[12px] font-semibold text-[#3e484c] uppercase tracking-wider">Rentang Waktu</label>
            <div className="flex items-center bg-[#f5f3f3] border border-[#bdc8cd] rounded-lg px-3 py-2 gap-2">
              <CalendarDays className="text-[#6e797d] w-4 h-4 shrink-0" />
              <input
                className="w-full border-none p-0 bg-transparent text-[13px] focus:outline-none cursor-pointer"
                readOnly
                type="text"
                defaultValue="01 Jan 2024 – Hari ini"
              />
            </div>
          </div>

          {/* Filter icon button */}
          <button className="p-2 text-[#3e484c] hover:bg-[#f5f3f3] rounded-lg border border-[#bdc8cd] transition-colors self-end">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-[#c3cdd1] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider whitespace-nowrap">Waktu</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider whitespace-nowrap">ID Transaksi</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider whitespace-nowrap">Cabang</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider whitespace-nowrap">Layanan</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider whitespace-nowrap">Barang Retail</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider whitespace-nowrap">Pembayaran</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider whitespace-nowrap text-right">Total Bayar</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider whitespace-nowrap">Staf (Audit)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {transactions.map((trx, index) => (
                <tr key={index} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-[13px] font-medium text-[#1b1c1c]">{trx.time}</p>
                    <p className="text-[11px] text-[#6e797d]">{trx.date}</p>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-semibold text-[#00687b] whitespace-nowrap">{trx.id}</td>
                  <td className="px-6 py-4 text-[13px] text-[#1b1c1c] whitespace-nowrap">{trx.branch}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#EBF8FC] text-[#00687b] text-[13px] font-semibold">
                      {trx.service}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6e797d] whitespace-nowrap">{trx.retail}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full border border-teal-500/20 bg-teal-500/10 text-teal-700 text-[11px] font-bold">
                      {trx.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-mono font-semibold text-[#1b1c1c] text-right whitespace-nowrap">
                    {formatRupiah(trx.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#e9e8e7] flex items-center justify-center text-[10px] font-bold text-[#3e484c]">
                        {trx.initials}
                      </div>
                      <span className="text-[13px] text-[#1b1c1c]">{trx.staff}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-[#E5E5E5] gap-4 bg-white">
          <p className="text-[13px] text-[#6e797d]">
            Menampilkan <span className="font-bold text-[#1b1c1c]">1–5</span> dari <span className="font-bold text-[#1b1c1c]">482</span> transaksi
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-[#E5E5E5] text-[#6e797d] hover:bg-[#FAFAFA] disabled:opacity-40 transition-colors" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00687b] text-white text-[13px] font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#1b1c1c] hover:bg-[#FAFAFA] text-[13px] font-medium transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#1b1c1c] hover:bg-[#FAFAFA] text-[13px] font-medium transition-colors">3</button>
            <span className="px-2 text-[#6e797d]">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#1b1c1c] hover:bg-[#FAFAFA] text-[13px] font-medium transition-colors">97</button>
            <button className="p-1.5 rounded-lg border border-[#E5E5E5] text-[#6e797d] hover:bg-[#FAFAFA] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
