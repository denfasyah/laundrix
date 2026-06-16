'use client';

import { useState } from 'react';
import { Plus, Filter, ArrowRight, MoreVertical, ChevronLeft, ChevronRight, Clock, Wrench, CheckCircle2, X } from 'lucide-react';

export default function MachineReportsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reports = [
    { time: '14:20, 12 Oct', machine: 'Mesin Cuci 03', type: 'Washer', desc: 'Air tidak keluar saat siklus pembilasan dimulai.', status: 'Menunggu', statusColor: 'bg-[#fdaf06]/20 text-[#805600] border-[#fdaf06]', typeColor: 'bg-[#EBF8FC] text-[#00687b]' },
    { time: '09:15, 12 Oct', machine: 'Pengering 01', type: 'Dryer', desc: 'Suhu tidak mencapai panas maksimal (hanya hangat).', status: 'Sedang Diperbaiki', statusColor: 'bg-[#2fa1bb]/20 text-[#00687b] border-[#2fa1bb]', typeColor: 'bg-orange-50 text-[#8c4f03]' },
    { time: '18:45, 11 Oct', machine: 'Mesin Cuci 05', type: 'Washer', desc: 'Getaran terlalu keras dan mengeluarkan suara besi beradu.', status: 'Selesai', statusColor: 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30', typeColor: 'bg-[#EBF8FC] text-[#00687b]' },
    { time: '10:30, 11 Oct', machine: 'Mesin Cuci 01', type: 'Washer', desc: 'Panel digital tidak menyala saat dicolokkan ke listrik.', status: 'Selesai', statusColor: 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30', typeColor: 'bg-[#EBF8FC] text-[#00687b]' },
  ];

  return (
    <div className="w-full flex flex-col gap-6 max-w-[1200px]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Laporan Mesin</h2>
          <p className="text-[15px] text-[#3e484c]">Laporkan kendala atau kerusakan mesin di cabang Anda.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#00687b] text-white px-6 py-3 rounded-lg hover:brightness-110 shadow-sm transition-all text-[13px] font-semibold"
        >
          <Plus className="w-5 h-5" />
          Buat Laporan Baru
        </button>
      </div>

      {/* Dashboard Stats / Filters Bento */}
      <div className="grid grid-cols-12 gap-4">
        {/* Filters Card */}
        <div className="col-span-12 bg-[#fbf9f9] border border-[#bdc8cd] rounded-xl p-4 shadow-sm flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-[#3e484c]">
            <Filter className="w-5 h-5" />
            <span className="text-[13px] font-semibold">Filter:</span>
          </div>
          <select className="bg-[#fbf9f9] border border-[#bdc8cd] rounded-lg px-4 py-2 text-[13px] text-[#1b1c1c] focus:ring-[#00687b] focus:border-[#00687b] outline-none min-w-[160px]">
            <option>Semua Status</option>
            <option>Menunggu</option>
            <option>Sedang Diperbaiki</option>
            <option>Selesai</option>
          </select>
          <select className="bg-[#fbf9f9] border border-[#bdc8cd] rounded-lg px-4 py-2 text-[13px] text-[#1b1c1c] focus:ring-[#00687b] focus:border-[#00687b] outline-none min-w-[160px]">
            <option>Semua Jenis Mesin</option>
            <option>Washer</option>
            <option>Dryer</option>
          </select>
          <div className="md:ml-auto text-[11px] text-[#3e484c]">
            Menampilkan laporan milik Anda sendiri (Staf RBAC Aktif)
          </div>
        </div>
      </div>

      {/* Table History Section */}
      <div className="bg-[#fbf9f9] border border-[#bdc8cd] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#bdc8cd] flex justify-between items-center bg-white">
          <h3 className="text-[18px] font-bold text-[#1b1c1c]">Riwayat Laporan Saya</h3>
          <button className="text-[#00687b] hover:underline text-[13px] font-semibold flex items-center gap-1">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f5f3f3] border-b border-[#bdc8cd]">
              <tr>
                <th className="px-4 py-2 text-[13px] font-semibold text-[#3e484c] uppercase tracking-wider">Waktu</th>
                <th className="px-4 py-2 text-[13px] font-semibold text-[#3e484c] uppercase tracking-wider">Nama Mesin</th>
                <th className="px-4 py-2 text-[13px] font-semibold text-[#3e484c] uppercase tracking-wider">Jenis</th>
                <th className="px-4 py-2 text-[13px] font-semibold text-[#3e484c] uppercase tracking-wider">Deskripsi Masalah</th>
                <th className="px-4 py-2 text-[13px] font-semibold text-[#3e484c] uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-[13px] font-semibold text-[#3e484c] uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bdc8cd]">
              {reports.map((report, idx) => (
                <tr key={idx} className="hover:bg-[#f5f3f3] transition-colors group">
                  <td className="px-4 py-4 font-mono text-[15px] text-[#1b1c1c] whitespace-nowrap">{report.time}</td>
                  <td className="px-4 py-4 text-[15px] text-[#1b1c1c] font-bold whitespace-nowrap">{report.machine}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-md text-[13px] font-semibold ${report.typeColor}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[15px] text-[#3e484c] min-w-[250px]">{report.desc}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-[13px] font-semibold border ${report.statusColor}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="p-1 rounded-md hover:bg-[#bdc8cd] transition-colors">
                      <MoreVertical className="w-5 h-5 text-[#3e484c]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[#bdc8cd] flex justify-between items-center bg-[#fbf9f9]">
          <span className="text-[11px] text-[#3e484c]">Menampilkan 4 dari 4 laporan</span>
          <div className="flex gap-2">
            <button className="p-2 border border-[#bdc8cd] rounded-md hover:bg-[#f5f3f3] disabled:opacity-50" disabled>
              <ChevronLeft className="w-5 h-5 text-[#1b1c1c]" />
            </button>
            <button className="p-2 border border-[#bdc8cd] rounded-md hover:bg-[#f5f3f3]">
              <ChevronRight className="w-5 h-5 text-[#1b1c1c]" />
            </button>
          </div>
        </div>
      </div>

      {/* Machine Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#fbf9f9] border border-[#bdc8cd] rounded-xl p-6 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <Clock className="text-[#00687b] w-7 h-7" />
            <span className="text-[11px] text-[#805600] bg-[#fdaf06]/10 px-2 py-1 rounded font-semibold">Aktif</span>
          </div>
          <div className="mt-4">
            <h4 className="text-[11px] uppercase text-[#3e484c] font-bold">Laporan Menunggu</h4>
            <div className="font-mono text-[30px] font-bold text-[#1b1c1c] leading-none mt-1">01</div>
          </div>
        </div>
        <div className="bg-[#fbf9f9] border border-[#bdc8cd] rounded-xl p-6 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <Wrench className="text-[#00687b] w-7 h-7" />
            <span className="text-[11px] text-[#00687b] bg-[#2fa1bb]/10 px-2 py-1 rounded font-semibold">Diproses</span>
          </div>
          <div className="mt-4">
            <h4 className="text-[11px] uppercase text-[#3e484c] font-bold">Dalam Perbaikan</h4>
            <div className="font-mono text-[30px] font-bold text-[#1b1c1c] leading-none mt-1">01</div>
          </div>
        </div>
        <div className="bg-[#fbf9f9] border border-[#bdc8cd] rounded-xl p-6 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <CheckCircle2 className="text-[#16A34A] w-7 h-7" />
            <span className="text-[11px] text-[#16A34A] bg-[#16A34A]/10 px-2 py-1 rounded font-semibold">Statistik</span>
          </div>
          <div className="mt-4">
            <h4 className="text-[11px] uppercase text-[#3e484c] font-bold">Laporan Selesai (Bulan Ini)</h4>
            <div className="font-mono text-[30px] font-bold text-[#1b1c1c] leading-none mt-1">12</div>
          </div>
        </div>
      </div>

      {/* Atmospheric Illustration Area */}


      {/* Modal Mockup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-[#fbf9f9] border border-[#bdc8cd] rounded-xl shadow-xl w-full max-w-lg p-8 flex flex-col gap-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center">
              <h3 className="text-[24px] font-bold text-[#1b1c1c]">Buat Laporan Baru</h3>
              <button className="text-[#3e484c] hover:text-[#1b1c1c]" onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-semibold text-[#1b1c1c]">Pilih Mesin</label>
                <select className="w-full border border-[#bdc8cd] rounded-lg p-2 bg-[#fbf9f9] text-[15px] focus:ring-1 focus:ring-[#00687b] focus:border-[#00687b] outline-none">
                  <option>Mesin Cuci 01</option>
                  <option>Mesin Cuci 02</option>
                  <option>Mesin Cuci 03</option>
                  <option>Pengering 01</option>
                  <option>Pengering 02</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-semibold text-[#1b1c1c]">Jenis Masalah</label>
                <input className="w-full border border-[#bdc8cd] rounded-lg p-2 bg-[#fbf9f9] text-[15px] focus:ring-1 focus:ring-[#00687b] focus:border-[#00687b] outline-none" placeholder="Contoh: Mesin tidak berputar" type="text" />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-semibold text-[#1b1c1c]">Deskripsi Detail</label>
                <textarea className="w-full border border-[#bdc8cd] rounded-lg p-2 bg-[#fbf9f9] text-[15px] resize-none focus:ring-1 focus:ring-[#00687b] focus:border-[#00687b] outline-none" placeholder="Jelaskan secara detail kendala yang terjadi..." rows={4}></textarea>
              </div>
              
              <div className="mt-4 flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-[#bdc8cd] rounded-lg text-[13px] font-semibold text-[#3e484c] hover:bg-[#f5f3f3] transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold hover:brightness-110 transition-all shadow-sm"
                >
                  Kirim Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
