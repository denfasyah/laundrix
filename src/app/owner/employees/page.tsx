'use client';

import { useState } from 'react';
import { Users, ShieldCheck, Map, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Info, HeadphonesIcon } from 'lucide-react';

const employees = [
  {
    id: 1,
    name: 'Andi Wijaya',
    email: 'andi.wijaya@laundrix.com',
    branch: 'Sudirman Central',
    role: 'Owner',
    status: 'Aktif',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN0E5TrHr_PqwvcMzZfDeGi2Tl-Ke7wtt1rPkrW3Yy8nSkGR_NBIT7maBl1-cRNOGiGBm4lU0Y2yxHTeI4oRGekX5sy43dxl5g4aZFBnWJdUxvea-24l8ywyUu2Vt94-jrkJ9rpnMt337G67r0kESGxJ4wsd6XEzq3Rnnal_JENT8GQ8rYYika-DkRDOJLuCubFRaM5ePPK1bpMk79l_2yU2gFjVm17964TweXYh8TIBXkoFLP5NLi-0rFp9qhaKPmhUXwUewtdCY',
  },
  {
    id: 2,
    name: 'Siti Aminah',
    email: 'siti.a@laundrix.com',
    branch: 'Gading Serpong',
    role: 'Staff',
    status: 'Aktif',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcnRIpQxR0f9pSpMJbXNBc265q5MaMv8MVnK60nsNgPbZs0LKn8x1JNo0XwJfKIL1Fon9h7x9P3BjzMTbDNUDnB9OPa4N9yYMMkKnr9OPh1-1K8MKDj9sAYRVZt-TZ1VnRVuIoMqKu6qol8NNh5ysaq7eJVvFQNZKOnd5-BX1P-CcsGtfnIOks4hELbl9rfYUsP4bepm8wOJeHjeEyBezt7CRAPGKw9ef8QAZ-ugZb3lJ1NkXOF1ETc6Bw6QPkUgK5j6jtHCDKuvI',
  },
  {
    id: 3,
    name: 'Rudi Hermawan',
    email: 'rudi.h@laundrix.com',
    branch: 'Menteng Hub',
    role: 'Staff',
    status: 'Nonaktif',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDb8vkNfaMc3Yhn7uijmV27-kYzGUChH_Z66m4nd5dXs__QLFGCAbGZ_bwRUlZOzA45ZQbgO7y7ck_Sz8m4mhcuF__Jf0C1LqZmWY1TPV0H-nORAmA0mZ_MHilHmitmOgotg-3_eQDX1JtBLIn4WI9wu-r3vF1IwJiDgnB2Ys4Xxe9y2MVm8NCbtBNgdwQ81QPhxcGLKinwNv3l303G5L9w4vHo_jU_71fuELRe_SYyl_wDvHUBSTsYnGU7ShdpEb5Z3TvXFQTWEYk',
  },
  {
    id: 4,
    name: 'Lina Marlina',
    email: 'lina.m@laundrix.com',
    branch: 'Sudirman Central',
    role: 'Staff',
    status: 'Aktif',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC-sPI4ZQmwfqHYh2C5_eryy6E9UVDvEKOjRYosBCetX-atXB1OSnrUzCziJHbaXU8qx3FZkYepw0bNjcth6AYrmDDg9cWFWg64IigFhgaTD-z88bQRRxd6LaeAtNvrNABm2ucbJG7ogFWLLQEN29TiCzq2Q1rJGM3KgVYkLRHtQ1QBANHy9DmuGxajNyosMjpXKjEEt8anb4d9X8gpiiQVxz579RKgPg5pw0RkmFQI5mbAu_6ByXMJzbvfvQoQA3GMG2r-knB72w',
  },
];

export default function EmployeesPage() {
  const [branchFilter, setBranchFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Manajemen Karyawan</h2>
          <p className="text-[15px] text-[#3e484c]">Kelola data, peran, dan status aktifitas staf di seluruh cabang.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#00687b] text-white rounded-lg text-[13px] font-semibold hover:bg-[#004e5d] transition-all shadow-sm shrink-0 active:scale-95">
          <Plus className="w-4 h-4" />
          Tambah Karyawan
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#c3cdd1] rounded-xl p-5 shadow-sm flex items-center justify-between hover:border-[#00687b]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-1">Total Karyawan</p>
            <p className="font-mono text-[30px] font-bold text-[#1b1c1c] leading-none">15</p>
          </div>
          <div className="w-12 h-12 bg-[#f5f3f3] rounded-xl flex items-center justify-center text-[#00687b]">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#c3cdd1] rounded-xl p-5 shadow-sm flex items-center justify-between hover:border-[#00687b]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-1">Aktif Hari Ini</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="font-mono text-[30px] font-bold text-[#1b1c1c] leading-none">12</p>
              <span className="bg-green-50 text-[#16A34A] px-2 py-0.5 rounded-full text-[10px] font-bold border border-green-200">STAF ON-DUTY</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#16A34A]">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#c3cdd1] rounded-xl p-5 shadow-sm flex items-center justify-between hover:border-[#00687b]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-1">Cabang Tercover</p>
            <p className="font-mono text-[30px] font-bold text-[#1b1c1c] leading-none">8</p>
          </div>
          <div className="w-12 h-12 bg-[#f5f3f3] rounded-xl flex items-center justify-center text-[#00687b]">
            <Map className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-[#c3cdd1] rounded-xl shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border-b border-[#E5E5E5]">
          <div className="flex gap-2">
            <select
              className="border border-[#c3cdd1] rounded-lg text-[13px] font-semibold text-[#1b1c1c] bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00687b]/20 focus:border-[#00687b] transition-all"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="all">Semua Cabang</option>
              <option value="sudirman">Sudirman Central</option>
              <option value="gading">Gading Serpong</option>
              <option value="menteng">Menteng Hub</option>
            </select>
            <select
              className="border border-[#c3cdd1] rounded-lg text-[13px] font-semibold text-[#1b1c1c] bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00687b]/20 focus:border-[#00687b] transition-all"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Semua Peran</option>
              <option value="owner">Owner</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <p className="text-[13px] text-[#6e797d]">
            Menampilkan <span className="font-bold text-[#1b1c1c]">15</span> Karyawan
          </p>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] bg-[#FAFAFA] px-6 py-3 border-b border-[#E5E5E5]">
          <div className="text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Nama Karyawan</div>
          <div className="text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Cabang</div>
          <div className="text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Peran</div>
          <div className="text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Status</div>
          <div className="text-[11px] font-bold text-[#6e797d] uppercase tracking-wider text-right">Aksi</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-[#E5E5E5]">
          {employees.map((emp) => {
            const isInactive = emp.status === 'Nonaktif';
            return (
              <div
                key={emp.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] px-6 py-4 hover:bg-[#FAFAFA] transition-colors group"
              >
                {/* Name & Email */}
                <div className="flex items-center gap-3">
                  <img
                    alt={emp.name}
                    className={`w-10 h-10 rounded-lg shadow-sm border border-[#bdc8cd]/30 object-cover ${isInactive ? 'grayscale opacity-60' : ''}`}
                    src={emp.avatar}
                  />
                  <div className={`flex flex-col ${isInactive ? 'opacity-60' : ''}`}>
                    <span className="text-[14px] font-semibold text-[#1b1c1c] leading-tight">{emp.name}</span>
                    <span className="text-[12px] text-[#6e797d]">{emp.email}</span>
                  </div>
                </div>

                {/* Branch */}
                <div className="flex items-center">
                  <span className={`px-2.5 py-1 rounded-lg text-[12px] font-bold border ${isInactive ? 'bg-[#f5f3f3] text-[#6e797d] border-[#E5E5E5]' : 'bg-[#EBF8FC] text-[#00687b] border-[#00687b]/20'}`}>
                    {emp.branch}
                  </span>
                </div>

                {/* Role */}
                <div className="flex items-center">
                  <span className="text-[14px] text-[#1b1c1c] font-medium">{emp.role}</span>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  {isInactive ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f5f3f3] text-[#6e797d] rounded-full text-[12px] font-bold">
                      <span className="w-1.5 h-1.5 bg-[#6e797d] rounded-full"></span>
                      Nonaktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-[#16A34A] rounded-full text-[12px] font-bold">
                      <span className="w-1.5 h-1.5 bg-[#16A34A] rounded-full animate-pulse"></span>
                      Aktif
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-[#EBF8FC] text-[#6e797d] hover:text-[#00687b] transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-50 text-[#6e797d] hover:text-[#DC2626] transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white flex flex-col sm:flex-row items-center justify-between border-t border-[#E5E5E5] gap-3">
          <p className="text-[13px] text-[#6e797d]">
            Menampilkan halaman <span className="font-bold text-[#1b1c1c]">1</span> dari 4
          </p>
          <div className="flex gap-1">
            <button className="p-1.5 border border-[#E5E5E5] rounded-lg text-[#6e797d] hover:bg-[#FAFAFA] disabled:opacity-40 transition-colors" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-[#00687b] text-white rounded-lg font-bold text-[13px] shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-[#FAFAFA] rounded-lg text-[13px] font-medium text-[#1b1c1c] transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-[#FAFAFA] rounded-lg text-[13px] font-medium text-[#1b1c1c] transition-colors">3</button>
            <button className="p-1.5 border border-[#E5E5E5] rounded-lg text-[#6e797d] hover:bg-[#FAFAFA] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#EBF8FC] border border-[#00687b]/20 p-6 rounded-xl flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#00687b] shadow-sm shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[16px] font-bold text-[#004e5d] mb-1">Tips Keamanan</h4>
            <p className="text-[13px] text-[#3e484c] leading-relaxed">Pastikan peran <span className="font-semibold text-[#00687b]">&apos;Owner&apos;</span> hanya diberikan kepada orang kepercayaan. Peran Staff tidak dapat mengakses laporan keuangan atau mengubah pengaturan sistem.</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-[#805600]/20 p-6 rounded-xl flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#805600] shadow-sm shrink-0">
            <HeadphonesIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[16px] font-bold text-[#4a3000] mb-1">Butuh Bantuan?</h4>
            <p className="text-[13px] text-[#3e484c] leading-relaxed">Jika Anda mengalami kendala saat menambah karyawan baru atau ingin integrasi absensi biometrik, hubungi Customer Care kami melalui tombol Help.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
