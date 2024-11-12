// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.REACT_APP_FIREBASE_APP_ID

  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;