import SubLayout from '../common/SubLayout';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Review() {
	const inputBookName = useRef(null);
	const inputReviewContent = useRef(null);
	const [Reviews, setReviews] = useState([]);

	useEffect(() => {
		dataFetch();
	}, []);

	const dataFetch = async () => {
		const result = await axios.get(`${process.env.PUBLIC_URL}/DB/reviews.json`);
		setReviews(result.data.reviews);
	};

	const setToday = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
		const date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();

		return `${year}.${month}.${date}`;
	};

	const resetForm = () => {
		inputBookName.current.value = '';
		inputReviewContent.current.value = '';
	};

	const createReview = () => {
		if (!inputBookName.current.value.trim() || !inputReviewContent.current.value.trim()) {
			resetForm();
			return alert('도서명과 리뷰 내용을 모두 입력하세요.');
		}

		setReviews([
			{
				bookName: inputBookName.current.value,
				reviewContent: inputReviewContent.current.value,
				profileImg: 'my-profile.jpg',
				userName: 'Woo Ara',
				date: setToday(),
			},
			...Reviews,
		]);
		resetForm();
	};

	const deleteReview = (index) => {
		if (!window.confirm('게시물을 삭제하시겠습니까?')) return;
		setReviews(Reviews.filter((_, idx) => idx !== index));
	};

	return (
		<SubLayout subPageName={'sub-review'} breadCrumb={'HOME / REVIEW'} subPageTitle={['EXPERIENCES', <br />, 'FOR BOOK']}>
			<div className='review-wrap'>
				<div className='inner-container'>
					{/* review input */}
					<div className='input-wrap'>
						<div className='input-box'>
							<label htmlFor='bookname' className='tit'>
								Book Name
							</label>
							<input type='text' id='bookname' placeholder='도서명을 입력하세요.' ref={inputBookName} />
						</div>

						<div className='input-box'>
							<label htmlFor='reviewcontent' className='tit'>
								Review Content
							</label>
							<textarea id='reviewcontent' placeholder='리뷰 내용을 작성해주세요.' ref={inputReviewContent}></textarea>
						</div>

						<div className='btn-wrap'>
							<button type='button' onClick={resetForm}>
								RESET
							</button>
							<button type='button' className='btn-write' onClick={createReview}>
								WRITE
							</button>
						</div>
					</div>

					{/* review list */}
					<div className='show-wrap'>
						{Reviews.map((review, idx) => {
							return (
								<article key={idx}>
									<h2>{review.bookName}</h2>
									<p>{review.reviewContent}</p>

									<div className='info-wrap'>
										<div className='profile-box'>
											<img src={`${process.env.PUBLIC_URL}/image/${review.profileImg}`} alt='' />
										</div>
										<div className='info-box'>
											<p className='user'>{review.userName}</p>
											<p>{review.date}</p>
										</div>
									</div>

									{/* 내가 작성한 게시물에서만 노출 */}
									{review.userName === 'Woo Ara' && (
										<div className='btn-wrap'>
											<button type='button'>EDIT</button>
											<button type='button' className='btn-delete' onClick={() => deleteReview(idx)}>
												DELETE
											</button>
										</div>
									)}
								</article>
							);
						})}
					</div>
				</div>
			</div>
		</SubLayout>
	);
}

export default Review;
