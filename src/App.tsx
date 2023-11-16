import { useEffect } from 'react';
import MainMenu from './components/MainMenu';
import Nav from './components/Nav';
import Question from './components/Question';
import { useAppSelector } from './hooks/hooks';

const App: React.FC = () => {
	const { isStarted } = useAppSelector((state) => state.game);
	useEffect(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.body.classList.add('dark-theme');
		} else {
			document.body.classList.add('light-theme');
		}
	}, []);

	return (
		<main>
			<Nav />
			{!isStarted && <MainMenu />}
			{isStarted && <Question></Question>}
		</main>
	);
};

export default App;
