import { Banknote, Receipt, Users, Wrench } from 'lucide-react';
import { MetricCard } from './metric-card';
import { DashboardMetrics } from '@/features/owner/dashboard/dashboard.types';

export function StatsGrid({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Pendapatan"
        value={`Rp ${metrics.totalRevenue.toLocaleString('id-ID')}`}
        subtitle="vs Rp 11.067.000 minggu lalu"
        icon={Banknote}
        trend={`+${metrics.revenueGrowth}%`}
        trendUp={true}
      />
      
      <MetricCard
        title="Transaksi"
        value={metrics.totalTransactions.toString()}
        subtitle={`Rata-rata Rp ${metrics.avgTransactionValue.toLocaleString('id-ID')}/pesanan`}
        icon={Receipt}
        trend={`+${metrics.transactionsGrowth}%`}
        trendUp={true}
      />

      <MetricCard
        title="Staf Hadir"
        value={`${metrics.staffPresent}/${metrics.totalStaff}`}
        subtitle=""
        icon={Users}
        trend="Aktif Sekarang"
        iconBgColor="bg-[#EBF8FC]"
        iconTextColor="text-[#00687b]"
      >
        <div className="mt-2 flex -space-x-2">
          <img alt="Staf" className="w-6 h-6 rounded-full border-2 border-[#fbf9f9]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf7N334OPqW7K90yZSlJl_Vc5kGgcBkEMmUnQW072dNpkTbtAhd-7SRd9Rvpr2ahmAZl0EICRJ-BabL7f3-EDyRtGz-njYN77bCtH7ZRQ7-3xriKvuJnlT4wdW73zwHbWnT_2bX3sg1_FwXMM7qAa0vR6W4i1P_0H7gWxpUzWJcj4AYU3PO0i3gBZ_oAXrmfLuiRaf96xAQ-9LvBkfCAKaT9jAIqN4gJw1yxioqZpUg-My_Lw-TWEHWwotY7ouOrqesCXgITUUSxs" />
          <img alt="Staf" className="w-6 h-6 rounded-full border-2 border-[#fbf9f9]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFdvOJFL5CZYkEwBTTPSFxsEurXli4LuGda2ncmQb1wEsN19FPDZOZ99APnsRexZKiIzR07Ey3HKRlw-EfH47XO8zsbnlxbTYgICzFoXj8nimYN19CJbD9BqfpF7vlznSF2e82BDCR1T3f4AYQYxE66Euv1XCpu2dbg1vtHdy_H9J6AcOi0YUWHy2PeePdPKUXuYSoCt-A6P8RNz5WSnT9Cs-SCWaggZBFRnCunJCisReOyOZ2PPuwprj_vUUDkq7pp2xoGNZohtk" />
          <img alt="Staf" className="w-6 h-6 rounded-full border-2 border-[#fbf9f9]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0rcd2-UlK0TqlkdgWm4Zw6mp608lQPCSHa65boGd6ozq6EODNY59YjiOGGChPaUiNDUIoXMakx09-DyJjLzWJGNrjg7XOduexVnWsIpPdTLc1mmkGFuEuZovNVhcDWMosr6mmovmHSXRmaIcqj220-_wdVYj8m6co0KROiSy1amIt4dENxcEARmowQRmQapVRx2QTnRaeFGOGi91-2ek3LpKR-nwFSJeAWHU-KAGJHh8LM2HcIbNs6GrblYvUW8caSu78YzwtVlw" />
          <div className="w-6 h-6 rounded-full border-2 border-[#fbf9f9] bg-[#e3e2e2] flex items-center justify-center text-[10px] font-bold text-[#3e484c]">+5</div>
        </div>
      </MetricCard>

      <MetricCard
        title="Tidak Beroperasi"
        value={(metrics.brokenWashers + metrics.brokenDryers).toString()}
        subtitle={`${metrics.brokenWashers} Mesin Cuci, ${metrics.brokenDryers} Pengering`}
        icon={Wrench}
        trend="Kritis"
        isWarning={true}
        iconBgColor="bg-[#ffdad6]"
        iconTextColor="text-[#DC2626]"
      />
    </div>
  );
}
