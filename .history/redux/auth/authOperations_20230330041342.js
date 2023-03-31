import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import "firebase/auth";

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
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

export const authLogInUser = () => async (dispatch, getState) => {};
export const authLogOutUser = () => async (dispatch, getState) => {};
