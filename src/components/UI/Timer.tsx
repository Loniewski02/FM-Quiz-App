import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import styles from './Timer.module.css';

const TIME_LIMIT = 90000;

type Props = {
	questionNumber: number;
	isSubmitted: boolean;
	selectedAnswer: string;
	currentQuestion: string;
	onCheckValue: () => void;
	onTimeUp: () => void;
};

const Timer: React.FC<Props> = (props) => {
	const [remainingTime, setRemainingTime] = useState(TIME_LIMIT);

	useEffect(() => {
		setRemainingTime(TIME_LIMIT);
	}, [props.currentQuestion]);

	useEffect(() => {
		if (!props.isSubmitted && remainingTime > 0) {
			const identifier = setTimeout(() => {
				setRemainingTime((prevTime) => prevTime - 1000);
			}, 1000);
			return () => {
				clearTimeout(identifier);
			};
		} else if (remainingTime === 0) {
			if (props.selectedAnswer === '') {
				props.onTimeUp();
			} else {
				props.onCheckValue();
			}

			setRemainingTime(TIME_LIMIT);
		}
	}, [props.isSubmitted, remainingTime]);

	return (
		<div className={styles.timer}>
			<motion.span
				key={props.questionNumber}
				initial={{ width: 0 }}
				animate={{
					width: '100%',
				}}
				transition={{ duration: TIME_LIMIT / 1000, type: 'tween' }}
			/>
		</div>
	);
};

export default Timer;
