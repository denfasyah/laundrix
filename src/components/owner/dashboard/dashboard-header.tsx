import { Calendar, Download } from 'lucide-react';

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h2 className="text-[30px] font-bold text-[#1b1c1c] tracking-tight leading-tight mb-1">Dashboard</h2>
        <p className="text-[#3e484c] text-[15px]">Pantau kinerja dan operasi real-time fasilitas Anda.</p>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-[#efeded] border border-[#bdc8cd] rounded-lg text-[13px] font-semibold flex items-center gap-2 hover:bg-[#e9e8e7] transition-colors">
          <Calendar className="w-4 h-4" />
          Hari Ini
        </button>
        <button className="px-4 py-2 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold flex items-center gap-2 shadow-sm hover:opacity-95 transition-opacity">
          <Download className="w-4 h-4" />
          Ekspor Data
        </button>
      </div>
    </div>
  );
}
