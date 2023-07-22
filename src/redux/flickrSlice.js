import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFlickr = createAsyncThunk('flickr/requestFlickr', async (options) => {
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = '7f259a4112d06fbef0736c84af20f014';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';
	const num = 30;
	let url = '';

	if (options.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	if (options.type === 'search')
		url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${options.tags}`;
	if (options.type === 'user')
		url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${options.user}`;

	const response = await axios.get(url);
	return response.data.photos.photo;
});

const flickrSlice = createSlice({
	name: 'flickr',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchFlickr.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchFlickr.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchFlickr.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default flickrSlice.reducer;
