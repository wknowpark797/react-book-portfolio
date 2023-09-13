import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useRef } from 'react';
import { useReviewQuery } from '../../hooks/useReviewQuery';

function MainComment() {
	const swiperRef = useRef();
	const btnStart = useRef();
	const btnStop = useRef();
	const { data: Reviews, isSuccess } = useReviewQuery();

	const splitDate = (initDate) => {
		const splited = initDate.split('T');
		const date = splited[0];
		const time = splited[1].split('.')[0];

		return `${date}, ${time}`;
	};

	const activeBtnStop = () => {
		btnStart.current.classList.remove('on');
		btnStop.current.classList.add('on');
	};

	return (
		<section id='main-comment-list' className='my-scroll'>
			<div className='inner-container'>
				<div className='title-wrap'>
					<h1>Book's Experiences</h1>
					<p>Lorem ipsum dolor sit amet.</p>
					<Link to='/review' className='btn-more'>
						VIEW ALL
					</Link>
				</div>

				<div className='slide-wrap commentListSwiper'>
					{isSuccess && (
						<Swiper
							id='commentListPanel'
							className='panel'
							onBeforeInit={(swiper) => (swiperRef.current = swiper)}
							modules={[Autoplay]}
							autoplay={{ delay: 2000, disableOnInteraction: true }}
							slidesPerView={'auto'}
							spaceBetween={30}
							grabCursor={true}
							loop={true}
							loopedSlides={Reviews.length}
							onSliderMove={activeBtnStop}
						>
							{Reviews.map((review, idx) => {
								return (
									<SwiperSlide key={idx}>
										<div className='profile-box'>{review.writer.displayName[0].toUpperCase()}</div>
										<div className='info-box'>
											<h2>{review.bookName}</h2>
											<p>{review.reviewContent}</p>
											<p className='user'>{review.writer.displayName}</p>
											<p>{splitDate(review.createdAt)}</p>
											<p>{splitDate(review.updatedAt)} [마지막 수정 날짜]</p>
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					)}

					<div className='indicator'>
						<div className='btn-arrow'>
							<button
								type='button'
								id='btnPrevComment'
								onClick={() => {
									activeBtnStop();
									swiperRef.current?.slidePrev();
								}}
							>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
							<button
								type='button'
								id='btnNextComment'
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
			</div>
		</section>
	);
}

export default MainComment;
