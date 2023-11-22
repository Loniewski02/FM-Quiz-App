import { useEffect, useState } from 'react';

import MainMenu from './components/MainMenu';
import Nav from './components/Nav';
import Question from './components/Question';

import { data } from './assets/data';
import Result from './components/Result';

const App: React.FC = () => {
	const [isStarted, setIsStarted] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const [name, setName] = useState('');
	const [icon, setIcon] = useState('');
	const [questions, setQuestions] = useState<{}[]>([]);
	const [points, setPoints] = useState(0);

	useEffect(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.body.classList.add('dark-theme');
		} else {
			document.body.classList.add('light-theme');
		}
	}, []);

	const startGame = (name: string, icon: string) => {
		setIsStarted(true);
		setName(name);
		setIcon(icon);

		const data2: {}[] = data.flatMap((item) => {
			if (item.title === name) {
				return item.questions;
			}
			return [];
		});

		setQuestions(data2);
	};

	const endGame = (status: boolean, points: number) => {
		setIsStarted(false);
		setShowResults(status);
		setPoints(points);
	};

	let content = <MainMenu onStartGame={startGame} />;

	if (isStarted) {
		content = (
			<Question
				questions={questions}
				onEndGame={endGame}
			/>
		);
	}

	if (!isStarted && showResults) {
		content = <Result points={points} />;
	}

	return (
		<main>
			<Nav
				name={name}
				icon={icon}
			/>
			{content}
		</main>
	);
};

export default App;
