import { AlertTriangle, FlaskConical, ShoppingBag } from 'lucide-react';
import { LowStockItem } from '@/features/staff/dashboard/dashboard.types';

const iconMap = {
  soap: FlaskConical,
  bag: ShoppingBag,
};

export function StaffLowStock({ items }: { items: LowStockItem[] }) {
  return (
    <section className="bg-[#fbf9f9] border border-[#c3cdd1] rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-[#c3cdd1] flex items-center justify-between">
        <h3 className="font-bold text-[#1b1c1c] flex items-center gap-2 text-[15px]">
          <AlertTriangle className="w-5 h-5 text-[#9A3412]" />
          Stok Menipis
        </h3>
        <span className="bg-[#FFF7ED] text-[#9A3412] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
          Kritis
        </span>
      </div>
      <div className="p-5 space-y-3">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#E5E5E5]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#FAFAFA] flex items-center justify-center shadow-sm border border-[#E5E5E5]">
                  <Icon className="w-4 h-4 text-[#A3A3A3]" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#1b1c1c]">{item.name}</p>
                  <p className="text-[10px] text-[#EF4444] font-bold">Sisa: {item.remaining} {item.unit}</p>
                </div>
              </div>
              <button className="text-[#00687b] hover:underline text-[11px] font-bold">Pesan</button>
            </div>
          );
        })}
        <button className="w-full py-2.5 mt-1 bg-white border border-[#E5E5E5] text-[#1b1c1c] rounded-lg text-[12px] font-bold hover:bg-[#f5f5f5] transition-colors">
          Lihat Semua Inventaris
        </button>
      </div>
    </section>
  );
}
