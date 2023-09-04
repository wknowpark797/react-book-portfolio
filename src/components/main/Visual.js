import Modal from '../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faStar,
	faArrowLeft,
	faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';

function Visual() {
	const modal = useRef(null);
	const btnPrevVisual = useRef(null);
	const btnNextVisual = useRef(null);
	const fractionFrame = useRef(null);
	const ratingList = [5, 4, 3, 4, 5];
	const [RefVisible, setRefVisible] = useState(false);
	const [BookId, setBookId] = useState('iP7BEAAAQBAJ');

	const dispatch = useDispatch();
	const Detail = useSelector((store) => store.bookDetailReducer.bookDetail);
	const Items = useSelector((store) => store.bookVisualReducer.bookVisual);

	useEffect(() => {
		dispatch({ type: types.BOOK_DETAIL.start, bookId: BookId });
	}, [dispatch, BookId]);

	useEffect(() => {
		if (!RefVisible) {
			return;
		}
	}, [RefVisible]);

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
						slidesPerView={1}
						autoplay={{ delay: 5000, disableOnInteraction: true }}
						pagination={{
							el: fractionFrame.current,
							type: 'fraction',
							formatFractionCurrent: (num) => {
								return num < 10 && (num = '0' + num);
							},
							formatFractionTotal: (num) => {
								return num < 10 && (num = '0' + num);
							},
						}}
						navigation={{
							nextEl: btnNextVisual.current,
							prevEl: btnPrevVisual.current,
						}}
						modules={[Autoplay, Pagination, Navigation]}
					>
						{Items.map((item, idx) => {
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
												<img
													src={item.volumeInfo.imageLinks.thumbnail.replace(
														'edge=curl',
														'edge='
													)}
													alt=''
												/>
											</div>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>

					<div className='indicator'>
						<div
							className='current-number'
							ref={(e) => {
								fractionFrame.current = e;
								setRefVisible(!!e);
							}}
						>
							<span>01</span> / 05
						</div>

						<div className='btn-arrow'>
							<button type='button' id='btnPrevVisual' ref={btnPrevVisual}>
								<FontAwesomeIcon icon={faArrowLeft} />
							</button>
							<button type='button' id='btnNextVisual' ref={btnNextVisual}>
								<FontAwesomeIcon icon={faArrowRight} />
							</button>
						</div>
					</div>
				</div>
			</section>

			<Modal ref={modal}>
				<div className='inner-detail'>
					<div className='img-box'>
						<img
							src={Detail?.imageLinks?.small.replace('edge=curl', 'edge=')}
							alt={Detail?.title}
						/>
					</div>

					<div className='info-wrap'>
						<h1>{Detail?.title}</h1>
						<h2>{Detail?.subtitle || ''}</h2>

						<p className='authors'>작가 : {Detail?.authors}</p>
						<div
							className='description'
							dangerouslySetInnerHTML={{ __html: Detail?.description }}
						></div>
						<p>카테고리 : {Detail?.categories}</p>
						<p>출판사 : {Detail?.publisher}</p>
						<p>출판일 : {Detail?.publishedDate}</p>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default Visual;
