import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUO22rLCLHtBTIpj7KX7201x_Qx51WhW4",
  authDomain: "test-task-a9a26.firebaseapp.com",
  projectId: "test-task-a9a26",
  storageBucket: "test-task-a9a26.appspot.com",
  messagingSenderId: "647337540829",
  appId: "1:647337540829:web:b5f0cdd2d2415ac1c42f34"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const auth = getAuth();
export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}
export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}