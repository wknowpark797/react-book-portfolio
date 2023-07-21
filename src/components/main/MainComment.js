import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { useState, useEffect, useRef } from 'react';
import 'swiper/css';

function MainComment() {
	const dummyReviews = [
		{
			bookName: '일상의 빈칸',
			reviewContent:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id temporibus exercitationem culpa saepe, nulla veniam aliquam. Ea dicta officia dolorum.',
			profileImg: 'my-profile.jpg',
			userName: 'Woo Ara',
			date: '2023.06.20',
			updateDate: '2023.06.21',
		},
		{
			bookName: '일상의 한칸',
			reviewContent:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id temporibus exercitationem culpa saepe, nulla veniam aliquam. Ea dicta officia dolorum.',
			profileImg: 'example_user3.jpg',
			userName: 'Paul Davison',
			date: '2023.06.21',
		},
		{
			bookName: '일상의 두칸',
			reviewContent:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id temporibus exercitationem culpa saepe, nulla veniam aliquam. Ea dicta officia dolorum.',
			profileImg: 'example_user3.jpg',
			userName: 'Paul Davison',
			date: '2023.06.23',
		},
	];

	const btnPrevComment = useRef(null);
	const btnNextComment = useRef(null);

	const getLocalData = () => {
		const data = localStorage.getItem('reviews');
		if (data) return JSON.parse(data);
		else return dummyReviews;
	};

	const [Reviews] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('reviews', JSON.stringify(Reviews));
	}, [Reviews]);

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
									<div className='profile-box'>
										<img src={`${process.env.PUBLIC_URL}/image/${review.profileImg}`} alt='' />
									</div>
									<div className='info-box'>
										<h2>{review.bookName}</h2>
										<p>{review.reviewContent}</p>
										<p className='user'>{review.userName}</p>
										<p>{review.date}</p>
										{review.updateDate && <p>{review.updateDate} [마지막 수정 날짜]</p>}
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>

					<div className='arrow'>
						<button type='button' id='btnPrevComment' className='prev' ref={btnPrevComment}>
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
