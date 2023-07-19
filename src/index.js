import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeMusicReducer from './redux/youtubeMusicSlice';
import youtubeReadReducer from './redux/youtubeReadSlice';

const store = configureStore({
	reducer: {
		youtubeMusic: youtubeMusicReducer,
		youtubeRead: youtubeReadReducer,
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
