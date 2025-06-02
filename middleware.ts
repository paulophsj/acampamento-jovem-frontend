import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if(request.nextUrl.pathname.startsWith('/login')){
    const cookie = request.cookies.get('access_token')?.value
    if(cookie){
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

export const config = {
  matcher: '/:path*',
}