// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, updateDoc, query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMN5UUP-fAZFqAiOztTit9xP9qiFMH7_Y",
  authDomain: "smit-practice-new.firebaseapp.com",
  projectId: "smit-practice-new",
  storageBucket: "smit-practice-new.firebasestorage.app",
  messagingSenderId: "344883956867",
  appId: "1:344883956867:web:1e210f9c6227ecff649fb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  auth,
  getAuth, createUserWithEmailAndPassword,
  doc, setDoc,
  db,
  signInWithEmailAndPassword,
  collection, addDoc,
  getDocs,
  updateDoc,
  query, where,
  getDoc,
  deleteDoc


}