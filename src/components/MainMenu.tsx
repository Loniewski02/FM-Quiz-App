import { useAppDispatch } from '../hooks/hooks';
import { gameActions } from '../store/game-slice';

import Section from './Section';
import Button from './Button';
import Choices from './Choices';

import htmlIco from '../assets/icon-html.svg';
import accessibilityIco from '../assets/icon-accessibility.svg';
import cssIco from '../assets/icon-css.svg';
import jsIco from '../assets/icon-js.svg';
import styles from './MainMenu.module.css';

const OPTIONS: { id: number; ico: string; name: string }[] = [
	{ id: 1, ico: htmlIco, name: 'HTML' },
	{ id: 2, ico: cssIco, name: 'CSS' },
	{ id: 3, ico: jsIco, name: 'Javascript' },
	{ id: 4, ico: accessibilityIco, name: 'Accessibility' },
];
const MainMenu: React.FC = () => {
	const dispatch = useAppDispatch();

	const quizHandler = (name: string, icon: string) => {
		dispatch(gameActions.startGame({ name: name, icon: icon }));
	};

	return (
		<Section>
			<div className={styles.menu__info}>
				<h1>
					Welcome to the <span>Frontend Quiz!</span>
				</h1>
				<p>Pick a subject to get started.</p>
			</div>
			<Choices>
				{OPTIONS.map((option) => (
					<Button
						key={option.id}
						iconClass={option.name}
						icon={option.ico}
						onClick={() => {
							quizHandler(option.name, option.ico);
						}}>
						{option.name}
					</Button>
				))}
			</Choices>
		</Section>
	);
};

export default MainMenu;
