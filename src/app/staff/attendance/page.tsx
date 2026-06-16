'use client';

import { useState, useEffect } from 'react';
import { LogIn, LogOut, Clock, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AttendancePage() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setCurrentDate(now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    const timer = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(timer);
  }, []);

  const history = [
    { date: '24 Mei 2024', in: '07:55', out: '16:05', total: '08h 10m', status: 'Tepat Waktu', statusColor: 'bg-green-100 text-[#16A34A]' },
    { date: '23 Mei 2024', in: '08:02', out: '16:00', total: '07h 58m', status: 'Terlambat', statusColor: 'bg-orange-100 text-[#805600]' },
    { date: '22 Mei 2024', in: '07:58', out: '16:15', total: '08h 17m', status: 'Tepat Waktu', statusColor: 'bg-green-100 text-[#16A34A]' },
    { date: '21 Mei 2024', in: '07:50', out: '16:00', total: '08h 10m', status: 'Tepat Waktu', statusColor: 'bg-green-100 text-[#16A34A]' },
    { date: '20 Mei 2024', in: '--:--', out: '--:--', total: '00h 00m', status: 'Absen', statusColor: 'bg-red-100 text-[#DC2626]' },
  ];

  return (
    <div className="w-full flex flex-col gap-6 max-w-[1200px]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Absensi</h2>
          <p className="text-[15px] text-[#3e484c]">Catat kehadiran dan pantau riwayat jam kerja Anda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Check-in Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#c3cdd1] shadow-sm flex flex-col md:flex-row items-center justify-between relative overflow-hidden p-6 gap-4">
          <div className="space-y-2 relative z-10">
            <div className="flex flex-wrap items-center gap-4">
              <h3 className="text-[24px] font-semibold text-[#0C3A47]">Halo, Budi!</h3>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${isCheckedIn ? 'bg-green-100 text-[#16A34A]' : 'bg-red-100 text-[#DC2626]'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isCheckedIn ? 'bg-[#16A34A]' : 'bg-[#DC2626] animate-pulse'}`}></span>
                <span className="text-[11px] font-bold tracking-wide uppercase">{isCheckedIn ? 'Status: Hadir' : 'Belum Hadir'}</span>
              </div>
            </div>
            <p className="text-[13px] text-[#3e484c]">
              Silakan lakukan <span className="font-semibold text-[#00687b]">{isCheckedIn ? 'Check Out' : 'Check In'}</span> untuk {isCheckedIn ? 'mengakhiri' : 'memulai'} shift hari ini.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="space-y-1">
                <p className="text-[11px] text-[#3e484c] uppercase tracking-wider font-semibold">{currentDate || 'Memuat...'}</p>
                <p className="font-mono text-[20px] font-bold text-[#0C3A47] tracking-tighter leading-none">{currentTime || '--:--:--'}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsCheckedIn(!isCheckedIn)}
            className={`relative z-10 w-full md:w-auto text-white rounded-lg text-[14px] font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm px-6 py-3 ${isCheckedIn ? 'bg-[#DC2626] hover:bg-red-700' : 'bg-[#00687b] hover:bg-[#004e5d]'}`}
          >
            {isCheckedIn ? <LogOut className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            <span>{isCheckedIn ? 'Check Out' : 'Check In'}</span>
          </button>
        </div>

        {/* Shift Info Bento Card */}
        <div className="bg-white rounded-xl border border-[#c3cdd1] shadow-sm p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[13px] font-bold text-[#3e484c] uppercase tracking-wider">Jadwal Shift</h4>
              <Clock className="text-[#00687b] w-5 h-5" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#FAFAFA] rounded border border-[#E5E5E5]">
                <p className="text-[11px] text-[#00687b] font-semibold mb-1">Shift Pagi</p>
                <p className="font-mono text-[13px] font-medium text-[#1b1c1c]">08:00 - 16:00</p>
              </div>
              <div className="p-3 bg-[#FAFAFA] rounded border border-[#E5E5E5] opacity-60">
                <p className="text-[11px] text-[#3e484c] font-semibold mb-1">Istirahat</p>
                <p className="font-mono text-[13px] font-medium text-[#1b1c1c]">12:00 - 13:00</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
            <button className="w-full text-left text-[12px] font-semibold text-[#00687b] hover:underline transition-all">Lihat Jadwal Mingguan</button>
          </div>
        </div>
      </div>

      {/* History Section */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-[18px] font-semibold text-[#0C3A47]">Riwayat Kehadiran</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-[#c3cdd1] rounded-lg text-[13px] font-semibold text-[#1b1c1c] flex items-center gap-2 hover:bg-[#FAFAFA] transition-all shadow-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-4 py-2 bg-white border border-[#c3cdd1] rounded-lg text-[13px] font-semibold text-[#1b1c1c] flex items-center gap-2 hover:bg-[#FAFAFA] transition-all shadow-sm">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-[#c3cdd1] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                  <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider">Jam Masuk</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider">Jam Keluar</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider">Total Jam</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-[#3e484c] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {history.map((row, index) => (
                  <tr key={index} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-6 py-4 text-[13px] font-medium text-[#1b1c1c] whitespace-nowrap">{row.date}</td>
                    <td className="px-6 py-4 text-[13px] text-[#3e484c] font-mono whitespace-nowrap">{row.in}</td>
                    <td className="px-6 py-4 text-[13px] text-[#3e484c] font-mono whitespace-nowrap">{row.out}</td>
                    <td className="px-6 py-4 text-[13px] text-[#3e484c] font-mono whitespace-nowrap">{row.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between border-t border-[#E5E5E5] gap-4 bg-white">
            <p className="text-[13px] text-[#3e484c]">Menampilkan 5 dari 22 entri</p>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E5E5E5] text-[#3e484c] hover:bg-[#FAFAFA] transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#00687b] text-white text-[13px] font-bold shadow-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E5E5E5] text-[#3e484c] hover:bg-[#FAFAFA] text-[13px] font-medium transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E5E5E5] text-[#3e484c] hover:bg-[#FAFAFA] text-[13px] font-medium transition-colors">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E5E5E5] text-[#3e484c] hover:bg-[#FAFAFA] transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
