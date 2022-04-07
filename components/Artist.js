import Link from 'next/link';

const Artist = ({ img_url, name, id }) => {
	return (
		<div className="flex flex-row space-x-6 h-11 text-sm hover:cursor-pointer">
			<img className="h-11 w-11 rounded-full" src={img_url} alt={name} />
			<div className="self-center">{name}</div>
		</div>
	);
};

export default Artist;
