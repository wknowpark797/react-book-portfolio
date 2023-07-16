import Header from '../common/Header';
import Visual from './Visual';
import BookList from './BookList';
import MainGallery from './MainGallery';
import MainYoutube from './MainYoutube';
import MainComment from './MainComment';
import MainLocation from './MainLocation';
import ScrollNavi from './ScrollNavi';

function Main({ menu }) {
	return (
		<main>
			<Header type={'main'} menu={menu} />

			<Visual />
			<BookList />
			<MainGallery />
			<MainYoutube />
			<MainComment />
			<MainLocation />

			<ScrollNavi />
		</main>
	);
}

export default Main;
