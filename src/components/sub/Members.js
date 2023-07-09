import SubLayout from '../common/SubLayout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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

function Members() {
	const swiperFrame = useRef(null);
	const [Members, setMembers] = useState([]);
	const [Directors, setDirectors] = useState([]);
	const [Slides, setSlides] = useState(null);
	const [Active, setActive] = useState(0);

	const getMembersData = async () => {
		const items = swiperFrame.current.querySelectorAll('.swiper-slide');
		const key = items[Active].dataset.key;

		const result = await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
		setMembers(result.data.members.filter((member) => member.department === key));
	};

	const getDirectorsData = async () => {
		const result = await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
		setDirectors(result.data.directors);
	};

	useEffect(() => {
		getMembersData();
	}, [Active]);

	useEffect(() => {
		getDirectorsData();
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

							<Link to='' className='btn-more'>
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
