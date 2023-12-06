import ReactDOM from 'react-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

import Button from './Button';

import { profiles } from '../../assets/profiles/profiles';
import styles from './Modal.module.css';

type ModalProps = {
	onCancel: () => void;
	onStartGame: (name: string, profile: string) => void;
};

type BackdropProps = {
	onCancel: () => void;
};

const Backdrop: React.FC<BackdropProps> = (props) => {
	return (
		<motion.div
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: '100%' }}
			exit={{ opacity: 0, height: 0, transition: { delay: 0.2 } }}
			className={styles.backdrop}
			onClick={props.onCancel}
		/>
	);
};

const Overlay: React.FC<ModalProps> = (props) => {
	const [name, setName] = useState('');
	const [selectedImg, setSelectedImg] = useState('');
	const [isError, setIsError] = useState({ name: false, profile: false });

	const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const profileHandler = (image: string) => {
		setSelectedImg(image);
	};

	const submitHandler = () => {
		if (name.trim().length < 1) {
			setIsError((prevErr) => {
				return { ...prevErr, name: true };
			});
		}

		if (selectedImg === '') {
			setIsError((prevErr) => {
				return { ...prevErr, profile: true };
			});
		}

		if (name.trim().length < 1 || selectedImg === '') {
			return;
		}

		setIsError({ name: false, profile: false });
		props.onStartGame(name, selectedImg);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.3 } }}
			exit={{ opacity: 0 }}
			className={styles.overlay}>
			<label htmlFor='name'>Enter name:</label>
			<motion.input
				animate={{ x: isError.name ? [10, 0, -10, 0] : '', transition: { duration: 0.3 } }}
				className={isError.name ? styles.error : ''}
				type='text'
				id='name'
				placeholder='e.g. John'
				onChange={nameHandler}
				value={name}
			/>
			<p>Select profile:</p>
			<motion.div
				className={`${styles.overlay__images} ${isError.profile ? styles.error : ''}`}
				animate={{ x: isError.profile ? [-10, 0, 10, 0] : '', transition: { duration: 0.3 } }}>
				{profiles.map((img) => (
					<motion.button
						whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 500 } }}
						key={img.name}
						className={`${selectedImg === img.src ? styles.selected : ''} `}
						aria-label={`profile image - ${img.name}`}
						onClick={profileHandler.bind(null, img.src)}>
						<img
							src={img.src}
							alt={`profile image - ${img.name}`}
						/>
					</motion.button>
				))}
			</motion.div>
			<div className={styles.overlay__controls}>
				<Button
					className='HTML'
					style={{ width: 'max-content' }}
					onClick={props.onCancel}>
					Cancel
				</Button>
				<Button
					className='submit'
					onClick={submitHandler}>
					Confirm
				</Button>
			</div>
		</motion.div>
	);
};

const Modal: React.FC<ModalProps> = (props) => {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop onCancel={props.onCancel} />, document.getElementById('backdrop-root')!)}
			{ReactDOM.createPortal(<Overlay {...props} />, document.getElementById('overlay-root')!)}
		</>
	);
};

export default Modal;
