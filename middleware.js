import { NextRequest, NextResponse } from 'next/server'

export function middleware(request) {
  const isLoggedIn = request.cookies.get("access_token")
  const firstCode = request.cookies.get("first_code")?.value;
  const pathname = request.nextUrl.pathname

  if (!isLoggedIn) {
    const response = NextResponse.next()
    response.cookies.set("access_token", firstCode, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60,
      path: '/',
    })
    response.cookies.delete("first_code")
  }

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