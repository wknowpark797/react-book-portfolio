import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Visual() {
	return (
		<section id='main-visual' className='my-scroll on'>
			<div className='bg-wrap'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>

			<div className='slide-wrap mainVisualSwiper'>
				<article id='visualPanel' className='panel swiper-wrapper'>
					<div className='swiper-slide'>
						<div className='detail-wrap'>
							<h1>The Case of the Poisonous Socks</h1>

							<div className='rating-wrap'>
								<div className='star-box'>
									<span className='on'>
										<FontAwesomeIcon icon={faStar} />
									</span>
									<span className='on'>
										<FontAwesomeIcon icon={faStar} />
									</span>
									<span className='on'>
										<FontAwesomeIcon icon={faStar} />
									</span>
									<span>
										<FontAwesomeIcon icon={faStar} />
									</span>
									<span>
										<FontAwesomeIcon icon={faStar} />
									</span>
								</div>
								<p>3.0</p>
							</div>

							<p className='content'>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatem deleniti velit nostrum
								consequuntur in consectetur deserunt vitae libero maiores.
							</p>

							<button type='button' className='btn-more'>
								VIEW DETAIL
							</button>
						</div>

						<div className='ratio-wrap'>
							<div className='double-wrap'>
								<div className='img-box origin'>
									<img src='img/example_book1.jpg' alt='' />
								</div>

								<div className='img-box shadow'>
									<img src='img/example_book1.jpg' alt='' />
								</div>
							</div>
						</div>
					</div>
				</article>

				<div className='indicator'>
					<div className='current-number'>
						<span>01</span> / 05
					</div>

					<div className='btn-arrow'>
						<button type='button' id='btnPrevVisual'>
							<FontAwesomeIcon icon={faArrowLeft} />
						</button>
						<button type='button' id='btnNextVisual'>
							<FontAwesomeIcon icon={faArrowRight} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Visual;
