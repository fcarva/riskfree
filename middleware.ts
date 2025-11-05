import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/server/auth';

const publicRoutes = new Set(['/', '/login', '/docs/arquitetura', '/docs/mvp']);

export async function middleware(request: NextRequest) {
  if (publicRoutes.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const session = await auth(request);

  if (!session?.user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'],
};
