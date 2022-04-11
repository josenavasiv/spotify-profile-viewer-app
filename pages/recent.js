import { useSession, signOut } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Song from '../components/Song';

const recent = () => {
	const { data: session, status } = useSession();
	const spotifyApiHook = useSpotify();
	const [recentTracks, setRecentTracks] = useState([]);

	useEffect(() => {
		if (spotifyApiHook.getAccessToken()) {
			fetchRecentSongs();
		}
	}, [spotifyApiHook, session]);

	const fetchRecentSongs = () => {
		spotifyApiHook
			.getMyRecentlyPlayedTracks({ limit: 30 })
			.then((data) => setRecentTracks(data?.body?.items))
			.catch((error) => signOut());
	};

	return (
		<>
			<Navbar />
			<div className="flex flex-col w-screen items-center justify-center text-white bg-black p-10 space-y-5">
				<p className="text-lg font-bold text-gray-400">RECENTLY PLAYED TRACKS</p>
				<div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl gap-6">
					{recentTracks?.map((track, index) => (
						<Song
							name={track?.track?.name}
							album={track?.track?.album?.name}
							artist={track?.track?.artists?.[0]?.name}
							duration={track?.track?.duration_ms}
							img_url={track?.track?.album?.images?.[0]?.url}
							id={track?.track?.id}
							key={track?.track?.id + index}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default recent;
