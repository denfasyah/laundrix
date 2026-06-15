import { ReceiptText, Banknote, TrendingUp } from 'lucide-react';
import { StaffKpiMetrics } from '@/features/staff/dashboard/dashboard.types';

export function StaffKpiCards({ metrics }: { metrics: StaffKpiMetrics }) {
  const salesPct = Math.round((metrics.todaySales / metrics.dailyTarget) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Transaksi */}
      <div className="bg-[#fbf9f9] border border-[#c3cdd1] rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold text-[#3e484c] uppercase tracking-wider">Transaksi Saya (Hari Ini)</span>
          <div className="bg-[#EBF8FC] p-2 rounded-lg text-[#00687b]">
            <ReceiptText className="w-5 h-5" />
          </div>
        </div>
        <p className="text-[32px] font-bold font-mono text-[#1b1c1c]">{metrics.todayTransactions}</p>
        <p className="text-[12px] text-[#16A34A] flex items-center gap-1 mt-2 font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          +{metrics.transactionsDiff} dari kemarin
        </p>
      </div>

      {/* Penjualan */}
      <div className="bg-[#fbf9f9] border border-[#c3cdd1] rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold text-[#3e484c] uppercase tracking-wider">Penjualan Saya (Hari Ini)</span>
          <div className="bg-[#FFF7ED] p-2 rounded-lg text-[#9A3412]">
            <Banknote className="w-5 h-5" />
          </div>
        </div>
        <p className="text-[28px] font-bold font-mono text-[#1b1c1c]">
          Rp {metrics.todaySales.toLocaleString('id-ID')}
        </p>
        <div className="mt-4">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-[#3e484c]">Target: Rp {metrics.dailyTarget.toLocaleString('id-ID')}</span>
            <span className="font-bold text-[#1b1c1c]">{salesPct}%</span>
          </div>
          <div className="w-full bg-[#f5f3f3] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#00687b] h-full rounded-full transition-all" style={{ width: `${salesPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
