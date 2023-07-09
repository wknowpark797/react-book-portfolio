import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function MainComment() {
	return (
		<section id='main-comment-list' className='my-scroll'>
			<div className='inner-container'>
				<div className='title-wrap'>
					<h1>Book's Experiences</h1>
					<p>Lorem ipsum dolor sit amet.</p>
				</div>

				<div className='slide-wrap commentListSwiper'>
					<article id='commentListPanel' className='panel swiper-wrapper'>
						<div className='swiper-slide'>
							<div className='profile-box'>
								<img src='img/example_user.jpg' alt='' />
							</div>
							<div className='info-box'>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Id temporibus exercitationem culpa saepe,
									nulla veniam aliquam. Ea dicta officia dolorum.
								</p>
								<p className='user'>nickname</p>
								<p>2023.06.01</p>
							</div>
						</div>
					</article>

					<div className='arrow'>
						<button type='button' id='btnPrevComment' className='prev'>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>
						<button type='button' id='btnNextComment' className='next'>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default MainComment;
