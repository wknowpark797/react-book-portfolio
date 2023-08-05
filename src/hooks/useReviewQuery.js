import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchReview = async () => {
	const response = await axios.get('https://node-book-wknowpark797.koyeb.app/api/review/read/0');
	return response.data.reviewList;
};

export const useReviewQuery = () => {
	return useQuery(['review'], fetchReview, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60,
		staleTime: 1000 * 60,
	});
};
