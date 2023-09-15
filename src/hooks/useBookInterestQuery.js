import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBookInterest = async () => {
	const userId = '105834502729522452212';
	const shelf = '1001';
	const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=10`;

	const response = await axios.get(listURL);
	return response.data.items;
};

export const useBookInterestQuery = () => {
	return useQuery(['bookInterest'], fetchBookInterest, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
	});
};
