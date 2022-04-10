import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

const Navbar = ({ absolute }) => {
	const router = useRouter();

	if (absolute) {
		return (
			<div className="flex flex-col justify-center items-center w-full h-20 mt-4 space-y-3 absolute">
				<Image
					className="hover:cursor-pointer"
					onClick={() => router.push('/')}
					src="/spotify.svg"
					width="40"
					height="40"
				/>

				<div className="flex flex-row justify-center items-center space-x-5 text-sm font-semibold text-gray-500">
					<Link href="/">
						<a className="hover:text-[#ff006a]">Profile</a>
					</Link>
					<Link href="/artists">
						<a className="hover:text-[#ff006a]">Top Artists</a>
					</Link>
					<Link href="/tracks">
						<a className="hover:text-[#ff006a]">Top Tracks</a>
					</Link>
					<Link href="/playlists">
						<a className="hover:text-[#ff006a]">Playlists</a>
					</Link>
					<Link href="/recent">
						<a className="hover:text-[#ff006a]">Recent</a>
					</Link>
					<Link href="/login">
						<a className="hover:text-[#ff006a]" onClick={signOut}>
							Logout
						</a>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-center items-center w-full h-20 mt-4 space-y-3">
			<Image
				className="hover:cursor-pointer"
				onClick={() => router.push('/')}
				src="/spotify.svg"
				width="40"
				height="40"
			/>

			<div className="flex flex-row justify-center items-center space-x-5 text-sm font-semibold text-gray-500">
				<Link href="/">
					<a className="hover:text-[#ff006a]">Profile</a>
				</Link>
				<Link href="/artists">
					<a className="hover:text-[#ff006a]">Top Artists</a>
				</Link>
				<Link href="/tracks">
					<a className="hover:text-[#ff006a]">Top Tracks</a>
				</Link>
				<Link href="/playlists">
					<a className="hover:text-[#ff006a]">Playlists</a>
				</Link>
				<Link href="/recent">
					<a className="hover:text-[#ff006a]">Recent</a>
				</Link>
				<Link href="/login">
					<a className="hover:text-[#ff006a]" onClick={signOut}>
						Logout
					</a>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
