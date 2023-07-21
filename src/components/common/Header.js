import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { toggle } from '../../redux/menuSlice';

function Header({ type }) {
	const activeClass = 'on';
	const dispatch = useDispatch();

	return (
		<header id='header' className={type}>
			<div className='inner-header'>
				<h1>
					<Link to='/'>BOOKS.</Link>
				</h1>

				<ul className='gnb'>
					<li>
						<NavLink to='/members' activeClassName={activeClass}>
							MEMBERS
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeClassName={activeClass}>
							GALLRY
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeClassName={activeClass}>
							YOUTUBE
						</NavLink>
					</li>
					<li>
						<NavLink to='/review' activeClassName={activeClass}>
							REVIEW
						</NavLink>
					</li>
					<li>
						<NavLink to='/contact' activeClassName={activeClass}>
							CONTACT
						</NavLink>
					</li>
				</ul>

				<div className='login-wrap'>
					<NavLink to='/'>SIGN IN</NavLink>
					<NavLink to='/signup'>SIGN UP</NavLink>
				</div>

				{/* 모바일 메뉴 버튼 */}
				<button
					type='button'
					className='btn-menu'
					onClick={() => {
						dispatch(toggle());
					}}
				>
					<FontAwesomeIcon icon={faBars} />
				</button>
			</div>
		</header>
	);
}

export default Header;
