import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    const url = request.nextUrl.clone();
    const unprefixedPath = pathname.slice(3);
    url.pathname = unprefixedPath || '/';
    return NextResponse.redirect(url, 308);
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return NextResponse.next();
  }

  if (
    pathname === '/api' ||
    pathname.startsWith('/api/') ||
    pathname === '/_next' ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/ar${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
