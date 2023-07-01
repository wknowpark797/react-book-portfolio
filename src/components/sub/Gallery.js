import SubLayout from '../common/SubLayout';

function Gallery() {
	return (
		<SubLayout subPageName={'sub-gallery'} breadCrumb={'HOME / GALLERY'} subPageTitle={['PHOTOS', <br />, 'FOR BOOK']}>
			<h2>Gallery Content</h2>
		</SubLayout>
	);
}

export default Gallery;
