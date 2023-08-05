import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMember = async () => {
	const response = await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
	return response.data;
};

export const useMemberQuery = () => {
	return useQuery(['member'], fetchMember, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
	});
};
