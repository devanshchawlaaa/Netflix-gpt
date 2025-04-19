import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6V3dozTST5LmmoV9JDZR8LSY6T15Psks",
  authDomain: "netflixgpt-dc.firebaseapp.com",
  projectId: "netflixgpt-dc",
  storageBucket: "netflixgpt-dc.firebasestorage.app",
  messagingSenderId: "131364952144",
  appId: "1:131364952144:web:248a4955f2ade3a8b41955",
  measurementId: "G-0S5R6KPVVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();