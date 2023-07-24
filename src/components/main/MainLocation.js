import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function MainLocation() {
	const libraryList = useSelector((store) => store.location.data.slice(1, 3));

	return (
		<section id='main-location' className='my-scroll'>
			<div className='inner-container'>
				<div className='title-wrap'>
					<h1>Freight Company With a Difference.</h1>
					<a href='location.html' className='btn-more'>
						VIEW ALL
					</a>
				</div>

				<div className='company-wrap'>
					{libraryList.map((item, idx) => {
						return (
							<article key={idx}>
								<div className='img-box'>
									<img src={`${process.env.PUBLIC_URL}/image/${item.thumbnailSrc}`} alt='' />
								</div>
								<div className='info-box'>
									<h2>{item.title}</h2>
									<p>{item.description}</p>

									<a href='location.html?library=1'>
										<FontAwesomeIcon icon={faCircleChevronRight} />
									</a>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default MainLocation;
