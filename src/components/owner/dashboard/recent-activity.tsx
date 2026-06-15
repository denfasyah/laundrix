import { ActivityLog } from '@/features/owner/dashboard/dashboard.types';
import { CheckCircle2, AlertTriangle, Package, UserPlus } from 'lucide-react';

const iconMap = {
  order_completed: { icon: CheckCircle2, bg: 'bg-[#16A34A]/10', text: 'text-[#16A34A]', border: 'border-[#16A34A]/20' },
  machine_error: { icon: AlertTriangle, bg: 'bg-[#DC2626]/10', text: 'text-[#DC2626]', border: 'border-[#DC2626]/20' },
  inventory_restock: { icon: Package, bg: 'bg-[#FEB009]/10', text: 'text-[#FEB009]', border: 'border-[#FEB009]/20' }, // Secondary color is FEB009
  shift_started: { icon: UserPlus, bg: 'bg-[#00687b]/10', text: 'text-[#00687b]', border: 'border-[#00687b]/20' }
};

export function RecentActivity({ activities }: { activities: ActivityLog[] }) {
  return (
    <div className="bg-[#fbf9f9] rounded-xl border border-[#bdc8cd] shadow-sm flex flex-col">
      <div className="p-6 border-b border-[#bdc8cd]">
        <h3 className="text-[18px] font-semibold text-[#1b1c1c]">Aktivitas Terkini</h3>
        <p className="text-[11px] text-[#3e484c]">Pembaruan langsung dari operasional lapangan</p>
      </div>
      <div className="p-4 flex-1 space-y-4 overflow-y-auto hide-scrollbar">
        {activities.map((activity, idx) => {
          const isLast = idx === activities.length - 1;
          const { icon: Icon, bg, text, border } = iconMap[activity.type];
          
          return (
            <div key={activity.id} className="flex gap-4 group cursor-pointer">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${bg} ${text} ${border}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {!isLast && (
                  <div className="absolute top-10 left-1/2 w-[1px] h-full bg-[#bdc8cd]/50 -translate-x-1/2"></div>
                )}
              </div>
              <div className={`flex-1 ${!isLast ? 'pb-4' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[13px] font-semibold text-[#1b1c1c]">{activity.title}</p>
                  <span className="text-[11px] text-[#3e484c]">{activity.timeAgo}</span>
                </div>
                <p className="text-[13px] text-[#3e484c] leading-relaxed">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-[#bdc8cd]">
        <button className="w-full text-[#00687b] text-[13px] font-semibold hover:underline py-1 text-center">
          Lihat Log Audit Lengkap
        </button>
      </div>
    </div>
  );
}
