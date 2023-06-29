import { Route, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './components/main/Main';
import Members from './components/sub/Members';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Comment from './components/sub/Comment';
import Location from './components/sub/Location';
import Signup from './components/sub/Signup';

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/members' component={Members} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/comment' component={Comment} />
			<Route path='/location' component={Location} />
			<Route path='/signup' component={Signup} />

			<Footer />
		</>
	);
}

export default App;
