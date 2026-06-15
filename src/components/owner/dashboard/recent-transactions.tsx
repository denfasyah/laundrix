import { RecentTransaction } from '@/features/owner/dashboard/dashboard.types';
import { Filter, MoreVertical, ChevronRight } from 'lucide-react';

const statusMap = {
  completed: { label: 'Selesai', bg: 'bg-[#16A34A]/10', text: 'text-[#16A34A]' },
  processing: { label: 'Diproses', bg: 'bg-[#FEB009]/10', text: 'text-[#FEB009]' }, // Secondary color #FEB009
  in_progress: { label: 'Sedang Jalan', bg: 'bg-[#00687b]/10', text: 'text-[#00687b]' }
};

export function RecentTransactions({ transactions }: { transactions: RecentTransaction[] }) {
  return (
    <div className="bg-[#fbf9f9] rounded-xl border border-[#bdc8cd] shadow-sm">
      <div className="p-6 border-b border-[#bdc8cd] flex justify-between items-center">
        <h3 className="text-[18px] font-semibold text-[#1b1c1c]">Transaksi Terbaru</h3>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-[#efeded] rounded transition-colors text-[#3e484c]">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-1.5 hover:bg-[#efeded] rounded transition-colors text-[#3e484c]">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#f5f3f3]">
              <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#3e484c] tracking-wider">ID Pesanan</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#3e484c] tracking-wider">Pelanggan</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#3e484c] tracking-wider">Jenis Layanan</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#3e484c] tracking-wider">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase text-[#3e484c] tracking-wider text-right">Jumlah</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#bdc8cd]">
            {transactions.map((tx) => {
              const statusStyle = statusMap[tx.status];
              return (
                <tr key={tx.id} className="hover:bg-[#f5f3f3] transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-mono text-[15px]">{tx.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#EBF8FC] text-[#00687b] flex items-center justify-center text-xs font-bold">
                        {tx.customerInitials}
                      </div>
                      <span className="text-[13px] font-medium">{tx.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px]">{tx.serviceType}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 ${statusStyle.bg} ${statusStyle.text} rounded-full text-[11px] font-semibold`}>
                      {statusStyle.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-[15px]">
                    Rp {tx.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ChevronRight className="w-5 h-5 text-[#3e484c] inline-block" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
