import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// music 재생목록 fetching
export const fetchYoutubeMusic = createAsyncThunk('youtubeMusic/requestYoutubeMusic', async () => {
	const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;
	const playlistId = 'PLuYjs7JL1VFD0-B09gEumiJn43AM-qpNR';
	const maxResults = 3;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const response = await axios.get(listURL);
	return response.data.items;
});

const youtubeMusicSlice = createSlice({
	name: 'youtubeMusic',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchYoutubeMusic.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchYoutubeMusic.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutubeMusic.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default youtubeMusicSlice.reducer;
