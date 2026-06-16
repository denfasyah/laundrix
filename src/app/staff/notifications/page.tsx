'use client';

import { useState } from 'react';
import { CheckCheck, Wrench, Package, Megaphone, Clock, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

type FilterType = 'Semua' | 'Mesin' | 'Stok' | 'Pengumuman';

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Semua');

  const notifications = [
    {
      id: 1,
      type: 'Mesin',
      title: 'Status Perbaikan Mesin (Mesin Cuci 03)',
      desc: 'Status laporan Anda telah diubah menjadi Selesai oleh Owner.',
      badgeText: 'Selesai',
      time: '10 Menit yang lalu',
      icon: Wrench,
      borderColor: 'bg-[#16A34A]',
      iconBg: 'bg-[#EBF8FC]',
      iconColor: 'text-[#00687b]',
      badgeClasses: 'bg-green-50 text-[#16A34A] border-green-100',
      unread: true,
    },
    {
      id: 2,
      type: 'Stok',
      title: 'Peringatan Stok (Deterjen Sachet)',
      desc: 'Stok Deterjen Sachet di Cabang Sudirman sisa 3 unit. Segera lapor Owner.',
      badgeText: 'Stok Menipis',
      time: '1 Jam yang lalu',
      icon: Package,
      borderColor: 'bg-[#805600]',
      iconBg: 'bg-[#ffddaf]/30',
      iconColor: 'text-[#805600]',
      badgeClasses: 'bg-amber-50 text-[#805600] border-amber-100',
      unread: false,
    },
    {
      id: 3,
      type: 'Pengumuman',
      title: 'Pengumuman Sistem',
      desc: 'Pemeliharaan sistem dijadwalkan pada hari Minggu pukul 23:00 WIB.',
      badgeText: 'Penting',
      time: '3 Jam yang lalu',
      icon: Megaphone,
      borderColor: 'bg-[#00687b]',
      iconBg: 'bg-[#EBF8FC]',
      iconColor: 'text-[#00687b]',
      badgeClasses: 'bg-blue-50 text-[#00687b] border-blue-100',
      unread: false,
    },
  ];

  const filters: FilterType[] = ['Semua', 'Mesin', 'Stok', 'Pengumuman'];

  return (
    <div className="w-full relative min-h-full">
      {/* Subtle Backdrop Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#EBF8FC]/50 to-transparent pointer-events-none -z-10"></div>
      <div className="w-full flex flex-col gap-6 max-w-[1200px]">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Notifikasi</h2>
            <p className="text-[15px] text-[#3e484c]">Pantau pembaruan sistem dan peringatan operasional.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-[13px] shadow-sm transition-all ${
                  activeFilter === filter
                    ? 'bg-[#00687b] text-white font-bold active:scale-95'
                    : 'bg-white border border-[#bdc8cd] text-[#3e484c] font-medium hover:bg-[#EBF8FC]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#bdc8cd] rounded-lg text-[#3e484c] hover:bg-[#efeded] transition-colors text-[13px] font-medium shadow-sm bg-white">
            <CheckCheck className="w-5 h-5" />
            Tandai Semua Sudah Dibaca
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div key={notif.id} className="group bg-white rounded-xl border border-[#c3cdd1] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex items-stretch">
                <div className={`w-1.5 group-hover:w-2 transition-all ${notif.borderColor}`}></div>
                <div className="flex-1 p-6 flex gap-6 items-start">
                  <div className={`p-4 rounded-lg ${notif.iconBg} ${notif.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-1 relative">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      {notif.unread && (
                        <div className="absolute -left-3 top-2.5 w-2 h-2 bg-[#00687b] rounded-full"></div>
                      )}
                      <div>
                        <h4 className="text-[18px] font-semibold text-[#1b1c1c]">{notif.title}</h4>
                        <p className="text-[15px] text-[#3e484c] mt-1">{notif.desc}</p>
                      </div>
                      <span className={`px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border whitespace-nowrap w-fit ${notif.badgeClasses}`}>
                        {notif.badgeText}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      <Clock className="w-4 h-4 text-[#6e797d]" />
                      <span className="font-mono text-[15px] text-[#6e797d]">{notif.time}</span>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-[#efeded] transition-all text-[#6e797d]">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-2 pt-8">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#bdc8cd] text-[#3e484c] hover:bg-[#EBF8FC] transition-colors bg-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#00687b] text-white font-bold text-[13px] shadow-sm">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#bdc8cd] text-[#3e484c] hover:bg-[#EBF8FC] transition-colors text-[13px] font-medium bg-white">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#bdc8cd] text-[#3e484c] hover:bg-[#EBF8FC] transition-colors text-[13px] font-medium bg-white">
            3
          </button>
          <span className="px-2 text-[#6e797d]">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#bdc8cd] text-[#3e484c] hover:bg-[#EBF8FC] transition-colors bg-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
