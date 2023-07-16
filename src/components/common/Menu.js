import { useState, forwardRef, useImperativeHandle } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Menu = forwardRef((props, ref) => {
	const activeClass = 'on';
	const [IsOpen, setIsOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setIsOpen(!IsOpen) };
	});

	return (
		<>
			{IsOpen && (
				<nav className='mobile-menu'>
					<div className='inner-menu'>
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
					</div>
				</nav>
			)}
		</>
	);
});

export default Menu;
