import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", error);
        console.log("error.message", error.message);
      });
  };

export const authLogInUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("error", error);
      console.log("error.message", error.message);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
export const authLogOutUser = () => async (dispatch, getState) => {};
