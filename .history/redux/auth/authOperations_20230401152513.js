import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { app } from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authLogOut } = authSlice.actions;
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

      await updateProfile(auth.currentUser, { displayName: name });

      const { uid, displayName } = auth.currentUser;

      dispatch(updateUserProfile({ userId: uid, name: displayName }));
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
      })
      .catch((error) => {
        console.log("error.code", error.code);
        console.log("error.message", error.message);
      });
  };
export const authLogOutUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  await signOut(auth);
  dispatch(authLogOut());
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const displayName = user.displayName;
      dispatch(updateUserProfile({ userId: uid, name: displayName }));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
