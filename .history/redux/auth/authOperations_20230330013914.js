import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../firebase/config";

export const authLogInUser = () => async (dispatch, getState) => {};

export const authSignUpUser = () => async (dispatch, getState) => {
  try {
    const user = await db
      .getAuth()
      .createUserWithEmailAndPassword(email, password);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};

export const authLogOutUser = () => async (dispatch, getState) => {};
