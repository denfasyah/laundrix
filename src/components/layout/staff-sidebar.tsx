'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  WashingMachine,
  LayoutDashboard,
  PlusSquare,
  ReceiptText,
  Package,
  CalendarClock,
  Wrench,
  LogOut,
  ChevronsUpDown,
  X,
} from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';

const navItems = [
  { name: 'Dasbor', href: '/staff/dashboard', icon: LayoutDashboard },
  { name: 'Transaksi Baru', href: '/staff/transactions/new', icon: PlusSquare },
  { name: 'Transaksi Saya', href: '/staff/transactions', icon: ReceiptText },
  { name: 'Inventaris', href: '/staff/inventory', icon: Package },
  { name: 'Absensi', href: '/staff/attendance', icon: CalendarClock },
  { name: 'Laporan Mesin', href: '/staff/machine-reports', icon: Wrench },
];

export function StaffSidebar({ isOpen = false, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`fixed left-0 top-0 h-screen flex flex-col p-4 bg-[#2fa1bb] border-r border-white/10 shadow-sm w-64 z-50 transition-transform duration-300 ease-in-out text-white ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="mb-8 flex items-center gap-2">
        <button
          onClick={onClose}
          className="lg:hidden absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Tutup menu"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
          <WashingMachine className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-[18px] font-bold text-white leading-tight">Laundrix</h1>
          <p className="text-[11px] text-white/80 leading-tight">Manajemen Laundry</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto hide-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-2.5 rounded-lg text-[14px] font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white scale-[0.98]'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-white/10 mt-4">
        <LogoutButton className="w-full bg-white text-[#2fa1bb] text-[13px] font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <LogOut className="w-4 h-4" />
          <span>Logout Sistem</span>
        </LogoutButton>

        <div className="mt-4 flex items-center gap-2 px-1">
          <img
            alt="Staff Profile"
            className="w-8 h-8 rounded-full bg-white/20 border border-white/20 object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYXftI2-2dikRLZN18SI-HNd-t7sZk8qRrsLEbjws3uVNxxBPc-xnqGG1opkgBi0dhmqE0BGbu4BJBRlejMM9NuHvPzc-kv1RHEncqp9wJondIK187HDlOc6hmWl3qMAFcXvEfdOar29iJDTO-VayY_mmTCSFdpDQXHww0Gwe-rm0VHQYILvCO8NrZYC5ezEqBTl6nlNc90hh81xbJru2NkiZbSSZYuKViYSkWYyYIJtBU0iHdnJeLt77RqNafufvFNYtkG54RFMw"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold truncate leading-tight">Budi Santoso</p>
            <p className="text-[11px] text-white/80 truncate leading-tight">Staf Operasional</p>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-white/80" />
        </div>
      </div>
    </aside>
  );
}
