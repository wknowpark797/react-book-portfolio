import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBookVisual = async () => {
	const userId = '105834502729522452212';
	const shelf = '1002';
	const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

	const response = await axios.get(listURL);
	return response.data.items;
};

export const useBookVisualQuery = () => {
	return useQuery(['bookVisual'], fetchBookVisual, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
	});
};
