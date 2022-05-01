import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const middleware = async (req) => {
	const url = req.nextUrl.clone();
	url.pathname = '/login';

	// Token will exist if the user is logged in and token is correct
	// Makes sure token is valid
	const token = await getToken({ req, secret: process.env.JWT_SECRET });

	// Gets the current path client is on
	const { pathname } = req.nextUrl;

	// Allows request if request is for next-auth session|token creation
	// The callback of the providers in their web api (GitHub, Spotify,...)
	if (pathname.includes('/api/auth') || token || pathname.includes('/demo')) {
		return NextResponse.next(); // Continues on
	}

	// Redirects to /login if token DNE or not going to a protected route
	if (!token && pathname !== url.pathname) {
		return NextResponse.redirect(url);
	}
};
