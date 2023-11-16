import { ReactNode } from 'react';

import Wrapper from './Wrapper';

import styles from './Section.module.css';

const Section: React.FC<{ children: ReactNode }> = (props) => {
	return (
		<section className={styles.section}>
			<Wrapper className={styles.section__wrapper}>{props.children}</Wrapper>
		</section>
	);
};

export default Section;
