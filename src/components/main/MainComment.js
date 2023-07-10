import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

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
	];

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
					<article id='commentListPanel' className='panel swiper-wrapper'>
						{Reviews.map((review, idx) => {
							return (
								<div className='swiper-slide' key={idx}>
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
								</div>
							);
						})}
					</article>

					<div className='arrow'>
						<button type='button' id='btnPrevComment' className='prev'>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
						<button type='button' id='btnNextComment' className='next'>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default MainComment;
