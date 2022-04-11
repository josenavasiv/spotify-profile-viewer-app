import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import useSpotify from '../../../hooks/useSpotify';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import cache from 'memory-cache';

const index = () => {
	const spotifyApiHook = useSpotify();
	const { data: session, status } = useSession();
	const router = useRouter();
	const { id } = router.query;
	const [artistDetails, setArtistDetails] = useState({});

	useEffect(() => {
		if (spotifyApiHook.getAccessToken() && id) {
			fetchArtist();
		}
	}, [session, spotifyApiHook]);

	const fetchArtist = () => {
		spotifyApiHook
			.getArtist(id)
			.then((data) => setArtistDetails(data?.body))
			.catch((error) => signOut());
		// console.log(data);
	};

	const numberWithCommas = (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	return (
		<>
			<Navbar absolute={true} />
			<div className="h-screen bg-black text-white flex flex-col space-y-10 justify-center items-center text-sm text-center">
				<img className="h-64 w-64 rounded-full" src={artistDetails?.images?.[0]?.url} alt="" />
				<h1 className="font-bold text-7xl">{artistDetails?.name}</h1>
				<div className="flex flex-row space-x-14 align-middle items-center">
					<div className="">
						<p className="text-xl text-[#ff006a] font-semibold ">
							{artistDetails?.followers?.total ? numberWithCommas(artistDetails?.followers?.total) : ''}
						</p>
						<p className="font-medium text-gray-500 pt-1">FOLLOWERS</p>
					</div>
					<div className="">
						{artistDetails?.genres?.map((genre) => (
							<p key={genre} className="text-[#ff006a] text-xl font-semibold capitalize">
								{genre}
							</p>
						))}
						<p className="pt-1 font-medium text-gray-500">GENRES</p>
					</div>
					<div className="">
						<p className="text-[#ff006a] text-xl font-semibold">{artistDetails?.popularity}%</p>
						<p className="font-medium text-gray-500 pt-1">POPULARITY</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default index;

// const cachedFetchArtist = () => {
// 	const cachedResponse = cache.get('fetchArtist');
// 	if (cachedResponse) {
// 		setArtistDetails(cachedResponse);
// 		console.log(cachedResponse, 'RETURNING CACHED RESPONSE');
// 		return cachedResponse;
// 	} else {
// 		spotifyApiHook
// 			.getArtist(id)
// 			.then((data) => {
// 				setArtistDetails(data?.body);
// 				cache.put('fetchArtist', data?.body, 3 * 60000); // 3mins
// 			})
// 			.catch((error) => signOut());
// 	}
// };
