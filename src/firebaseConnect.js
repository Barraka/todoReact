import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCPeO8O8rJAckBkuhtOcZE6RE2bZEX-nhk",
    authDomain: "mydolist1.firebaseapp.com",
    databaseURL: "https://mydolist1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mydolist1",
    storageBucket: "mydolist1.appspot.com",
    messagingSenderId: "589204967185",
    appId: "1:589204967185:web:bb2a67ef60a30363d9c6b0",
    measurementId: "G-W8KG01L0JR"
  };

const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
export {db as default};
