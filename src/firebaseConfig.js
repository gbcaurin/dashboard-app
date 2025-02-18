import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_API_KEY,
  authDomain: import.meta.env.REACT_AUTH_DOMAIN,
  projectId: import.meta.env.REACT_PROJECT_ID,
  storageBucket: import.meta.env.REACT_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_ID,
  measurementId: import.meta.env.REACT_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
