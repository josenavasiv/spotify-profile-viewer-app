import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyAPI from '../../../lib/spotify';
import { LOGIN_URL } from '../../../lib/spotify';

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_ID,
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/login',
		signOut: '/login',
	},
	callbacks: {
		// jwt() callback is called whenever a JWT is created (signin) or updated (session is accessed in client) -> Functional Component Load & useEffect
		async jwt({ token, user, account }) {
			// Initial Sign-In
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000,
				};
			}

			// Return the previous token If the access token has not expired yet
			if (Date.now() < token.accessTokenExpires) {
				return token;
			}

			// If the account or user DNE we refresh the token
			console.log('REFRESHING');
			return await refreshAccessToken(token);
		},
		// Runs everytime the session is checked this function runs
		// Constantly provides tokens on function run
		async session({ session, token }) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;
			return session;
		},
	},
});

const refreshAccessToken = async (token) => {
	try {
		console.log('BEGIN REFRESH ACCESS TOKEN');
		// (This doesn't completely run when need to refresh access token)
		// Providing spotifyAPI with the updated tokens constantly
		spotifyAPI.setAccessToken(token.accessToken);
		spotifyAPI.setRefreshToken(token.refreshToken);
		const tokenData = await spotifyAPI.refreshAccessToken();
		console.log(tokenData);
		console.log('BEGIN REFRESH ACCESS TOKEN 222222222222222');
		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // Represents 1 hr (Date.now is NOT invoked here)
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.log('REFRESH ERROR !!!!!');
		console.log(error);
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
};
