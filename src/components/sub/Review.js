import SubLayout from '../common/SubLayout';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Review() {
	const inputBookName = useRef(null);
	const inputReviewContent = useRef(null);
	const editBookName = useRef(null);
	const editReviewContent = useRef(null);
	const [Reviews, setReviews] = useState([]);
	const [Updating, setUpdating] = useState(false);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		axios.get('/api/review/read').then((res) => {
			console.log('review list: ', res.data.reviewList);
			setReviews(res.data.reviewList);
		});
	}, []);

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

		const params = {
			bookName: inputBookName.current.value,
			content: inputReviewContent.current.value,
		};

		axios
			.post('/api/review/create', params)
			.then((res) => {
				console.log(res);
				alert('리뷰를 성공적으로 등록하였습니다.');
				resetForm();
			})
			.catch((err) => {
				console.log(err);
				alert('리뷰등록에 실패했습니다.');
			});

		/*
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
		*/
	};

	const deleteReview = (num) => {
		if (!window.confirm('게시물을 삭제하시겠습니까?')) return;

		const params = { reviewNum: num };

		axios.post('/api/review/delete', params).then((res) => {
			if (res.data.success) {
				alert('리뷰가 삭제되었습니다.');
			} else {
				alert('리뷰 삭제를 실패했습니다.');
			}
		});

		// setReviews(Reviews.filter((_, idx) => idx !== num));
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
												<textarea ref={editReviewContent} defaultValue={review.content}></textarea>
											</div>
										</>
									) : (
										<>
											{/* 출력모드 */}
											<h2>{review.bookName}</h2>
											<p>{review.content}</p>
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
											<div className='btn-wrap'>
												<button type='button' onClick={() => disableUpdate(idx)}>
													CANCEL
												</button>
												<button type='button' className='btn-update' onClick={() => updateReview(idx)}>
													UPDATE
												</button>
											</div>
										</>
									) : (
										<>
											{/* 출력모드 */}
											<div className='btn-wrap'>
												<button type='button' onClick={() => enableUpdate(idx)}>
													EDIT
												</button>
												<button type='button' className='btn-delete' onClick={() => deleteReview(review.reviewNum)}>
													DELETE
												</button>
											</div>
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
