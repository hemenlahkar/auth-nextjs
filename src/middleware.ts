import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/';
    const token = request.cookies.get('token')?.value || '';
    
    if(!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    if(token && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
  ]
}