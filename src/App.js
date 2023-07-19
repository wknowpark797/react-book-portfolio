import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './components/main/Main';
import Members from './components/sub/Members';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Review from './components/sub/Review';
import Contact from './components/sub/Contact';
import Signup from './components/sub/Signup';
import Signin from './components/sub/Signin';
import BtnTop from './components/common/BtnTop';
import Menu from './components/common/Menu';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchYoutubeMusic } from './redux/youtubeMusicSlice';
import { fetchYoutubeRead } from './redux/youtubeReadSlice';
import { fetchBookVisual } from './redux/bookVisualSlice';

function App() {
	const menu = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchYoutubeMusic());
		dispatch(fetchYoutubeRead());
		dispatch(fetchBookVisual());
	}, [dispatch]);

	return (
		<>
			<Switch>
				<Route exact path='/' render={() => <Main menu={menu} />} />
				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>

			<Route path='/members' component={Members} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/review' component={Review} />
			<Route path='/contact' component={Contact} />
			<Route path='/signup' component={Signup} />
			<Route path='/signin' component={Signin} />

			<Menu ref={menu} />
			<Footer />
			<BtnTop />
		</>
	);
}

export default App;
