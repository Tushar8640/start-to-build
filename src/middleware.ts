import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseAuthCookie, verifyJwt } from './lib/verify';

export async function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';
  const token = parseAuthCookie(cookieHeader);
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const user = token ? await verifyJwt(token) : null;
  const isAuthenticated = !!user;

  const publicPaths = ['/login', '/signup'];
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isProtectedPath = !isPublicPath;

  // ✅ If user is authenticated and tries to access login or signup, redirect to /chat
  if (isAuthenticated && isPublicPath) {
    if (pathname !== '/chat') {
      url.pathname = '/chat';
      return NextResponse.redirect(url);
    }
  }

  // ✅ If user is not authenticated and tries to access protected path, redirect to /login
  if (!isAuthenticated && isProtectedPath) {
    if (pathname !== '/login') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'], // exclude /api
};
