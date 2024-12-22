// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4r3Co4BFnRj-XYjvyub3QFc4vbIrn_Bg",
  authDomain: "finance-tracker-e6693.firebaseapp.com",
  projectId: "finance-tracker-e6693",
  storageBucket: "finance-tracker-e6693.firebasestorage.app",
  messagingSenderId: "573690997048",
  appId: "1:573690997048:web:a6e13cd2f7dcce1ae679cd",
  measurementId: "G-5VBJ5W3V8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}