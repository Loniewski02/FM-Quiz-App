import { ReactNode } from 'react';

import styles from './Button.module.css';

type Props = {
	children: ReactNode;
	icon: string;
	iconClass: string;
	onClick: () => void;
};

const Button: React.FC<Props> = (props) => {
	let content;

	if (props.icon.trim().length > 1) {
		content = (
			<img
				src={props.icon}
				alt={props.icon}
			/>
		);
	} else {
		content = props.icon;
	}

	return (
		<button
			className={styles.button}
			type='button'
			onClick={props.onClick}>
			<div className={styles[props.iconClass]}>{content}</div>
			<span>{props.children}</span>
		</button>
	);
};

export default Button;
