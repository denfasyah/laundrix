import { NextResponse } from 'next/server';
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

  // Invalid session string logic guard
  if (role !== 'owner' && role !== 'staff') {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('session');
    return response;
  }

  // Authenticated user shouldn't access root or login
  if (pathname === '/' || pathname === '/login') {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
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
