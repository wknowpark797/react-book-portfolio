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

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBookDetail } from './redux/bookDetailSlice';
import { fetchMember } from './redux/memberSlice';
import { fetchFlickr } from './redux/flickrSlice';
import { fetchLocation } from './redux/locationSlice';
import { fetchReview } from './redux/reviewSlice';
import { loginUser, logoutUser } from './redux/userSlice';
import firebase from './firebase';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
	const queryClient = new QueryClient();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBookDetail(''));
		dispatch(fetchMember());
		dispatch(fetchFlickr({ type: 'interest' }));
		dispatch(fetchLocation());
		dispatch(fetchReview());

		// firebase로부터의 로그인 정보를 전역 state에 저장
		firebase.auth().onAuthStateChanged((userInfo) => {
			console.log('로그인 정보: ', userInfo);

			if (userInfo === null) dispatch(logoutUser());
			else dispatch(loginUser(userInfo.multiFactor.user));
		});
	}, [dispatch]);

	return (
		<QueryClientProvider client={queryClient}>
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

			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
