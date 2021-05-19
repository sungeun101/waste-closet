import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyCFojqQgth1Mcls9DG1gGepz2-834w6WX4',
  authDomain: 'waste-closet.firebaseapp.com',
  projectId: 'waste-closet',
  storageBucket: 'waste-closet.appspot.com',
  messagingSenderId: '89866170211',
  appId: '1:89866170211:web:f74e31bc26e2951e4a2d56',
};

firebase.initializeApp(firebaseConfig);

const firebaseInstance = firebase;
const authService = firebase.auth();
const projectFirestore = firebase.firestore();

export { projectFirestore, authService, firebaseInstance };
