import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export const config = { matcher: ['/dashboard', '/'] };

export async function middleware(req: NextRequestWithAuth) {
	const token = await getToken({ req: req });
	const isAuthenticated = !!token;

	// If the user is authenticated and trying to access the home page
	if (isAuthenticated && req.nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL('/dashboard', req.url));
	}

	// If the user is not authenticated and trying to access dashboard
	if (!isAuthenticated && req.nextUrl.pathname === '/dashboard') {
		return NextResponse.redirect(new URL('/', req.url));
	}

	return NextResponse.next();
}
