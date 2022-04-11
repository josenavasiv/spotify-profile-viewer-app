import Image from 'next/image';
import Head from 'next/head';

const Footer = () => {
	return (
		<div className="flex flex-col justify-center items-center w-full bottom-0 h-12 mb-6">
			<Head>
				<title>Spofity Profile Viewer</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<a href="https://github.com/josenavasiv/spotify-profile-viewer-app" target="_blank">
				<Image src="/github.svg" width="40" height="40" />
			</a>
		</div>
	);
};

export default Footer;
