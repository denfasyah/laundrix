'use client';

import { Download, Plus, BarChart2, Banknote, Calendar, Tag, Filter, Pencil, Trash2, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MyTransactionsPage() {
  const transactions = [
    { id: 'LX-10025', time: '14:20', service: 'CK (1)', retail: '-', paymentStatus: 'Tunai', total: 'Rp 10.000', locked: false },
    { id: 'LX-10024', time: '12:15', service: 'CA (2)', retail: 'Pewangi (1)', paymentStatus: 'Tunai', total: 'Rp 20.000', locked: false },
    { id: 'LX-10023', time: '10:45', service: 'KA (1)', retail: 'Deterjen (1)', paymentStatus: 'Tunai', total: 'Rp 11.000', locked: false },
    { id: 'LX-10022', time: '09:10', service: 'CK (1)', retail: 'Deterjen (2)', paymentStatus: 'Tunai', total: 'Rp 12.000', locked: true },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Transaksi Saya</h2>
          <p className="text-[#3e484c] text-[15px]">Lihat dan kelola riwayat transaksi Anda hari ini.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#bdc8cd] rounded-lg text-[13px] font-semibold hover:bg-[#efeded] transition-all">
            <Download className="w-5 h-5" />
            Ekspor Laporan
          </button>
          <Link href="/staff/transactions/new" className="flex items-center gap-2 px-4 py-2 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold hover:opacity-90 transition-all shadow-sm">
            <Plus className="w-5 h-5" />
            Buat Baru
          </Link>
        </div>
      </section>

      {/* KPI Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl border border-[#c3cdd1] shadow-sm hover:shadow-md transition-shadow bg-[#fbf9f9]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#3e484c] font-semibold text-[13px] uppercase tracking-wider">Total Transaksi Hari Ini</p>
            <BarChart2 className="text-[#00687b] w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[28px] font-bold text-[#1b1c1c]">12</span>
            <span className="text-[#16A34A] text-sm font-semibold">+8% vs kemarin</span>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-[#c3cdd1] shadow-sm hover:shadow-md transition-shadow bg-[#fbf9f9]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#3e484c] font-semibold text-[13px] uppercase tracking-wider">Total Penjualan</p>
            <Banknote className="text-[#00687b] w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[28px] font-bold text-[#1b1c1c] tracking-tight">Rp 1.250.000</span>
            <span className="text-[#16A34A] text-sm font-semibold">Aktif</span>
          </div>
        </div>

        {/* Message Card */}
        <div className="hidden lg:flex col-span-2 relative overflow-hidden rounded-xl items-center px-8 border border-[#c3cdd1] bg-[#fbf9f9]">
          <div className="relative z-10 text-[#1b1c1c]">
            <h4 className="text-[18px] font-bold mb-1">Ringkasan Operasional</h4>
            <p className="text-[#3e484c] text-[15px]">Semua data transaksi di bawah adalah transaksi yang tercatat atas nama Anda.</p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="p-4 rounded-xl border border-[#c3cdd1] flex flex-wrap items-center gap-4 bg-[#fbf9f9]">
        <div className="flex flex-col gap-1 min-w-[200px]">
          <label className="text-[13px] font-semibold text-[#3e484c] px-1">Pilih Tanggal</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3e484c] w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-2 border border-[#bdc8cd] rounded-lg text-[15px] focus:ring-1 focus:ring-[#00687b] focus:border-[#00687b] outline-none" 
              type="date" 
              defaultValue="2023-10-27" 
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <label className="text-[13px] font-semibold text-[#3e484c] px-1">Cari ID Transaksi</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3e484c] w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-2 border border-[#bdc8cd] rounded-lg text-[15px] focus:ring-1 focus:ring-[#00687b] focus:border-[#00687b] outline-none" 
              placeholder="Contoh: LX-10023" 
              type="text" 
            />
          </div>
        </div>
        <div className="flex items-end h-full self-end pt-5">
          <button className="px-8 py-2 bg-[#00687b] text-white rounded-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2 h-[42px]">
            <Filter className="w-4 h-4" />
            Terapkan Filter
          </button>
        </div>
      </section>

      {/* Data Table */}
      <section className="bg-white rounded-xl border border-[#c3cdd1] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f3f4f6] border-b border-[#E5E5E5]">
                <th className="px-6 py-4 text-[13px] font-bold text-[#3e484c] uppercase tracking-wider">Waktu</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#3e484c] uppercase tracking-wider">ID Transaksi</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#3e484c] uppercase tracking-wider">Layanan</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#3e484c] uppercase tracking-wider">Barang Retail</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#3e484c] uppercase tracking-wider">Pembayaran</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#3e484c] uppercase tracking-wider">Total Bayar</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#3e484c] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {transactions.map((tx, idx) => (
                <tr key={idx} className={`hover:bg-[#f3f4f6] transition-colors group ${tx.locked ? 'opacity-75' : ''}`}>
                  <td className="px-6 py-4 font-mono text-[15px] font-medium text-[#1b1c1c]">{tx.time}</td>
                  <td className="px-6 py-4 font-mono text-[15px] font-bold text-[#00687b]">{tx.id}</td>
                  <td className="px-6 py-4">
                    <span className="text-[15px] font-semibold">{tx.service}</span>
                  </td>
                  <td className="px-6 py-4 text-[15px] text-[#3e484c]">{tx.retail}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#16A34A]/10 text-[#16A34A] text-[11px] font-bold rounded-full uppercase border border-[#16A34A]/20">
                      {tx.paymentStatus}&nbsp;
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[15px] text-[#1b1c1c] font-semibold">{tx.total}</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {!tx.locked ? (
                      <>
                        <button className="p-1 text-[#00687b] hover:bg-[#00687b]/10 rounded transition-all mr-2" title="Edit Transaksi">
                          <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="p-1 text-[#DC2626] hover:bg-[#DC2626]/10 rounded transition-colors" title="Hapus Transaksi">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <span title="Sudah terkunci" className="inline-block mr-2">
                        <Lock className="w-4 h-4 text-[#bdc8cd]" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-[#f3f4f6] px-6 py-2 flex flex-col sm:flex-row items-center justify-between border-t border-[#E5E5E5] gap-4">
          <p className="text-[13px] text-[#3e484c]">
            Menampilkan <span className="font-bold">1-{transactions.length}</span> dari <span className="font-bold">12</span> transaksi
          </p>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#bdc8cd] bg-white opacity-50 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#00687b] bg-[#00687b] text-white font-bold text-xs">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-[#bdc8cd] bg-white opacity-50 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
