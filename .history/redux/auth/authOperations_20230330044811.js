import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";

import { app } from "../../firebase/config";

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
      })
      .catch((error) => {
        console.log("error.message", error.message);
      });
  };

export const authLogInUser =
  (email, password) => async (dispatch, getState) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
      })
      .catch((error) => {
        console.log("error.message", error.message);
      });
  };
export const authLogOutUser = () => async (dispatch, getState) => {};
