import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// members 목록 fetching
export const fetchMember = createAsyncThunk('member/requestMember', async () => {
	const response = await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
	return response.data;
});

const memberSlice = createSlice({
	name: 'member',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchMember.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchMember.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchMember.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default memberSlice.reducer;
