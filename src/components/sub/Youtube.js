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
		const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;
		musicListFetch(baseURL);
		readListFetch(baseURL);

		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

	// music 재생목록 fetching
	const musicListFetch = async (base) => {
		const playlistId = 'PLuYjs7JL1VFD0-B09gEumiJn43AM-qpNR';
		const maxResults = 3;
		const listURL = `${base}&playlistId=${playlistId}&maxResults=${maxResults}`;

		const result = await axios.get(listURL);
		setMusicList(result.data.items);
	};

	// read 재생목록 fetching
	const readListFetch = async (base) => {
		const playlistId = 'PLuYjs7JL1VFB-ciaLcIPXzqp2xmSiL_Wd';
		const maxResults = 4;
		const listURL = `${base}&playlistId=${playlistId}&maxResults=${maxResults}`;

		const result = await axios.get(listURL);
		const items = result.data.items;

		setBestList(items.slice(0, 1));
		setBookList(items.slice(1, 4));
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
