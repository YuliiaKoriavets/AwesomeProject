import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBt3vkwu1WKZvFurGQNFKbVOtwB6bNA-VQ",
  authDomain: "awesome-project-c644f.firebaseapp.com",
  databaseURL: "https://awesome-project-c644f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "awesome-project-c644f",
  storageBucket: "awesome-project-c644f.appspot.com",
  messagingSenderId: "279551874227",
  appId: "1:279551874227:web:4e73b242efc7e226e74cc6",
  measurementId: "G-GHK3E8D9SN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);