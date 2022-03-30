import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "~/constant";
import { getFirestore } from "firebase/firestore";

export const firebase = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebase);
export const db = getFirestore();
