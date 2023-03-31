import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { authStateCahngeUser } from "../redux/auth/authOperations";
import { userRoute } from "./router";

const Main = () => {
  //   const [user, setUser] = useState(null);
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateCahngeUser());
  });

  const routing = userRoute(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
