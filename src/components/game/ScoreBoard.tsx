import { useEffect, useState } from 'react';

import { Player } from '../../helpers/types';

import Section from '../layout/Section';
import Title from '../UI/Title';
import Button from '../UI/Button';

import styles from './ScoreBoard.module.css';

type Props = {
	title: string;
	icon: string;
	player: Player;
	onNewGame: () => void;
};

const ScoreBoard: React.FC<Props> = (props) => {
	const [scoreboard, setScoreBoard] = useState<Record<string, Player> | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`https://quiz-app-4c0d0-default-rtdb.firebaseio.com/scoreboard/${props.title}.json`
				);
				const data = await response.json();
				setScoreBoard(data);
				setIsLoading(false);
			} catch (error) {
				console.error('An error occurred:', error);
			}
		};

		fetchData();
	}, [props.title]);

	const renderScoreboard = () => {
		if (scoreboard !== null && scoreboard !== undefined) {
			const playersArray = Object.keys(scoreboard).map((key) => ({ ...(scoreboard[key] as Player) }));
			playersArray.sort((a, b) => b.score - a.score);

			return playersArray.map((player) => (
				<div
					key={player.id}
					className={`${styles.player} ${player.id === props.player.id ? styles.current : ''}`}>
					<div>
						<img
							src={player.profile}
							alt=''
						/>
					</div>
					{player.name}
					<span>{player.score}</span>
				</div>
			));
		}
	};

	return (
		<Section>
			<div className={styles.heading}>
				<Title
					title={props.title}
					icon={props.icon}
				/>
			</div>
			<div className={styles.scoreboard}>
				{!isLoading && <div>{renderScoreboard()}</div>}
				{isLoading && <p>Loading...</p>}
				<Button
					className='submit'
					onClick={props.onNewGame}>
					Play Again
				</Button>
			</div>
		</Section>
	);
};

export default ScoreBoard;
