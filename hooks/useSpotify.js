import { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import spotifyAPI from '../lib/spotify';
import { useRouter } from 'next/router';

const useSpotify = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			if (session?.error === 'RefreshAccessTokenError') {
				router.push('/login');
				signOut(); // Pushes to signing page (Force SignIn)
			}
			spotifyAPI.setAccessToken(session.user.accessToken);
		}
	}, [session]);

	return spotifyAPI;
};

export default useSpotify;
