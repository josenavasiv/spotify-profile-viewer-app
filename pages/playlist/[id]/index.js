import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import useSpotify from '../../../hooks/useSpotify';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Song from '../../../components/Song';

const index = () => {
	const spotifyApiHook = useSpotify();
	const { data: session, status } = useSession();
	const router = useRouter();
	const { id } = router.query;
	const [playlistDetails, setPlaylistDetails] = useState({});

	useEffect(() => {
		if (spotifyApiHook.getAccessToken()) {
			fetchPlaylistDetails();
		}
	}, [spotifyApiHook, session]);

	const fetchPlaylistDetails = () => {
		spotifyApiHook
			.getPlaylist(id)
			.then((data) => setPlaylistDetails(data?.body))
			.catch((error) => signOut());
	};

	return (
		<>
			<Navbar />
			<div className="h-full bg-black text-white flex flex-col items-center p-10 pt-28 space-y-10 ">
				<div className="flex flex-row space-x-10">
					<img className="h-56 w-56 justify-start" src={playlistDetails?.images?.[0]?.url} alt="" />
					<div className="flex flex-col space-y-3">
						<h1 className="font-bold text-5xl">{playlistDetails?.name}</h1>
						<p className="text-lg font-bold text-gray-400">{playlistDetails?.owner?.display_name}</p>
						<p className="text-gray-500 text-xs font-medium ">
							Followers: {playlistDetails?.followers?.total}
						</p>
						<div>
							<button className="bg-[#ff006a] text-white p-2 px-3 rounded-full font-semibold text-xs">
								<a
									href={playlistDetails?.external_urls?.spotify}
									target="_blank"
									rel="noopener noreferrer"
								>
									PLAY ON SPOTIFY
								</a>
							</button>
						</div>
					</div>
				</div>
				<div></div>
				<p className="text-lg font-bold text-gray-400">PLAYLIST TRACKS</p>
				<div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl gap-6">
					{playlistDetails?.tracks?.items?.map((track) => (
						<Song
							name={track?.track?.name}
							album={track?.track?.album?.name}
							artist={track?.track?.artists?.[0]?.name}
							duration={track?.track?.duration_ms}
							img_url={track?.track?.album?.images?.[0]?.url}
							id={track?.track?.id}
							key={track?.track?.id}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default index;
