import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';
import firebase from './firebase';
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

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: types.BOOK_VISUAL.start });
		dispatch({ type: types.BOOK_INTEREST.start });
		dispatch({
			type: types.BOOK_DETAIL.start,
			bookId: 'iP7BEAAAQBAJ',
		});
		dispatch({ type: types.YOUTUBE_MUSIC.start });
		dispatch({ type: types.YOUTUBE_READ.start });
		dispatch({ type: types.MEMBER.start });
		dispatch({
			type: types.FLICKR.start,
			options: { type: 'interest' },
		});
		dispatch({ type: types.LOCATION.start });
		dispatch({ type: types.REVIEW.start });

		// firebase의 로그인 정보를 store에 저장
		firebase.auth().onAuthStateChanged((userInfo) => {
			if (userInfo === null) {
				dispatch(types.setUserInfo({ uid: '', userNum: -1, displayName: '' }));
			} else {
				dispatch(
					types.setUserInfo({
						uid: userInfo.multiFactor.user.uid,
						userNum: userInfo.multiFactor.user.userNum,
						displayName: userInfo.multiFactor.user.displayName,
					})
				);
			}
		});
	}, [dispatch]);

	return (
		<>
			<Switch>
				<Route exact path='/' render={() => <Main />} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/members' component={Members} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/review' component={Review} />
			<Route path='/contact' component={Contact} />
			<Route path='/signup' component={Signup} />
			<Route path='/signin' component={Signin} />

			<Menu />
			<Footer />
			<BtnTop />
		</>
	);
}

export default App;
