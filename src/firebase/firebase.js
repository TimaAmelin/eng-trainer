import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBE6xQChL8zahgFhlnox2nUnMoDuzvtDGk",
  authDomain: "english-trainer-382117.firebaseapp.com",
  projectId: "english-trainer-382117",
  databaseURL: "https://deliveryapp-382117-default-rtdb.europe-west1.firebase..",
  storageBucket: "english-trainer-382117.appspot.com",
  messagingSenderId: "925882102821",
  appId: "1:925882102821:web:eb98e51152f3cf998b7bcc"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);