import { ReactNode } from 'react';

import styles from './Wrapper.module.css';

const Wrapper: React.FC<{ children: ReactNode; className?: string }> = (props) => {
	return <div className={`${styles.wrapper} ${props.className ? props.className : ''}`}>{props.children}</div>;
};

export default Wrapper;
