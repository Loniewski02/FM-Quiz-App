import htmlIco from '../assets/icon-html.svg';
import accessibilityIco from '../assets/icon-accessibility.svg';
import cssIco from '../assets/icon-css.svg';
import jsIco from '../assets/icon-js.svg';
import styles from './MainMenu.module.css';
import Wrapper from './Wrapper';

const OPTIONS = [
	{ id: 1, ico: htmlIco, name: 'HTML', class: 'html' },
	{ id: 2, ico: cssIco, name: 'CSS', class: 'css' },
	{ id: 3, ico: jsIco, name: 'Javascript', class: 'js' },
	{ id: 4, ico: accessibilityIco, name: 'Accessibility', class: 'access' },
];
const MainMenu: React.FC = () => {
	return (
		<section className={styles.menu}>
			<Wrapper className={styles.menu__wrapper}>
				<div className={styles.menu__info}>
					<h1>
						Welcome to the <span>Frontend Quiz!</span>
					</h1>
					<p>Pick a subject to get started.</p>
				</div>
				<ul className={styles.menu__list}>
					{OPTIONS.map((option) => (
						<li key={option.id}>
							<div className={styles[option.class]}>
								<img
									src={option.ico}
									alt={option.name}
								/>
							</div>
							<span>{option.name}</span>
						</li>
					))}
				</ul>
			</Wrapper>
		</section>
	);
};

export default MainMenu;
