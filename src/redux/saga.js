import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import {
	fetchBookVisual,
	fetchBookInterest,
	fetchBookDetail,
	fetchYoutubeMusic,
	fetchYoutubeRead,
	fetchMember,
	fetchFlickr,
	fetchLocation,
	fetchReview,
} from './api';
import * as types from './actionType';

// Book Visual
function* callBookVisual() {
	yield takeLatest(types.BOOK_VISUAL.start, returnBookVisual);
}
function* returnBookVisual() {
	try {
		const response = yield call(fetchBookVisual);
		yield put({
			type: types.BOOK_VISUAL.success,
			payload: response.data.items,
		});
	} catch (err) {
		yield put({ type: types.BOOK_VISUAL.fail, payload: err });
	}
}

// Book Interest
function* callBookInterest() {
	yield takeLatest(types.BOOK_INTEREST.start, returnBookInterest);
}
function* returnBookInterest() {
	try {
		const response = yield call(fetchBookInterest);
		yield put({
			type: types.BOOK_INTEREST.success,
			payload: response.data.items,
		});
	} catch (err) {
		yield put({ type: types.BOOK_INTEREST.fail, payload: err });
	}
}

// Book Detail
function* callBookDetail() {
	yield takeLatest(types.BOOK_DETAIL.start, returnBookDetail);
}
function* returnBookDetail(action) {
	try {
		const response = yield call(fetchBookDetail, action.bookId);
		yield put({
			type: types.BOOK_DETAIL.success,
			payload: response.data.volumeInfo,
		});
	} catch (err) {
		yield put({ type: types.BOOK_DETAIL.fail, payload: err });
	}
}

// Youtube Music
function* callYoutubeMusic() {
	yield takeLatest(types.YOUTUBE_MUSIC.start, returnYoutubeMusic);
}
function* returnYoutubeMusic() {
	try {
		const response = yield call(fetchYoutubeMusic);
		yield put({
			type: types.YOUTUBE_MUSIC.success,
			payload: response.data.items,
		});
	} catch (err) {
		yield put({ type: types.YOUTUBE_MUSIC.fail, payload: err });
	}
}

// Youtube Read
function* callYoutubeRead() {
	yield takeLatest(types.YOUTUBE_READ.start, returnYoutubeRead);
}
function* returnYoutubeRead() {
	try {
		const response = yield call(fetchYoutubeRead);
		yield put({
			type: types.YOUTUBE_READ.success,
			payload: response.data.items,
		});
	} catch (err) {
		yield put({ type: types.YOUTUBE_READ.fail, payload: err });
	}
}

// Member
function* callMember() {
	yield takeLatest(types.MEMBER.start, returnMember);
}
function* returnMember() {
	try {
		const response = yield call(fetchMember);
		yield put({ type: types.MEMBER.success, payload: response.data });
	} catch (err) {
		yield put({ type: types.MEMBER.fail, payload: err });
	}
}

// Flickr
function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}
function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.options);
		yield put({
			type: types.FLICKR.success,
			payload: response.data.photos.photo,
		});
	} catch (err) {
		yield put({ type: types.FLICKR.fail, payload: err });
	}
}

// Location
function* callLocation() {
	yield takeLatest(types.LOCATION.start, returnLocation);
}
function* returnLocation() {
	try {
		const response = yield call(fetchLocation);
		yield put({
			type: types.LOCATION.success,
			payload: response.data.location,
		});
	} catch (err) {
		yield put({ type: types.LOCATION.fail, payload: err });
	}
}

// Review
function* callReview() {
	yield takeLatest(types.REVIEW.start, returnReview);
}
function* returnReview() {
	try {
		const response = yield call(fetchReview);
		yield put({
			type: types.REVIEW.success,
			payload: response.data.reviewList,
		});
	} catch (err) {
		yield put({ type: types.REVIEW.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([
		fork(callBookVisual),
		fork(callBookInterest),
		fork(callBookDetail),
		fork(callYoutubeMusic),
		fork(callYoutubeRead),
		fork(callMember),
		fork(callFlickr),
		fork(callLocation),
		fork(callReview),
	]);
}
