import {
  StaffKpiMetrics,
  AttendanceInfo,
  LowStockItem,
  MachineItem,
  RecentActivityItem,
} from './dashboard.types';

export const mockKpiMetrics: StaffKpiMetrics = {
  todayTransactions: 12,
  transactionsDiff: 2,
  todaySales: 1200000,
  dailyTarget: 2000000,
};

export const mockAttendance: AttendanceInfo = {
  name: 'Budi Santoso',
  shift: 'Shift Pagi',
  shiftHours: '08:00 - 16:00',
  checkInTime: '08:32',
  status: 'on_duty',
};

export const mockLowStock: LowStockItem[] = [
  { id: 'ls-1', name: 'Deterjen Sachet', remaining: 3, unit: 'unit', icon: 'soap' },
  { id: 'ls-2', name: 'Kantong Plastik', remaining: 7, unit: 'unit', icon: 'bag' },
];

export const mockMachines: MachineItem[] = [
  { id: 'mc-1', name: 'Mesin Cuci #1', status: 'running', info: '12:45 sisa' },
  { id: 'mc-2', name: 'Mesin Cuci #2', status: 'ready', info: 'Siap Pakai' },
  { id: 'mc-3', name: 'Mesin Pengering #1', status: 'running', info: '05:20 sisa' },
];

export const mockRecentActivities: RecentActivityItem[] = [
  {
    id: 'ra-1',
    type: 'transaction',
    title: 'Transaksi Berhasil',
    description: 'Reguler - 5kg - Bpk. Joni',
    time: '09:30 WIB',
  },
  {
    id: 'ra-2',
    type: 'machine',
    title: 'Mesin #2 Berhenti',
    description: 'Siklus pencucian selesai',
    time: '09:15 WIB',
  },
];
