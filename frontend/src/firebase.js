import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Credenciais do Firebase
const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export const auth = getAuth();
export function signUp(email, password) {
	return createUserWithEmailAndPassword(auth, email, password)
}
export function signIn(email, password) {
	return signInWithEmailAndPassword(auth, email, password);
}
export function passwordResetEmail(email) {
	return sendPasswordResetEmail(auth, email);
}