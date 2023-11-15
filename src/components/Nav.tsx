import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Wrapper from './Wrapper';
import styles from './Nav.module.css';

import sunIcoLight from '../assets/icon-sun-light.svg';
import sunIcoDark from '../assets/icon-sun-dark.svg';
import moonIcoDark from '../assets/icon-moon-dark.svg';
import moonIcoLight from '../assets/icon-moon-light.svg';

const Nav: React.FC = () => {
	const [isDark, setIsDark] = useState<boolean>(document.body.classList.contains('dark-theme'));

	useEffect(() => {
		setIsDark(document.body.classList.contains('dark-theme'));
	}, []);

	const themeHandler = () => {
		document.body.classList.toggle('dark-theme');
		document.body.classList.toggle('light-theme');
		setIsDark((prevIsDark) => !prevIsDark);
	};

	return (
		<nav className={styles.nav}>
			<Wrapper className={styles.nav__wrapper}>
				<div className={styles.nav__name}>
					<img
						src={isDark ? sunIcoLight : sunIcoDark}
						alt=''
					/>
				</div>
				<div className={styles.nav__toggler}>
					<img
						src={isDark ? sunIcoLight : sunIcoDark}
						alt=''
					/>
					<button
						aria-label='theme toggler'
						onClick={themeHandler}>
						<motion.span
							initial={{ y: '-50%' }}
							animate={{ x: isDark ? '100%' : 0 }}></motion.span>
					</button>
					<img
						src={isDark ? moonIcoLight : moonIcoDark}
						alt=''
					/>
				</div>
			</Wrapper>
		</nav>
	);
};

export default Nav;
