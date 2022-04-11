import { useSession, signOut } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Song from '../components/Song';
import cache from 'memory-cache';

const tracks = () => {
	const { data: session, status } = useSession();
	const spotifyApiHook = useSpotify();
	const [topTracks, setTopTracks] = useState([]);

	useEffect(() => {
		if (spotifyApiHook.getAccessToken()) {
			cachedFetchTopTracks();
		}
	}, [spotifyApiHook, session]);

	const cachedFetchTopTracks = () => {
		const cachedResponse = cache.get('topTracks');
		if (cachedResponse) {
			setTopTracks(cachedResponse);
			// console.log(cachedResponse, 'RETURNING CACHED RESPONSE');
			return cachedResponse;
		} else {
			spotifyApiHook
				.getMyTopTracks({ limit: 30 })
				.then((data) => {
					setTopTracks(data?.body?.items);
					cache.put('topTracks', data?.body?.items, 3 * 60000); // 3mins
				})
				.catch((error) => signOut());
		}
	};

	return (
		<>
			<Navbar />
			<div className="flex flex-col w-screen items-center justify-center text-white bg-black p-10 space-y-5">
				<p className="text-lg font-bold text-gray-400">CURRENT TOP TRACKS</p>
				<div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl gap-6">
					{topTracks?.map((track, index) => (
						<Song
							name={track?.name}
							album={track?.album?.name}
							artist={track?.artists?.[0]?.name}
							duration={track?.duration_ms}
							img_url={track?.album?.images?.[0]?.url}
							id={track?.id}
							key={track?.id + index}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default tracks;

// const fetchTopTracks = () => {
// 	spotifyApiHook
// 		.getMyTopTracks({ limit: 30 })
// 		.then((data) => setTopTracks(data?.body?.items))
// 		.catch((error) => signOut());
// };
