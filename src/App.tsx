import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import { Player } from './helpers/types';

import MainMenu from './components/game/MainMenu';
import Nav from './components/navbar/Nav';
import Question from './components/game/Quiz';
import Result from './components/game/Result';
import Modal from './components/UI/Modal';
import ScoreBoard from './components/game/ScoreBoard';

import { data } from './assets/data';

const App: React.FC = () => {
	const [isStarted, setIsStarted] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const [isScoreBoard, setIsScoreBoard] = useState(false);
	const [title, setTitle] = useState('');
	const [icon, setIcon] = useState('');
	const [questions, setQuestions] = useState<{}[]>([]);
	const [player, setPlayer] = useState<Player>({ id: '', name: '', profile: '', score: 0 });

	const [isModal, setIsModal] = useState(false);

	useEffect(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.body.classList.add('dark-theme');
		} else {
			document.body.classList.add('light-theme');
		}
	}, []);

	const showModal = () => {
		setIsModal(true);
	};

	const hideModal = () => {
		setIsModal(false);
	};

	const setGameHandler = (title: string, icon: string) => {
		setTitle(title);
		setIcon(icon);
		showModal();
	};

	const startGame = (name: string, profile: string) => {
		setPlayer((prevPlayer) => {
			return { ...prevPlayer, id: uuidv4(), name: name, profile: profile };
		});
		hideModal();
		setIsStarted(true);

		const data2: {}[] = data.flatMap((item) => {
			if (item.title === title) {
				return item.questions;
			}
			return [];
		});

		setQuestions(data2);
	};

	const endGame = (status: boolean, points: number) => {
		setIsStarted(false);
		setShowResults(status);
		setPlayer((prevPlayer) => {
			return { ...prevPlayer, score: points };
		});
	};

	const playAgain = () => {
		setIsStarted(false);
		setShowResults(false);
		setIsScoreBoard(false);
		setPlayer({ id: '', name: '', profile: '', score: 0 });
	};

	const showScoreboard = () => {
		setIsScoreBoard(true);
	};

	let content = (
		<MainMenu
			onSelectedQuiz={setGameHandler}
			onShowScoreboard={showScoreboard}
		/>
	);

	if (isStarted) {
		content = (
			<Question
				questions={questions}
				onEndGame={endGame}
			/>
		);
	}

	if (!isStarted && showResults) {
		content = (
			<Result
				onNewGame={playAgain}
				onShowScoreboard={showScoreboard}
				max={questions.length}
				icon={icon}
				title={title}
				player={player}
			/>
		);
	}

	if (isScoreBoard) {
		content = (
			<ScoreBoard
				title={title}
				icon={icon}
				onNewGame={playAgain}
				player={player}
			/>
		);
	}

	return (
		<main>
			<AnimatePresence>
				{isModal && (
					<Modal
						onCancel={hideModal}
						onStartGame={startGame}
					/>
				)}
			</AnimatePresence>
			<Nav
				title={isStarted ? title : ''}
				icon={isStarted ? icon : ''}
			/>
			{content}
		</main>
	);
};

export default App;
