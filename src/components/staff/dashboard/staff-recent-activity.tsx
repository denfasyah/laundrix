import { RecentActivityItem } from '@/features/staff/dashboard/dashboard.types';

export function StaffRecentActivity({ activities }: { activities: RecentActivityItem[] }) {
  return (
    <section className="bg-[#fbf9f9] border border-[#c3cdd1] rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-[#c3cdd1]">
        <h3 className="font-bold text-[#1b1c1c] text-[15px]">Aktivitas Terakhir</h3>
      </div>
      <div className="p-5 relative space-y-5">
        {/* vertical line */}
        <div className="absolute left-[29px] top-5 bottom-5 w-px bg-[#E5E5E5]" />

        {activities.map((activity) => {
          const isTransaction = activity.type === 'transaction';
          return (
            <div key={activity.id} className="flex gap-4 relative">
              <div
                className={`w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 mt-0.5 shrink-0 ${
                  isTransaction ? 'bg-[#2FA1BB]' : 'bg-[#9A3412]'
                }`}
              />
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-[#1b1c1c]">{activity.title}</p>
                <p className="text-[11px] text-[#3e484c] truncate">{activity.description}</p>
                <p className="text-[10px] text-[#A3A3A3] mt-1 font-mono">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-5 pb-5">
        <button className="w-full text-[11px] font-bold text-[#00687b] hover:underline text-center">
          Lihat Log Lengkap
        </button>
      </div>
    </section>
  );
}
