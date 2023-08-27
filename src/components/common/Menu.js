import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../firebase';
import * as types from '../../redux/actionType';

function Menu() {
	const activeClass = 'on';

	const dispatch = useDispatch();
	const MenuOpen = useSelector((store) => store.menuOpenReducer.menuOpen);
	const Uid = useSelector((store) => store.userInfoReducer.userInfo.Uid);
	const DisplayName = useSelector((store) => store.userInfoReducer.userInfo.DisplayName);

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 999) dispatch(types.setMenuOpen(false));
		});
	}, [dispatch]);

	useEffect(() => {
		MenuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [MenuOpen]);

	return (
		<AnimatePresence>
			{MenuOpen && (
				<motion.nav
					className='mobile-menu'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.2 } }}
					exit={{ opacity: 0, transition: { duration: 0.2 } }}
					onClick={() => {
						dispatch(types.setMenuOpen(false));
					}}
				>
					<motion.div
						className='inner-menu'
						initial={{ opacity: 0, x: '70%' }}
						animate={{ opacity: 1, x: '0', transition: { duration: 0.3, delay: 0.2 } }}
						exit={{ opacity: 0, x: '70%', transition: { duration: 0.3, delay: 0 } }}
					>
						<button
							type='button'
							className='menu-close'
							onClick={() => {
								dispatch(types.setMenuOpen(false));
							}}
						>
							close
						</button>

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
									<div className='profile-wrap'>
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
									</div>
								</>
							)}
						</div>
					</motion.div>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;
