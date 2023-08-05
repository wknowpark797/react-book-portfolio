import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchFlickr = async ({ queryKey }) => {
	const options = queryKey[1];

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
};

export const useFlickrQuery = (options) => {
	return useQuery(['flickr', options], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60,
		staleTime: 1000 * 60,
	});
};
