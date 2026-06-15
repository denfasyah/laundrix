import { LogIn, LogOut } from 'lucide-react';
import { AttendanceInfo } from '@/features/staff/dashboard/dashboard.types';

export function StaffAttendanceCard({ attendance }: { attendance: AttendanceInfo }) {
  const isOnDuty = attendance.status === 'on_duty';

  return (
    <div className="bg-[#fbf9f9] border border-[#c3cdd1] rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <img
            alt="Foto Profil"
            className="w-20 h-20 rounded-xl object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYXftI2-2dikRLZN18SI-HNd-t7sZk8qRrsLEbjws3uVNxxBPc-xnqGG1opkgBi0dhmqE0BGbu4BJBRlejMM9NuHvPzc-kv1RHEncqp9wJondIK187HDlOc6hmWl3qMAFcXvEfdOar29iJDTO-VayY_mmTCSFdpDQXHww0Gwe-rm0VHQYILvCO8NrZYC5ezEqBTl6nlNc90hh81xbJru2NkiZbSSZYuKViYSkWYyYIJtBU0iHdnJeLt77RqNafufvFNYtkG54RFMw"
          />
          <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isOnDuty ? 'bg-[#22C55E]' : 'bg-[#A3A3A3]'}`} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${isOnDuty ? 'bg-[#F0FDF4] text-[#22C55E]' : 'bg-[#F5F5F5] text-[#737373]'}`}>
              {isOnDuty ? 'Sedang Bertugas' : 'Tidak Bertugas'}
            </span>
            <span className="text-[11px] text-[#A3A3A3] font-medium">
              • Mulai {attendance.checkInTime} WIB
            </span>
          </div>
          <h3 className="text-[18px] font-bold text-[#1b1c1c] leading-tight">{attendance.name}</h3>
          <p className="text-[13px] text-[#3e484c]">{attendance.shift} • {attendance.shiftHours}</p>
        </div>
      </div>

      <div className="flex gap-3 shrink-0">
        <button className="bg-[#00687b] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
          <LogIn className="w-4 h-4" />
          Check In
        </button>
        <button className="bg-white border border-[#E5E5E5] text-[#1b1c1c] px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#f5f5f5] transition-colors flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Check Out
        </button>
      </div>
    </div>
  );
}
