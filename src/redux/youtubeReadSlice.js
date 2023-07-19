import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// read 재생목록 fetching
export const fetchYoutubeRead = createAsyncThunk('youtubeRead/requestYoutubeRead', async () => {
	const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;
	const playlistId = 'PLuYjs7JL1VFB-ciaLcIPXzqp2xmSiL_Wd';
	const maxResults = 4;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const response = await axios.get(listURL);
	return response.data.items;
});

const youtubeReadSlice = createSlice({
	name: 'youtubeRead',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchYoutubeRead.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchYoutubeRead.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutubeRead.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default youtubeReadSlice.reducer;
