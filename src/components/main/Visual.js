import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Visual() {
	const [Items, setItems] = useState([]);

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
		<section id='main-visual' className='my-scroll on'>
			<div className='bg-wrap'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>

			<div className='slide-wrap mainVisualSwiper'>
				<Swiper id='visualPanel' className='panel'>
					{Items.map((item, idx) => {
						return (
							<SwiperSlide key={idx}>
								<div className='detail-wrap'>
									<h1>${item.volumeInfo.title}</h1>

									<div className='rating-wrap'>
										<div className='star-box'>
											<span className='on'>
												<FontAwesomeIcon icon={faStar} />
											</span>
											<span className='on'>
												<FontAwesomeIcon icon={faStar} />
											</span>
											<span className='on'>
												<FontAwesomeIcon icon={faStar} />
											</span>
											<span>
												<FontAwesomeIcon icon={faStar} />
											</span>
											<span>
												<FontAwesomeIcon icon={faStar} />
											</span>
										</div>
										<p>3.0</p>
									</div>

									<p className='content'>${item.volumeInfo.description}</p>

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
					<div className='current-number'>
						<span>01</span> / 05
					</div>

					<div className='btn-arrow'>
						<button type='button' id='btnPrevVisual'>
							<FontAwesomeIcon icon={faArrowLeft} />
						</button>
						<button type='button' id='btnNextVisual'>
							<FontAwesomeIcon icon={faArrowRight} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Visual;
