import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';


const variants = {
	hidden: { opacity: 0, x: 0, y: 20 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: -20 },
};

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
	return (
		<AnimatePresence exitBeforeEnter initial={true}>
			<motion.div
				initial="hidden"
				animate="enter"
				exit="exit"
				variants={variants}
				transition={{ duration: 0.6, type: 'easeInOut' }}
				style={{ position: 'relative' }}
				key={router.pathname}
			>
				<SessionProvider session={session}>
					<Component {...pageProps} key={router.route} />
				</SessionProvider>
			</motion.div>
		</AnimatePresence>
	);
}

export default MyApp;
