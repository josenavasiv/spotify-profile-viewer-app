import { useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Song from '../components/Song';

const tracks = () => {
	const { data: session, status } = useSession();
	const spotifyApiHook = useSpotify();
	const [topTracks, setTopTracks] = useState([]);

	useEffect(() => {
		if (spotifyApiHook.getAccessToken()) {
			fetchTopTracks();
		}
	}, [spotifyApiHook, session]);

	const fetchTopTracks = () => {
		spotifyApiHook
			.getMyTopTracks({ limit: 30 })
			.then((data) => setTopTracks(data?.body?.items))
			.catch((error) => console.log(error));
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
