import firebase from 'firebase';
import firestore from 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyDVvz3dR5ImxJfD_Z2WLcm6yBH2QsGjOZ8',
  authDomain: 'vue-geoapp.firebaseapp.com',
  databaseURL: 'https://vue-geoapp.firebaseio.com',
  projectId: 'vue-geoapp',
  storageBucket: 'vue-geoapp.appspot.com',
  messagingSenderId: '347847324508',
  appId: '1:347847324508:web:d02ffb7c4131f30c'
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
