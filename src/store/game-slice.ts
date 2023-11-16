import { createSlice } from '@reduxjs/toolkit';

import { data } from '../assets/data';

const initialState: {
	name: string;
	isStarted: boolean;
	icon: string;
	correctAnswers: number;
	questions: {}[];
	currentQuestion: {};
} = {
	name: '',
	isStarted: false,
	icon: '',
	correctAnswers: 0,
	questions: [],
	currentQuestion: {},
};

const gameSlice = createSlice({
	name: 'game',
	initialState: initialState,
	reducers: {
		test() {
			console.log('test');
		},
		startGame(state, action) {
			const payload: { name: string; icon: string } = action.payload;
			state.name = payload.name;
			state.icon = payload.icon;
			state.isStarted = true;

			state.questions = data.flatMap((item) => {
				if (item.title === payload.name) {
					return item.questions;
				}
				return [];
			});
			state.currentQuestion = { questionNumber: 1, ...state.questions[0] };
		},
	},
});

export const gameActions = gameSlice.actions;
export default gameSlice;
