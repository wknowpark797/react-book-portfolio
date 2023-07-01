import SubLayout from '../common/SubLayout';

function Members() {
	return (
		<SubLayout subPageName={'members'} breadCrumb={'HOME / MEMBERS'} subPageTitle={['WHO', <br />, 'WE ARE']}>
			<h2>Members Content</h2>
		</SubLayout>
	);
}

export default Members;
