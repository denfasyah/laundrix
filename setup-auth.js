const fs = require('fs');
const path = require('path');

const root = __dirname;
const src = path.join(root, 'src');

// 1. Root redirect
fs.writeFileSync(path.join(src, 'app/page.tsx'), "import { redirect } from 'next/navigation';\nexport default function Home() {\n  redirect('/login');\n}\n");

// 2. Middleware
const middlewareContent = `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  // Guest
  if (!session) {
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // Parse session (dummy format: role)
  const role = session; // 'owner' or 'staff'

  // Logged in users shouldn't access login
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/' + role + '/dashboard', request.url));
  }

  // Owner accessing staff routes
  if (role === 'owner' && pathname.startsWith('/staff')) {
    return NextResponse.redirect(new URL('/owner/dashboard', request.url));
  }

  // Staff accessing owner routes
  if (role === 'staff' && pathname.startsWith('/owner')) {
    return NextResponse.redirect(new URL('/staff/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
`;
fs.writeFileSync(path.join(src, 'middleware.ts'), middlewareContent);

// 3. Auth Actions
const authActionsContent = `'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'owner' && password === 'owner123') {
    (await cookies()).set('session', 'owner', { path: '/', httpOnly: true });
    redirect('/owner/dashboard');
  } else if (username === 'staff' && password === 'staff123') {
    (await cookies()).set('session', 'staff', { path: '/', httpOnly: true });
    redirect('/staff/dashboard');
  } else {
    return { error: 'Invalid credentials' };
  }
}

export async function logout() {
  (await cookies()).delete('session');
  redirect('/login');
}
`;
fs.writeFileSync(path.join(src, 'lib/actions/auth.actions.ts'), authActionsContent);

// 4. Login Page
const loginPageContent = `'use client';
import { login } from '@/lib/actions/auth.actions';

export default function LoginPage() {
  // Simple form without complex validation for now
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Laundrix Login</h1>
        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input type="text" name="username" required className="w-full border rounded p-2 text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" name="password" required className="w-full border rounded p-2 text-black" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-500">
          <p>Hint:</p>
          <p>owner / owner123</p>
          <p>staff / staff123</p>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(src, 'app/(auth)/login/page.tsx'), loginPageContent);

// 5. Layouts
const ownerLayoutContent = `import { logout } from '@/lib/actions/auth.actions';
import Link from 'next/link';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-4 font-bold text-xl border-b">Laundrix Owner</div>
        <nav className="p-4 space-y-2 flex flex-col">
          <Link href="/owner/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link href="/owner/branches" className="hover:text-blue-600">Cabang</Link>
          <Link href="/owner/employees" className="hover:text-blue-600">Karyawan</Link>
          <Link href="/owner/inventory" className="hover:text-blue-600">Inventaris</Link>
          <Link href="/owner/transactions" className="hover:text-blue-600">Transaksi</Link>
          <Link href="/owner/attendance" className="hover:text-blue-600">Absensi</Link>
          <Link href="/owner/machine-reports" className="hover:text-blue-600">Laporan Mesin</Link>
          <Link href="/owner/reports" className="hover:text-blue-600">Laporan</Link>
          <hr className="my-4" />
          <form action={logout}>
            <button type="submit" className="text-red-600 hover:text-red-800 text-left">Logout</button>
          </form>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
`;
fs.writeFileSync(path.join(src, 'app/owner/layout.tsx'), ownerLayoutContent);

const staffLayoutContent = `import { logout } from '@/lib/actions/auth.actions';
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
          <form action={logout}>
            <button type="submit" className="text-red-600 hover:text-red-800 text-left">Logout</button>
          </form>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
`;
fs.writeFileSync(path.join(src, 'app/staff/layout.tsx'), staffLayoutContent);

// 6. Update Placeholder Pages
function walkSync(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile() && file === 'page.tsx') {
      callback(filepath);
    }
  }
}

walkSync(path.join(src, 'app/owner'), (filepath) => {
  let name = filepath.replace(path.join(src, 'app'), '').replace('page.tsx', '');
  name = name.replace(/\\\\/g, '/');
  fs.writeFileSync(filepath, "export default function Page() { return <div><h1 className='text-2xl font-bold'>" + name + " Placeholder</h1></div>; }\n");
});

walkSync(path.join(src, 'app/staff'), (filepath) => {
  let name = filepath.replace(path.join(src, 'app'), '').replace('page.tsx', '');
  name = name.replace(/\\\\/g, '/');
  fs.writeFileSync(filepath, "export default function Page() { return <div><h1 className='text-2xl font-bold'>" + name + " Placeholder</h1></div>; }\n");
});

console.log('Setup Auth Complete!');
