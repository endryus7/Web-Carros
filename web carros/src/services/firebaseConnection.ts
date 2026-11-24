import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzEvu6bU4K3jzgpqDJzi9dqY-1C-fck-w",
  authDomain: "web-carros-df1f9.firebaseapp.com",
  projectId: "web-carros-df1f9",
  storageBucket: "web-carros-df1f9.firebasestorage.app",
  messagingSenderId: "972926012188",
  appId: "1:972926012188:web:0741fedd145659ea4008d9"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage}