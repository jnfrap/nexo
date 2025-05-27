// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjr7lrrPPl2Z32chx3se_ZQqaDEsFHyjw",
  authDomain: "nexo-2c9de.firebaseapp.com",
  projectId: "nexo-2c9de",
  storageBucket: "nexo-2c9de.firebasestorage.app",
  messagingSenderId: "92401641173",
  appId: "1:92401641173:web:8f42ee78e2b3813d53645c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
