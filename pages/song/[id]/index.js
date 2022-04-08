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
			console.log(songDetails);
			fetchSong();
			console.log(songDetails);
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

	const checkForEmptyObj = (obj) => {
		return Object.keys(obj).length === 0;
	};

	if (checkForEmptyObj(songDetails) || checkForEmptyObj(analysisDetails) || checkForEmptyObj(recommendations)) {
		return (
			<div className="h-screen bg-black text-white flex flex-col space-y-10 justify-center items-center text-sm text-center">
				<svg
					role="status"
					className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
			</div>
		);
	}

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
					<p className="text-xl font-bold">{Math.round(analysisDetails?.track?.tempo).toString()}</p>
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
