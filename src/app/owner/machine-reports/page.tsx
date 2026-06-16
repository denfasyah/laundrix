'use client';

import {
  WashingMachine, Wrench, CheckCircle2, Clock, AlertTriangle, Plus, Download, Filter,
  ChevronLeft, ChevronRight, MoreVertical, TrendingUp
} from 'lucide-react';

const machines = [
  { id: 'MC-001', name: 'Mesin Cuci 01', branch: 'Sudirman Central', type: 'Washer', status: 'Operasional', lastService: '10 Okt 2023', usage: 92 },
  { id: 'MC-002', name: 'Mesin Cuci 02', branch: 'Sudirman Central', type: 'Washer', status: 'Maintenance', lastService: '12 Okt 2023', usage: 78 },
  { id: 'DR-001', name: 'Pengering 01', branch: 'Ahmad Yani', type: 'Dryer', status: 'Operasional', lastService: '08 Okt 2023', usage: 85 },
  { id: 'DR-002', name: 'Pengering 02', branch: 'Ahmad Yani', type: 'Dryer', status: 'Rusak', lastService: '01 Sep 2023', usage: 0 },
  { id: 'MC-003', name: 'Mesin Cuci 03', branch: 'Menteng Hub', type: 'Washer', status: 'Operasional', lastService: '11 Okt 2023', usage: 70 },
];

const reports = [
  { machine: 'Mesin Cuci 03', branch: 'Sudirman Central', date: '12 Okt 2023', issue: 'Air tidak keluar saat siklus pembilasan dimulai.', status: 'Menunggu' },
  { machine: 'Pengering 01', branch: 'Ahmad Yani', date: '12 Okt 2023', issue: 'Suhu tidak mencapai panas maksimal (hanya hangat).', status: 'Sedang Diperbaiki' },
  { machine: 'Mesin Cuci 05', branch: 'Menteng Hub', date: '11 Okt 2023', issue: 'Getaran terlalu keras dan mengeluarkan suara besi beradu.', status: 'Selesai' },
  { machine: 'Mesin Cuci 01', branch: 'Sudirman Central', date: '11 Okt 2023', issue: 'Panel digital tidak menyala saat dicolokkan ke listrik.', status: 'Selesai' },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'Operasional') return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-[#16A34A] border border-green-200">Operasional</span>;
  if (status === 'Maintenance') return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EBF8FC] text-[#00687b] border border-[#00687b]/20">Maintenance</span>;
  if (status === 'Rusak') return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-[#DC2626] border border-red-200">Rusak</span>;
  if (status === 'Menunggu') return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-50 text-[#805600] border border-orange-200">Menunggu</span>;
  if (status === 'Sedang Diperbaiki') return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EBF8FC] text-[#00687b] border border-[#00687b]/20">Sedang Diperbaiki</span>;
  if (status === 'Selesai') return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-50 text-[#16A34A] border border-green-200">Selesai</span>;
  return null;
}

export default function OwnerMachineReportsPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Laporan Mesin</h2>
          <p className="text-[15px] text-[#3e484c]">Pantau kondisi dan status mesin di seluruh cabang Laundrix.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#c3cdd1] rounded-lg text-[13px] font-semibold hover:bg-[#f5f3f3] transition-all shadow-sm">
            <Download className="w-4 h-4 text-[#3e484c]" />
            Ekspor
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold hover:bg-[#004e5d] transition-all shadow-sm active:scale-95">
            <Plus className="w-4 h-4" />
            Buat Laporan
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#c3cdd1] p-5 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 bg-[#EBF8FC] rounded-xl flex items-center justify-center text-[#00687b] shrink-0">
            <WashingMachine className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#6e797d]">Total Mesin</p>
            <p className="font-mono text-[24px] font-bold text-[#1b1c1c] leading-none">84</p>
          </div>
        </div>
        <div className="bg-white border border-[#c3cdd1] p-5 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-[#16A34A] shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#6e797d]">Operasional</p>
            <p className="font-mono text-[24px] font-bold text-[#16A34A] leading-none">76</p>
          </div>
        </div>
        <div className="bg-white border border-[#c3cdd1] p-5 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-[#805600] shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#6e797d]">Maintenance</p>
            <p className="font-mono text-[24px] font-bold text-[#805600] leading-none">6</p>
          </div>
        </div>
        <div className="bg-white border border-[#c3cdd1] p-5 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center text-[#DC2626] shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#6e797d]">Rusak</p>
            <p className="font-mono text-[24px] font-bold text-[#DC2626] leading-none">2</p>
          </div>
        </div>
      </div>

      {/* Machine Status Table */}
      <div className="bg-white border border-[#c3cdd1] rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between bg-white">
          <h3 className="text-[18px] font-semibold text-[#1b1c1c]">Status Mesin</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-[#c3cdd1] rounded-lg text-[13px] font-medium hover:bg-[#FAFAFA] transition-all">
            <Filter className="w-4 h-4 text-[#6e797d]" />
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">ID / Nama Mesin</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Cabang</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Tipe</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Servis Terakhir</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Pemakaian</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {machines.map((m) => (
                <tr key={m.id} className="hover:bg-[#FAFAFA] transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-[14px] font-semibold text-[#1b1c1c]">{m.name}</p>
                    <p className="text-[11px] text-[#bdc8cd] font-mono">{m.id}</p>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6e797d]">{m.branch}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${m.type === 'Washer' ? 'bg-[#EBF8FC] text-[#00687b] border-[#00687b]/20' : 'bg-orange-50 text-[#8c4f03] border-orange-200'}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={m.status} /></td>
                  <td className="px-6 py-4 text-[13px] text-[#6e797d]">{m.lastService}</td>
                  <td className="px-6 py-4 w-40">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${m.usage > 80 ? 'bg-[#00687b]' : m.usage > 50 ? 'bg-[#fdaf06]' : 'bg-[#DC2626]'}`}
                          style={{ width: `${m.usage}%` }}
                        />
                      </div>
                      <span className="text-[12px] font-mono text-[#6e797d] w-8 text-right">{m.usage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg text-[#6e797d] hover:bg-[#f5f3f3] transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#E5E5E5] flex items-center justify-between">
          <p className="text-[13px] text-[#6e797d]">Menampilkan <span className="font-bold text-[#1b1c1c]">5</span> dari <span className="font-bold text-[#1b1c1c]">84</span> mesin</p>
          <div className="flex gap-1">
            <button className="p-1.5 border border-[#E5E5E5] rounded-lg text-[#6e797d] disabled:opacity-40" disabled><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00687b] text-white text-[13px] font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E5E5] text-[#1b1c1c] hover:bg-white text-[13px]">2</button>
            <button className="p-1.5 border border-[#E5E5E5] rounded-lg text-[#6e797d] hover:bg-white"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Incident Reports */}
      <div className="bg-white border border-[#c3cdd1] rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#1b1c1c]">Laporan Insiden Terbaru</h3>
          <div className="flex items-center gap-1 text-[#16A34A] text-[13px] font-semibold">
            <TrendingUp className="w-4 h-4" />
            4 laporan bulan ini
          </div>
        </div>
        <div className="divide-y divide-[#E5E5E5]">
          {reports.map((r, i) => (
            <div key={i} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-[#FAFAFA] transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#EBF8FC] rounded-xl flex items-center justify-center text-[#00687b] shrink-0 mt-0.5">
                  {r.status === 'Selesai' ? <CheckCircle2 className="w-5 h-5 text-[#16A34A]" /> : r.status === 'Rusak' ? <AlertTriangle className="w-5 h-5 text-[#DC2626]" /> : <Clock className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1b1c1c]">{r.machine} <span className="text-[#6e797d] font-normal">— {r.branch}</span></p>
                  <p className="text-[13px] text-[#3e484c] mt-0.5">{r.issue}</p>
                  <p className="text-[11px] text-[#bdc8cd] mt-1">{r.date}</p>
                </div>
              </div>
              <div className="shrink-0"><StatusBadge status={r.status} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
