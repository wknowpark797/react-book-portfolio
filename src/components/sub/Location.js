import SubLayout from '../common/SubLayout';

function Location() {
	return (
		<SubLayout subPageName={'sub-location'} breadCrumb={'HOME / LOCATION'} subPageTitle={['WHERE', <br />, 'WE ARE']}>
			<h2>Location Content</h2>
		</SubLayout>
	);
}

export default Location;
