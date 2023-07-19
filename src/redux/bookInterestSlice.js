import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// bookInterest 서가 fetching
export const fetchBookInterest = createAsyncThunk('bookInterest/requestBookInterest', async () => {
	const userId = '105834502729522452212';
	const shelf = '1001';
	const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

	const response = await axios.get(listURL);
	return response.data.items;
});

const bookInterestSlice = createSlice({
	name: 'bookInterest',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchBookInterest.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchBookInterest.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchBookInterest.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default bookInterestSlice.reducer;
