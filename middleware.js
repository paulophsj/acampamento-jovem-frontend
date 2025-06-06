import { NextResponse } from 'next/server'

export function middleware(request) {
  /**
 * A vercel não aceita ler um cookie enviado por um dominio externo por motivos de segurança.
 * Por isso, ao usuário realizar o login, o backend retorna o valor do cookie no objeto da requisição,
 * eu guardo em um cookie definido manualmente pelo document.cookie, e após a verificação do middleware, caso o
 * cookies.get("access_token") retorne undefined, ele cria um novo cookie chamado access_token com o valor desse cookie temporario
 * e apaga o cookie temporário.
 * 
 * Dessa forma o Next - Vercel comecará a ler o cookie access_token e enviar nas requisições seguintes
 * porque o domínio de quem definiu o cookie foi o próprio lado do cliente.
 * 
 */
  const firstCode = request.cookies.get("token_temporario")?.value;
  const isLoggedIn = request.cookies.has("access_token")
  const pathname = request.nextUrl.pathname

  if (!isLoggedIn) {
    const response = NextResponse.next()
    response.cookies.set("access_token", firstCode, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60,
      path: '/',
    })
    response.cookies.delete("token_temporario")
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