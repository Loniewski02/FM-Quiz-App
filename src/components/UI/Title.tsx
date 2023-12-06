import styles from './Title.module.css';

type Props = {
	title: string;
	icon: string;
	isLetter?: boolean;
};

const Title: React.FC<Props> = (props) => {
	return (
		<div className={styles.title}>
			<div className={styles[props.title]}>
				<img
					src={props.icon}
					alt={props.title}
				/>
			</div>
			<span>{props.title}</span>
		</div>
	);
};

export default Title;
