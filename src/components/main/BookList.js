import Modal from '../common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useState, useRef } from 'react';
import { useBookInterestQuery } from '../../hooks/useBookInterestQuery';
import { useBookDetailQuery } from '../../hooks/useBookDetailQuery';

function BookList() {
	const swiperRef = useRef();
	const btnStart = useRef();
	const btnStop = useRef();
	const modal = useRef(null);
	const [BookId, setBookId] = useState('pYEaCgAAQBAJ');
	const { data: Detail, isSuccess: isDetailSuccess } = useBookDetailQuery(BookId);
	const { data: Items, isSuccess: isInterestSuccess } = useBookInterestQuery();

	const activeBtnStop = () => {
		btnStart.current.classList.remove('on');
		btnStop.current.classList.add('on');
	};

	return (
		<>
			<section id='main-book-list' className='my-scroll'>
				<div className='inner-container'>
					<div className='title-wrap'>
						<h1>Best Seller Books.</h1>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, exercitationem.</p>

						<div className='indicator'>
							<div className='btn-arrow'>
								<button
									type='button'
									id='btnPrevBook'
									onClick={() => {
										activeBtnStop();
										swiperRef.current?.slidePrev();
									}}
								>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								<button
									type='button'
									id='btnNextBook'
									onClick={() => {
										activeBtnStop();
										swiperRef.current?.slideNext();
									}}
								>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>

							<div className='btn-controls'>
								<button
									type='button'
									className='on'
									ref={btnStart}
									onClick={() => {
										btnStart.current.classList.add('on');
										btnStop.current.classList.remove('on');
										swiperRef.current?.autoplay.start();
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
										swiperRef.current?.autoplay.stop();
									}}
								>
									<FontAwesomeIcon icon={faPause} />
								</button>
							</div>
						</div>
					</div>

					<div className='slide-wrap bookListSwiper'>
						{isInterestSuccess && (
							<Swiper
								id='bookListPanel'
								className='panel'
								onBeforeInit={(swiper) => (swiperRef.current = swiper)}
								modules={[Autoplay]}
								autoplay={{ delay: 1200, disableOnInteraction: true }}
								slidesPerView={'auto'}
								spaceBetween={30}
								grabCursor={true}
								loop={true}
								loopedSlides={Items.length}
								onSliderMove={activeBtnStop}
							>
								{Items.map((item, idx) => {
									return (
										<SwiperSlide
											key={idx}
											onClick={() => {
												swiperRef.current.autoplay.stop();
												activeBtnStop();
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
						)}
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

export default BookList;
