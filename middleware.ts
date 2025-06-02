import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  const accessToken = request.cookies.get('access_token')?.value

  console.log(accessToken)

  return response
}

export const config = {
  matcher: '/:path*',
}