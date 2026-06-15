export interface DashboardMetrics {
  totalRevenue: number;
  revenueGrowth: number;
  totalTransactions: number;
  transactionsGrowth: number;
  avgTransactionValue: number;
  staffPresent: number;
  totalStaff: number;
  brokenWashers: number;
  brokenDryers: number;
}

export interface ActivityLog {
  id: string;
  type: 'order_completed' | 'machine_error' | 'inventory_restock' | 'shift_started';
  title: string;
  timeAgo: string;
  description: string;
}

export interface RecentTransaction {
  id: string;
  customerInitials: string;
  customerName: string;
  serviceType: string;
  status: 'completed' | 'processing' | 'in_progress';
  amount: number;
}
