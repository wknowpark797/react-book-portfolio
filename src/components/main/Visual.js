import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import Modal from '../common/Modal';

function Visual() {
	const btnPrev = useRef(null);
	const btnNext = useRef(null);
	const fractionFrame = useRef(null);
	const Items = useSelector((store) => {
		console.log(store.bookVisual.data);
		return store.bookVisual.data;
	});
	const ratingList = [5, 4, 3, 4, 5];

	const modal = useRef(null);
	const [SelectedBookId, setSelectedBookId] = useState('');
	const [Detail, setDetail] = useState({});

	const getBookDetail = async () => {
		if (SelectedBookId === '') return;

		const detailURL = `https://www.googleapis.com/books/v1/volumes/${SelectedBookId}`;
		const result = await axios.get(detailURL);
		setDetail(result.data.volumeInfo);
	};

	useEffect(() => {
		getBookDetail();
	}, [SelectedBookId]);

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
						navigation={{ nextEl: btnNext.current, prevEl: btnPrev.current }}
						modules={[Pagination, Navigation]}
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
												setSelectedBookId(item.id);
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
						<div className='current-number' ref={fractionFrame}>
							<span>01</span> / 05
						</div>

						<div className='btn-arrow'>
							<button type='button' id='btnPrevVisual' ref={btnPrev}>
								<FontAwesomeIcon icon={faArrowLeft} />
							</button>
							<button type='button' id='btnNextVisual' ref={btnNext}>
								<FontAwesomeIcon icon={faArrowRight} />
							</button>
						</div>
					</div>
				</div>
			</section>

			<Modal ref={modal}>
				<div className='inner-detail'>
					<div className='img-box'>
						<img src={Detail.imageLinks?.small.replace('edge=curl', 'edge=')} alt={Detail.title} />
					</div>

					<div className='info-wrap'>
						<h1>{Detail.title}</h1>
						<h2>{Detail.subtitle || ''}</h2>

						<p className='authors'>작가 : {Detail.authors}</p>
						<div className='description' dangerouslySetInnerHTML={{ __html: Detail.description }}></div>
						<p>카테고리 : {Detail.categories}</p>
						<p>출판사 : {Detail.publisher}</p>
						<p>출판일 : {Detail.publishedDate}</p>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default Visual;
