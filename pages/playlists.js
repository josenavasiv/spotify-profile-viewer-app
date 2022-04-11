import { useSession, signOut } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const playlists = () => {
	const { data: session, status } = useSession();
	const spotifyApiHook = useSpotify();
	const [playlists, setPlaylists] = useState([]);
	const router = useRouter();

	useEffect(() => {
		if (spotifyApiHook.getAccessToken()) {
			fetchUserPlaylists();
		}
	}, [spotifyApiHook, session]);

	const fetchUserPlaylists = () => {
		spotifyApiHook
			.getUserPlaylists()
			.then((data) => setPlaylists(data?.body?.items))
			.catch((error) => signOut());
	};

	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center justify-center h-full w-full text-white bg-black p-10 space-y-5">
				<p className="text-lg font-bold text-gray-400">YOUR PLAYLISTS</p>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl">
					{playlists?.map((playlist) => (
						<div
							key={playlist?.id}
							className="flex flex-col justify-center items-center text-center h-60 w-60 text-xs space-y-2 hover:cursor-pointer"
							onClick={() => router.push(`/playlist/${playlist?.id}`)}
						>
							<img className="w-44 h-44 rounded" src={playlist?.images?.[0]?.url} alt="" />
							<p className="truncate w-full font-bold text-sm">{playlist?.name}</p>
							<p className="font-semibold text-gray-500">{playlist?.tracks?.total} TRACKS</p>
							{/* <p>{playlist?.href}</p> Link to Own page that shows the tracks*/}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default playlists;

// useEffect(() => {
// 	const getUserPlaylistsAxios = async () => {
// 		const headers = {
// 			Authorization: `Bearer ${spotifyApiHook.getAccessToken()}`,
// 			'Content-Type': 'application/json',
// 		};

// 		// const data = await axios.get('https://api.spotify.com/v1/me/playlists', { headers });
// 		const data = await axios.get('https://api.spotify.com/v1/me/playlists', { headers });
// 		console.log(data.data);
// 		setPlaylists(data.data.items);
// 	};
// 	if (spotifyApiHook.getAccessToken()) {
// 		getUserPlaylistsAxios();
// 		console.log(playlists);
// 	}
// }, [spotifyApiHook, session]);

// const fetchUserPlaylists = () => {
// 	spotifyApiHook
// 		.getUserPlaylists()
// 		.then((data) => setPlaylists(data?.body?.items))
// 		.catch((error) => console.log(error));
// };
