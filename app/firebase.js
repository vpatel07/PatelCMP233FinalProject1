// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbrD8MogmVhMKml_I7_yVMMmWaA1PQrvI",
  authDomain: "expense-tracker-final-a98a7.firebaseapp.com",
  projectId: "expense-tracker-final-a98a7",
  storageBucket: "expense-tracker-final-a98a7.firebasestorage.app",
  messagingSenderId: "725343441864",
  appId: "1:725343441864:web:f5a2c3d7163e9f180c66fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);