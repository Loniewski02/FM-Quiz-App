import { useEffect } from 'react';

import { Player } from '../../helpers/types';

import Section from '../layout/Section';
import Button from '../UI/Button';
import Title from '../UI/Title';

import styles from './Result.module.css';

type Props = {
	onNewGame: () => void;
	onShowScoreboard: () => void;
	max: number;
	icon: string;
	title: string;
	player: Player;
};

const Result: React.FC<Props> = (props) => {
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`https://quiz-app-4c0d0-default-rtdb.firebaseio.com/scoreboard/${props.title}.json`,
				{
					method: 'POST',
					body: JSON.stringify(props.player),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			return response;
		};
		fetchData();
	}, []);

	return (
		<Section>
			<h2 className={styles.heading}>
				Quiz completed <span>You scored...</span>
			</h2>
			<div className={styles.result}>
				<div className={styles.result__total}>
					<Title
						title={props.title}
						icon={props.icon}
					/>
					<span className={styles.result__points}>{props.player.score}</span>
					<span className={styles.result__text}>out of {props.max}</span>
				</div>
				<Button
					className='submit'
					onClick={props.onNewGame}>
					Play Again
				</Button>
				<Button
					className='submit'
					onClick={props.onShowScoreboard}>
					Scoreboard
				</Button>
			</div>
		</Section>
	);
};

export default Result;
