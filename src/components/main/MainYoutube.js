import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { useYoutubeReadQuery } from '../../hooks/useYoutubeReadQuery';

function MainYoutube() {
	const { data: BookList, isSuccess } = useYoutubeReadQuery();

	return (
		<section id='main-youtube-list' className='my-scroll'>
			<div className='inner-container'>
				<div className='title-wrap'>
					<h1>
						Youtube <br />
						Discover The World.
					</h1>
					<Link to='/youtube' className='btn-video'>
						<FontAwesomeIcon icon={faCirclePlay} />
						<span>WATCH THE VIDEO</span>
					</Link>
				</div>

				<div className='inner-content'>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum non atque ex assumenda blanditiis modi
						numquam dolores hic quos veritatis?
					</p>

					<div id='mainYoutubeWrap' className='video-wrap'>
						{isSuccess &&
							BookList.slice(0, 2).map((item, idx) => {
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
