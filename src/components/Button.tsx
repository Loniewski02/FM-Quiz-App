import { ReactNode } from 'react';

import styles from './Button.module.css';

type Props = {
	children: ReactNode;
	icon?: string;
	iconClass?: string;
	onClick: () => void;
	isSelected?: boolean;
	isInvalid?: boolean;
	isValid?: boolean;
	isSubmit?: boolean;
	disabled?: boolean;
};

const Button: React.FC<Props> = (props) => {
	let content;

	if (props.icon && props.icon.trim().length > 1) {
		content = (
			<img
				src={props.icon}
				alt={props.icon}
			/>
		);
	} else {
		content = props.icon;
	}

	let classes = styles.button;

	if (props.isSubmit) {
		classes += ` ${styles.submit}`;
	}
	if (props.isSelected) {
		classes += ` ${styles.selected}`;
	}
	if (props.isInvalid) {
		classes += ` ${styles.incorrect}`;
	}

	if (props.isValid) {
		classes += ` ${styles.correct}`;
	}

	return (
		<button
			className={classes}
			type='button'
			onClick={props.onClick}
			disabled={props.disabled}>
			{props.icon && <div className={styles[props.iconClass ? props.iconClass : '']}>{content}</div>}
			<span>{props.children}</span>
		</button>
	);
};

export default Button;
