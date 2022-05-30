// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDe3QhvLGRLeyBWRyGvyV3vGlRjFrNmcVA",
    authDomain: "house-marketplace-app-1cc74.firebaseapp.com",
    projectId: "house-marketplace-app-1cc74",
    storageBucket: "house-marketplace-app-1cc74.appspot.com",
    messagingSenderId: "769124180311",
    appId: "1:769124180311:web:d1093062290518563d1e12"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()