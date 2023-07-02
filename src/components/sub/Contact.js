import { Link } from 'react-router-dom';
import SubLayout from '../common/SubLayout';
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

							<form action='' method='get' id='formContact' className='form-contact'>
								<input type='hidden' name='contact_number' />

								<div className='input-box'>
									<label for='username' className='tit'>
										Name
									</label>
									<input type='text' name='username' id='username' placeholder='이름을 입력하세요.' />
								</div>

								<div className='input-box'>
									<label for='email' className='tit'>
										E-mail
									</label>
									<input type='email' name='email' id='email' placeholder='이메일 주소를 입력하세요.' />
								</div>

								<div className='input-box msg-box'>
									<label for='message' className='tit'>
										Message
									</label>
									<textarea name='message' id='message' placeholder='문의사항을 입력하세요.'></textarea>
								</div>

								<div className='btn-wrap'>
									<input type='submit' value='SEND' />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</SubLayout>
	);
}

export default Contact;
