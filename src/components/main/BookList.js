import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

function BookList() {
	const btnPrev = useRef(null);
	const btnNext = useRef(null);
	const [Items, setItems] = useState([]);

	const getBookData = async () => {
		const userId = '105834502729522452212';
		const shelf = '1001';
		const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

		const result = await axios.get(listURL);
		setItems(result.data.items);
	};

	useEffect(() => {
		getBookData();
	}, []);

	return (
		<section id='main-book-list' className='my-scroll'>
			<div className='inner-container'>
				<div className='title-wrap'>
					<h1>Best Seller Books.</h1>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, exercitationem.</p>

					<div className='arrow'>
						<button type='button' id='btnPrevBook' className='prev' ref={btnPrev}>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
						<button type='button' id='btnNextBook' className='next' ref={btnNext}>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div>
				</div>

				<div className='slide-wrap bookListSwiper'>
					<Swiper
						id='bookListPanel'
						className='panel'
						slidesPerView={'auto'}
						spaceBetween={30}
						navigation={{ nextEl: btnNext.current, prevEl: btnPrev.current }}
						modules={[Navigation]}
					>
						{Items.map((item, idx) => {
							return (
								<SwiperSlide key={idx}>
									<div className='ratio-wrap'>
										<div className='img-box'>
											<img src={item.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=10')} alt='' />
										</div>
									</div>

									<div className='info-box'>
										<h2>{item.volumeInfo.title}</h2>
										<p>{item.volumeInfo.authors}</p>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
		</section>
	);
}

export default BookList;
