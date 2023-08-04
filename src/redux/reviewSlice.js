import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// review 목록 fetching
export const fetchReview = createAsyncThunk('review/requestReview', async () => {
	const response = await axios.get('https://node-book-wknowpark797.koyeb.app/api/review/read/0');
	return response.data.reviewList;
});

const reviewSlice = createSlice({
	name: 'review',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchReview.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchReview.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchReview.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default reviewSlice.reducer;
