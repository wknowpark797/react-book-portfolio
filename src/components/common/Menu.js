import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = forwardRef((props, ref) => {
	const activeClass = 'on';
	const [IsOpen, setIsOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setIsOpen(!IsOpen) };
	});

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 999) setIsOpen(false);
		});
	}, []);

	useEffect(() => {
		IsOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [IsOpen]);

	return (
		<AnimatePresence>
			{IsOpen && (
				<motion.nav
					className='mobile-menu'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.2 } }}
					exit={{ opacity: 0, transition: { duration: 0.2 } }}
				>
					<motion.div
						className='inner-menu'
						initial={{ opacity: 0, x: '70%' }}
						animate={{ opacity: 1, x: '0', transition: { duration: 0.3, delay: 0.2 } }}
						exit={{ opacity: 0, x: '70%', transition: { duration: 0.3, delay: 0 } }}
					>
						<button type='button' className='menu-close' onClick={() => setIsOpen(false)}>
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
							<NavLink to='/signin' activeClassName={activeClass}>
								SIGN IN
							</NavLink>
							<NavLink to='/signup' activeClassName={activeClass}>
								SIGN UP
							</NavLink>
						</div>
					</motion.div>
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
