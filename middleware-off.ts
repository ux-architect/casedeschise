// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEFAULT_YEAR = '2025';

export const config = {
  matcher: [
     // Only match root-level routes that should be redirected
    '/',              // Home route → /2025
    '/sibiu/:path*',  // /sibiu → /2025/sibiu
    '/valcea/:path*', // /valcea → /2025/valcea
    '/map/:path*',
    '/events/:path*',
    '/tours/:path*',
    // Add more if needed
  ],
};


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already includes a 4-digit year — do nothing
  if (/^\/\d{4}(\/|$)/.test(pathname)) {
    return NextResponse.next();
  }

  // Redirect only for matched routes
  return NextResponse.redirect(new URL(`/${DEFAULT_YEAR}${pathname}`, request.url));
}