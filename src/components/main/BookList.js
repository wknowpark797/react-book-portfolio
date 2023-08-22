import Modal from '../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';

function BookList() {
	const modal = useRef(null);
	const btnPrevBook = useRef(null);
	const btnNextBook = useRef(null);
	const [RefVisible, setRefVisible] = useState(false);
	const [BookId, setBookId] = useState('pYEaCgAAQBAJ');

	const dispatch = useDispatch();
	const Detail = useSelector((store) => store.bookDetailReducer.bookDetail);
	const Items = useSelector((store) => store.bookInterestReducer.bookInterest);

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
			<section id='main-book-list' className='my-scroll'>
				<div className='inner-container'>
					<div className='title-wrap'>
						<h1>Best Seller Books.</h1>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, exercitationem.</p>

						<div className='arrow'>
							<button
								type='button'
								id='btnPrevBook'
								className='prev'
								ref={(e) => {
									btnPrevBook.current = e;
									setRefVisible(!!e);
								}}
							>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
							<button type='button' id='btnNextBook' className='next' ref={btnNextBook}>
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
							autoplay={{ delay: 1000, disableOnInteraction: true }}
							navigation={{ nextEl: btnNextBook.current, prevEl: btnPrevBook.current }}
							modules={[Autoplay, Navigation]}
						>
							{Items.map((item, idx) => {
								return (
									<SwiperSlide
										key={idx}
										onClick={() => {
											setBookId(item.id);
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
				</div>
			</Modal>
		</>
	);
}

export default BookList;
