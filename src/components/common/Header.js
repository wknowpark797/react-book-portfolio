import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../../redux/menuSlice';
import firebase from '../../firebase';

function Header({ type }) {
	const activeClass = 'on';

	const user = useSelector((store) => store.user);
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
					{user.uid === '' ? (
						<>
							<NavLink to='/signin'>SIGN IN</NavLink>
							<NavLink to='/signup'>SIGN UP</NavLink>
						</>
					) : (
						<>
							<div className='profile'>{user.displayName && user.displayName[0].toUpperCase()}</div>
							<button
								type='button'
								onClick={() => {
									firebase.auth().signOut();
									alert('로그아웃 되었습니다.');
								}}
							>
								SIGN OUT
							</button>
						</>
					)}
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
