import SubLayout from '../common/SubLayout';
import { useState, useEffect, useRef } from 'react';

function Review() {
	const getLocalData = () => {
		const data = localStorage.getItem('reviews');
		return JSON.parse(data);
	};

	const inputBookName = useRef(null);
	const inputReviewContent = useRef(null);
	const editBookName = useRef(null);
	const editReviewContent = useRef(null);
	const [Reviews, setReviews] = useState(getLocalData);
	const [Updating, setUpdating] = useState(false);

	useEffect(() => {
		localStorage.setItem('reviews', JSON.stringify(Reviews));
	}, [Reviews]);

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

	const enableUpdate = (index) => {
		if (Updating) return alert('수정 중인 리뷰가 있습니다.');
		setUpdating(true);
		setReviews(
			Reviews.map((review, idx) => {
				if (idx === index) review.enableUpdate = true;
				return review;
			})
		);
	};

	const disableUpdate = (index) => {
		setReviews(
			Reviews.map((review, idx) => {
				if (idx === index) review.enableUpdate = false;
				return review;
			})
		);
		setUpdating(false);
	};

	const updateReview = (index) => {
		if (!editBookName.current.value.trim() || !editReviewContent.current.value.trim()) {
			return alert('수정할 도서명과 리뷰 내용을 모두 입력하세요.');
		}

		setReviews(
			Reviews.map((review, idx) => {
				if (idx === index) {
					review.bookName = editBookName.current.value;
					review.reviewContent = editReviewContent.current.value;
					review.updateDate = setToday();
					review.enableUpdate = false;
				}
				return review;
			})
		);

		setUpdating(false);
	};

	return (
		<SubLayout subPageName={'sub-review'} breadCrumb={'HOME / REVIEW'} subPageTitle={'EXPERIENCES-FOR BOOK'}>
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
									{review.enableUpdate ? (
										<>
											{/* 수정모드 */}
											<div className='input-box'>
												<input type='text' ref={editBookName} defaultValue={review.bookName} />
											</div>
											<div className='input-box'>
												<textarea ref={editReviewContent} defaultValue={review.reviewContent}></textarea>
											</div>
										</>
									) : (
										<>
											{/* 출력모드 */}
											<h2>{review.bookName}</h2>
											<p>{review.reviewContent}</p>
										</>
									)}

									<div className='info-wrap'>
										<div className='profile-box'>
											<img src={`${process.env.PUBLIC_URL}/image/${review.profileImg}`} alt='' />
										</div>
										<div className='info-box'>
											<p className='user'>{review.userName}</p>
											<p>{review.date}</p>
											{review.updateDate && <p>{review.updateDate} [마지막 수정 날짜]</p>}
										</div>
									</div>

									{/* 내가 작성한 게시물에서만 노출 */}
									{review.enableUpdate ? (
										<>
											{/* 수정모드 */}
											{review.userName === 'Woo Ara' && (
												<div className='btn-wrap'>
													<button type='button' onClick={() => disableUpdate(idx)}>
														CANCEL
													</button>
													<button type='button' className='btn-update' onClick={() => updateReview(idx)}>
														UPDATE
													</button>
												</div>
											)}
										</>
									) : (
										<>
											{/* 출력모드 */}
											{review.userName === 'Woo Ara' && (
												<div className='btn-wrap'>
													<button type='button' onClick={() => enableUpdate(idx)}>
														EDIT
													</button>
													<button type='button' className='btn-delete' onClick={() => deleteReview(idx)}>
														DELETE
													</button>
												</div>
											)}
										</>
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
