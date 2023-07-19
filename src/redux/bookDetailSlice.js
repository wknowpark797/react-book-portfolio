import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBookDetail = createAsyncThunk('bookDetail/requestBookDetail', async (bookId) => {
	if (bookId === '') return;

	const detailURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
	const response = await axios.get(detailURL);
	return response.data.volumeInfo;
});

const bookDetailSlice = createSlice({
	name: 'bookDetail',
	initialState: {
		data: {},
		isLoading: false,
	},
	extraReducers: {
		[fetchBookDetail.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchBookDetail.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchBookDetail.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default bookDetailSlice.reducer;
