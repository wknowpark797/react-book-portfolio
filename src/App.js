import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import firebase from './firebase';
import { useEffect } from 'react';
import { useGlobalData } from './hooks/useGlobalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
	const queryClient = new QueryClient();
	const { setUid, setUserNum, setDisplayName } = useGlobalData();

	useEffect(() => {
		// firebase로부터의 로그인 정보를 전역 state에 저장
		firebase.auth().onAuthStateChanged((userInfo) => {
			if (userInfo === null) {
				setUid('');
				setUserNum(-1);
				setDisplayName('');
			} else {
				setUid(userInfo.multiFactor.user.uid);
				setUserNum(userInfo.multiFactor.user.userNum);
				setDisplayName(userInfo.multiFactor.user.displayName);
			}
		});
	}, [setUid, setUserNum, setDisplayName]);

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
