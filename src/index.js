import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import memberReducer from './redux/memberSlice';
import flickrReducer from './redux/flickrSlice';
import locationReducer from './redux/locationSlice';
import reviewReducer from './redux/reviewSlice';
import menuReducer from './redux/menuSlice';
import userReducer from './redux/userSlice';

const store = configureStore({
	reducer: {
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
