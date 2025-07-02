// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBUCrW_y5xia1uT-O2v_du_jHLG5F9jR8",
  authDomain: "nodepractice-b9882.firebaseapp.com",
  projectId: "nodepractice-b9882",
  storageBucket: "nodepractice-b9882.firebasestorage.app",
  messagingSenderId: "434110793353",
  appId: "1:434110793353:web:29290fec85665b01aa6858",
  measurementId: "G-MVLQ15C6L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);