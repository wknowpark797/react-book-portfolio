import axios from 'axios';

export const fetchBookVisual = async () => {
	const userId = '105834502729522452212';
	const shelf = '1002';
	const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

	return await axios.get(listURL);
};

export const fetchBookInterest = async () => {
	const userId = '105834502729522452212';
	const shelf = '1001';
	const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

	return await axios.get(listURL);
};

export const fetchBookDetail = async (bookId) => {
	if (bookId === '') return;
	const detailURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
	return await axios.get(detailURL);
};

export const fetchYoutubeMusic = async () => {
	const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;
	const playlistId = 'PLuYjs7JL1VFD0-B09gEumiJn43AM-qpNR';
	const maxResults = 3;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	return await axios.get(listURL);
};

export const fetchYoutubeRead = async () => {
	const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;
	const playlistId = 'PLuYjs7JL1VFB-ciaLcIPXzqp2xmSiL_Wd';
	const maxResults = 4;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	return await axios.get(listURL);
};

export const fetchMember = async () => {
	return await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
};

export const fetchFlickr = async (options) => {
	const baseURL =
		'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = '7f259a4112d06fbef0736c84af20f014';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';
	const num = 30;
	let url = '';

	if (options.type === 'interest')
		url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	if (options.type === 'search')
		url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${options.tags}`;
	if (options.type === 'user')
		url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${options.user}`;

	return await axios.get(url);
};

export const fetchLocation = async () => {
	return await axios.get(
		`${process.env.PUBLIC_URL}/DB/location.json`
	);
};

export const fetchReview = async () => {
	return await axios.get(
		'https://node-book-wknowpark797.koyeb.app/api/review/read/0'
	);
};
