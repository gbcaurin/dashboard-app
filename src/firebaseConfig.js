import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHL6xjLLPMmERz2Btc0UGJeUQOlmMTMHE",
  authDomain: "dashboardgc-12019.firebaseapp.com",
  projectId: "dashboardgc-12019",
  storageBucket: "dashboardgc-12019.firebasestorage.app",
  messagingSenderId: "114252750723",
  appId: "1:114252750723:web:4cf8d6dc5b0765bd20a0b6",
  measurementId: "G-VL2YG0B648",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
