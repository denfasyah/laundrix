'use client';

import { Edit, BarChart3, Receipt, Wallet, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="w-full flex flex-col gap-6 max-w-[1200px]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Profil Saya</h2>
          <p className="text-[15px] text-[#3e484c]">Kelola informasi profil dan performa akun Anda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="bg-white border border-[#c3cdd1] rounded-xl shadow-sm overflow-hidden flex flex-col items-center justify-center p-8 text-center relative lg:col-span-1">
          <div className="relative group mb-6">
            <img 
              alt="Staff Profile" 
              className="w-32 h-32 rounded-full border-4 border-[#EBF8FC] shadow-sm object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqY0Hb-K5VjWwaUF-DVyW8d0DRJUvIVsnkfhcLcSYPCSfwCDpI2JMSTSinb1ojiTR454RKWyZ6sYXCAE5exBX5-Uf_qRdFNArFnag1O6Nkrk-P66Y0aq1BduRY0_76cACFGxGruGKj3URb07xinyBKSdC8wqtbN1IttGdj-_fjaI2bF7bi1nu_3Exybo9Hq9WIMMEQqIen-MUT9rxF68HBal1CMiwr7xHdZsj0KSJgXLol6D-3y89Ypv2zBLOQrIa5fl4oOvWawE0" 
            />
            <button className="absolute bottom-0 right-0 bg-[#00687b] text-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform hover:bg-[#004e5d]">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <h1 className="text-[22px] font-bold text-[#1b1c1c] mb-2 leading-tight">Staff Sudirman</h1>
          <span className="px-4 py-1 bg-[#EBF8FC] text-[#00687b] text-[12px] font-bold rounded-full border border-[#00687b]/20 mb-4">Shift Pagi</span>
          <div className="w-full h-[1px] bg-[#E5E5E5] my-4"></div>
          <p className="text-[13px] text-[#3e484c]">Bergabung sejak:</p>
          <p className="text-[14px] font-semibold text-[#1b1c1c]">12 Januari 2023</p>
        </div>

        {/* Account Statistics Card */}
        <div className="bg-white border border-[#c3cdd1] rounded-xl shadow-sm overflow-hidden flex flex-col lg:col-span-2">
          <div className="px-6 py-4 border-b border-[#E5E5E5] bg-[#FAFAFA] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#00687b]" />
            <h3 className="text-[13px] font-bold text-[#3e484c] uppercase tracking-wider">Statistik Akun</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Total Transaksi */}
            <div className="bg-[#fbf9f9] border border-[#E5E5E5] rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <p className="text-[12px] font-semibold text-[#6e797d] uppercase tracking-wider mb-1">Total Transaksi</p>
                <p className="font-mono text-[28px] font-bold text-[#1b1c1c] leading-none">1,248</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#EBF8FC] flex items-center justify-center text-[#00687b]">
                <Receipt className="w-6 h-6" />
              </div>
            </div>

            {/* Pendapatan Dihasilkan */}
            <div className="bg-[#fbf9f9] border border-[#E5E5E5] rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <p className="text-[12px] font-semibold text-[#6e797d] uppercase tracking-wider mb-1">Pendapatan Dihasilkan</p>
                <p className="font-mono text-[24px] font-bold text-[#16A34A] leading-none">Rp 42.5Jt</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#16A34A]">
                <Wallet className="w-6 h-6" />
              </div>
            </div>

            {/* Ringkasan Kehadiran */}
            <div className="bg-[#fbf9f9] border border-[#E5E5E5] rounded-xl p-6 col-span-1 sm:col-span-2 shadow-sm mt-2">
              <p className="text-[13px] font-bold text-[#1b1c1c] mb-4 flex items-center gap-2">
                Ringkasan Kehadiran 
                <span className="text-[#6e797d] font-medium text-[12px] bg-white px-2 py-0.5 rounded-full border border-[#E5E5E5]">Bulan Ini</span>
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-white border border-[#E5E5E5] rounded-xl shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-[#16A34A] mb-2 opacity-90" />
                  <p className="font-mono text-[24px] font-bold text-[#1b1c1c] leading-none mb-1">26</p>
                  <p className="text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Hadir</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white border border-[#E5E5E5] rounded-xl shadow-sm">
                  <XCircle className="w-8 h-8 text-[#DC2626] mb-2 opacity-90" />
                  <p className="font-mono text-[24px] font-bold text-[#1b1c1c] leading-none mb-1">1</p>
                  <p className="text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Alpa</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white border border-[#E5E5E5] rounded-xl shadow-sm">
                  <AlertCircle className="w-8 h-8 text-[#805600] mb-2 opacity-90" />
                  <p className="font-mono text-[24px] font-bold text-[#1b1c1c] leading-none mb-1">3</p>
                  <p className="text-[11px] font-bold text-[#6e797d] uppercase tracking-wider">Izin</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
