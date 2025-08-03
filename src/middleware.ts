import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptCrypto } from "@/utils/cryptoJs";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY as string
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const currentUrl = req.url

  const accessToken = (await cookies()).get('_token')?.value
  const tokenRefresh = (await cookies()).get('_refreshToken')?.value
  const encryptedRole = (await cookies()).get('_role')?.value

  let role

  if (!!encryptedRole) {
    const decryptedRole = decryptCrypto({ data: encryptedRole, key: secretKey })
    if (!!decryptedRole) {
      role = decryptedRole
    }
  }

  if (pathname.startsWith('/auth') && accessToken) {
    return NextResponse.redirect(new URL(role === 'ADMIN' ?
      '/admin/dashboard' : '/', currentUrl))
  }

  if (accessToken && role !== 'ADMIN' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', currentUrl))
  }

   if (tokenRefresh && accessToken && pathname.startsWith('/refresh')) {
    return NextResponse.redirect(new URL('/not-found', currentUrl))
  }

  if (tokenRefresh && !accessToken && !pathname.startsWith('/refresh')) {
    return NextResponse.redirect(new URL('/refresh', currentUrl))
  }

  if (!accessToken && pathname.startsWith('/admin') && !tokenRefresh) {
    return NextResponse.redirect(new URL('/auth/login', currentUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
}