import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

function MainLocation() {
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
					<article>
						<div className='img-box'>
							<img src='img/example_library2.jpg' alt='' />
						</div>
						<div className='info-box'>
							<h2>남산 도서관</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, facere minima asperiores perspiciatis
								dolorum quis.
							</p>

							<a href='location.html?library=1'>
								<FontAwesomeIcon icon={faCircleChevronRight} />
							</a>
						</div>
					</article>

					<article>
						<div className='img-box'>
							<img src='img/example_library3.jpg' alt='' />
						</div>
						<div className='info-box'>
							<h2>별마당 도서관</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, facere minima asperiores perspiciatis
								dolorum quis.
							</p>

							<a href='location.html?library=2'>
								<FontAwesomeIcon icon={faCircleChevronRight} />
							</a>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}

export default MainLocation;
