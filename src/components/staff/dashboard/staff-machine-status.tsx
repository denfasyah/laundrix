import { MachineItem } from '@/features/staff/dashboard/dashboard.types';

const statusStyles = {
  running: { dot: 'bg-[#22C55E]', text: null },
  ready: { dot: 'bg-[#2FA1BB]', text: 'Siap Pakai' },
  error: { dot: 'bg-[#EF4444]', text: null },
};

export function StaffMachineStatus({ machines }: { machines: MachineItem[] }) {
  const activeCount = machines.filter((m) => m.status !== 'error').length;

  return (
    <section className="bg-[#fbf9f9] border border-[#c3cdd1] rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-[#c3cdd1] flex items-center justify-between">
        <h3 className="font-bold text-[#1b1c1c] text-[15px]">Status Mesin</h3>
        <span className="text-[11px] text-[#A3A3A3] font-bold">
          Aktif: {activeCount}/{machines.length}
        </span>
      </div>
      <div className="p-5 space-y-4">
        {machines.map((machine) => {
          const style = statusStyles[machine.status];
          return (
            <div key={machine.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                <span className="text-[13px] text-[#1b1c1c] font-medium">{machine.name}</span>
              </div>
              {style.text ? (
                <span className="text-[10px] font-bold text-[#2FA1BB] uppercase bg-[#EBF8FC] px-2 py-0.5 rounded">
                  {style.text}
                </span>
              ) : (
                <span className="text-[11px] font-mono text-[#A3A3A3]">{machine.info}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
