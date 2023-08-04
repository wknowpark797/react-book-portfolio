import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBookDetail = async ({ queryKey }) => {
	const bookId = queryKey[1];

	if (bookId === '') return;

	const detailURL = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
	const response = await axios.get(detailURL);
	return response.data.volumeInfo;
};

export const useBookDetailQuery = (bookId) => {
	return useQuery(['bookDetail', bookId], fetchBookDetail, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60,
		staleTime: 1000 * 60,
	});
};
