import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../firebase/config";

export const authLogInUser = () => async (dispatch, getState) => {};

export const authSignUpUser =
  (email, password, name) => async (dispatch, getState) => {
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

export const authLogOutUser = () => async (dispatch, getState) => {};
