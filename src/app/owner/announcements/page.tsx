'use client';

import { useState } from 'react';
import { Megaphone, Plus, Users, Clock, Pin, Trash2, Pencil, ChevronRight } from 'lucide-react';

const announcements = [
  {
    id: 1,
    title: 'Perawatan Mesin Berkala - Sudirman Central',
    content: 'Akan dilakukan perawatan rutin pada mesin cuci #3 dan #5 di cabang Sudirman Central pada hari Sabtu, 28 Oktober 2023 mulai pukul 09.00–12.00 WIB. Mohon koordinasi dengan tim untuk pengalihan pelanggan.',
    target: 'Sudirman Central',
    date: '25 Okt 2023',
    time: '09:30',
    pinned: true,
    author: 'Budi Santoso',
    authorInitial: 'BS',
    type: 'Operasional',
  },
  {
    id: 2,
    title: 'Update SOP Pencucian Pakaian Premium',
    content: 'Terhitung mulai 1 November 2023, SOP baru untuk pencucian pakaian berbahan premium (sutra, wol) wajib diterapkan di seluruh cabang. Materi pelatihan telah dikirim ke email masing-masing supervisor.',
    target: 'Semua Cabang',
    date: '23 Okt 2023',
    time: '14:00',
    pinned: false,
    author: 'Rina Wijaya',
    authorInitial: 'RW',
    type: 'SOP',
  },
  {
    id: 3,
    title: 'Target Pendapatan November 2023',
    content: 'Tim manajemen menetapkan target pendapatan November 2023 sebesar Rp 150.000.000 untuk keseluruhan cabang. Breakdown per cabang telah dibagikan kepada masing-masing kepala cabang.',
    target: 'Semua Cabang',
    date: '20 Okt 2023',
    time: '10:15',
    pinned: false,
    author: 'Budi Santoso',
    authorInitial: 'BS',
    type: 'Keuangan',
  },
  {
    id: 4,
    title: 'Libur Nasional & Jadwal Shift',
    content: 'Sehubungan dengan libur nasional tanggal 5 November 2023, seluruh cabang tetap beroperasi dengan jadwal shift khusus. Detail jadwal akan diinformasikan oleh supervisor masing-masing cabang.',
    target: 'Semua Cabang',
    date: '18 Okt 2023',
    time: '08:00',
    pinned: false,
    author: 'Rina Wijaya',
    authorInitial: 'RW',
    type: 'SDM',
  },
];

const typeColors: Record<string, string> = {
  Operasional: 'bg-[#EBF8FC] text-[#00687b] border-[#00687b]/20',
  SOP: 'bg-orange-50 text-[#8c4f03] border-orange-200',
  Keuangan: 'bg-green-50 text-[#16A34A] border-green-200',
  SDM: 'bg-purple-50 text-purple-700 border-purple-200',
};

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<'semua' | 'terpinned'>('semua');

  const filtered = activeTab === 'terpinned'
    ? announcements.filter((a) => a.pinned)
    : announcements;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Pengumuman</h2>
          <p className="text-[15px] text-[#3e484c]">Kelola dan distribusikan informasi penting ke seluruh cabang.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold hover:bg-[#004e5d] transition-all shadow-sm shrink-0 active:scale-95">
          <Plus className="w-4 h-4" />
          Buat Pengumuman
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#EBF8FC] rounded-xl flex items-center justify-center text-[#00687b] shrink-0">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-0.5">Total Pengumuman</p>
            <p className="font-mono text-[28px] font-bold text-[#1b1c1c] leading-none">12</p>
          </div>
        </div>
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#805600] shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-0.5">Bulan Ini</p>
            <p className="font-mono text-[28px] font-bold text-[#1b1c1c] leading-none">4</p>
          </div>
        </div>
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#16A34A] shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-0.5">Cabang Terjangkau</p>
            <p className="font-mono text-[28px] font-bold text-[#1b1c1c] leading-none">8</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E5E5E5]">
        {(['semua', 'terpinned'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 text-[14px] font-semibold border-b-2 transition-all capitalize ${activeTab === tab ? 'border-[#00687b] text-[#00687b]' : 'border-transparent text-[#6e797d] hover:text-[#1b1c1c]'}`}
          >
            {tab === 'semua' ? 'Semua' : 'Dipinned'}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="flex flex-col gap-4">
        {filtered.map((a) => (
          <div key={a.id} className={`bg-white border rounded-xl shadow-sm p-6 group hover:shadow-md transition-all ${a.pinned ? 'border-[#00687b]/30 border-l-4 border-l-[#00687b]' : 'border-[#c3cdd1]'}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                {/* Tags */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {a.pinned && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#EBF8FC] text-[#00687b] rounded text-[10px] font-bold border border-[#00687b]/20">
                      <Pin className="w-3 h-3" />
                      DIPINNED
                    </span>
                  )}
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${typeColors[a.type]}`}>{a.type}</span>
                  <span className="text-[11px] text-[#bdc8cd]">→</span>
                  <span className="text-[12px] font-semibold text-[#6e797d]">{a.target}</span>
                </div>

                <h3 className="text-[16px] font-bold text-[#1b1c1c] mb-2">{a.title}</h3>
                <p className="text-[13px] text-[#3e484c] leading-relaxed line-clamp-2">{a.content}</p>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#2fa1bb] text-white flex items-center justify-center text-[10px] font-bold">{a.authorInitial}</div>
                    <span className="text-[12px] font-semibold text-[#6e797d]">{a.author}</span>
                  </div>
                  <span className="text-[#E5E5E5]">·</span>
                  <span className="text-[12px] text-[#6e797d]">{a.date} · {a.time}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg hover:bg-[#EBF8FC] text-[#6e797d] hover:text-[#00687b] transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-red-50 text-[#6e797d] hover:text-[#DC2626] transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-[#f5f3f3] text-[#6e797d] transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state for pinned when none */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 bg-[#EBF8FC] rounded-full flex items-center justify-center text-[#00687b] mb-4">
            <Pin className="w-7 h-7" />
          </div>
          <p className="text-[16px] font-semibold text-[#1b1c1c] mb-1">Belum ada pengumuman dipinned</p>
          <p className="text-[13px] text-[#6e797d]">Pin pengumuman penting agar mudah ditemukan.</p>
        </div>
      )}
    </div>
  );
}
