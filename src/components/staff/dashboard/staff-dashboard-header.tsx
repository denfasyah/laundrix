'use client';

import { useEffect, useState } from 'react';

export function StaffDashboardHeader() {
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour12: false }));
      setDateStr(now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
      <div>
        <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Dashboard</h2>
        <p className="text-[#3e484c] text-[15px]">Selamat datang kembali, Budi. Pantau tugas harian Anda di sini.</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[11px] text-[#A3A3A3] font-bold uppercase tracking-wider">{dateStr}</p>
        <p className="text-[28px] font-bold font-mono text-[#2FA1BB] leading-tight">{time}</p>
      </div>
    </div>
  );
}
