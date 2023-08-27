// Redux
export const setMenuOpen = (data) => {
	return {
		type: 'SET_MENU_OPEN',
		payload: data,
	};
};

export const setUserInfo = (data) => {
	return {
		type: 'SET_USER_INFO',
		payload: data,
	};
};

// Redux Saga
export const BOOK_VISUAL = {
	start: 'BOOK_VISUAL_START',
	success: 'BOOK_VISUAL_SUCCESS',
	fail: 'BOOK_VISUAL_FAIL',
};

export const BOOK_INTEREST = {
	start: 'BOOK_INTEREST_START',
	success: 'BOOK_INTEREST_SUCCESS',
	fail: 'BOOK_INTEREST_FAIL',
};

export const BOOK_DETAIL = {
	start: 'BOOK_DETAIL_START',
	success: 'BOOK_DETAIL_SUCCESS',
	fail: 'BOOK_DETAIL_FAIL',
};

export const YOUTUBE_MUSIC = {
	start: 'YOUTUBE_MUSIC_START',
	success: 'YOUTUBE_MUSIC_SUCCESS',
	fail: 'YOUTUBE_MUSIC_FAIL',
};

export const YOUTUBE_READ = {
	start: 'YOUTUBE_READ_START',
	success: 'YOUTUBE_READ_SUCCESS',
	fail: 'YOUTUBE_READ_FAIL',
};

export const MEMBER = {
	start: 'MEMBER_START',
	success: 'MEMBER_SUCCESS',
	fail: 'MEMBER_FAIL',
};

export const FLICKR = {
	start: 'FLICKR_START',
	success: 'FLICKR_SUCCESS',
	fail: 'FLICKR_FAIL',
};

export const LOCATION = {
	start: 'LOCATION_START',
	success: 'LOCATION_SUCCESS',
	fail: 'LOCATION_FAIL',
};

export const REVIEW = {
	start: 'REVIEW_START',
	success: 'REVIEW_SUCCESS',
	fail: 'REVIEW_FAIL',
};
