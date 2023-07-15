import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

function Visual() {
	const btnPrev = useRef(null);
	const btnNext = useRef(null);
	const fractionFrame = useRef(null);
	const [Items, setItems] = useState([]);
	const ratingList = [5, 4, 3, 4, 5];

	const getBookData = async () => {
		const userId = '105834502729522452212';
		const shelf = '1002';
		const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

		const result = await axios.get(listURL);
		setItems(result.data.items);
	};

	useEffect(() => {
		getBookData();
	}, []);

	return (
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

									<button type='button' className='btn-more'>
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
	);
}

export default Visual;
