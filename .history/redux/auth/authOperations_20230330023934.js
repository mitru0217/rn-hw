// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../firebase/config";

export const authLogInUser = () => async (dispatch, getState) => {};

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getSatte) => {
    console.log("email, password, nickname", email, password, name);
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authLogOutUser = () => async (dispatch, getState) => {};
