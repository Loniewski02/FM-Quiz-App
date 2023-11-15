import { useEffect } from 'react';
import MainMenu from './components/MainMenu';
import Nav from './components/Nav';

const App: React.FC = () => {
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
			<MainMenu />
		</main>
	);
};

export default App;
