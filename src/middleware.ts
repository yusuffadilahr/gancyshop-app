import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'

const jwtSecret = process.env.JWT_SECRET_KEY as string

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const currentUrl = req.url
  const cookieStore = await cookies()

  const accessToken = cookieStore.get('_token')?.value
  const tokenRefresh = cookieStore.get('_refreshToken')?.value
  const loggedIn = cookieStore.get('_loggedIn')?.value
  const roleInCookie = cookieStore.get('_rl')?.value

  if (!tokenRefresh && (loggedIn || accessToken || roleInCookie) && !pathname.startsWith('/auth/login')) {
    cookieStore.delete('_token')
    cookieStore.delete('_loggedIn')
    cookieStore.delete('_rl')

    return NextResponse.redirect(new URL('/auth/login', currentUrl))
  }

  let role
  const secret = new TextEncoder().encode(jwtSecret)

  if (tokenRefresh) {
    const { payload: resultRefreshToken } = await jwtVerify(tokenRefresh as string, secret)
    role = resultRefreshToken?.role as 'ADMIN' | 'USER'
  }

  if (pathname.startsWith('/auth') && tokenRefresh) {
    return NextResponse.redirect(new URL(role === 'ADMIN' ?
      '/admin/dashboard' : '/', currentUrl))
  }

  if (tokenRefresh && role !== 'ADMIN' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', currentUrl))
  }

  if (tokenRefresh && accessToken && pathname.startsWith('/refresh')) {
    return NextResponse.redirect(new URL('/not-found', currentUrl))
  }

  if (!tokenRefresh && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth/login', currentUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
}