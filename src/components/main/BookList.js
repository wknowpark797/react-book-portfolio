import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function BookList() {
	return (
		<section id='main-book-list' className='my-scroll'>
			<div className='inner-container'>
				<div className='title-wrap'>
					<h1>Best Seller Books.</h1>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, exercitationem.</p>

					<div className='arrow'>
						<button type='button' id='btnPrevBook' className='prev'>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
						<button type='button' id='btnNextBook' className='next'>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div>
				</div>

				<div className='slide-wrap bookListSwiper'>
					<article id='bookListPanel' className='panel swiper-wrapper'>
						<div className='swiper-slide'>
							<div className='ratio-wrap'>
								<div className='img-box'>
									<img src='img/example_book4.jpg' alt='' />
								</div>
							</div>

							<div className='info-box'>
								<h2>Book Name</h2>
								<p>William H. Brock</p>
							</div>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}

export default BookList;
