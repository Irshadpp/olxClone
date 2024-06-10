import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyC2w-ey_GsdLtWJu8O2Xh5VFuMIBD6ft2c",
  authDomain: "olxclone-c7377.firebaseapp.com",
  projectId: "olxclone-c7377",
  storageBucket: "olxclone-c7377.appspot.com",
  messagingSenderId: "978649077012",
  appId: "1:978649077012:web:970d128c4875ec06a6de01"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);