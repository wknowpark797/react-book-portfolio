import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchLocation = async () => {
	const response = await axios.get(`${process.env.PUBLIC_URL}/DB/location.json`);
	return response.data.location;
};

export const useLocationQuery = () => {
	return useQuery(['location'], fetchLocation, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
	});
};
