import SubLayout from '../common/SubLayout';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect, useRef } from 'react';

function Contact() {
	const { kakao } = window;
	const mapContainer = useRef(null);
	const [Map, setMap] = useState(null); // 지도 인스턴스
	const [Index, setIndex] = useState(0); // 선택된 도서관 index
	const [Traffic, setTraffic] = useState(false);

	const markerInfo = [
		{
			title: '국회도서관',
			address: '서울특별시 영등포구 의사당대로 1',
			website: {
				title: 'nanet.go.kr',
				link: 'https://www.nanet.go.kr/main.do',
			},
			phone: '02-6788-4211',
			position: new kakao.maps.LatLng(37.531117, 126.917035),
			imgSrc: `${process.env.PUBLIC_URL}/image/location-pin.png`,
			imgSize: new kakao.maps.Size(50, 50),
			imgOption: { offset: new kakao.maps.Point(25, 50) },
		},
		{
			title: '남산도서관',
			address: '서울특별시 용산구 소월로 109',
			website: {
				title: 'nslib.sen.go.kr',
				link: 'http://nslib.sen.go.kr/nslib_index.jsp',
			},
			phone: '02-754-7338',
			position: new kakao.maps.LatLng(37.552923, 126.981457),
			imgSrc: `${process.env.PUBLIC_URL}/image/location-pin.png`,
			imgSize: new kakao.maps.Size(50, 50),
			imgOption: { offset: new kakao.maps.Point(25, 50) },
		},
		{
			title: '별마당 도서관',
			address: '서울특별시 강남구 영동대로 513 스타필드 코엑스몰 B1',
			website: {
				title: 'starfield.co.kr',
				link: 'https://www.starfield.co.kr/coexmall/starfieldLibrary/library.do',
			},
			phone: '02-6002-3031',
			position: new kakao.maps.LatLng(37.50999, 127.059986),
			imgSrc: `${process.env.PUBLIC_URL}/image/location-pin.png`,
			imgSize: new kakao.maps.Size(50, 50),
			imgOption: { offset: new kakao.maps.Point(25, 50) },
		},
		{
			title: '국립중앙도서관',
			address: '서울특별시 서초구 반포대로 201',
			website: {
				title: 'nl.go.kr',
				link: 'https://www.nl.go.kr/',
			},
			phone: '02-535-4142',
			position: new kakao.maps.LatLng(37.497669, 127.002837),
			imgSrc: `${process.env.PUBLIC_URL}/image/location-pin.png`,
			imgSize: new kakao.maps.Size(50, 50),
			imgOption: { offset: new kakao.maps.Point(25, 50) },
		},
	];

	const mapOption = { center: markerInfo[Index].position, level: 3 };
	const imageSrc = markerInfo[Index].imgSrc;
	const imageSize = markerInfo[Index].imgSize;
	const imageOption = markerInfo[Index].imgOption;
	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
	const marker = new kakao.maps.Marker({ position: mapOption.center, image: markerImage });

	useEffect(() => {
		mapContainer.current.innerHTML = ''; // 지도 초기화

		const map = new kakao.maps.Map(mapContainer.current, mapOption); // 지도 인스턴스 생성
		marker.setMap(map); // 마커 표시
		map.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT); // 지도타입 컨트롤 표시
		map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT); // 확대 축소 컨트롤 표시
		map.setZoomable(false); // 마우스 휠 기능 비활성화

		setMap(map);

		// 지도 중심 이동 설정
		const setCenter = () => {
			map.setCenter(markerInfo[Index].position);
		};
		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	useEffect(() => {
		// 교통정보 표시
		Traffic ? Map?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : Map?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<SubLayout subPageName={'sub-contact'} breadCrumb={'HOME / CONTACT'} subPageTitle={'WHERE-WE ARE'}>
			<div className='library-wrap'>
				<div className='inner-container'>
					<div className='map-wrap'>
						<div ref={mapContainer} id='map'></div>

						<ul className='list-branch'>
							{markerInfo.map((item, idx) => {
								return (
									<li key={idx} onClick={() => setIndex(idx)} className={Index === idx ? 'on' : ''}>
										{item.title}
									</li>
								);
							})}
						</ul>

						<button type='button' className='btn-traffic' onClick={() => setTraffic(!Traffic)}>
							{Traffic ? '교통정보 ON' : '교통정보 OFF'}
						</button>
					</div>

					<div className='library-info'>
						<div id='infoWrap' className='inner-box'>
							<h2>{markerInfo[Index].title}</h2>
							<ul>
								<li>
									<FontAwesomeIcon icon={faLocationDot} />
									<p>{markerInfo[Index].address}</p>
								</li>
								<li>
									<FontAwesomeIcon icon={faGlobe} />
									<p>
										<a rel='noopener noreferrer' href={markerInfo[Index].website.link} target='_blank'>
											{markerInfo[Index].website.title}
										</a>
									</p>
								</li>
								<li>
									<FontAwesomeIcon icon={faPhone} />
									<p>{markerInfo[Index].phone}</p>
								</li>
							</ul>
							<div className='sns-wrap'>
								<Link to='#'>
									<FontAwesomeIcon icon={faInstagram} />
								</Link>
								<Link to='#'>
									<FontAwesomeIcon icon={faYoutube} />
								</Link>
								<Link to='#'>
									<FontAwesomeIcon icon={faFacebookF} />
								</Link>
							</div>
						</div>

						<div className='contact-wrap'>
							<h2>Contact Us.</h2>
							<ContactForm />
						</div>
					</div>
				</div>
			</div>
		</SubLayout>
	);
}

export default Contact;
