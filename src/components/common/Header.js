import { Link, NavLink } from 'react-router-dom';

function Header({ type }) {
	const activeClass = 'on';

	return (
		<header className={type}>
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
					<NavLink to='/comment' activeClassName={activeClass}>
						COMMENT
					</NavLink>
				</li>
				<li>
					<NavLink to='/location' activeClassName={activeClass}>
						LOCATION
					</NavLink>
				</li>
			</ul>

			<div className='login-wrap'>
				<NavLink to='/'>SIGN IN</NavLink>
				<NavLink to='/signup'>SIGN UP</NavLink>
			</div>
		</header>
	);
}

export default Header;
