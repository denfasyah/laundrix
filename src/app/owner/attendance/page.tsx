'use client';

import { useState } from 'react';
import { UserCheck, UserX, LogOut, TrendingUp, Info, Filter, Download, ChevronLeft, ChevronRight, MoreVertical, ArrowRight } from 'lucide-react';

const attendanceData = [
  { initials: 'AR', name: 'Agus Raharjo', branch: 'Sudirman Central', date: '27 Okt 2023', checkIn: '07:55', checkOut: '17:05', status: 'Hadir', lateIn: false, earlyOut: false },
  { initials: 'SP', name: 'Siti Permata', branch: 'Sudirman Central', date: '27 Okt 2023', checkIn: '08:15', checkOut: '17:00', status: 'Terlambat', lateIn: true, earlyOut: false },
  { initials: 'BW', name: 'Bambang Wijaya', branch: 'Mentari Residence', date: '27 Okt 2023', checkIn: '--:--', checkOut: '--:--', status: 'Absen', lateIn: false, earlyOut: false },
  { initials: 'DA', name: 'Dewi Anggraini', branch: 'Gading Serpong', date: '27 Okt 2023', checkIn: '07:45', checkOut: '15:30', status: 'Hadir', lateIn: false, earlyOut: true },
];

const avatarColors: Record<string, string> = {
  AR: 'bg-[#2fa1bb] text-white',
  SP: 'bg-[#fdaf06] text-[#694600]',
  BW: 'bg-[#bdc8cd] text-[#3e484c]',
  DA: 'bg-[#2fa1bb] text-white',
};

export default function OwnerAttendancePage() {
  const [branchFilter, setBranchFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Manajemen Kehadiran</h2>
          <p className="text-[15px] text-[#3e484c]">Pantau kedisiplinan dan status kehadiran staf di seluruh cabang.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold hover:bg-[#004e5d] transition-all shadow-sm shrink-0 active:scale-95">
          <Download className="w-4 h-4" />
          Ekspor Laporan
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Staf Hadir */}
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-start justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="space-y-2 z-10">
            <p className="text-[13px] font-semibold text-[#6e797d]">Total Staf Hadir</p>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-[32px] font-bold text-[#00687b] leading-none">48</span>
              <span className="text-[14px] text-[#6e797d] ml-1">/ 52 Staf</span>
            </div>
            <div className="flex items-center gap-1 text-[#16A34A]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[11px]">92% Tingkat kehadiran hari ini</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#EBF8FC] flex items-center justify-center text-[#00687b] z-10 group-hover:scale-110 transition-transform shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Belum Check In */}
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-start justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="space-y-2 z-10">
            <p className="text-[13px] font-semibold text-[#6e797d]">Belum Check In</p>
            <p className="font-mono text-[32px] font-bold text-[#DC2626] leading-none">04</p>
            <div className="flex items-center gap-1 text-[#6e797d]">
              <Info className="w-4 h-4" />
              <span className="text-[11px]">Batas waktu check-in: 09:00 WIB</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#DC2626] z-10 group-hover:scale-110 transition-transform shrink-0">
            <UserX className="w-6 h-6" />
          </div>
        </div>

        {/* Check Out Awal */}
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-start justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="space-y-2 z-10">
            <p className="text-[13px] font-semibold text-[#6e797d]">Check Out Awal</p>
            <p className="font-mono text-[32px] font-bold text-[#805600] leading-none">02</p>
            <div className="flex items-center gap-1 text-[#805600]">
              <Info className="w-4 h-4" />
              <span className="text-[11px]">Memerlukan tinjauan manajer</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#805600] z-10 group-hover:scale-110 transition-transform shrink-0">
            <LogOut className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white px-5 py-4 border border-[#c3cdd1] rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#6e797d]" />
          <span className="text-[13px] font-semibold text-[#1b1c1c]">Filter:</span>
        </div>
        <div className="h-6 w-px bg-[#bdc8cd]"></div>
        <select
          className="bg-[#f5f3f3] border border-[#bdc8cd] rounded-lg px-3 py-2 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#00687b]/20 focus:border-[#00687b] transition-all"
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
        >
          <option value="all">Semua Cabang</option>
          <option value="sudirman">Sudirman Central</option>
          <option value="mentari">Mentari Residence</option>
          <option value="gading">Gading Serpong</option>
        </select>
        <input
          className="bg-[#f5f3f3] border border-[#bdc8cd] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00687b]/20 focus:border-[#00687b] transition-all"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <div className="flex-1" />
        <button
          className="text-[#00687b] font-semibold text-[13px] hover:underline transition-all"
          onClick={() => { setBranchFilter('all'); setDateFilter(new Date().toISOString().split('T')[0]); }}
        >
          Hapus Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#c3cdd1] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Nama Staf</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Cabang</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Waktu Masuk</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Waktu Keluar</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {attendanceData.map((row, index) => (
                <tr key={index} className="hover:bg-[#FAFAFA] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px] ${avatarColors[row.initials] ?? 'bg-[#e9e8e7] text-[#3e484c]'}`}>
                        {row.initials}
                      </div>
                      <span className="text-[14px] font-medium text-[#1b1c1c]">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6e797d]">{row.branch}</td>
                  <td className="px-6 py-4 font-mono text-[13px] text-[#1b1c1c]">{row.date}</td>
                  <td className={`px-6 py-4 font-mono text-[13px] font-semibold ${row.lateIn ? 'text-[#DC2626]' : row.checkIn === '--:--' ? 'text-[#bdc8cd]' : 'text-[#1b1c1c]'}`}>
                    {row.checkIn}
                  </td>
                  <td className={`px-6 py-4 font-mono text-[13px] font-semibold ${row.earlyOut ? 'text-[#805600]' : row.checkOut === '--:--' ? 'text-[#bdc8cd]' : 'text-[#1b1c1c]'}`}>
                    {row.checkOut}
                  </td>
                  <td className="px-6 py-4">
                    {row.status === 'Hadir' && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-green-50 text-[#16A34A] border border-green-200">Hadir</span>
                    )}
                    {row.status === 'Terlambat' && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-50 text-[#805600] border border-orange-200">Terlambat</span>
                    )}
                    {row.status === 'Absen' && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-50 text-[#DC2626] border border-red-200">Absen</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 rounded-lg hover:bg-[#f5f3f3] text-[#6e797d] transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-[#FAFAFA] flex flex-col sm:flex-row items-center justify-between border-t border-[#E5E5E5] gap-3">
          <span className="text-[13px] text-[#6e797d]">Menampilkan <span className="font-bold text-[#1b1c1c]">1–10</span> dari <span className="font-bold text-[#1b1c1c]">52</span> staf</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-[#E5E5E5] text-[#6e797d] hover:bg-white disabled:opacity-40 transition-colors" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00687b] text-white text-[13px] font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E5E5] text-[#1b1c1c] hover:bg-white text-[13px] font-medium transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E5E5] text-[#1b1c1c] hover:bg-white text-[13px] font-medium transition-colors">3</button>
            <button className="p-1.5 rounded-lg border border-[#E5E5E5] text-[#6e797d] hover:bg-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Insight Card */}
        <div className="bg-[#EBF8FC] border border-[#00687b]/20 p-6 rounded-xl flex gap-5 items-center shadow-sm">
          <div className="w-16 h-16 bg-[#00687b]/10 rounded-full flex items-center justify-center text-[#00687b] shrink-0">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-[16px] font-bold text-[#00687b]">Insight Mingguan</h4>
            <p className="text-[14px] text-[#3e484c] leading-relaxed">Kedisiplinan di cabang <span className="font-bold">Sudirman Central</span> meningkat 15% dibandingkan minggu lalu. Berikan apresiasi kepada tim!</p>
          </div>
        </div>

        {/* Help Card */}
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl flex justify-between items-center shadow-sm">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold text-[#6e797d] uppercase tracking-wider">Butuh bantuan?</p>
            <p className="text-[15px] font-medium text-[#1b1c1c]">Panduan lengkap manajemen absensi staf Laundrix.</p>
            <button className="text-[#00687b] font-bold text-[13px] flex items-center gap-1 hover:gap-2 transition-all mt-2">
              Baca Dokumentasi
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <img
            alt="Management Dashboard Visual"
            className="w-32 h-24 object-cover rounded-xl border border-[#c3cdd1] shadow-sm shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjTyfyLrE86pI1UFQFwDb90FwNbLwlCTMEgn3iNooja42sbio8LIEUA5q1qzvBgFHo4rtcL7g6WbZ_8P0Y-6xn81dHoaJpbjR-GTo8rdX3jN--NpcXbnSuRWUUGWd0rkhV_pRTP63djE0l3IL7Unfw9Uc0aiPIC7mQ5yVpYIJPayroWV8SgnLcXO_3cYgTP4joHMlS5KWcgLXEL4dpkfk5ByfLnw63NAjn62rQnbE2Hy_49gfozjwz6RM518Y11MyPUd_vNjvP_-o"
          />
        </div>
      </div>
    </div>
  );
}
