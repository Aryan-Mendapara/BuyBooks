// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp363TXQRM0P34K27lVCztOx3fBuZErDU",
  authDomain: "buybooks-455e6.firebaseapp.com",
  projectId: "buybooks-455e6",
  storageBucket: "buybooks-455e6.appsport.app",
  messagingSenderId: "47181389913",
  appId: "1:47181389913:web:94633c3a4445472d2f1148",
  measurementId: "G-D7PL7LSMD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export default app;