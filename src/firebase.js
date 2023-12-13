// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAUV7-8tRW9ajVSMxVyUicZweUpoujCQh4',
	authDomain: 'todoapp-c7c33.firebaseapp.com',
	projectId: 'todoapp-c7c33',
	storageBucket: 'todoapp-c7c33.appspot.com',
	messagingSenderId: '933475057904',
	appId: '1:933475057904:web:4370459384af19b0a10235',
	databaseURL: 'https://todoapp-c7c33-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
