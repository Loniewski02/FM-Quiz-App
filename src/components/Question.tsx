import { useAppSelector } from '../hooks/hooks';

import Button from './Button';
import Choices from './Choices';
import Section from './Section';

import styles from './Question.module.css';

const Question: React.FC = () => {
	const question = useAppSelector((state) => state.game.currentQuestion) as {
		questionNumber: number;
		question: string;
		options: string[];
	};

	const indexToLetter = (index: number) => {
		return String.fromCharCode('a'.charCodeAt(0) + index).toUpperCase();
	};

	return (
		<Section>
			<div className={styles.info}>
				<p>Question {question.questionNumber} of 10</p>
				<h2>{question.question}</h2>
				<div className={styles.timer}>
					<span></span>
				</div>
			</div>
			<Choices>
				{question.options.map((option, index) => (
					<Button
						key={index}
						iconClass='letter'
						onClick={() => {
							console.log('clicked');
						}}
						icon={indexToLetter(index)}>
						{option}
					</Button>
				))}
				<button className={`submit`}>Submit Answer</button>
			</Choices>
		</Section>
	);
};

export default Question;
