import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Artist = ({ img_url, name, id }) => {
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
				onClick={() => router.push(`/artist/${id}`)} // Need to redirect to dynamic route
				className="flex flex-row space-x-6 h-11 text-sm font-semibold hover:cursor-pointer"
			>
				<img className="h-11 w-11 rounded-full " src={img_url} alt={name} />
				<div className="self-center">{name}</div>
			</div>
		</motion.div>
	);
};

export default Artist;
