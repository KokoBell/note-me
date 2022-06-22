// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3UrzHGoID8_j2yytJnLn_yNrgDKI8Zpk",
  authDomain: "noterwebapp.firebaseapp.com",
  projectId: "noterwebapp",
  storageBucket: "noterwebapp.appspot.com",
  messagingSenderId: "92565220824",
  appId: "1:92565220824:web:8828cbe8086d240bbb16ad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)