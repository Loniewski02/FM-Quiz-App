import Section from '../layout/Section';
import Button from '../UI/Button';
import Choices from '../layout/Choices';
import Title from '../UI/Title';
import Info from '../layout/Info';

import htmlIco from '../../assets/icon-html.svg';
import accessibilityIco from '../../assets/icon-accessibility.svg';
import cssIco from '../../assets/icon-css.svg';
import jsIco from '../../assets/icon-js.svg';
import styles from './MainMenu.module.css';

const OPTIONS: { id: number; ico: string; name: string }[] = [
	{ id: 1, ico: htmlIco, name: 'HTML' },
	{ id: 2, ico: cssIco, name: 'CSS' },
	{ id: 3, ico: jsIco, name: 'Javascript' },
	{ id: 4, ico: accessibilityIco, name: 'Accessibility' },
];

type Props = {
	onSelectedQuiz: (name: string, icon: string) => void;
	onShowScoreboard: () => void;
};

const MainMenu: React.FC<Props> = (props) => {
	const quizHandler = (name: string, icon: string) => {
		props.onSelectedQuiz(name, icon);
	};

	return (
		<Section>
			<Info className={styles.menu__info}>
				<h1>
					Welcome to the <span>Frontend Quiz!</span>
				</h1>
				<p>Pick a subject to get started.</p>
			</Info>
			<Choices>
				{OPTIONS.map((option) => (
					<Button
						key={option.id}
						onClick={() => {
							quizHandler(option.name, option.ico);
						}}>
						<Title
							icon={option.ico}
							title={option.name}
						/>
					</Button>
				))}
			</Choices>
		</Section>
	);
};

export default MainMenu;
