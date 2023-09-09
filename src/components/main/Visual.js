import Modal from '../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faArrowRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useState, useRef } from 'react';
import { useBookVisualQuery } from '../../hooks/useBookVisualQuery';
import { useBookDetailQuery } from '../../hooks/useBookDetailQuery';

function Visual() {
	const ratingList = [5, 4, 3, 4, 5];
	const swiperRef = useRef();
	const btnStart = useRef();
	const btnStop = useRef();
	const modal = useRef(null);
	const [SlideIdx, setSlideIdx] = useState(0);
	const [BookId, setBookId] = useState('iP7BEAAAQBAJ');
	const { data: Detail, isSuccess: isDetailSuccess } = useBookDetailQuery(BookId);
	const { data: Items, isSuccess: isVisualSuccess } = useBookVisualQuery();

	const activeBtnStop = () => {
		btnStart.current.classList.remove('on');
		btnStop.current.classList.add('on');
	};

	return (
		<>
			<section id='main-visual' className='my-scroll'>
				<div className='bg-wrap'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<div className='slide-wrap mainVisualSwiper'>
					<Swiper
						id='visualPanel'
						className='panel'
						onBeforeInit={(swiper) => (swiperRef.current = swiper)}
						modules={[Autoplay]}
						autoplay={{ delay: 5000, disableOnInteraction: true }}
						slidesPerView={1}
						grabCursor={true}
						loop={true}
						loopedSlides={Items?.length}
						onSlideChange={(el) => setSlideIdx(el.realIndex)}
						onSliderMove={activeBtnStop}
					>
						{isVisualSuccess &&
							Items.map((item, idx) => {
								return (
									<SwiperSlide key={idx}>
										<div className='detail-wrap'>
											<h1>{item.volumeInfo.title}</h1>

											<div className='rating-wrap'>
												<div className='star-box'>
													<span className={ratingList[idx] >= 1 ? 'on' : ''}>
														<FontAwesomeIcon icon={faStar} />
													</span>
													<span className={ratingList[idx] >= 2 ? 'on' : ''}>
														<FontAwesomeIcon icon={faStar} />
													</span>
													<span className={ratingList[idx] >= 3 ? 'on' : ''}>
														<FontAwesomeIcon icon={faStar} />
													</span>
													<span className={ratingList[idx] >= 4 ? 'on' : ''}>
														<FontAwesomeIcon icon={faStar} />
													</span>
													<span className={ratingList[idx] >= 5 ? 'on' : ''}>
														<FontAwesomeIcon icon={faStar} />
													</span>
												</div>
												<p>{ratingList[idx] + '.0'}</p>
											</div>

											<p className='content'>{item.volumeInfo.description}</p>

											<button
												type='button'
												className='btn-more'
												onClick={() => {
													swiperRef.current.autoplay.stop();
													activeBtnStop();
													setBookId(item.id);
													modal.current.open();
												}}
											>
												VIEW DETAIL
											</button>
										</div>

										<div className='ratio-wrap'>
											<div className='double-wrap'>
												<div className='img-box origin'>
													<img
														src={item.volumeInfo.imageLinks.thumbnail
															.replace('zoom=1', 'zoom=10')
															.replace('edge=curl', 'edge=')}
														alt=''
													/>
												</div>

												<div className='img-box shadow'>
													<img src={item.volumeInfo.imageLinks.thumbnail.replace('edge=curl', 'edge=')} alt='' />
												</div>
											</div>
										</div>
									</SwiperSlide>
								);
							})}
					</Swiper>

					<div className='indicator'>
						<div className='btn-controls'>
							<button
								type='button'
								className='on'
								ref={btnStart}
								onClick={() => {
									btnStart.current.classList.add('on');
									btnStop.current.classList.remove('on');
									swiperRef.current.autoplay.start();
								}}
							>
								<FontAwesomeIcon icon={faPlay} />
							</button>
							<button
								type='button'
								ref={btnStop}
								onClick={() => {
									btnStart.current.classList.remove('on');
									btnStop.current.classList.add('on');
									swiperRef.current.autoplay.stop();
								}}
							>
								<FontAwesomeIcon icon={faPause} />
							</button>
						</div>

						<div className='current-number'>
							<span className='active'>{SlideIdx < 10 ? '0' + (SlideIdx + 1) : SlideIdx + 1}</span>
							<span className='slash'>/</span>
							{Items?.length < 10 ? '0' + Items?.length : Items?.length}
						</div>

						<div className='btn-arrow'>
							<button
								type='button'
								id='btnPrevVisual'
								onClick={() => {
									activeBtnStop();
									swiperRef.current?.slidePrev();
								}}
							>
								<FontAwesomeIcon icon={faArrowLeft} />
							</button>
							<button
								type='button'
								id='btnNextVisual'
								onClick={() => {
									activeBtnStop();
									swiperRef.current?.slideNext();
								}}
							>
								<FontAwesomeIcon icon={faArrowRight} />
							</button>
						</div>
					</div>
				</div>
			</section>

			<Modal ref={modal}>
				<div className='inner-detail'>
					{isDetailSuccess && (
						<>
							<div className='img-box'>
								<img src={Detail?.imageLinks?.small.replace('edge=curl', 'edge=')} alt={Detail?.title} />
							</div>

							<div className='info-wrap'>
								<h1>{Detail?.title}</h1>
								<h2>{Detail?.subtitle || ''}</h2>

								<p className='authors'>작가 : {Detail?.authors}</p>
								<div className='description' dangerouslySetInnerHTML={{ __html: Detail?.description }}></div>
								<p>카테고리 : {Detail?.categories}</p>
								<p>출판사 : {Detail?.publisher}</p>
								<p>출판일 : {Detail?.publishedDate}</p>
							</div>
						</>
					)}
				</div>
			</Modal>
		</>
	);
}

export default Visual;
