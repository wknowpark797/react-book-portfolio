import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchYoutubeMusic = async () => {
	const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;
	const playlistId = 'PLuYjs7JL1VFD0-B09gEumiJn43AM-qpNR';
	const maxResults = 3;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const response = await axios.get(listURL);
	return response.data.items;
};

export const useYoutubeMusicQuery = () => {
	return useQuery(['youtubeMusic'], fetchYoutubeMusic, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
	});
};
