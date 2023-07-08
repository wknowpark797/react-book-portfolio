import SubLayout from '../common/SubLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-component';

function Gallery() {
	const frame = useRef(null);
	const btnSet = useRef(null);
	const [Loader, setLoader] = useState(true);
	const [Items, setItems] = useState([]);

	const getData = async (options) => {
		// Flickr 데이터 호출
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '7f259a4112d06fbef0736c84af20f014';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		const num = 10;
		let url = '';

		if (options.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (options.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${options.tags}`;
		if (options.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${options.user}`;

		const result = await axios.get(url);
		setItems(result.data.photos.photo);

		// 데이터 로딩 처리
		let counter = 0;

		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img) => {
			img.onload = () => {
				++counter;

				if (counter === imgs.length) {
					setLoader(false);
					frame.current.classList.add('on');
				}
			};
		});
	};

	// 갤러리 초기화 함수
	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		setLoader(true);
		frame.current.classList.remove('on');
	};

	const showInterest = (e) => {
		resetGallery(e);
		getData({ type: 'interest' });
	};

	const showUser = (e) => {
		resetGallery(e);
		getData({ type: 'user', user: '198471371@N05' });
	};

	useEffect(() => {
		getData({ type: 'interest' });
	}, []);

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

					<div className='btn-option' ref={btnSet}>
						<button type='button' className='option-interest on' onClick={showInterest}>
							Interest
						</button>
						<button type='button' className='option-mine' onClick={showUser}>
							Mine
						</button>
					</div>
				</div>
			</div>

			{Loader && <div className='loading-wrap'>LOADING...</div>}

			<div className='pictures-wrap'>
				<div className='inner-container' ref={frame}>
					<Masonry elementType={'ul'} options={{ transitionDuration: '0.5s' }} id='galleryWrap'>
						{Items.map((item, idx) => {
							return (
								<li className='item' key={idx}>
									<div>
										<div className='img-box'>
											<img
												className='picture'
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title}
											/>
										</div>

										<div className='info-wrap'>
											<div className='profile-wrap'>
												<img
													className='profile-img'
													src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
													alt={item.owner}
													onError={(e) => {
														e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
													}}
												/>
												<p className='profile-user'>{item.owner}</p>
											</div>
											<h3>{item.title}</h3>
										</div>
									</div>
								</li>
							);
						})}
					</Masonry>
				</div>
			</div>
		</SubLayout>
	);
}

export default Gallery;
