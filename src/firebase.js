import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDHl9G2h6r1UdugoFTCV0Lxfwirbczp8tw',
	authDomain: 'project-book-ae342.firebaseapp.com',
	projectId: 'project-book-ae342',
	storageBucket: 'project-book-ae342.appspot.com',
	messagingSenderId: '84096325882',
	appId: '1:84096325882:web:de705a0b87bca56aa11143',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
