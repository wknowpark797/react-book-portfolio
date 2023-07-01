import SubLayout from '../common/SubLayout';

function Comment() {
	return (
		<SubLayout subPageName={'sub-comment'} breadCrumb={'HOME / COMMENT'} subPageTitle={['EXPERIENCES', <br />, 'FOR BOOK']}>
			<h2>Comment Content</h2>
		</SubLayout>
	);
}

export default Comment;
