// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
// import firebase from "firebase/app";
// import "firebase/auth";

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    console.log("email, password, nickname", email, password, name);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authLogInUser = () => async (dispatch, getState) => {};
export const authLogOutUser = () => async (dispatch, getState) => {};
