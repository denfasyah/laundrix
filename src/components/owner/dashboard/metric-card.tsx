import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  iconBgColor?: string;
  iconTextColor?: string;
  isWarning?: boolean;
  children?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
  iconBgColor = 'bg-[#EBF8FC]',
  iconTextColor = 'text-[#00687b]',
  isWarning,
  children
}: MetricCardProps) {
  return (
    <div className="bg-[#fbf9f9] p-4 rounded-xl border border-[#bdc8cd] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-1.5 rounded-lg ${iconBgColor} ${iconTextColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-[13px] font-semibold flex items-center gap-1 ${isWarning ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
            {trend}
            {trendUp !== undefined && (
              <svg 
                className={`w-4 h-4 ${!trendUp ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            )}
          </span>
        )}
      </div>
      <h3 className="text-[#3e484c] text-[13px] font-semibold mb-1">{title}</h3>
      <p className="text-[24px] font-semibold font-mono leading-tight">{value}</p>
      {children ? children : (
        <p className="text-[11px] text-[#3e484c] mt-2">{subtitle}</p>
      )}
    </div>
  );
}
