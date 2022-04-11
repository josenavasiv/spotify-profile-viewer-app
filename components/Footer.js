import Image from 'next/image';

const Footer = () => {
	return (
		<div className="flex flex-col justify-center items-center w-full bottom-0 h-12 mb-6">
			<a href="https://github.com/josenavasiv/spotify-profile-viewer-app" target="_blank">
				<Image src="/github.svg" width="40" height="40" />
			</a>
		</div>
	);
};

export default Footer;
