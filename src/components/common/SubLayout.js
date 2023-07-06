/* 서브 페이지 공통 레이아웃 */

import { Fragment } from 'react';

function SubLayout({ subPageName, breadCrumb, subPageTitle, children }) {
	return (
		<section className={`sub-content ${subPageName}`}>
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

			{children}
		</section>
	);
}

export default SubLayout;
