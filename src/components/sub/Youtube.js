import SubLayout from '../common/SubLayout';
import Modal from '../common/Modal';
import axios from 'axios';
import { useState, useEffect, useRef, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';

function Youtube() {
	const modal = useRef(null);
	const [Selected, setSelected] = useState(0);

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
	const musicListFetch = async (base) => {
		const playlistId = 'PLEJLcTMBRARd4AKwM7CM_0gf2mKviNR3J';
		const maxResults = 6;
		const listURL = `${base}&playlistId=${playlistId}&maxResults=${maxResults}`;

		const result = await axios.get(listURL);
		setMusicList(result.data.items);
	};
	// Best Playlist Axios 함수
	const bestListFetch = async (base) => {
		const playlistId = 'PLEJLcTMBRARf9Oh5Ba53RTD69_uhRbXqS';
		const maxResults = 1;
		const listURL = `${base}&playlistId=${playlistId}&maxResults=${maxResults}`;

		const result = await axios.get(listURL);
		setBestList(result.data.items);
	};
	// Book Playlist Axios 함수
	const bookListFecth = async (base) => {
		const playlistId = 'PLEJLcTMBRAReQQjFb4VKHfgOsgE1Yj8d-';
		const maxResults = 3;
		const listURL = `${base}&playlistId=${playlistId}&maxResults=${maxResults}`;

		const result = await axios.get(listURL);
		setBookList(result.data.items);
	};

	return (
		<>
			<SubLayout subPageName={'sub-youtube'} breadCrumb={'HOME / YOUTUBE'} subPageTitle={'PLAYLIST-FOR BOOK'}>
				<div className='top-wrap'>
					<div className='inner-container'>
						<div id='musicListWrap' className='list-wrap'>
							{MusicList.map((item, idx) => {
								return (
									<article key={idx}>
										<h3>{item.snippet.title}</h3>
										<p className='date'>{item.snippet.publishedAt.split('T')[0].split('-').join('.')}</p>

										<div
											className='video thumb'
											data-videoid={item.snippet.resourceId.videoId}
											onClick={() => {
												setSelected(item.snippet.resourceId.videoId);
												modal.current.open();
											}}
										>
											<img src={item.snippet.thumbnails.standard.url} alt='' />
										</div>

										<button
											type='button'
											className='btn-more thumb'
											data-videoid={item.snippet.resourceId.videoId}
											onClick={() => {
												setSelected(item.snippet.resourceId.videoId);
												modal.current.open();
											}}
										>
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
									<div
										className='video thumb'
										data-videoid={item.snippet.resourceId.videoId}
										onClick={() => {
											setSelected(item.snippet.resourceId.videoId);
											modal.current.open();
										}}
									>
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

										<div
											className='video thumb'
											data-videoid={item.snippet.resourceId.videoId}
											onClick={() => {
												setSelected(item.snippet.resourceId.videoId);
												modal.current.open();
											}}
										>
											<img src={item.snippet.thumbnails.standard.url} alt='' />
										</div>

										<button
											type='button'
											className='btn-more thumb'
											data-videoid={item.snippet.resourceId.videoId}
											onClick={() => {
												setSelected(item.snippet.resourceId.videoId);
												modal.current.open();
											}}
										>
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

			<Modal ref={modal}>
				<div className='media-box'>
					<iframe title={Selected} src={`https://www.youtube.com/embed/${Selected}`}></iframe>
				</div>
			</Modal>
		</>
	);
}

export default Youtube;
