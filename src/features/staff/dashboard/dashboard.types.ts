export interface StaffKpiMetrics {
  todayTransactions: number;
  transactionsDiff: number;
  todaySales: number;
  dailyTarget: number;
}

export interface AttendanceInfo {
  name: string;
  shift: string;
  shiftHours: string;
  checkInTime: string;
  status: 'on_duty' | 'off_duty';
}

export interface LowStockItem {
  id: string;
  name: string;
  remaining: number;
  unit: string;
  icon: 'soap' | 'bag';
}

export type MachineStatus = 'running' | 'ready' | 'error';

export interface MachineItem {
  id: string;
  name: string;
  status: MachineStatus;
  info: string;
}

export interface RecentActivityItem {
  id: string;
  type: 'transaction' | 'machine';
  title: string;
  description: string;
  time: string;
}
