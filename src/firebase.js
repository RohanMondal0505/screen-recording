import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyATUi9pq-LJD_STLl9RPt3ATiOBoWn6UGQ",
	authDomain: "screen-recording-e21f9.firebaseapp.com",
	projectId: "screen-recording-e21f9",
	storageBucket: "screen-recording-e21f9.appspot.com",
	messagingSenderId: "338288972932",
	appId: "1:338288972932:web:07b024daefed73deff9ed1",
	measurementId: "G-V28M7FJW5L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const analytics = getAnalytics(app);