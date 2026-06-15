export function RevenueChart() {
  return (
    <div className="lg:col-span-2 bg-[#fbf9f9] rounded-xl border border-[#bdc8cd] shadow-sm flex flex-col">
      <div className="p-6 border-b border-[#bdc8cd] flex justify-between items-center">
        <div>
          <h3 className="text-[18px] font-semibold text-[#1b1c1c]">Ringkasan Pendapatan</h3>
          <p className="text-[11px] text-[#3e484c]">Pendapatan harian di semua cabang</p>
        </div>
        <div className="flex bg-[#efeded] rounded-lg p-1">
          <button className="px-4 py-1 bg-[#fbf9f9] text-[#00687b] rounded shadow-sm text-[13px] font-semibold">Minggu</button>
          <button className="px-4 py-1 text-[#3e484c] text-[13px] font-semibold hover:text-[#1b1c1c]">Bulan</button>
        </div>
      </div>
      <div className="p-6 flex-1 min-h-[350px] relative">
        <div className="absolute inset-6 flex flex-col justify-between">
          <div className="flex justify-between w-full h-full items-end pb-8 gap-6">
            <div className="w-full bg-[#00687b]/10 rounded-t-sm relative group" style={{ height: '40%' }}>
              <div className="absolute inset-x-0 bottom-0 bg-[#00687b]/30 h-1/2 group-hover:bg-[#00687b]/50 transition-all"></div>
            </div>
            <div className="w-full bg-[#00687b]/10 rounded-t-sm relative group" style={{ height: '65%' }}>
              <div className="absolute inset-x-0 bottom-0 bg-[#00687b]/30 h-1/2 group-hover:bg-[#00687b]/50 transition-all"></div>
            </div>
            <div className="w-full bg-[#00687b]/10 rounded-t-sm relative group" style={{ height: '55%' }}>
              <div className="absolute inset-x-0 bottom-0 bg-[#00687b]/30 h-1/2 group-hover:bg-[#00687b]/50 transition-all"></div>
            </div>
            <div className="w-full bg-[#00687b]/10 rounded-t-sm relative group" style={{ height: '85%' }}>
              <div className="absolute inset-x-0 bottom-0 bg-[#00687b]/30 h-1/2 group-hover:bg-[#00687b]/50 transition-all"></div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1b1c1c] text-[#fbf9f9] text-[11px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Rp 2.450.000</div>
            </div>
            <div className="w-full bg-[#00687b]/10 rounded-t-sm relative group" style={{ height: '45%' }}>
              <div className="absolute inset-x-0 bottom-0 bg-[#00687b]/30 h-1/2 group-hover:bg-[#00687b]/50 transition-all"></div>
            </div>
            <div className="w-full bg-[#00687b]/10 rounded-t-sm relative group" style={{ height: '70%' }}>
              <div className="absolute inset-x-0 bottom-0 bg-[#00687b]/30 h-1/2 group-hover:bg-[#00687b]/50 transition-all"></div>
            </div>
            <div className="w-full bg-[#00687b]/10 rounded-t-sm relative group" style={{ height: '60%' }}>
              <div className="absolute inset-x-0 bottom-0 bg-[#00687b]/30 h-1/2 group-hover:bg-[#00687b]/50 transition-all"></div>
            </div>
          </div>
          <div className="flex justify-between pt-4 border-t border-[#bdc8cd] text-[11px] text-[#3e484c] font-mono">
            <span>SEN</span>
            <span>SEL</span>
            <span>RAB</span>
            <span>KAM</span>
            <span>JUM</span>
            <span>SAB</span>
            <span>MIN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
