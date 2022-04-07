import { getProviders, signIn } from 'next-auth/react';

const login = ({ providers }) => {
	return (
		<div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
			<h1 className="text-white font-bold text-2xl md:text-5xl">Spotify Profile Statistics</h1>
			{Object.values(providers).map((provider) => (
				<div className="mt-5" key={provider.name}>
					<button
						className=" border-[#ff006a] text-[#ff006a] border-2 p-3 md:p-4 rounded-full font-semibold text-sm md:text-lg"
						onClick={() => signIn(provider.id, { callbackUrl: '/' })}
					>
						Login with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
};

export default login;

export const getServerSideProps = async () => {
	const providers = await getProviders();
	return {
		props: {
			providers,
		},
	};
};
