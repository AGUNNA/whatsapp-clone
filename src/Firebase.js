import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAu2dMEEDr8oJKgglpWCLrCL8oA9FbUp5w",
  authDomain: "whatsapp-clone-4d963.firebaseapp.com",
  projectId: "whatsapp-clone-4d963",
  storageBucket: "whatsapp-clone-4d963.appspot.com",
  messagingSenderId: "387645078305",
  appId: "1:387645078305:web:c69c47ffefb6f498e4dc60",
  measurementId: "G-4FN846BE4W"
}; 

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseApp = firebase.initalizeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;