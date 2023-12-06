import { ReactNode } from 'react';

import styles from './Info.module.css';

const Info: React.FC<{ children: ReactNode; className: string }> = (props) => {
	return <div className={`${styles.info} ${props.className}`}>{props.children}</div>;
};

export default Info;
