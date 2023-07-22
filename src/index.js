import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeMusicReducer from './redux/youtubeMusicSlice';
import youtubeReadReducer from './redux/youtubeReadSlice';
import bookVisualReducer from './redux/bookVisualSlice';
import bookInterestReducer from './redux/bookInterestSlice';
import bookDetailReducer from './redux/bookDetailSlice';
import memberReducer from './redux/memberSlice';
import menuReducer from './redux/menuSlice';

const store = configureStore({
	reducer: {
		youtubeMusic: youtubeMusicReducer,
		youtubeRead: youtubeReadReducer,
		bookVisual: bookVisualReducer,
		bookInterest: bookInterestReducer,
		bookDetail: bookDetailReducer,
		member: memberReducer,
		menu: menuReducer,
	},
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
