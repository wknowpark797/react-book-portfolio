import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// bookVisual 서가 fetching
export const fetchBookVisual = createAsyncThunk('bookVisual/requestBookVisual', async () => {
	const userId = '105834502729522452212';
	const shelf = '1002';
	const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

	const response = await axios.get(listURL);
	return response.data.items;
});

const bookVisualSlice = createSlice({
	name: 'bookVisual',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchBookVisual.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchBookVisual.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchBookVisual.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default bookVisualSlice.reducer;
