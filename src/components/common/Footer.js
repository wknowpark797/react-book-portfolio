import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
	return (
		<footer id='footer'>
			<div className='inner-footer'>
				<div className='top'>
					<h1>
						<Link to='/'>BOOKS.</Link>
					</h1>

					<div className='sns-wrap'>
						<NavLink to=''>
							<FontAwesomeIcon icon={faFacebookF} />
						</NavLink>
						<NavLink to=''>
							<FontAwesomeIcon icon={faTwitter} />
						</NavLink>
						<NavLink to=''>
							<FontAwesomeIcon icon={faInstagram} />
						</NavLink>
					</div>
				</div>

				<div className='bottom'>
					<ul className='gnb'>
						<li>
							<NavLink to='/members'>MEMBERS</NavLink>
						</li>
						<li>
							<NavLink to='/gallery'>GALLRY</NavLink>
						</li>
						<li>
							<NavLink to='/youtube'>YOUTUBE</NavLink>
						</li>
						<li>
							<NavLink to='/comment'>COMMENT</NavLink>
						</li>
						<li>
							<NavLink to='/location'>LOCATION</NavLink>
						</li>
					</ul>

					<p>
						&copy; 2023 All rights reserved. <span>Lorem Ipsum Books.</span>
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
