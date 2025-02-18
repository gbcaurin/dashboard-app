import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.NEXT_PUBLIC_API_KEY,
  authDomain: import.meta.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.NEXT_PUBLIC_APP_ID,
  measurementId: import.meta.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
