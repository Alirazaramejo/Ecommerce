import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";
import { getFirestore,doc,setDoc,getDoc } from 'firebase/firestore';
import { getStorage, ref as firebaseStorage , uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import {ref,getDatabase} from "firebase/database";


//phir se firebaseConfig.js me jake ye code likhna hai or logic khud likoo gaa

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DB_NAME,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)

export { app, db, auth, storage,ref,createUserWithEmailAndPassword,updateProfile,firebaseStorage,uploadBytesResumable,getDownloadURL,doc,setDoc,signInWithEmailAndPassword,onAuthStateChanged ,getDoc };
