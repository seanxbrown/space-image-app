import { initializeApp, } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNgGYKRZ-WyUb2zXOsQus2I5zqZ_COxUw",
  authDomain: "space-image-app.firebaseapp.com",
  projectId: "space-image-app",
  storageBucket: "space-image-app.appspot.com",
  messagingSenderId: "1012329533367",
  appId: "1:1012329533367:web:fe6d5e93024686290ba232"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { 
  app, 
  auth, 
  onAuthStateChanged, 
  signInAnonymously, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithEmailAndPassword, 
  db, 
  collection, 
  addDoc, 
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateProfile,
  updateDoc, 
  arrayUnion, 
  arrayRemove 
}

export type { User }