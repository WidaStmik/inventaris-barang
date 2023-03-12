// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIYOkergcsZs7XGPuQ4WI4ZJBUuD3MseM",
  authDomain: "inventaris-barang-c420a.firebaseapp.com",
  projectId: "inventaris-barang-c420a",
  storageBucket: "inventaris-barang-c420a.appspot.com",
  messagingSenderId: "475815957977",
  appId: "1:475815957977:web:5a9f5381e8040427d5f5c8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
