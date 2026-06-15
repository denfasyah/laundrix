'use client';

import { useState } from 'react';
import { StaffSidebar } from './staff-sidebar';
import { OwnerNavbar } from './owner-navbar';

export function StaffShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#fbf9f9] text-[#1b1c1c] overflow-hidden flex h-screen">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <StaffSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden w-full transition-all duration-300">
        <OwnerNavbar onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#fbf9f9] hide-scrollbar">
          <div className="max-w-[1200px] mx-auto space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
