import SubLayout from '../common/SubLayout';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faFacebookF } from '@fortawesome/free-brands-svg-icons';

function Contact() {
	return (
		<SubLayout subPageName={'sub-contact'} breadCrumb={'HOME / CONTACT'} subPageTitle={['WHERE', <br />, 'WE ARE']}>
			<div className='library-wrap'>
				<div className='inner-container'>
					<div className='map-wrap'>
						<div id='map'></div>

						<ul className='list-branch'>
							<li className='on'>국회도서관</li>
							<li>남산도서관</li>
							<li>별마당 도서관</li>
							<li>국립중앙도서관</li>
						</ul>

						<button type='button' className='btn-traffic'>
							교통정보 OFF
						</button>
					</div>

					<div className='library-info'>
						<div id='infoWrap' className='inner-box'>
							<h2>국회도서관</h2>
							<ul>
								<li>
									<FontAwesomeIcon icon={faLocationDot} />
									<p>서울특별시 영등포구 의사당대로 1</p>
								</li>
								<li>
									<FontAwesomeIcon icon={faGlobe} />
									<p>
										<Link to='https://www.nanet.go.kr/main.do' target='_blank'>
											nanet.go.kr
										</Link>
									</p>
								</li>
								<li>
									<FontAwesomeIcon icon={faPhone} />
									<p>02-6788-4211</p>
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
