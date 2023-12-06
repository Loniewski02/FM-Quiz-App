import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import incorrectIco from '../../assets/icon-incorrect.svg';
import correctIco from '../../assets/icon-correct.svg';
import styles from './Button.module.css';

type Props = {
	children: ReactNode;
	onClick: () => void;
	className?: string;
	disabled?: boolean;
	isLetter?: boolean;
	letter?: string;
	style?: {};
};

const Button: React.FC<Props> = (props) => {
	let classes = styles.button;

	if (props.className) {
		classes += ` ${styles[props.className]}`;
	}

	return (
		<motion.button
			whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 500 } }}
			className={classes}
			type='button'
			style={props.style}
			onClick={props.onClick}
			disabled={props.disabled}>
			{props.isLetter && <span className={styles.letter}>{props.letter}</span>}
			{props.children}
			<img
				className={styles['img--correct']}
				src={correctIco}
				alt=''
			/>
			<img
				className={styles['img--incorrect']}
				src={incorrectIco}
				alt=''
			/>
		</motion.button>
	);
};

export default Button;
