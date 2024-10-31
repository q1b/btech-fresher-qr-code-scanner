import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
const protectedRoutes = ['/','/users']
const publicRoutes = ['/login']
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  
  const password = ((await cookies()).get('password')?.value === process.env.PASSWORD)
  
  if (isProtectedRoute && !password) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  if ( isPublicRoute && password && !req.nextUrl.pathname.startsWith('/') ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}