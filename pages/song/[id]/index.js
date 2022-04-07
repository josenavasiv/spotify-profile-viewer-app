import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useSpotify from '../../../hooks/useSpotify';
import { useEffect, useState } from 'react';
import { millisToMinutesAndSeconds } from '../../../lib/timeConverter';

const index = () => {
	const spotifyApiHook = useSpotify();
	const { data: session, status } = useSession();
	const router = useRouter();
	const { id } = router.query;
	const [songDetails, setSongDetails] = useState({});
	const [analysisDetails, setAnalysisDetails] = useState({});
	const [recommendations, setRecommendations] = useState([]);

	useEffect(() => {
		if (spotifyApiHook.getAccessToken() && id) {
			fetchSong();
		}
	}, [session, spotifyApiHook]);

	const fetchSong = async () => {
		const data = await spotifyApiHook.getTrack(id);
		const analysis_data = await spotifyApiHook.getAudioAnalysisForTrack(id);
		const recommendations_data = await spotifyApiHook.getRecommendations({ seed_tracks: [id], limit: 5 });
		// console.log(data);
		// console.log(analysis_data);
		// console.log(recommendations_data);
		setSongDetails(data?.body);
		setAnalysisDetails(analysis_data?.body);
		setRecommendations(recommendations_data?.body?.tracks);
	};

	return (
		<div className="h-screen bg-black text-white flex flex-col items-center p-10 pt-28 space-y-10 overflow-auto">
			<div className="flex flex-row space-x-10 self-start ">
				<img className="h-56 w-56 justify-start" src={songDetails?.album?.images?.[0]?.url} alt="" />
				<div className="flex flex-col space-y-3">
					<h1 className="font-bold text-5xl">{songDetails?.name}</h1>
					<p className="text-lg font-bold text-gray-400">{songDetails?.artists?.[0]?.name}</p>
					<p className="text-gray-500 text-md">
						{songDetails?.album?.name} • {songDetails?.album?.release_date}
					</p>
					<div>
						<button className="bg-[#ff006a] text-white p-2 px-3 rounded-full font-semibold text-xs">
							{/* <a href={songDetails?.external_urls?.spotify}>PLAY ON SPOTIFY</a> */}
							PLAY ON SPOTIFY
						</button>
					</div>
				</div>
			</div>
			<div className="grid grid-rows-4 grid-cols-2 md:grid-rows-2 md:grid-cols-4 w-full h-80 md:h-40 gap-4">
				<div className="text-gray-500 flex flex-col items-center justify-center">
					<p className="text-xl font-bold">{millisToMinutesAndSeconds(songDetails?.duration_ms)}</p>
					<p className="text-xs">Duration</p>
				</div>
				<div className="text-gray-500 flex flex-col items-center justify-center">
					<p className="text-xl font-bold">{songDetails?.popularity}%</p>
					<p className="text-xs">Popularity</p>
				</div>
				<div className="text-gray-500 flex flex-col items-center justify-center">
					<p className="text-xl font-bold">{analysisDetails?.track?.key}</p>
					<p className="text-xs">Key</p>
				</div>
				<div className="text-gray-500 flex flex-col items-center justify-center">
					<p className="text-xl font-bold">{Math.round(analysisDetails?.track?.tempo)}</p>
					<p className="text-xs">Tempo</p>
				</div>
				<div className="text-gray-500 flex flex-col items-center justify-center">
					<p className="text-xl font-bold">{analysisDetails?.sections?.length}</p>
					<p className="text-xs">Sections</p>
				</div>
				<div className="text-gray-500 flex flex-col items-center justify-center">
					<p className="text-xl font-bold">{analysisDetails?.beats?.length}</p>
					<p className="text-xs">Beats</p>
				</div>
				<div className="text-gray-500 flex flex-col items-center justify-center">
					<p className="text-xl font-bold">{analysisDetails?.bars?.length}</p>
					<p className="text-xs">Bars</p>
				</div>
				<div className="text-gray-500 flex flex-col items-center justify-center">
					<p className="text-xl font-bold">{analysisDetails?.segments?.length}</p>
					<p className="text-xs">Segments</p>
				</div>
			</div>

			<div className="grow"></div>

			<div className="w-full space-y-7">
				<div className="text-center">
					<h1 className="text-md font-semibold text-gray-400">Recommended Tracks</h1>
				</div>

				<div className="grid md:grid-cols-5 w-full justify-evenly space-y-10 md:space-y-0">
					{recommendations?.map((recommendation) => (
						<div
							key={recommendation?.id}
							onClick={() =>
								router.push({
									pathname: '/song/[...id]',
									query: { id: recommendation?.id },
								})
							}
							className="flex flex-col items-center justify-center space-y-2 md:space-y-3 cursor-pointer"
						>
							<img className="h-36 w-36" src={recommendation?.album?.images?.[0]?.url} alt="" />
							<p className="truncate text-sm font-semibold text-gray-400 w-36 text-center">
								{recommendation?.name}
							</p>
							<p className="text-gray-500 text-xs">{recommendation?.artists?.[0]?.name}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default index;

// To force redirect when routing from a dynamic route need to use
//  router.push({
// 	pathname: '/song/[...id]',
// 	query: { id: recommendation?.id },
// })
