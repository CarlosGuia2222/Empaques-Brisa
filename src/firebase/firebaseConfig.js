import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQXzz3K16yTG9unnkcB5JZWY3uzSW_O1E",
  authDomain: "empaques-brisa.firebaseapp.com",
  projectId: "empaques-brisa",
  storageBucket: "empaques-brisa.firebasestorage.app",
  messagingSenderId: "774092558815",
  appId: "1:774092558815:web:10e3c06486c0628fc2b46a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);