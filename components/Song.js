import { useRouter } from 'next/router';
import { millisToMinutesAndSeconds } from '../lib/timeConverter';
import { motion } from 'framer-motion';

const Song = ({ name, album, artist, duration, img_url, id }) => {
	const router = useRouter();

	return (
		<motion.div
			whileHover={{
				scale: 1.02,
				transition: { duration: 0.2 },
				y: -3,
			}}
		>
			<div
				onClick={() => router.push(`/song/${id}`)}
				className="flex flex-row space-x-6 h-11 text-sm font-semibold cursor-pointer"
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
		</motion.div>
	);
};

export default Song;
