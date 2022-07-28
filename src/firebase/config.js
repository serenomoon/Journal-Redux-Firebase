// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCaI08SKADtufP4o_elDaYIHqdvBxerqk",
  authDomain: "journalapp-47881.firebaseapp.com",
  projectId: "journalapp-47881",
  storageBucket: "journalapp-47881.appspot.com",
  messagingSenderId: "504618167866",
  appId: "1:504618167866:web:9e24829434765dfefa0f03"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
