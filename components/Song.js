import { useRouter } from 'next/router';
import { millisToMinutesAndSeconds } from '../lib/timeConverter';

const Song = ({ name, album, artist, duration, img_url, id }) => {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/song/${id}`)}
			className="flex flex-row space-x-6 h-11 text-sm hover:cursor-pointer"
		>
			<img className="h-11 w-11" src={img_url} alt={name} />
			<div className="flex flex-col w-72 justify-between">
				<div>{name}</div>
				<div className="truncate text-gray-500">
					{artist} • {album}
				</div>
			</div>

			<div className="text-gray-500 ">{millisToMinutesAndSeconds(duration)}</div>
		</div>
	);
};

export default Song;
