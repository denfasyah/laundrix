import { DashboardMetrics, ActivityLog, RecentTransaction } from './dashboard.types';

export const mockMetrics: DashboardMetrics = {
  totalRevenue: 12450800,
  revenueGrowth: 12.5,
  totalTransactions: 482,
  transactionsGrowth: 3.2,
  avgTransactionValue: 25800,
  staffPresent: 8,
  totalStaff: 12,
  brokenWashers: 2,
  brokenDryers: 1,
};

export const mockActivities: ActivityLog[] = [
  {
    id: 'act-1',
    type: 'order_completed',
    title: 'Pesanan #4402 Selesai',
    timeAgo: '2m yang lalu',
    description: "Cuci & Lipat untuk klien 'Sarah Jenkins' oleh staf 'Lisa K.'",
  },
  {
    id: 'act-2',
    type: 'machine_error',
    title: 'Kesalahan Mesin: W-04',
    timeAgo: '15m yang lalu',
    description: 'Mesin Cuci #4 terhenti di tengah siklus karena sensor saluran pembuangan tersumbat.',
  },
  {
    id: 'act-3',
    type: 'inventory_restock',
    title: 'Pasokan Diisi Kembali',
    timeAgo: '45m yang lalu',
    description: 'Deterjen efisiensi tinggi diisi ulang (+25 gal) oleh manajer inventaris.',
  },
  {
    id: 'act-4',
    type: 'shift_started',
    title: 'Shift Dimulai: James T.',
    timeAgo: '1j yang lalu',
    description: 'Supervisor tim pagi telah masuk kerja untuk cabang pusat kota.',
  },
];

export const mockTransactions: RecentTransaction[] = [
  {
    id: '#TX-9821',
    customerInitials: 'AL',
    customerName: 'Amelia Laurent',
    serviceType: 'Cuci & Lipat Premium',
    status: 'completed',
    amount: 45000,
  },
  {
    id: '#TX-9820',
    customerInitials: 'BR',
    customerName: 'Borden Riley',
    serviceType: 'Dry Cleaning (3pcs)',
    status: 'processing',
    amount: 32500,
  },
  {
    id: '#TX-9819',
    customerInitials: 'MK',
    customerName: 'Marcus Kim',
    serviceType: 'Swa-layan (Mesin Cuci 12)',
    status: 'in_progress',
    amount: 8000,
  },
  {
    id: '#TX-9818',
    customerInitials: 'SJ',
    customerName: 'Sarah Jenkins',
    serviceType: 'Cuci Khusus Duvet',
    status: 'completed',
    amount: 28000,
  },
];
