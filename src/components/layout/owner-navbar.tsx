import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutButton } from '@/components/auth/logout-button';

export function OwnerNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const role = pathname?.startsWith('/staff') ? 'staff' : 'owner';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center h-16 px-4 lg:px-6 w-full sticky top-0 z-30 bg-[#fbf9f9]/80 backdrop-blur-md border-b border-[#bdc8cd] shadow-sm">
      <div className="flex items-center gap-4 lg:gap-6 flex-1">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-[#3e484c] hover:bg-[#e9e8e7] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="relative w-full max-w-[800px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3e484c] w-4 h-4" />
          <input 
            className="w-full pl-10 pr-4 py-2 bg-[#f5f3f3] border border-[#bdc8cd] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00687b]/20 focus:border-[#00687b] transition-all" 
            placeholder="Cari pesanan, mesin, atau staf..." 
            type="text" 
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href={`/${role}/notifications`} className="w-10 h-10 flex items-center justify-center text-[#3e484c] hover:bg-[#e9e8e7] rounded-full transition-colors relative cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#DC2626] rounded-full"></span>
        </Link>
        <div className="h-8 w-[1px] bg-[#bdc8cd] mx-1"></div>
        <div className="relative" ref={dropdownRef}>
          <img 
            alt="Profil" 
            className="w-8 h-8 rounded-full border border-[#bdc8cd] cursor-pointer hover:border-[#00687b] transition-colors object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqY0Hb-K5VjWwaUF-DVyW8d0DRJUvIVsnkfhcLcSYPCSfwCDpI2JMSTSinb1ojiTR454RKWyZ6sYXCAE5exBX5-Uf_qRdFNArFnag1O6Nkrk-P66Y0aq1BduRY0_76cACFGxGruGKj3URb07xinyBKSdC8wqtbN1IttGdj-_fjaI2bF7bi1nu_3Exybo9Hq9WIMMEQqIen-MUT9rxF68HBal1CMiwr7xHdZsj0KSJgXLol6D-3y89Ypv2zBLOQrIa5fl4oOvWawE0" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#bdc8cd] rounded-lg shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <Link 
                href={`/${role}/profile`}
                className="w-full px-4 py-2 text-[13px] font-medium text-[#1b1c1c] hover:bg-[#f5f3f3] flex items-center gap-2"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User className="w-4 h-4 text-[#3e484c]" />
                Profil Saya
              </Link>
              <LogoutButton className="w-full px-4 py-2 text-[13px] font-medium text-[#DC2626] hover:bg-[#ffdad6] flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </LogoutButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
