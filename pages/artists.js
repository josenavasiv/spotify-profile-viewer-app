import { useSession, signOut } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const artists = () => {
	const { data: session, status } = useSession();
	const spotifyApiHook = useSpotify();
	const [topArtists, setTopArtists] = useState([]);
	const router = useRouter();

	useEffect(() => {
		if (spotifyApiHook.getAccessToken()) {
			fetchTopArtists();
		}
	}, [spotifyApiHook, session]);

	const fetchTopArtists = () => {
		spotifyApiHook
			.getMyTopArtists({ limit: 30 })
			.then((data) => setTopArtists(data?.body?.items))
			.catch((error) => signOut());
	};

	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center justify-center h-full w-full text-white bg-black p-10 space-y-5">
				<p className="text-lg font-bold text-gray-400">CURRENT TOP ARTISTS</p>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl">
					{topArtists?.map((artist) => (
						<div
							key={artist?.id}
							className="flex flex-col justify-center items-center text-center h-60 w-60 text-xs space-y-6 hover:cursor-pointer"
							onClick={() => router.push(`/artist/${artist?.id}`)}
						>
							<img className="w-44 h-44 rounded-full" src={artist?.images?.[0]?.url} alt="" />
							<p className="truncate w-full font-bold text-sm">{artist?.name}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default artists;
