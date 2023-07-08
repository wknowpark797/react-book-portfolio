import SubLayout from '../common/SubLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Gallery() {
	return (
		<SubLayout subPageName={'sub-gallery'} breadCrumb={'HOME / GALLERY'} subPageTitle={'PHOTOS-FOR BOOK'}>
			<div className='search-wrap'>
				<div className='inner-container'>
					<div className='search-box'>
						<input type='text' id='search' placeholder='검색어를 입력해주세요.' />
						<button type='button' className='btn-search'>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</button>
					</div>

					<div className='btn-option'>
						<button type='button' className='option-interest'>
							Interest
						</button>
						<button type='button' className='option-mine'>
							Mine
						</button>
					</div>
				</div>
			</div>

			{/* <div className='loading-wrap'>LOADING...</div> */}

			<div className='pictures-wrap'>
				<div className='inner-container'>
					<ul id='galleryWrap'>
						<li className='item'>
							<div>
								<div className='img-box'>
									<img className='picture' src='' alt='' />
								</div>

								<div className='info-wrap'>
									<div className='profile-wrap'>
										<img className='profile-img' src='' alt='' />
										<p className='profile-user'>User Name</p>
									</div>
									<h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, maiores!</h3>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</SubLayout>
	);
}

export default Gallery;
