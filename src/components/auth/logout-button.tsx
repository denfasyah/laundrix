'use client';

import { logout } from '@/lib/actions/auth.actions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function LogoutButton() {
  const MySwal = withReactContent(Swal);

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: 'Yakin Logout?',
      text: "Anda akan keluar dari sesi ini.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      await MySwal.fire({
        title: 'Logout Berhasil',
        text: 'Mengarahkan ke halaman login...',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      logout();
    }
  };

  return (
    <button onClick={handleLogout} className="text-red-600 hover:text-red-800 text-left w-full">
      Logout
    </button>
  );
}
