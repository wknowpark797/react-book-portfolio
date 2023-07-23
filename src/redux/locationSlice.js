import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// location 목록 fetching
export const fetchLocation = createAsyncThunk('location/requestLocation', async () => {
	const response = await axios.get(`${process.env.PUBLIC_URL}/DB/location.json`);
	return response.data.location;
});

const locationSlice = createSlice({
	name: 'location',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchLocation.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchLocation.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchLocation.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default locationSlice.reducer;
