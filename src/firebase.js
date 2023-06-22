import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
	apiKey: "AIzaSyATUi9pq-LJD_STLl9RPt3ATiOBoWn6UGQ",
	authDomain: "screen-recording-e21f9.firebaseapp.com",
	projectId: "screen-recording-e21f9",
	storageBucket: "screen-recording-e21f9.appspot.com",
	messagingSenderId: "338288972932",
	appId: "1:338288972932:web:07b024daefed73deff9ed1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)