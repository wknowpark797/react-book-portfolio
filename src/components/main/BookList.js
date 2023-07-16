import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import Modal from '../common/Modal';

function BookList() {
	const btnPrev = useRef(null);
	const btnNext = useRef(null);
	const [Items, setItems] = useState([]);

	const modal = useRef(null);
	const [SelectedBookId, setSelectedBookId] = useState('');
	const [Detail, setDetail] = useState({});

	const getBookDetail = async () => {
		if (SelectedBookId === '') return;

		const detailURL = `https://www.googleapis.com/books/v1/volumes/${SelectedBookId}`;
		const result = await axios.get(detailURL);
		setDetail(result.data.volumeInfo);
	};

	const getBookData = async () => {
		const userId = '105834502729522452212';
		const shelf = '1001';
		const listURL = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

		const result = await axios.get(listURL);
		setItems(result.data.items);
	};

	useEffect(() => {
		getBookDetail();
	}, [SelectedBookId]);

	useEffect(() => {
		getBookData();
	}, []);

	return (
		<>
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
									<SwiperSlide
										key={idx}
										onClick={() => {
											setSelectedBookId(item.id);
											modal.current.open();
										}}
									>
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

export default BookList;
