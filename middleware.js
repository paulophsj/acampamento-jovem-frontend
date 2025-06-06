import { NextResponse } from "next/server";

export function middleware(request) {
  const firstCode = request.cookies.get("first_code")?.value;
  const isLoggedIn = request.cookies.get("access_token")?.value || firstCode;
  const pathname = request.nextUrl.pathname;

  console.log("First code:", firstCode);
  console.log("Is logged in:", isLoggedIn);

  if (!isLoggedIn && firstCode) {
    const response = NextResponse.next();
    response.cookies.set("access_token", firstCode, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60, // 60 segundos
      path: '/',
    });
    response.cookies.delete("first_code");
    return response;
  }

  if (pathname.startsWith('/login') && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const protectedRoutes = ['/dashboard', '/admin', '/user'];
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*',
    '/user/:path*'
  ],
}