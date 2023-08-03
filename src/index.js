import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import youtubeMusicReducer from './redux/youtubeMusicSlice';
import youtubeReadReducer from './redux/youtubeReadSlice';
import bookVisualReducer from './redux/bookVisualSlice';
import bookInterestReducer from './redux/bookInterestSlice';
import bookDetailReducer from './redux/bookDetailSlice';
import memberReducer from './redux/memberSlice';
import flickrReducer from './redux/flickrSlice';
import locationReducer from './redux/locationSlice';
import reviewReducer from './redux/reviewSlice';
import menuReducer from './redux/menuSlice';
import userReducer from './redux/userSlice';

const store = configureStore({
	reducer: {
		youtubeMusic: youtubeMusicReducer,
		youtubeRead: youtubeReadReducer,
		bookVisual: bookVisualReducer,
		bookInterest: bookInterestReducer,
		bookDetail: bookDetailReducer,
		member: memberReducer,
		flickr: flickrReducer,
		location: locationReducer,
		review: reviewReducer,
		menu: menuReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
