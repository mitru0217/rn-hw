import { initializeApp } from "firebase/app";
import firebase from "firebase";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBWrLgtZXpweEuuUx_JCLUIQXbZAXODBHA",
  authDomain: "rn-hw-1404a.firebaseapp.com",
  projectId: "rn-hw-1404a",
  storageBucket: "rn-hw-1404a.appspot.com",
  messagingSenderId: "277524856333",
  appId: "1:277524856333:web:700be3dca8e057c5175f44",
};

// export const app = initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig);
