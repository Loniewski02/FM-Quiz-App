import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Button from './Button';
import Choices from './Choices';
import Section from './Section';

import styles from './Question.module.css';

const time = 30000;

type Props = {
	questions: {}[];
	onEndGame: (status: boolean, points: number) => void;
};

const shuffleArray = (array: string[]) => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

const Question: React.FC<Props> = (props) => {
	const [questionNumber, setQuestionNumber] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [correctAnswers, setCorrectAnswers] = useState(0);

	const currentQuestion = props.questions[questionNumber] as { question: string; options: string[]; answer: string };
	const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

	useEffect(() => {
		setShuffledOptions(shuffleArray(currentQuestion.options));
	}, [currentQuestion]);
	useEffect(() => {
		if (!isSubmitted) {
			const identifier = setTimeout(() => {
				checkValidity();
			}, time);

			return () => {
				clearTimeout(identifier);
			};
		}
	}, [selectedAnswer, isSubmitted]);

	useEffect(() => {}, [correctAnswers, questionNumber]);

	const indexToLetter = (index: number) => {
		return String.fromCharCode('a'.charCodeAt(0) + index).toUpperCase();
	};

	const selectHandler = (text: string) => {
		setSelectedAnswer(text);
	};

	const nextQuestionHandler = () => {
		setIsSubmitted(false);
		setQuestionNumber((prevNumber) => prevNumber + 1);
	};

	const submitHandler = () => {
		if (selectedAnswer === '') {
			return;
		}
		checkValidity();
	};

	const checkValidity = () => {
		setIsSubmitted(true);

		if (selectedAnswer === currentQuestion.answer) {
			setCorrectAnswers((prevAnswers) => {
				return prevAnswers + 1;
			});
		}

		setSelectedAnswer('');

		if (questionNumber === props.questions.length - 1) {
			const finalCorrectAnswers = correctAnswers + (selectedAnswer === currentQuestion.answer ? 1 : 0);
			props.onEndGame(true, finalCorrectAnswers);
		}
	};

	return (
		<Section>
			<div className={styles.info}>
				<p>
					Question {questionNumber + 1} of {props.questions.length}
				</p>
				<h2>{currentQuestion.question}</h2>
				<div className={styles.timer}>
					<motion.span
						key={questionNumber}
						initial={{ width: 0 }}
						animate={{
							width: '100%',
						}}
						transition={{ duration: time / 1000, type: 'just' }}
					/>
				</div>
			</div>
			{currentQuestion && (
				<Choices>
					{shuffledOptions.map((option, index) => (
						<Button
							key={index}
							iconClass='letter'
							onClick={selectHandler.bind(null, option)}
							icon={indexToLetter(index)}
							isSelected={selectedAnswer === option}
							disabled={isSubmitted}>
							{option}
						</Button>
					))}
					{!isSubmitted && (
						<Button
							isSubmit={true}
							onClick={submitHandler}
							disabled={isSubmitted}>
							Submit Answer
						</Button>
					)}
					{isSubmitted && (
						<Button
							isSubmit={true}
							onClick={nextQuestionHandler}>
							Next Question
						</Button>
					)}
				</Choices>
			)}
		</Section>
	);
};

export default Question;
