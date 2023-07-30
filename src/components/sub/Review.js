import SubLayout from '../common/SubLayout';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Review() {
	const user = useSelector((store) => store.user);

	// 리뷰 작성 input
	const [InputBookName, setInputBookName] = useState('');
	const [InputReviewContent, setInputReviewContent] = useState('');

	// 리뷰 수정 input
	const [EditBookName, setEditBookName] = useState('');
	const [EditReviewContent, setEditReviewContent] = useState('');

	const [Reviews, setReviews] = useState([]); // 리뷰 리스트
	const [UpdateIdx, setUpdateIdx] = useState(-1); // 선택 리뷰 index
	const [Detail, setDetail] = useState({}); // 선택 리뷰 detail

	/*
		const setToday = () => {
			const today = new Date();
			const year = today.getFullYear();
			const month = today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
			const date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();

			return `${year}.${month}.${date}`;
		};
	*/

	const resetInputForm = () => {
		setInputBookName('');
		setInputReviewContent('');
	};

	const enableUpdate = (num) => {
		if (UpdateIdx > 0) return alert('수정 중인 리뷰가 있습니다.');
		setUpdateIdx(num);
	};

	const disableUpdate = () => {
		setUpdateIdx(-1);
	};

	// Review Create
	const createReview = () => {
		if (!InputBookName.trim() || !InputReviewContent.trim()) {
			resetInputForm();
			return alert('도서명과 리뷰 내용을 모두 입력하세요.');
		}

		const params = {
			bookName: InputBookName,
			reviewContent: InputReviewContent,
			uid: user.uid,
		};

		axios
			.post('/api/review/create', params)
			.then(() => {
				alert('리뷰를 성공적으로 등록하였습니다.');
				resetInputForm();
			})
			.catch(() => {
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

	// Review Read (List)
	const readReview = () => {
		axios.get('/api/review/read/0').then((res) => {
			setReviews(res.data.reviewList);
		});
	};

	// Review Detail
	const detailReview = useCallback(() => {
		axios
			.get(`/api/review/detail/${UpdateIdx}`)
			.then((res) => {
				if (res.data.success) {
					setDetail(res.data.detail);
				} else {
					alert('리뷰 내용 호출에 실패했습니다.');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [UpdateIdx]);

	// Review Update
	const updateReview = (num) => {
		if (!EditBookName.trim() || !EditReviewContent.trim()) {
			return alert('수정할 도서명과 리뷰 내용을 모두 입력하세요.');
		}

		const params = {
			bookName: EditBookName,
			reviewContent: EditReviewContent,
			reviewNum: num,
		};

		axios
			.put('/api/review/update', params)
			.then((res) => {
				if (res.data.success) {
					alert('리뷰 수정을 완료했습니다.');
				} else {
					alert('리뷰 수정에 실패했습니다.');
				}
			})
			.catch((err) => {
				console.log(err);
			});

		disableUpdate();
	};

	// Review Delete
	const deleteReview = (num) => {
		if (!window.confirm('리뷰를 삭제하시겠습니까?')) return;

		axios
			.delete(`/api/review/delete/${num}`)
			.then((res) => {
				if (res.data.success) {
					alert('리뷰가 삭제되었습니다.');
				} else {
					alert('리뷰 삭제를 실패했습니다.');
				}
			})
			.catch((err) => {
				console.log(err);
			});

		// setReviews(Reviews.filter((_, idx) => idx !== num));
	};

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		readReview();
	}, []);

	useEffect(() => {
		detailReview();
		setEditBookName(Detail?.bookName);
		setEditReviewContent(Detail?.reviewContent);
	}, [UpdateIdx, Detail, detailReview]);

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
							<input
								type='text'
								id='bookname'
								placeholder='도서명을 입력하세요.'
								value={InputBookName}
								onChange={(e) => {
									setInputBookName(e.target.value);
								}}
							/>
						</div>

						<div className='input-box'>
							<label htmlFor='reviewcontent' className='tit'>
								Review Content
							</label>
							<textarea
								id='reviewcontent'
								placeholder='리뷰 내용을 작성해주세요.'
								value={InputReviewContent}
								onChange={(e) => {
									setInputReviewContent(e.target.value);
								}}
							></textarea>
						</div>

						<div className='btn-wrap'>
							<button type='button' onClick={resetInputForm}>
								RESET
							</button>
							<button type='button' className='btn-write' onClick={createReview}>
								WRITE
							</button>
						</div>
					</div>

					{/* review list */}
					<div className='show-wrap'>
						{Reviews.map((review) => {
							return (
								<article key={review.reviewNum}>
									{review.reviewNum === UpdateIdx ? (
										<>
											{/* 수정모드 */}
											<div className='input-box'>
												<input
													type='text'
													value={EditBookName}
													onChange={(e) => {
														setEditBookName(e.target.value);
													}}
												/>
											</div>
											<div className='input-box'>
												<textarea
													value={EditReviewContent}
													onChange={(e) => {
														setEditReviewContent(e.target.value);
													}}
												></textarea>
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
											{/* <img src={`${process.env.PUBLIC_URL}/image/${review.profileImg}`} alt='' /> */}
										</div>
										<div className='info-box'>
											<p className='user'>{review.writer.displayName}</p>
											<p>{review.createdAt}</p>
											<p>{review.updatedAt} [마지막 수정 날짜]</p>
										</div>
									</div>

									{/* 내가 작성한 게시물에서만 노출 */}
									{review.writer.uid === user.uid && (
										<>
											{review.reviewNum === UpdateIdx ? (
												<>
													{/* 수정모드 */}
													<div className='btn-wrap'>
														<button type='button' onClick={disableUpdate}>
															CANCEL
														</button>
														<button type='button' className='btn-update' onClick={() => updateReview(review.reviewNum)}>
															UPDATE
														</button>
													</div>
												</>
											) : (
												<>
													{/* 출력모드 */}
													<div className='btn-wrap'>
														<button type='button' onClick={() => enableUpdate(review.reviewNum)}>
															EDIT
														</button>
														<button type='button' className='btn-delete' onClick={() => deleteReview(review.reviewNum)}>
															DELETE
														</button>
													</div>
												</>
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
