import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { app } from "../../firebase/config";
import { authSlice } from "./authReducer";

// export const authSignUpUser =
//   ({ email, password, name }) =>
//   async (dispatch, getState) => {
//     const auth = getAuth();
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;

//         dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
//         console.log("user", user);
//       })
//       .catch((error) => {
//         console.log("error.code", error.code);
//         console.log("error.message", error.message);
//       });
//   };
export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // const user = auth.currentUser;
      await updateProfile(auth.currentUser, { displayName: name });

      const { uid, displayName } = auth.currentUser;
      console.log(uid, displayName);
      dispatch(
        authSlice.actions.updateUserProfile({ userId: uid, name: displayName })
      );
    } catch (error) {
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
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
        console.log("error.code", error.code);
        console.log("error.message", error.message);
      });
  };
export const authLogOutUser = () => async (dispatch, getState) => {};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      const uid = user.uid;
    }
    // else {

    // }
  });
};
