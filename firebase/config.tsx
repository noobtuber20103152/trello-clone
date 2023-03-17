
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// GoogleAuthProvider
const firebaseConfig = {
    apiKey: "AIzaSyCLlgfYfjWVmvEGV8_lbu3wY7x_k5BfZU4",
    authDomain: "yoga-app-cdf35.firebaseapp.com",
    projectId: "yoga-app-cdf35",
    storageBucket: "yoga-app-cdf35.appspot.com",
    messagingSenderId: "58021163812",
    appId: "1:58021163812:web:2bcff55e9a3fdfda5eb9b1",
    measurementId: "G-3C8L9H0QFJ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const authes = 
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider };
