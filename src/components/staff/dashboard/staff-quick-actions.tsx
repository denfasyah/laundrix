import { WashingMachine, Package, Headset } from 'lucide-react';

const actions = [
  { label: 'Mulai Mesin', icon: WashingMachine, href: '/staff/transactions/new' },
  { label: 'Update Stok', icon: Package, href: '/staff/inventory' },
  { label: 'Bantuan Hub', icon: Headset, href: '#' },
];

export function StaffQuickActions() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {actions.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          className="flex flex-col items-center justify-center p-6 bg-[#fbf9f9] border border-[#c3cdd1] rounded-xl hover:border-[#00687b] hover:bg-[#EBF8FC] transition-all group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#f5f3f3] flex items-center justify-center text-[#3e484c] mb-3 group-hover:bg-white group-hover:text-[#00687b] transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[13px] font-bold text-[#1b1c1c] group-hover:text-[#00687b] text-center">{label}</span>
        </a>
      ))}
    </div>
  );
}
