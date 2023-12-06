import { ReactNode } from 'react';

import styles from './Choices.module.css';

const Choices: React.FC<{ children: ReactNode }> = (props) => {
	return <div className={styles.choices}>{props.children}</div>;
};

export default Choices;
