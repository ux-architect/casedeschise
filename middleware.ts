import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  const isBot = /bot|crawl|spider|slurp|semrush|ahrefs|bytespider|gpt|claude/i.test(ua);
  const isGooglebot = /googlebot/i.test(ua);

  if (isBot && !isGooglebot && request.nextUrl.pathname.startsWith('/_next/image')) {
    console.log(`[BOT IMAGE BLOCKED] ${ua.slice(0, 80)} → ${request.nextUrl.search}`);
    return new NextResponse(null, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/_next/image'],
};
