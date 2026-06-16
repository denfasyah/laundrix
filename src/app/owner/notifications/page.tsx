'use client';

import { useState } from 'react';
import {
  CheckCheck, Wrench, Store, Megaphone, Users, Clock, MoreVertical,
  ChevronLeft, ChevronRight, TrendingUp, AlertTriangle, Package
} from 'lucide-react';

type FilterType = 'Semua' | 'Mesin' | 'Stok' | 'Karyawan' | 'Pengumuman';

const notifications = [
  {
    id: 1,
    type: 'Mesin',
    title: 'Mesin Cuci 02 Memerlukan Perhatian',
    desc: 'Mesin Cuci 02 di Cabang Sudirman Central dilaporkan bergetar tidak normal oleh teknisi. Segera lakukan pemeriksaan.',
    badgeText: 'Rusak',
    time: '5 Menit yang lalu',
    icon: Wrench,
    borderColor: 'bg-[#DC2626]',
    iconBg: 'bg-red-50',
    iconColor: 'text-[#DC2626]',
    badgeClasses: 'bg-red-50 text-[#DC2626] border-red-100',
    unread: true,
  },
  {
    id: 2,
    type: 'Stok',
    title: 'Peringatan Stok Rendah (Softener Lavender)',
    desc: 'Stok Softener Lavender 5L di Cabang Ahmad Yani hanya tersisa 2 unit. Pertimbangkan untuk melakukan restock segera.',
    badgeText: 'Stok Menipis',
    time: '45 Menit yang lalu',
    icon: Package,
    borderColor: 'bg-[#805600]',
    iconBg: 'bg-amber-50',
    iconColor: 'text-[#805600]',
    badgeClasses: 'bg-amber-50 text-[#805600] border-amber-100',
    unread: true,
  },
  {
    id: 3,
    type: 'Karyawan',
    title: 'Staf Baru Menyelesaikan Onboarding',
    desc: 'Diana Pratiwi dari Cabang Gading Serpong telah menyelesaikan pelatihan onboarding dan siap mulai bertugas.',
    badgeText: 'Selesai',
    time: '2 Jam yang lalu',
    icon: Users,
    borderColor: 'bg-[#16A34A]',
    iconBg: 'bg-green-50',
    iconColor: 'text-[#16A34A]',
    badgeClasses: 'bg-green-50 text-[#16A34A] border-green-100',
    unread: false,
  },
  {
    id: 4,
    type: 'Pengumuman',
    title: 'Target Pendapatan Oktober Tercapai',
    desc: 'Selamat! Seluruh cabang berhasil mencapai target pendapatan bulan Oktober sebesar Rp 130.000.000. Terima kasih atas kerja keras tim.',
    badgeText: 'Pencapaian',
    time: '5 Jam yang lalu',
    icon: TrendingUp,
    borderColor: 'bg-[#00687b]',
    iconBg: 'bg-[#EBF8FC]',
    iconColor: 'text-[#00687b]',
    badgeClasses: 'bg-[#EBF8FC] text-[#00687b] border-[#00687b]/20',
    unread: false,
  },
  {
    id: 5,
    type: 'Mesin',
    title: 'Jadwal Servis Berkala (Pengering 04)',
    desc: 'Pengering 04 di Cabang Menteng Hub dijadwalkan untuk servis rutin pada Sabtu, 28 Oktober 2023. Harap koordinasikan dengan tim cabang.',
    badgeText: 'Dijadwalkan',
    time: '1 Hari yang lalu',
    icon: Wrench,
    borderColor: 'bg-[#2fa1bb]',
    iconBg: 'bg-[#EBF8FC]',
    iconColor: 'text-[#00687b]',
    badgeClasses: 'bg-[#EBF8FC] text-[#00687b] border-[#00687b]/20',
    unread: false,
  },
  {
    id: 6,
    type: 'Karyawan',
    title: 'Absensi Tidak Wajar Terdeteksi',
    desc: 'Terdapat 3 karyawan di Cabang Kemang yang tidak check-in selama 2 hari berturut-turut. Segera verifikasi status kehadiran mereka.',
    badgeText: 'Perlu Tinjau',
    time: '1 Hari yang lalu',
    icon: AlertTriangle,
    borderColor: 'bg-[#805600]',
    iconBg: 'bg-amber-50',
    iconColor: 'text-[#805600]',
    badgeClasses: 'bg-amber-50 text-[#805600] border-amber-100',
    unread: false,
  },
  {
    id: 7,
    type: 'Pengumuman',
    title: 'Pemeliharaan Sistem Laundrix',
    desc: 'Pemeliharaan sistem terjadwal pada Minggu, 29 Oktober 2023 pukul 23:00–01:00 WIB. Akses ke sistem akan terbatas sementara.',
    badgeText: 'Penting',
    time: '2 Hari yang lalu',
    icon: Megaphone,
    borderColor: 'bg-[#6e797d]',
    iconBg: 'bg-[#f5f3f3]',
    iconColor: 'text-[#6e797d]',
    badgeClasses: 'bg-[#f5f3f3] text-[#3e484c] border-[#c3cdd1]',
    unread: false,
  },
];

const filters: FilterType[] = ['Semua', 'Mesin', 'Stok', 'Karyawan', 'Pengumuman'];

export default function OwnerNotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Semua');

  const filtered = activeFilter === 'Semua'
    ? notifications
    : notifications.filter((n) => n.type === activeFilter);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="w-full relative min-h-full">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#EBF8FC]/50 to-transparent pointer-events-none -z-10" />
      <div className="w-full flex flex-col gap-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight">Notifikasi</h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-[#DC2626] text-white text-[12px] font-bold rounded-full">{unreadCount} baru</span>
              )}
            </div>
            <p className="text-[15px] text-[#3e484c]">Pantau semua peringatan dan pembaruan dari seluruh cabang.</p>
          </div>
        </div>

        {/* Filter & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-[13px] shadow-sm transition-all ${
                  activeFilter === filter
                    ? 'bg-[#00687b] text-white font-bold active:scale-95'
                    : 'bg-white border border-[#bdc8cd] text-[#3e484c] font-medium hover:bg-[#EBF8FC]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#bdc8cd] rounded-lg text-[#3e484c] hover:bg-[#efeded] transition-colors text-[13px] font-medium shadow-sm bg-white shrink-0">
            <CheckCheck className="w-4 h-4" />
            Tandai Semua Dibaca
          </button>
        </div>

        {/* Notification Cards */}
        <div className="space-y-3">
          {filtered.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`group bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex items-stretch ${notif.unread ? 'border-[#2fa1bb]/30' : 'border-[#c3cdd1]'}`}
              >
                <div className={`w-1.5 group-hover:w-2 transition-all shrink-0 ${notif.borderColor}`} />
                <div className="flex-1 p-5 flex gap-5 items-start">
                  <div className={`p-3.5 rounded-xl ${notif.iconBg} ${notif.iconColor} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1 relative min-w-0">
                    {notif.unread && (
                      <div className="absolute -left-3 top-2 w-2 h-2 bg-[#00687b] rounded-full" />
                    )}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="min-w-0">
                        <h4 className={`text-[16px] font-semibold leading-tight ${notif.unread ? 'text-[#1b1c1c]' : 'text-[#3e484c]'}`}>{notif.title}</h4>
                        <p className="text-[13px] text-[#6e797d] mt-1 leading-relaxed">{notif.desc}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap w-fit shrink-0 ${notif.badgeClasses}`}>
                        {notif.badgeText}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-3">
                      <Clock className="w-3.5 h-3.5 text-[#bdc8cd]" />
                      <span className="font-mono text-[12px] text-[#6e797d]">{notif.time}</span>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-[#efeded] transition-all text-[#6e797d] shrink-0">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 bg-[#EBF8FC] rounded-full flex items-center justify-center text-[#00687b] mb-4">
              <Store className="w-7 h-7" />
            </div>
            <p className="text-[16px] font-semibold text-[#1b1c1c] mb-1">Tidak ada notifikasi</p>
            <p className="text-[13px] text-[#6e797d]">Notifikasi untuk kategori ini akan muncul di sini.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 pt-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#bdc8cd] text-[#3e484c] hover:bg-[#EBF8FC] transition-colors bg-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#00687b] text-white font-bold text-[13px] shadow-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#bdc8cd] text-[#3e484c] hover:bg-[#EBF8FC] transition-colors text-[13px] font-medium bg-white">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#bdc8cd] text-[#3e484c] hover:bg-[#EBF8FC] transition-colors bg-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
