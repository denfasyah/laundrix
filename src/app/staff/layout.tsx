import { LogoutButton } from '@/components/auth/logout-button';
import Link from 'next/link';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-4 font-bold text-xl border-b">Laundrix Staff</div>
        <nav className="p-4 space-y-2 flex flex-col">
          <Link href="/staff/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link href="/staff/transactions" className="hover:text-blue-600">Transaksi</Link>
          <Link href="/staff/inventory" className="hover:text-blue-600">Inventaris</Link>
          <Link href="/staff/attendance" className="hover:text-blue-600">Absensi</Link>
          <Link href="/staff/machine-reports" className="hover:text-blue-600">Lapor Mesin</Link>
          <hr className="my-4" />
          <LogoutButton />
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
