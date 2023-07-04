import SubLayout from '../common/SubLayout';

function Review() {
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
							<input type='text' id='bookname' placeholder='도서명을 입력하세요.' />
						</div>

						<div className='input-box'>
							<label htmlFor='reviewcontent' className='tit'>
								Review Content
							</label>
							<textarea id='reviewcontent' placeholder='리뷰 내용을 작성해주세요.'></textarea>
						</div>

						<div className='btn-wrap'>
							<button type='button'>RESET</button>
							<button type='button' className='btn-write'>
								WRITE
							</button>
						</div>
					</div>

					{/* review list */}
					<div className='show-wrap'>
						<article>
							<h2>일상의 빈칸</h2>

							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet accusamus sunt illo amet mollitia numquam quidem dolor. Fugit, tempora optio.</p>

							<div className='info-wrap'>
								<div className='profile-box'>
									<img src='' alt='' />
								</div>

								<div className='info-box'>
									<p className='user'>작성자</p>
									<p>2023.07.04</p>
								</div>
							</div>

							{/* 나의 게시물에서만 노출 */}
							<div className='btn-wrap'>
								<button type='button'>EDIT</button>
								<button type='button' className='btn-delete'>
									DELETE
								</button>
							</div>
						</article>
					</div>
				</div>
			</div>
		</SubLayout>
	);
}

export default Review;
