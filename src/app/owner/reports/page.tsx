'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Download, CalendarDays, ArrowUpRight, ArrowDownRight, Store, Users, WashingMachine } from 'lucide-react';

const monthlyData = [
  { month: 'Jul', revenue: 45, trx: 60 },
  { month: 'Agt', revenue: 60, trx: 72 },
  { month: 'Sep', revenue: 50, trx: 55 },
  { month: 'Okt', revenue: 80, trx: 88 },
  { month: 'Nov', revenue: 70, trx: 75 },
  { month: 'Des', revenue: 95, trx: 95 },
];

const branchReports = [
  { branch: 'Sudirman Central', revenue: 42500000, trx: 1240, growth: 12.5, positive: true },
  { branch: 'Menteng Hub', revenue: 38200000, trx: 1105, growth: 8.2, positive: true },
  { branch: 'Gading Serpong', revenue: 29750000, trx: 890, growth: -3.1, positive: false },
  { branch: 'Ahmad Yani', revenue: 24100000, trx: 720, growth: 5.4, positive: true },
];

function formatRupiah(v: number) {
  if (v >= 1_000_000) return `Rp ${(v / 1_000_000).toFixed(1)}jt`;
  return `Rp ${v.toLocaleString('id-ID')}`;
}

export default function OwnerReportsPage() {
  const [period, setPeriod] = useState('Bulan Ini');

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Laporan & Analitik</h2>
          <p className="text-[15px] text-[#3e484c]">Ringkasan performa finansial dan operasional seluruh cabang.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-[#f5f3f3] border border-[#c3cdd1] rounded-lg p-1 gap-1">
            {['Minggu Ini', 'Bulan Ini', 'Tahun Ini'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all ${period === p ? 'bg-white text-[#00687b] shadow-sm' : 'text-[#6e797d] hover:text-[#1b1c1c]'}`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold hover:bg-[#004e5d] transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Unduh Laporan
          </button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 bg-gradient-to-br from-[#00687b] to-[#2fa1bb] p-6 rounded-xl shadow-sm text-white">
          <p className="text-[13px] text-white/80 font-semibold mb-2">Total Pendapatan (Bulan Ini)</p>
          <p className="font-mono text-[36px] font-bold leading-none mb-2">Rp 134.550.000</p>
          <div className="flex items-center gap-1 text-green-300 text-[13px] font-semibold">
            <ArrowUpRight className="w-4 h-4" />
            +9.3% dari bulan lalu
          </div>
        </div>
        <div className="bg-white border border-[#c3cdd1] p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[12px] font-semibold text-[#6e797d] mb-1">Total Transaksi</p>
            <p className="font-mono text-[26px] font-bold text-[#1b1c1c] leading-none">3.955</p>
            <div className="flex items-center gap-1 text-[#16A34A] text-[11px] font-semibold mt-1">
              <TrendingUp className="w-3 h-3" />
              +12.5%
            </div>
          </div>
          <div className="w-11 h-11 bg-[#EBF8FC] rounded-xl flex items-center justify-center text-[#00687b]">
            <BarChart3 className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white border border-[#c3cdd1] p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[12px] font-semibold text-[#6e797d] mb-1">Rata-rata / Transaksi</p>
            <p className="font-mono text-[26px] font-bold text-[#1b1c1c] leading-none">Rp 34.000</p>
            <div className="flex items-center gap-1 text-[#DC2626] text-[11px] font-semibold mt-1">
              <ArrowDownRight className="w-3 h-3" />
              -1.2%
            </div>
          </div>
          <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-[#805600]">
            <CalendarDays className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Chart & Branch Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Bar Chart */}
        <div className="lg:col-span-3 bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] font-semibold text-[#1b1c1c]">Tren Pendapatan 6 Bulan</h3>
            <div className="flex items-center gap-3 text-[12px]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#00687b]"></span>Pendapatan</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#fdaf06]"></span>Transaksi</span>
            </div>
          </div>
          <div className="h-52 flex items-end gap-3 px-2">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end">
                  <div className="flex-1 bg-[#00687b]/20 rounded-t-md hover:bg-[#00687b]/40 transition-all" style={{ height: `${d.revenue * 1.8}px` }} />
                  <div className="flex-1 bg-[#fdaf06]/30 rounded-t-md hover:bg-[#fdaf06]/60 transition-all" style={{ height: `${d.trx * 1.8}px` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 px-2">
            {monthlyData.map((d) => (
              <span key={d.month} className="flex-1 text-center text-[11px] font-bold text-[#6e797d] uppercase">{d.month}</span>
            ))}
          </div>
        </div>

        {/* Branch Breakdown */}
        <div className="lg:col-span-2 bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex flex-col">
          <h3 className="text-[18px] font-semibold text-[#1b1c1c] mb-5">Performa Per Cabang</h3>
          <div className="flex flex-col gap-4 flex-1">
            {branchReports.map((b, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#E5E5E5] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#EBF8FC] rounded-lg flex items-center justify-center text-[#00687b] shrink-0">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1b1c1c]">{b.branch}</p>
                    <p className="text-[11px] text-[#6e797d]">{b.trx.toLocaleString()} transaksi</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-mono font-bold text-[#1b1c1c]">{formatRupiah(b.revenue)}</p>
                  <p className={`text-[11px] font-semibold flex items-center justify-end gap-0.5 ${b.positive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {b.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {b.positive ? '+' : ''}{b.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#EBF8FC] rounded-xl flex items-center justify-center text-[#00687b]"><Store className="w-5 h-5" /></div>
            <h4 className="text-[15px] font-semibold text-[#1b1c1c]">Cabang Terbaik</h4>
          </div>
          <p className="font-mono text-[22px] font-bold text-[#00687b]">Sudirman Central</p>
          <p className="text-[13px] text-[#6e797d] mt-1">Rp 42.500.000 — 1.240 transaksi</p>
          <div className="mt-3 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden"><div className="h-full bg-[#00687b] rounded-full w-[90%]" /></div>
        </div>
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#16A34A]"><Users className="w-5 h-5" /></div>
            <h4 className="text-[15px] font-semibold text-[#1b1c1c]">Staf Paling Produktif</h4>
          </div>
          <p className="font-mono text-[22px] font-bold text-[#16A34A]">Lisa Kusuma</p>
          <p className="text-[13px] text-[#6e797d] mt-1">320 transaksi diproses bulan ini</p>
          <div className="mt-3 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden"><div className="h-full bg-[#16A34A] rounded-full w-[80%]" /></div>
        </div>
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#805600]"><WashingMachine className="w-5 h-5" /></div>
            <h4 className="text-[15px] font-semibold text-[#1b1c1c]">Utilisasi Mesin</h4>
          </div>
          <p className="font-mono text-[22px] font-bold text-[#805600]">87.5%</p>
          <p className="text-[13px] text-[#6e797d] mt-1">Rata-rata penggunaan 84 mesin aktif</p>
          <div className="mt-3 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden"><div className="h-full bg-[#fdaf06] rounded-full w-[87%]" /></div>
        </div>
      </div>
    </div>
  );
}
