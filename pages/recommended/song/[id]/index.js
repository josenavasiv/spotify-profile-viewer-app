import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useSpotify from '../../../../hooks/useSpotify';
import { useEffect, useState } from 'react';
import { millisToMinutesAndSeconds } from '../../../../lib/timeConverter';
import { motion } from 'framer-motion';
import Navbar from '../../../../components/Navbar';

const index = () => {
	const spotifyApiHook = useSpotify();
	const { data: session, status } = useSession();
	const router = useRouter();
	const { id } = router.query;
	const [recommendedSongDetails, setRecommendedSongDetails] = useState({});

	useEffect(() => {
		if (spotifyApiHook.getAccessToken() && id) {
			fetchSongThen();
		}
	}, [session, spotifyApiHook]);

	const fetchSongThen = () => {
		spotifyApiHook.getTrack(id).then((data) => setRecommendedSongDetails(data?.body));
	};

	return (
		<>
			<Navbar absolute={true} />
			<div className="h-screen bg-black text-white flex flex-col items-center justify-center space-y-5 p-10 ">
				<div className="text-center">
					<h1 className="text-lg font-semibold text-gray-400">Recommended Track</h1>
				</div>
				<div className="flex flex-row space-x-10 ">
					<img
						className="h-56 w-56 justify-start"
						src={recommendedSongDetails?.album?.images?.[0]?.url}
						alt=""
					/>
					<div className="flex flex-col space-y-3">
						<h1 className="font-bold text-5xl">{recommendedSongDetails?.name}</h1>
						<p className="text-lg font-bold text-gray-400">{recommendedSongDetails?.artists?.[0]?.name}</p>
						<p className="text-gray-500 text-md">
							{recommendedSongDetails?.album?.name} • {recommendedSongDetails?.album?.release_date}
						</p>
						<div>
							<button className="bg-[#ff006a] text-white p-2 px-3 rounded-full font-semibold text-xs">
								{/* <a href={songDetails?.external_urls?.spotify}>PLAY ON SPOTIFY</a> */}
								PLAY ON SPOTIFY
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default index;
