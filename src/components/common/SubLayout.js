/* 서브 페이지 공통 레이아웃 */

import { Fragment, useEffect, useRef } from 'react';

function SubLayout({ subPageName, breadCrumb, subPageTitle, children }) {
	const subFrame = useRef(null);

	useEffect(() => {
		subFrame.current.classList.add('on');
	}, []);

	return (
		<section className={`sub-content ${subPageName}`} ref={subFrame}>
			<div className='sub-visual'>
				<figure></figure>

				<div className='title-wrap'>
					<p className='bread-crumb'>{breadCrumb}</p>
					<h1>
						{subPageTitle.split('-').map((el, idx) => {
							return (
								<Fragment key={idx}>
									{el}
									<br />
								</Fragment>
							);
						})}
					</h1>
				</div>
			</div>

			<div className='sub-inner'>{children}</div>
		</section>
	);
}

export default SubLayout;
