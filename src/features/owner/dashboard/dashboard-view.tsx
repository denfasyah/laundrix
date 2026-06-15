import { DashboardHeader } from '@/components/owner/dashboard/dashboard-header';
import { StatsGrid } from '@/components/owner/dashboard/stats-grid';
import { RevenueChart } from '@/components/owner/dashboard/revenue-chart';
import { RecentActivity } from '@/components/owner/dashboard/recent-activity';
import { RecentTransactions } from '@/components/owner/dashboard/recent-transactions';
import { mockMetrics, mockActivities, mockTransactions } from './dashboard.mock';

export function DashboardView() {
  return (
    <>
      <DashboardHeader />
      <StatsGrid metrics={mockMetrics} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
        <RevenueChart />
        <RecentActivity activities={mockActivities} />
      </div>
      <RecentTransactions transactions={mockTransactions} />
    </>
  );
}
