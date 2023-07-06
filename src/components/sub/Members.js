import SubLayout from '../common/SubLayout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { faGooglePlay, faGoogleWallet, faGooglePlusG, faGooglePay, faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons';

function Members() {
	const [Members, setMembers] = useState([]);
	const [Directors, setDirectors] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/members.json`).then((data) => {
			setMembers(data.data.members);
			setDirectors(data.data.directors);
		});
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
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus saepe iure aspernatur dicta repellendus cum nihil aliquid, minus quod! Maxime.</p>

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
					<ul className='swiper-wrapper'>
						<li className='swiper-slide' data-key='developer'>
							DEVELOPERS
						</li>
						<li className='swiper-slide' data-key='designer'>
							DESIGNERS
						</li>
						<li className='swiper-slide' data-key='photographer'>
							PHOTOGRAPHERS
						</li>
						<li className='swiper-slide' data-key='publisher'>
							PUBLISHERS
						</li>
					</ul>
				</div>

				<div className='inner-person'>
					<div className='inner-container'>
						<div className='left'>
							<p>Creative Members</p>
							<h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, dolore dolorem qui expedita voluptas nesciunt!</h2>

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
