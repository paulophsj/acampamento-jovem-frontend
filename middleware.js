import { NextRequest, NextResponse } from 'next/server'

export function middleware(request) {
  const isLoggedIn = request.cookies.get("access_token")
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/login') && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const protectedRoutes = ['/dashboard', '/admin', '/user']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*',
    '/user/:path*'
  ],
}