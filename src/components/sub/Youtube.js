import SubLayout from '../common/SubLayout';
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';

function Youtube() {
	const [MusicList, setMusicList] = useState([]);
	const [BestList, setBestList] = useState([]);
	const [BookList, setBookList] = useState([]);

	useEffect(() => {
		const key = 'AIzaSyDwb_57BfoNHLxlZ-Mwn2O3VNVt2tFNNMw';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;

		musicListFetch(baseURL);
		bestListFetch(baseURL);
		bookListFecth(baseURL);
	}, []);

	// Music Playlist Axios 함수
	const musicListFetch = (base) => {
		const playlistId = 'PLEJLcTMBRARd4AKwM7CM_0gf2mKviNR3J';
		const maxResults = 6;
		const listURL = `${base}&playlistId=${playlistId}&maxResults=${maxResults}`;

		axios.get(listURL).then((data) => {
			setMusicList(data.data.items);
		});
	};
	// Best Playlist Axios 함수
	const bestListFetch = (base) => {
		const playlistId = 'PLEJLcTMBRARf9Oh5Ba53RTD69_uhRbXqS';
		const maxResults = 1;
		const listURL = `${base}&playlistId=${playlistId}&maxResults=${maxResults}`;

		axios.get(listURL).then((data) => {
			setBestList(data.data.items);
		});
	};
	// Book Playlist Axios 함수
	const bookListFecth = (base) => {
		const playlistId = 'PLEJLcTMBRAReQQjFb4VKHfgOsgE1Yj8d-';
		const maxResults = 3;
		const listURL = `${base}&playlistId=${playlistId}&maxResults=${maxResults}`;

		axios.get(listURL).then((data) => {
			setBookList(data.data.items);
		});
	};

	return (
		<SubLayout subPageName={'sub-youtube'} breadCrumb={'HOME / YOUTUBE'} subPageTitle={['PLAYLIST', <br />, 'FOR BOOK']}>
			<div className='top-wrap'>
				<div className='inner-container'>
					<div id='musicListWrap' className='list-wrap'>
						{MusicList.map((item, idx) => {
							return (
								<article key={idx}>
									<h3>{item.snippet.title}</h3>
									<p className='date'>{item.snippet.publishedAt.split('T')[0].split('-').join('.')}</p>

									<div className='video thumb' data-videoid={item.snippet.resourceId.videoId}>
										<img src={item.snippet.thumbnails.standard.url} alt='' />
									</div>

									<button type='button' className='btn-more thumb' data-videoid={item.snippet.resourceId.videoId}>
										<FontAwesomeIcon icon={faCirclePlay} />
										<span>VIEW VIDEO</span>
									</button>
								</article>
							);
						})}
					</div>
				</div>
			</div>

			<div className='pick-wrap'>
				<div id='bestListWarp' className='inner-container'>
					{BestList.map((item, idx) => {
						return (
							<Fragment key={idx}>
								<div className='title-wrap'>
									<p>Best Pick</p>

									<div className='inner-title'>
										<h2>{item.snippet.title}</h2>
										<p className='date'>{item.snippet.publishedAt.split('T')[0].split('-').join('.')}</p>
									</div>
								</div>
								<div className='video thumb' data-videoid={item.snippet.resourceId.videoId}>
									<img src={item.snippet.thumbnails.maxres.url} alt='' />
								</div>
							</Fragment>
						);
					})}
				</div>
			</div>

			<div className='bottom-wrap'>
				<div className='inner-container'>
					<h2>Upcoming Events.</h2>

					<div id='bookListWrap' className='list-wrap'>
						{BookList.map((item, idx) => {
							return (
								<article key={idx}>
									<h3>{item.snippet.title}</h3>
									<p className='date'>{item.snippet.publishedAt.split('T')[0].split('-').join('.')}</p>

									<div className='video thumb' data-videoid={item.snippet.resourceId.videoId}>
										<img src={item.snippet.thumbnails.standard.url} alt='' />
									</div>

									<button type='button' className='btn-more thumb' data-videoid={item.snippet.resourceId.videoId}>
										<FontAwesomeIcon icon={faCirclePlay} />
										<span>VIEW VIDEO</span>
									</button>
								</article>
							);
						})}
					</div>
				</div>
			</div>
		</SubLayout>
	);
}

export default Youtube;
