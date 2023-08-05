import SubLayout from '../common/SubLayout';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import {
	faGooglePlay,
	faGoogleWallet,
	faGooglePlusG,
	faGooglePay,
	faGoogleDrive,
} from '@fortawesome/free-brands-svg-icons';
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useMemberQuery } from '../../hooks/useMemberQuery';

function Members() {
	const swiperFrame = useRef(null);
	const [Slides, setSlides] = useState(null);
	const [Active, setActive] = useState(0);
	const [Members, setMembers] = useState([]);
	const [Directors, setDirectors] = useState([]);

	const { data: memberList, isSuccess } = useMemberQuery();

	const getMembersData = useCallback(() => {
		if (!isSuccess) return;
		const items = swiperFrame.current.querySelectorAll('.swiper-slide');
		const key = items[Active].dataset.key;
		setMembers(memberList.members.filter((member) => member.department === key));
	}, [Active, memberList, isSuccess]);

	const getDirectorsData = useCallback(() => {
		if (!isSuccess) return;
		setDirectors(memberList.directors);
	}, [memberList, isSuccess]);

	useEffect(() => {
		if (isSuccess && memberList.length === 0) return;
		getMembersData();
		getDirectorsData();
	}, [memberList, getMembersData, getDirectorsData, isSuccess]);

	useEffect(() => {
		if (isSuccess && memberList.length === 0) return;
		getMembersData();
	}, [Active, getMembersData, memberList, isSuccess]);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

	return (
		<SubLayout subPageName={'members'} breadCrumb={'HOME / MEMBERS'} subPageTitle={'WHO-WE ARE'}>
			<div className='intro-wrap'>
				<div id='directorsWrap' className='img-wrap'>
					{Directors.map((director, idx) => {
						return (
							<article key={idx}>
								<div className='img-box'>
									<img src={`${process.env.PUBLIC_URL}/image/members/${director.pic}`} alt='' />
								</div>
								<div className='info-box'>
									<p className='name'>{director.name}</p>
									<p>{director.position}</p>
								</div>
							</article>
						);
					})}
				</div>

				<div className='inner-wrap'>
					<h2>Creative Directors</h2>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus saepe iure aspernatur dicta repellendus cum
						nihil aliquid, minus quod! Maxime.
					</p>

					<ul>
						<li>
							<h3>Lorem ipsum dolor sit.</h3>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, dolore?</p>
						</li>
						<li>
							<h3>Lorem ipsum dolor sit.</h3>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, dolore?</p>
						</li>
					</ul>
				</div>
			</div>

			<div className='intro-person'>
				<div className='tab membersSwiper'>
					<Swiper
						ref={swiperFrame}
						slidesPerView={'auto'}
						spaceBetween={30}
						centeredSlides={true}
						onSwiper={(swiper) => setSlides(swiper)}
						onSlideChange={(e) => setActive(e.activeIndex)}
						onClick={(e) => Slides.slideTo(e.clickedIndex)}
					>
						<SwiperSlide data-key='developer'>DEVELOPERS</SwiperSlide>
						<SwiperSlide data-key='designer'>DESIGNERS</SwiperSlide>
						<SwiperSlide data-key='photographer'>PHOTOGRAPHERS</SwiperSlide>
						<SwiperSlide data-key='publisher'>PUBLISHERS</SwiperSlide>
					</Swiper>
				</div>

				<div className='inner-person'>
					<div className='inner-container'>
						<div className='left'>
							<p>Creative Members</p>
							<h2>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, dolore dolorem qui expedita voluptas
								nesciunt!
							</h2>

							<Link to='/contact' className='btn-more'>
								<FontAwesomeIcon icon={faCirclePlay} />
								MORE VIEW
							</Link>
						</div>

						<div id='membersWrap' className='person-wrap'>
							{Members.map((member, idx) => {
								return (
									<article key={idx}>
										<div className='img-box'>
											<img src={`${process.env.PUBLIC_URL}/image/members/${member.pic}`} alt='' />
										</div>
										<div className='info-box'>
											<p className='name'>{member.name}</p>
											<p>{member.position}</p>
										</div>
									</article>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div className='company-wrap'>
				<div className='inner-container'>
					<ul>
						<li>
							<FontAwesomeIcon icon={faGooglePlay} />
						</li>
						<li>
							<FontAwesomeIcon icon={faGoogleWallet} />
						</li>
						<li>
							<FontAwesomeIcon icon={faGooglePlusG} />
						</li>
						<li>
							<FontAwesomeIcon icon={faGooglePay} />
						</li>
						<li>
							<FontAwesomeIcon icon={faGoogleDrive} />
						</li>
						<li>
							<FontAwesomeIcon icon={faVrCardboard} />
						</li>
					</ul>
				</div>
			</div>
		</SubLayout>
	);
}

export default Members;
