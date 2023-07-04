import SubLayout from '../common/SubLayout';

function Review() {
	return (
		<SubLayout subPageName={'sub-review'} breadCrumb={'HOME / REVIEW'} subPageTitle={['EXPERIENCES', <br />, 'FOR BOOK']}>
			<div className='review-wrap'>
				<div className='inner-container'>
					<div className='input-wrap'>
						{/* book name */}
						<div className='input-box'>
							<label htmlFor='bookname' className='tit'>
								Book Name
							</label>
							<input type='text' id='bookname' placeholder='도서명을 입력하세요.' />
						</div>

						{/* review content */}
						<div className='input-box'>
							<label htmlFor='bookreview' className='tit'>
								Review Content
							</label>
							<textarea id='bookreview' placeholder='리뷰 내용을 작성해주세요.'></textarea>
						</div>

						<div className='btn-wrap'>
							<button type='button'>RESET</button>
							<button type='button' className='btn-write'>
								WRITE
							</button>
						</div>
					</div>

					<div className='show-wrap'>
						<article>
							<h2>일상의 빈칸</h2>

							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet accusamus sunt illo amet mollitia numquam quidem dolor. Fugit, tempora optio.</p>

							<div className='info-box'>
								<div class='profile-box'>
									<img src='' alt='' />
								</div>

								<div>
									<p className='user'>작성자</p>
									<p>2023.07.04</p>
								</div>
							</div>

							<div className='btn-wrap'>
								<button type='button'>EDIT</button>
								<button type='button' className='btn-delete'>
									DELETE
								</button>
							</div>
						</article>
						<article>
							<h2>일상의 빈칸</h2>

							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur mollitia suscipit illo eos reprehenderit repudiandae.</p>

							<div className='info-box'>
								<div class='profile-box'>
									<img src='' alt='' />
								</div>

								<div>
									<p className='user'>작성자</p>
									<p>2023.07.04</p>
								</div>
							</div>
						</article>
					</div>
				</div>
			</div>
		</SubLayout>
	);
}

export default Review;
