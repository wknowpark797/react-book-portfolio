import SubLayout from '../common/SubLayout';
import Modal from '../common/Modal';
import Masonry from 'react-masonry-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import loaderLottie from '../../asset/lottie/loaderLottie.json';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlickr } from '../../redux/flickrSlice';

function Gallery() {
	const frame = useRef(null);
	const btnSet = useRef(null);
	const btnActive = useRef(0);
	const searchInput = useRef(null);
	const enableEvent = useRef(true); // 재이벤트 방지
	const enableUser = useRef(true); // 프로필 데이터 재호출 방지
	const firstLoaded = useRef(true);
	const [Loader, setLoader] = useState(true);
	const modal = useRef(null);
	const [ModalIndex, setModalIndex] = useState(0);

	const dispatch = useDispatch();
	const Items = useSelector((store) => store.flickr.data);

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

	// Interest 갤러리 호출 함수
	const showInterest = (e, index) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		btnActive.current = index;
		resetGallery();
		dispatch(fetchFlickr({ type: 'interest' }));

		enableUser.current = true;
	};

	// My 갤러리 호출 함수
	const showUser = (e, index) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		btnActive.current = index;
		resetGallery();
		dispatch(fetchFlickr({ type: 'user', user: '198471371@N05' }));

		enableUser.current = false;
	};

	// 특정 사용자 갤러리 호출 함수
	const showProfile = (userid) => {
		if (!enableEvent.current) return;
		if (!enableUser.current) return;

		btnActive.current = -1;
		resetGallery();
		dispatch(fetchFlickr({ type: 'user', user: userid }));

		enableUser.current = false;
	};

	// 검색어 갤러리 호출 함수
	const showSearch = () => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		btnActive.current = -1;
		resetGallery();
		dispatch(fetchFlickr({ type: 'search', tags: tag }));
		searchInput.current.value = '';

		enableUser.current = true;
	};

	useEffect(() => {
		// 호출 데이터 유무 체크
		if (Items.length === 0 && !firstLoaded.current) {
			setLoader(false);
			frame.current.classList.add('on');
			enableEvent.current = true;
			btnActive.current = -1;

			const btns = btnSet.current.querySelectorAll('button');
			btns.forEach((btn) => btn.classList.remove('on'));
			return;
		}
		firstLoaded.current = false;

		dataLoading();
	}, [Items]);

	useEffect(() => {
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
							<button type='button' className='option-interest on' onClick={(e) => showInterest(e, 0)}>
								Interest
							</button>
							<button type='button' className='option-mine' onClick={(e) => showUser(e, 1)}>
								Book
							</button>
						</div>
					</div>
				</div>

				{Loader && (
					<div className='loading-wrap'>
						<Lottie animationData={loaderLottie} className='lottie-wrap' />
						<p>LOADING...</p>
					</div>
				)}

				<div className='pictures-wrap'>
					<div className='inner-container' ref={frame}>
						{Items.length > 0 ? (
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
						) : (
							<p className='no-items'>해당 이미지가 없습니다.</p>
						)}
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
