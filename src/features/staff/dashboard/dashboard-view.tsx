import { StaffDashboardHeader } from '@/components/staff/dashboard/staff-dashboard-header';
import { StaffKpiCards } from '@/components/staff/dashboard/staff-kpi-cards';
import { StaffAttendanceCard } from '@/components/staff/dashboard/staff-attendance-card';
import { StaffQuickActions } from '@/components/staff/dashboard/staff-quick-actions';
import { StaffLowStock } from '@/components/staff/dashboard/staff-low-stock';
import { StaffMachineStatus } from '@/components/staff/dashboard/staff-machine-status';
import { StaffRecentActivity } from '@/components/staff/dashboard/staff-recent-activity';
import {
  mockKpiMetrics,
  mockAttendance,
  mockLowStock,
  mockMachines,
  mockRecentActivities,
} from './dashboard.mock';

export function StaffDashboardView() {
  return (
    <>
      <StaffDashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <StaffKpiCards metrics={mockKpiMetrics} />
          <StaffAttendanceCard attendance={mockAttendance} />
          <StaffQuickActions />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <StaffLowStock items={mockLowStock} />
          <StaffMachineStatus machines={mockMachines} />
          <StaffRecentActivity activities={mockRecentActivities} />
        </div>
      </div>
    </>
  );
}
