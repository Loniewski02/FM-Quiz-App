import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useAppSelector } from '../hooks/hooks';

import Wrapper from './Wrapper';

import sunIcoLight from '../assets/icon-sun-light.svg';
import sunIcoDark from '../assets/icon-sun-dark.svg';
import moonIcoDark from '../assets/icon-moon-dark.svg';
import moonIcoLight from '../assets/icon-moon-light.svg';
import styles from './Nav.module.css';

const Nav: React.FC = () => {
	const [isDark, setIsDark] = useState<boolean>(document.body.classList.contains('dark-theme'));
	const { name, icon } = useAppSelector((state) => state.game);

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
					{name !== '' && (
						<>
							<div className={styles[name]}>
								<img
									src={icon}
									alt={name}
								/>
							</div>
							<span>{name}</span>
						</>
					)}
				</div>
				<div className={styles.nav__toggler}>
					<img
						src={isDark ? sunIcoDark : sunIcoLight}
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
						src={isDark ? moonIcoDark : moonIcoLight}
						alt=''
					/>
				</div>
			</Wrapper>
		</nav>
	);
};

export default Nav;
