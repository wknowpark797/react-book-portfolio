import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';

function MainYoutube() {
	const BookList = useSelector((store) => store.youtubeRead.data.slice(0, 2));

	return (
		<section id='main-youtube-list' className='my-scroll'>
			<div className='inner-container'>
				<div className='title-wrap'>
					<h1>
						Youtube <br />
						Discover The World.
					</h1>
					<a href='youtube.html' className='btn-video'>
						<FontAwesomeIcon icon={faCirclePlay} />
						<span>WATCH THE VIDEO</span>
					</a>
				</div>

				<div className='inner-content'>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum non atque ex assumenda blanditiis modi
						numquam dolores hic quos veritatis?
					</p>

					<div id='mainYoutubeWrap' className='video-wrap'>
						{BookList.map((item, idx) => {
							return (
								<article key={idx}>
									<img src={item.snippet.thumbnails.standard.url} alt='' />
								</article>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default MainYoutube;
