import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyASR3II6wB2ix6dj2avNMj5wghEfbzr77M",
    authDomain: "codelab2-c5f99.firebaseapp.com",
    projectId: "codelab2-c5f99",
    storageBucket: "codelab2-c5f99.appspot.com",
    messagingSenderId: "885075384606",
    appId: "1:885075384606:web:45a15741c36db6e81c110f"
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);