import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		uid: '',
		displayName: '',
	},
	reducers: {
		loginUser: (state, action) => {
			state.uid = action.payload.uid;
			state.displayName = action.payload.displayName;
		},
		logoutUser: (state) => {
			state.uid = '';
			state.displayName = '';
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
