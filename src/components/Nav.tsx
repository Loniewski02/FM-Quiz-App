import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Wrapper from './Wrapper';

import sunIcoLight from '../assets/icon-sun-light.svg';
import sunIcoDark from '../assets/icon-sun-dark.svg';
import moonIcoDark from '../assets/icon-moon-dark.svg';
import moonIcoLight from '../assets/icon-moon-light.svg';
import styles from './Nav.module.css';

type Props = {
	name: string;
	icon: string;
};

const Nav: React.FC<Props> = (props) => {
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
					{props.name !== '' && (
						<>
							<div className={styles[props.name]}>
								<img
									src={props.icon}
									alt={props.name}
								/>
							</div>
							<span>{props.name}</span>
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
							animate={{ x: isDark ? 0 : '100%' }}></motion.span>
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
