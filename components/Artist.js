import Link from 'next/link';
import { useRouter } from 'next/router';

const Artist = ({ img_url, name, id }) => {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/artist/${id}`)} // Need to redirect to dynamic route
			className="flex flex-row space-x-6 h-11 text-sm hover:cursor-pointer"
		>
			<img className="h-11 w-11 rounded-full" src={img_url} alt={name} />
			<div className="self-center">{name}</div>
		</div>
	);
};

export default Artist;
