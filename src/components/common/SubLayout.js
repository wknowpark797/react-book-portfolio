/* 서브 페이지 공통 레이아웃 */

function SubLayout({ subPageName, breadCrumb, subPageTitle, children }) {
	return (
		<section className={`sub-content ${subPageName}`}>
			<div className='sub-visual'>
				<figure></figure>

				<div className='title-wrap'>
					<p className='bread-crumb'>{breadCrumb}</p>
					<h1>{subPageTitle}</h1>
				</div>
			</div>

			{children}
		</section>
	);
}

export default SubLayout;
