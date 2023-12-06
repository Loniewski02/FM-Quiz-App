import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Button from '../UI/Button';
import Choices from '../layout/Choices';
import Section from '../layout/Section';
import Info from '../layout/Info';

import errorIco from '../../assets/icon-error.svg';
import styles from './Quiz.module.css';
import Timer from '../UI/Timer';

const LETTERS = ['A', 'B', 'C', 'D'];

const shuffleArray = (array: string[]) => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

type Props = {
	questions: {}[];
	onEndGame: (status: boolean, points: number) => void;
};

const Quiz: React.FC<Props> = (props) => {
	const [questionNumber, setQuestionNumber] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
	const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
	const [error, setError] = useState<null | string>(null);

	const currentQuestion = props.questions[questionNumber] as { question: string; options: string[]; answer: string };

	useEffect(() => {
		setShuffledOptions(shuffleArray(currentQuestion.options));
	}, [currentQuestion]);

	const selectHandler = (text: string) => {
		setSelectedAnswer(text);
		setError(null);
		setSelectedOptions({
			[text]: 'selected',
		});
	};

	const nextQuestionHandler = () => {
		setIsSubmitted(false);
		setError(null);
		setQuestionNumber((prevNumber) => prevNumber + 1);
	};

	const submitHandler = () => {
		if (selectedAnswer === '') {
			setError('Please select an answer');
			return;
		}
		checkValidity();
	};

	const checkValidity = () => {
		setError(null);
		setIsSubmitted(true);

		if (selectedAnswer === currentQuestion.answer) {
			setCorrectAnswers((prevAnswers) => prevAnswers + 1);
			setSelectedOptions({
				[selectedAnswer]: 'selected-correct',
			});
		} else {
			setSelectedOptions({
				[selectedAnswer]: 'incorrect',
				[currentQuestion.answer]: 'correct',
			});
		}

		setSelectedAnswer('');
	};

	const endGame = () => {
		const finalCorrectAnswers = correctAnswers + (selectedAnswer === currentQuestion.answer ? 1 : 0);
		props.onEndGame(true, finalCorrectAnswers);
	};

	let content = (
		<Button
			className='submit'
			onClick={submitHandler}
			disabled={isSubmitted}>
			Submit Answer
		</Button>
	);

	if (isSubmitted && questionNumber !== props.questions.length - 1) {
		content = (
			<Button
				className='submit'
				onClick={nextQuestionHandler}>
				Next Question
			</Button>
		);
	}
	if (isSubmitted && questionNumber === props.questions.length - 1) {
		content = (
			<Button
				className='submit'
				onClick={endGame}>
				See Results
			</Button>
		);
	}

	return (
		<Section>
			<Info className={styles.quiz__info}>
				<p>
					Question {questionNumber + 1} of {props.questions.length}
				</p>
				<h2>{currentQuestion.question}</h2>
				<Timer
					questionNumber={questionNumber}
					isSubmitted={isSubmitted}
					selectedAnswer={selectedAnswer}
					onCheckValue={checkValidity}
					currentQuestion={currentQuestion.question}
					onTimeUp={() => {
						setError("Time's up 😕");
						setIsSubmitted(true);
					}}
				/>
			</Info>
			{currentQuestion && (
				<Choices>
					{shuffledOptions.map((option, index) => (
						<Button
							onClick={selectHandler.bind(null, option)}
							className={selectedOptions[option] || ''}
							disabled={isSubmitted}
							isLetter={true}
							letter={LETTERS[index]}>
							{option}
						</Button>
					))}
					{content}
					<AnimatePresence>
						{error && (
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								className={styles.error}>
								<img
									src={errorIco}
									alt=''
								/>
								{error}
							</motion.p>
						)}
					</AnimatePresence>
				</Choices>
			)}
		</Section>
	);
};

export default Quiz;
