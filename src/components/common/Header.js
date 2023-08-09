import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useGlobalData } from '../../hooks/useGlobalContext';
import firebase from '../../firebase';

function Header({ type }) {
	const activeClass = 'on';
	const { MenuOpen, setMenuOpen, Uid, DisplayName } = useGlobalData();

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
					{Uid === '' ? (
						<>
							<NavLink to='/signin' activeClassName={activeClass}>
								SIGN IN
							</NavLink>
							<NavLink to='/signup' activeClassName={activeClass}>
								SIGN UP
							</NavLink>
						</>
					) : (
						<>
							<div className='profile'>{DisplayName && DisplayName[0].toUpperCase()}</div>
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
						setMenuOpen(!MenuOpen);
					}}
				>
					<FontAwesomeIcon icon={faBars} />
				</button>
			</div>
		</header>
	);
}

export default Header;
