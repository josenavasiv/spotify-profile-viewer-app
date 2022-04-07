import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import spotifyAPI from '../lib/spotify';

const useSpotify = () => {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session) {
			if (session.error === 'RefreshAccessTokenError') {
				signIn(); // Pushes to signing page (Force SignIn)
			}
			spotifyAPI.setAccessToken(session.user.accessToken);
		}
	}, []);

	return spotifyAPI;
};

export default useSpotify;
