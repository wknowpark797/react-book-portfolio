import { combineReducers } from 'redux';
import * as types from './actionType';

// Redux
const menuOpenReducer = (state = { menuOpen: false }, action) => {
	switch (action.type) {
		case 'SET_MENU_OPEN':
			return { ...state, menuOpen: action.payload };
		default:
			return state;
	}
};

const userInfoReducer = (state = { userInfo: {} }, action) => {
	switch (action.type) {
		case 'SET_USER_INFO':
			return { ...state, userInfo: action.payload };
		default:
			return state;
	}
};

// Redux Saga
const bookVisualReducer = (state = { bookVisual: [] }, action) => {
	switch (action.type) {
		case types.BOOK_VISUAL.start:
			return state;
		case types.BOOK_VISUAL.success:
			return { ...state, bookVisual: action.payload };
		case types.BOOK_VISUAL.fail:
			return { ...state, bookVisual: action.payload };
		default:
			return state;
	}
};

const bookInterestReducer = (state = { bookInterest: [] }, action) => {
	switch (action.type) {
		case types.BOOK_INTEREST.start:
			return state;
		case types.BOOK_INTEREST.success:
			return { ...state, bookInterest: action.payload };
		case types.BOOK_INTEREST.fail:
			return { ...state, bookInterest: action.payload };
		default:
			return state;
	}
};

const bookDetailReducer = (state = { bookDetail: {} }, action) => {
	switch (action.type) {
		case types.BOOK_DETAIL.start:
			return state;
		case types.BOOK_DETAIL.success:
			return { ...state, bookDetail: action.payload };
		case types.BOOK_DETAIL.fail:
			return { ...state, bookDetail: action.payload };
		default:
			return state;
	}
};

const youtubeMusicReducer = (state = { youtubeMusic: [] }, action) => {
	switch (action.type) {
		case types.YOUTUBE_MUSIC.start:
			return state;
		case types.YOUTUBE_MUSIC.success:
			return { ...state, youtubeMusic: action.payload };
		case types.YOUTUBE_MUSIC.fail:
			return { ...state, youtubeMusic: action.payload };
		default:
			return state;
	}
};

const youtubeReadReducer = (state = { youtubeRead: [] }, action) => {
	switch (action.type) {
		case types.YOUTUBE_READ.start:
			return state;
		case types.YOUTUBE_READ.success:
			return { ...state, youtubeRead: action.payload };
		case types.YOUTUBE_READ.fail:
			return { ...state, youtubeRead: action.payload };
		default:
			return state;
	}
};

const memberReducer = (state = { member: {} }, action) => {
	switch (action.type) {
		case types.MEMBER.start:
			return state;
		case types.MEMBER.success:
			return { ...state, member: action.payload };
		case types.MEMBER.fail:
			return { ...state, member: action.payload };
		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case types.FLICKR.start:
			return state;
		case types.FLICKR.success:
			return { ...state, flickr: action.payload };
		case types.FLICKR.fail:
			return { ...state, flickr: action.payload };
		default:
			return state;
	}
};

const locationReducer = (state = { location: [] }, action) => {
	switch (action.type) {
		case types.LOCATION.start:
			return state;
		case types.LOCATION.success:
			return { ...state, location: action.payload };
		case types.LOCATION.fail:
			return { ...state, location: action.payload };
		default:
			return state;
	}
};

const reviewReducer = (state = { review: [] }, action) => {
	switch (action.type) {
		case types.REVIEW.start:
			return state;
		case types.REVIEW.success:
			return { ...state, review: action.payload };
		case types.REVIEW.fail:
			return { ...state, review: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({
	menuOpenReducer,
	userInfoReducer,
	bookVisualReducer,
	bookInterestReducer,
	bookDetailReducer,
	youtubeMusicReducer,
	youtubeReadReducer,
	memberReducer,
	flickrReducer,
	locationReducer,
	reviewReducer,
});
export default reducers;
