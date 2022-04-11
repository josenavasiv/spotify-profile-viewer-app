import { getSession, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import cache from 'memory-cache';

import Song from '../components/Song';
import Artist from '../components/Artist';
import Navbar from '../components/Navbar';

export default function Home() {
	// Status has "loading" & "authenticated" values - Use these to handle loading spinners etc...
	const { data: session, status } = useSession();
	const spotifyApiHook = useSpotify();

	const [profileDetails, setProfileDetails] = useState({});
	const [topArtists, setTopArtists] = useState([]);
	const [topTracks, setTopTracks] = useState([]);

	useEffect(() => {
		if (spotifyApiHook.getAccessToken()) {
			cachedFetchTopArtists();
			cachedFetchTopTracks();
			cachedFetchProfileDetails();
		}
	}, [spotifyApiHook, session]);

	const cachedFetchTopArtists = () => {
		const cachedResponse = cache.get('topArtists10');
		if (cachedResponse) {
			setTopArtists(cachedResponse);
			// console.log(cachedResponse, 'RETURNING CACHED RESPONSE');
			return cachedResponse;
		} else {
			spotifyApiHook
				.getMyTopArtists({ limit: 10 })
				.then((data) => {
					setTopArtists(data?.body?.items);
					cache.put('topArtists10', data?.body?.items, 3 * 60000); // 3mins
				})
				.catch((error) => signOut());
		}
	};

	const cachedFetchTopTracks = () => {
		const cachedResponse = cache.get('topTracks10');
		if (cachedResponse) {
			setTopTracks(cachedResponse);
			// console.log(cachedResponse, 'RETURNING CACHED RESPONSE');
			return cachedResponse;
		} else {
			spotifyApiHook
				.getMyTopTracks({ limit: 10 })
				.then((data) => {
					setTopTracks(data?.body?.items);
					cache.put('topTracks10', data?.body?.items, 3 * 60000); // 3mins
				})
				.catch((error) => signOut());
		}
	};

	const cachedFetchProfileDetails = () => {
		const cachedResponse = cache.get('profile');
		if (cachedResponse) {
			setProfileDetails(cachedResponse);
			// console.log(cachedResponse, 'RETURNING CACHED RESPONSE');
			return cachedResponse;
		} else {
			spotifyApiHook
				.getMe()
				.then((data) => {
					setProfileDetails(data?.body);
					cache.put('profile', data?.body, 3 * 60000); // 3mins
				})
				.catch((error) => signOut());
		}
	};

	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center h-full w-full text-white bg-black p-10 ">
				<div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-10 md:space-x-10">
					<img className="h-36 w-36 rounded-full" src={profileDetails?.images?.[0]?.url} alt="" />
					<div className="flex flex-col justify-around items-center md:items-start space-y-3">
						<h1 className="text-5xl font-bold text-[#ff006a]">{profileDetails?.display_name}</h1>
						<div>
							<p className="text-sm font-semibold text-gray-500">
								Followers: {profileDetails?.followers?.total}
							</p>
						</div>
					</div>
				</div>

				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4">
					<div className="flex flex-col space-y-8">
						<h1 className="text-2xl font-bold text-gray-500">Current Top Artists</h1>
						{topArtists.map((artist) => (
							<Artist
								key={artist?.id}
								name={artist?.name}
								img_url={artist?.images?.[0].url}
								id={artist?.id}
							/>
						))}
					</div>

					<div className="flex flex-col space-y-8">
						<h1 className="text-2xl font-bold text-gray-500">Current Top Tracks</h1>
						{topTracks.map((track) => (
							<Song
								name={track?.name}
								album={track?.album?.name}
								artist={track?.artists?.[0]?.name}
								duration={track?.duration_ms}
								img_url={track?.album?.images?.[0]?.url}
								id={track?.id}
								key={track?.id}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export const getServerSideProps = async (context) => {
	const session = await getSession(context);
	return {
		props: {
			session,
		},
	};
};

// const fetchTopArtists = () => {
// 	// const data = await spotifyApiHook.getMyTopArtists({ limit: 10 });
// 	// console.log(data);
// 	spotifyApiHook
// 		.getMyTopArtists({ limit: 10 })
// 		.then((data) => setTopArtists(data?.body?.items))
// 		.catch((error) => signOut());
// };
// const fetchTopTracks = () => {
// 	// const data = await spotifyApiHook.getMyTopTracks({ limit: 10 });
// 	// console.log(data);
// 	spotifyApiHook
// 		.getMyTopTracks({ limit: 10 })
// 		.then((data) => setTopTracks(data?.body?.items))
// 		.catch((error) => signOut());
// };
// const fetchProfileDetails = () => {
// 	// const data = await spotifyApiHook.getMe();
// 	// console.log(data);
// 	spotifyApiHook
// 		.getMe()
// 		.then((data) => setProfileDetails(data?.body))
// 		.catch((error) => signOut());
// };
