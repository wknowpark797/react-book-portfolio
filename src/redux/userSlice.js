import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		uid: '',
		userNum: -1,
		displayName: '',
	},
	reducers: {
		loginUser: (state, action) => {
			state.uid = action.payload.uid;
			state.userNum = action.payload.userNum;
			state.displayName = action.payload.displayName;
		},
		logoutUser: (state) => {
			state.uid = '';
			state.userNum = -1;
			state.displayName = '';
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
