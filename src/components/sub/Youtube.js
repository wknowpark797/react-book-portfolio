import SubLayout from '../common/SubLayout';
import Modal from '../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect, useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';

function Youtube() {
	const modal = useRef(null);
	const [Selected, setSelected] = useState(0);

	const MusicList = useSelector(
		(store) => store.youtubeMusicReducer.youtubeMusic
	);
	const ReadList = useSelector((store) => store.youtubeReadReducer.youtubeRead);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

	return (
		<>
			<SubLayout
				subPageName={'sub-youtube'}
				breadCrumb={'HOME / YOUTUBE'}
				subPageTitle={'PLAYLIST-FOR BOOK'}
			>
				<div className='top-wrap'>
					<div className='inner-container'>
						<div id='musicListWrap' className='list-wrap'>
							{MusicList.map((item, idx) => {
								return (
									<article key={idx}>
										<h3>{item.snippet.title}</h3>
										<p className='date'>
											{item.snippet.publishedAt
												.split('T')[0]
												.split('-')
												.join('.')}
										</p>

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
						{ReadList.slice(0, 1).map((item, idx) => {
							return (
								<Fragment key={idx}>
									<div className='title-wrap'>
										<p>Best Pick</p>

										<div className='inner-title'>
											<h2>{item.snippet.title}</h2>
											<p className='date'>
												{item.snippet.publishedAt
													.split('T')[0]
													.split('-')
													.join('.')}
											</p>
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
							{ReadList.slice(1, 4).map((item, idx) => {
								return (
									<article key={idx}>
										<h3>{item.snippet.title}</h3>
										<p className='date'>
											{item.snippet.publishedAt
												.split('T')[0]
												.split('-')
												.join('.')}
										</p>

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
					<iframe
						title={Selected}
						src={`https://www.youtube.com/embed/${Selected}`}
					></iframe>
				</div>
			</Modal>
		</>
	);
}

export default Youtube;
