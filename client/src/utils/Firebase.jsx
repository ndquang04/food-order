// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC9M4xTPYbUTRl770tJHAOjGhDz5qkMUQI',
  authDomain: 'foodhub-1da62.firebaseapp.com',
  projectId: 'foodhub-1da62',
  storageBucket: 'foodhub-1da62.firebasestorage.app',
  messagingSenderId: '482353229622',
  appId: '1:482353229622:web:82889e60c8681065268d97',
  measurementId: 'G-XDRBQ1J9P4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app as default};
