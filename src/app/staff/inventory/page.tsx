import { Blocks, CheckCircle, Sparkles, Droplet, ShoppingBag, AlertTriangle, Info, Package } from 'lucide-react';
import Image from 'next/image';

export default function StaffInventoryPage() {
  const inventoryItems = [
    {
      id: 1,
      name: 'Deterjen Sachet',
      category: 'Retail',
      stock: 45,
      unit: 'Sachet',
      status: 'Tersedia',
      icon: Sparkles,
      statusColor: 'bg-green-100 text-green-700',
      dotColor: 'bg-green-500',
    },
    {
      id: 2,
      name: 'Pelembut Pakaian',
      category: 'Retail',
      stock: 12,
      unit: 'Sachet',
      status: 'Tersedia',
      icon: Droplet,
      statusColor: 'bg-green-100 text-green-700',
      dotColor: 'bg-green-500',
    },
    {
      id: 3,
      name: 'Kantong Plastik',
      category: 'Retail',
      stock: 4,
      unit: 'Lembar',
      status: 'Stok Menipis',
      icon: ShoppingBag,
      statusColor: 'bg-amber-100 text-amber-700',
      dotColor: 'bg-amber-500',
      isWarning: true,
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Inventaris Cabang</h2>
          <p className="text-[15px] text-[#3e484c]">Pantau stok barang retail yang tersedia di cabang Anda.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Jenis Barang */}
        <div className="bg-[#fbf9f9] rounded-xl p-6 border border-[#c3cdd1] shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-1 uppercase tracking-wider">Total Jenis Barang</p>
            <h3 className="text-[36px] font-mono font-bold text-[#00687b]">3</h3>
          </div>
          <div className="w-12 h-12 bg-[#EBF8FC] rounded-lg flex items-center justify-center text-[#00687b]">
            <Blocks className="w-6 h-6" />
          </div>
        </div>

        {/* Status Stok */}
        <div className="bg-[#fbf9f9] rounded-xl p-6 border border-[#c3cdd1] shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-[13px] font-semibold text-[#6e797d] mb-1 uppercase tracking-wider">Status Stok</p>
            <div className="flex items-center gap-2">
              <span className="text-[36px] font-bold text-[#16A34A]">Aman</span>
              <span className="flex h-3 w-3 rounded-full bg-[#16A34A] animate-pulse"></span>
            </div>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#16A34A]">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Inventory Table Container */}
      <div className="bg-[#fbf9f9] rounded-xl border border-[#c3cdd1] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#bdc8cd] flex justify-between items-center bg-[#f5f3f3]/30">
          <h4 className="text-[18px] font-bold text-[#1b1c1c]">Daftar Barang Retail</h4>
          <span className="text-[11px] text-[#6e797d] italic">Pembaruan stok terakhir: 10 menit yang lalu</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f5f3f3]/50">
                <th className="text-left py-4 px-6 text-[13px] font-semibold tracking-wider text-[#6e797d] uppercase">NAMA BARANG</th>
                <th className="text-left py-4 px-6 text-[13px] font-semibold tracking-wider text-[#6e797d] uppercase">KATEGORI</th>
                <th className="text-center py-4 px-6 text-[13px] font-semibold tracking-wider text-[#6e797d] uppercase">STOK SAAT INI</th>
                <th className="text-left py-4 px-6 text-[13px] font-semibold tracking-wider text-[#6e797d] uppercase">SATUAN</th>
                <th className="text-right py-4 px-6 text-[13px] font-semibold tracking-wider text-[#6e797d] uppercase">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bdc8cd]">
              {inventoryItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <tr key={item.id} className="hover:bg-white transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#e9e8e7] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <ItemIcon className="w-5 h-5 text-[#6e797d]" />
                        </div>
                        <span className="text-[16px] font-semibold text-[#1b1c1c]">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[15px] text-[#3e484c]">{item.category}</td>
                    <td className={`py-4 px-6 text-center font-mono text-[18px] font-semibold ${item.isWarning ? 'text-[#DC2626]' : 'text-[#1b1c1c]'}`}>
                      {item.stock}
                    </td>
                    <td className="py-4 px-6 text-[15px] text-[#6e797d]">{item.unit}</td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold ${item.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${item.dotColor}`}></span>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decorative Info Section */}

    </div>
  );
}
