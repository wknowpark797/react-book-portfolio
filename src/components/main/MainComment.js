import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import 'swiper/css';

function MainComment() {
	const btnPrevComment = useRef(null);
	const btnNextComment = useRef(null);
	const [RefVisible, setRefVisible] = useState(false);

	const Reviews = useSelector((store) => store.review.data);

	const splitDate = (initDate) => {
		const splited = initDate.split('T');
		const date = splited[0];
		const time = splited[1].split('.')[0];

		return `${date}, ${time}`;
	};

	useEffect(() => {
		if (!RefVisible) {
			return;
		}
	}, [RefVisible]);

	return (
		<section id='main-comment-list' className='my-scroll'>
			<div className='inner-container'>
				<div className='title-wrap'>
					<h1>Book's Experiences</h1>
					<p>Lorem ipsum dolor sit amet.</p>
				</div>

				<div className='slide-wrap commentListSwiper'>
					<Swiper
						id='commentListPanel'
						className='panel'
						slidesPerView={'auto'}
						spaceBetween={30}
						autoplay={{ delay: 2500, disableOnInteraction: true }}
						navigation={{ nextEl: btnNextComment.current, prevEl: btnPrevComment.current }}
						modules={[Autoplay, Navigation]}
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

					<div className='arrow'>
						<button
							type='button'
							id='btnPrevComment'
							className='prev'
							ref={(e) => {
								btnPrevComment.current = e;
								setRefVisible(!!e);
							}}
						>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
						<button type='button' id='btnNextComment' className='next' ref={btnNextComment}>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default MainComment;
