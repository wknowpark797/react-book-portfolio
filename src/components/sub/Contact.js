import SubLayout from '../common/SubLayout';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';

function Contact() {
	const { kakao } = window;
	const mapContainer = useRef(null);
	const [Map, setMap] = useState(null); // 지도 인스턴스
	const [Index, setIndex] = useState(0); // 선택된 도서관 index
	const [Traffic, setTraffic] = useState(false);
	const markerInfo = useSelector((store) => store.location.data);

	const marker = useMemo(() => {
		return new kakao.maps.Marker({
			position: new kakao.maps.LatLng(markerInfo[Index].position[0], markerInfo[Index].position[1]),
			image: new kakao.maps.MarkerImage(
				`${process.env.PUBLIC_URL}/image/${markerInfo[Index].imgSrc}`,
				new kakao.maps.Size(markerInfo[Index].imgSize[0], markerInfo[Index].imgSize[1]),
				{
					offset: new kakao.maps.Point(markerInfo[Index].imgOption.offset[0], markerInfo[Index].imgOption.offset[1]),
				}
			),
		});
	}, [Index, kakao, markerInfo]);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

	useEffect(() => {
		mapContainer.current.innerHTML = ''; // 지도 초기화

		const map = new kakao.maps.Map(mapContainer.current, {
			center: new kakao.maps.LatLng(markerInfo[Index].position[0], markerInfo[Index].position[1]),
			level: 3,
		}); // 지도 인스턴스 생성
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
	}, [Index, kakao, marker, markerInfo]);

	useEffect(() => {
		// 교통정보 표시
		Traffic
			? Map?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Map?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, Map, kakao]);

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
