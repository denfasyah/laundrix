'use client';

import { Store, Settings2, AlertTriangle, Droplets, Wind, Pencil, Eye, Filter, Download, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const branches = [
  {
    id: 'BRANCH-001',
    name: 'Laundrix Sudirman',
    address: 'Jl. Jend. Sudirman No. 45, Jakarta Pusat',
    washMachines: 8,
    dryMachines: 6,
    staff: 12,
    status: 'Aktif',
  },
  {
    id: 'BRANCH-002',
    name: 'Laundrix Menteng',
    address: 'Jl. Imam Bonjol No. 12, Menteng',
    washMachines: 12,
    dryMachines: 10,
    staff: 18,
    status: 'Aktif',
  },
  {
    id: 'BRANCH-003',
    name: 'Laundrix Kemang',
    address: 'Jl. Kemang Raya No. 102, Jakarta Selatan',
    washMachines: 6,
    dryMachines: 4,
    staff: 5,
    status: 'Nonaktif',
  },
  {
    id: 'BRANCH-004',
    name: 'Laundrix Senopati',
    address: 'Jl. Senopati No. 8, Jakarta Selatan',
    washMachines: 10,
    dryMachines: 10,
    staff: 15,
    status: 'Aktif',
  },
];

export default function BranchesPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Manajemen Cabang</h2>
          <p className="text-[15px] text-[#3e484c]">Pantau dan kelola seluruh cabang Laundrix Anda.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold hover:bg-[#004e5d] transition-all shadow-sm shrink-0 active:scale-95">
          <Plus className="w-4 h-4" />
          Tambah Cabang Baru
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-[#EBF8FC] rounded-xl flex items-center justify-center text-[#00687b] shrink-0">
            <Store className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-0.5">Total Cabang</p>
            <p className="font-mono text-[28px] font-bold text-[#1b1c1c] leading-none">12</p>
          </div>
        </div>

        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-[#EBF8FC] rounded-xl flex items-center justify-center text-[#00687b] shrink-0">
            <Settings2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-0.5">Mesin Aktif</p>
            <p className="font-mono text-[28px] font-bold text-[#1b1c1c] leading-none">84</p>
          </div>
        </div>

        <div className="bg-white border border-[#c3cdd1] p-6 rounded-xl shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-[#805600] shrink-0">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-0.5">Cabang Perlu Perhatian</p>
            <p className="font-mono text-[28px] font-bold text-[#805600] leading-none">2</p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-[#c3cdd1] rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-[18px] font-semibold text-[#1b1c1c]">Data Seluruh Cabang</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-[#c3cdd1] rounded-lg text-[13px] font-semibold text-[#1b1c1c] hover:bg-[#FAFAFA] transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#c3cdd1] rounded-lg text-[13px] font-semibold text-[#1b1c1c] hover:bg-[#FAFAFA] transition-all">
              <Download className="w-4 h-4" />
              Ekspor
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Nama Cabang</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Lokasi / Alamat</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Jumlah Mesin</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Staf Aktif</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#6e797d] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {branches.map((branch) => {
                const isInactive = branch.status === 'Nonaktif';
                return (
                  <tr
                    key={branch.id}
                    className={`hover:bg-[#FAFAFA] transition-colors group ${isInactive ? 'bg-orange-50/30' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <p className="text-[14px] font-semibold text-[#00687b]">{branch.name}</p>
                      <p className="text-[11px] text-[#bdc8cd] mt-0.5">ID: {branch.id}</p>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#3e484c] max-w-xs">
                      {branch.address}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[13px] font-mono font-semibold text-[#00687b]">
                          <Droplets className="w-4 h-4" />
                          {branch.washMachines}
                        </div>
                        <div className="flex items-center gap-1.5 text-[13px] font-mono font-semibold text-[#805600]">
                          <Wind className="w-4 h-4" />
                          {branch.dryMachines}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-mono font-semibold text-[#1b1c1c]">
                      {branch.staff} Orang
                    </td>
                    <td className="px-6 py-4">
                      {isInactive ? (
                        <span className="px-3 py-1 bg-red-50 text-[#DC2626] rounded-full text-[11px] font-bold border border-red-200 uppercase tracking-wide">
                          Nonaktif
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-50 text-[#16A34A] rounded-full text-[11px] font-bold border border-green-200 uppercase tracking-wide">
                          Aktif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-[#EBF8FC] rounded-lg text-[#00687b] transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-[#EBF8FC] rounded-lg text-[#00687b] transition-colors" title="Detail">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
          <p className="text-[13px] text-[#6e797d]">Menampilkan <span className="font-bold text-[#1b1c1c]">1–4</span> dari <span className="font-bold text-[#1b1c1c]">12</span> cabang</p>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] rounded-lg text-[#6e797d] hover:bg-[#FAFAFA] disabled:opacity-40 transition-colors" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00687b] text-white text-[13px] font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E5E5] text-[#1b1c1c] hover:bg-[#FAFAFA] text-[13px] font-medium transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E5E5] text-[#1b1c1c] hover:bg-[#FAFAFA] text-[13px] font-medium transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] rounded-lg text-[#6e797d] hover:bg-[#FAFAFA] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Card */}
        <div className="relative h-64 rounded-xl overflow-hidden shadow-sm border border-[#c3cdd1]">
          <img
            alt="Modern Laundry Interior"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdl_KAuR0_HYNWbvrR8dXYJPOpSGCz36URXPh5yHEzmRMhIavsamEKHhzm4lLP-TNnJdVDFxoNr1Hmvp0WYCC187_8UngGbNxhaqdOrHFSu4GcZo8YhoB35BPnPxWvKWm5omx8ki-moJcXBQnoc0eioroctjcj25xb_2UaCwF4UTzdAz8EOsM8zny3ScNkptqvrw5aAXMx5ddowqYWUlHJhbpBav_usEXyxiNtFy1efHd67UBxXnYOqNI-WSnYkHFghGhuulmpI5s"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div className="text-white">
              <h4 className="text-[18px] font-bold mb-1">Standard Operasional</h4>
              <p className="text-[13px] opacity-80">Pastikan seluruh cabang mengikuti protokol kebersihan premium.</p>
            </div>
          </div>
        </div>

        {/* Insight Card */}
        <div className="bg-[#EBF8FC] border border-[#00687b]/20 rounded-xl p-6 flex flex-col justify-center gap-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#00687b] shadow-sm shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div>
              <h4 className="text-[18px] font-bold text-[#0C3A47] mb-1">Analisis Wilayah</h4>
              <p className="text-[14px] text-[#3e484c] leading-relaxed">Data pertumbuhan cabang 3 bulan terakhir menunjukkan peningkatan efisiensi operasional sebesar <span className="font-bold text-[#00687b]">24%</span> di wilayah Jakarta Pusat.</p>
            </div>
          </div>
          <button className="self-start px-5 py-2 bg-white border border-[#00687b] text-[#00687b] text-[13px] font-semibold rounded-lg hover:bg-[#00687b] hover:text-white transition-all shadow-sm">
            Lihat Laporan Lengkap
          </button>
        </div>
      </div>
    </div>
  );
}
