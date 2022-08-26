import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  // sendPasswordResetEmail,
  // signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCx6xb6xuY56nQ_q1F-6fR--ol_AfGPZ4I",
  authDomain: "velkey.firebaseapp.com",
  projectId: "velkey",
  storageBucket: "velkey.appspot.com",
  messagingSenderId: "148625222118",
  appId: "1:148625222118:web:ae8c844dceb66df2b90e27",
  measurementId: "G-EWLNPM20KG",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res
  } catch (error) {
    console.log(error)
  }
}