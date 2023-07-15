import SubLayout from '../common/SubLayout';
import Modal from '../common/Modal';
import Masonry from 'react-masonry-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function Gallery() {
	const frame = useRef(null);
	const btnSet = useRef(null);
	const btnActive = useRef(0);
	const searchInput = useRef(null);
	const enableEvent = useRef(true); // 재이벤트 방지
	const enableUser = useRef(true); // 프로필 데이터 재호출 방지
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true);

	const modal = useRef(null);
	const [ModalIndex, setModalIndex] = useState(0);

	// flickr API 호출 함수
	const getData = async (options) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '7f259a4112d06fbef0736c84af20f014';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		const num = 30;
		let url = '';

		if (options.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (options.type === 'search')
			url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${options.tags}`;
		if (options.type === 'user')
			url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${options.user}`;

		const result = await axios.get(url);
		getDataCheck(result.data.photos.photo);
		dataLoading();
	};

	// 호출 데이터 체크 함수
	const getDataCheck = (data) => {
		if (data.length === 0) {
			setLoader(false);
			frame.current.classList.add('on');
			enableEvent.current = true;

			const btns = btnSet.current.querySelectorAll('button');
			btns.forEach((btn) => btn.classList.remove('on'));
			if (btnActive.current >= 0) btns[btnActive.current].classList.add('on');

			return alert('검색어 결과가 없습니다.');
		}

		setItems(data);
	};

	// 데이터 로딩 처리 함수
	const dataLoading = () => {
		let counter = 0;

		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img) => {
			img.onload = () => {
				++counter;

				if (counter === imgs.length - 2) {
					setLoader(false);
					frame.current.classList.add('on');
					enableEvent.current = true;
				}
			};
		});
	};

	// 갤러리 초기화 함수
	const resetGallery = () => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		if (btnActive.current >= 0) btns[btnActive.current].classList.add('on');

		setLoader(true);
		frame.current.classList.remove('on');
		enableEvent.current = false;
	};

	const showInterest = (e, index) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		btnActive.current = index;
		resetGallery();
		getData({ type: 'interest' });

		enableUser.current = true;
	};

	const showUser = (e, index) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		btnActive.current = index;
		resetGallery();
		getData({ type: 'user', user: '198471371@N05' });

		enableUser.current = false;
	};

	const showProfile = (userid) => {
		if (!enableEvent.current) return;
		if (!enableUser.current) return;

		btnActive.current = -1;
		resetGallery();
		getData({ type: 'user', user: userid });

		enableUser.current = false;
	};

	const showSearch = () => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery();
		getData({ type: 'search', tags: tag });
		searchInput.current.value = '';

		btnActive.current === 0 ? (enableUser.current = true) : (enableUser.current = false);
	};

	useEffect(() => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		btns[0].classList.add('on');

		getData({ type: 'interest' });

		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

	return (
		<>
			<SubLayout subPageName={'sub-gallery'} breadCrumb={'HOME / GALLERY'} subPageTitle={'PHOTOS-FOR BOOK'}>
				<div className='search-wrap'>
					<div className='inner-container'>
						<div className='search-box'>
							<input
								type='text'
								id='search'
								placeholder='검색어를 입력해주세요.'
								ref={searchInput}
								onKeyPress={(e) => {
									e.key === 'Enter' && showSearch();
								}}
							/>
							<button type='button' className='btn-search' onClick={showSearch}>
								<FontAwesomeIcon icon={faMagnifyingGlass} />
							</button>
						</div>

						<div className='btn-option' ref={btnSet}>
							<button type='button' className='option-interest' onClick={(e) => showInterest(e, 0)}>
								Interest
							</button>
							<button type='button' className='option-mine' onClick={(e) => showUser(e, 1)}>
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
											<div
												className='img-box'
												onClick={() => {
													setModalIndex(idx);
													modal.current.open();
												}}
											>
												<img
													className='picture'
													src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
													alt={item.title}
												/>
											</div>

											<div className='info-wrap'>
												<div className='profile-wrap' onClick={() => showProfile(item.owner)}>
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

			<Modal ref={modal}>
				<div className='media-box'>
					<img
						src={`https://live.staticflickr.com/${Items[ModalIndex]?.server}/${Items[ModalIndex]?.id}_${Items[ModalIndex]?.secret}_b.jpg`}
						alt={Items[ModalIndex]?.title}
					/>
				</div>
			</Modal>
		</>
	);
}

export default Gallery;
