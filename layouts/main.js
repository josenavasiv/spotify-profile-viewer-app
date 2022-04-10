import Head from 'next/head';
import Navbar from '../components/Navbar';

const main = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default main;
