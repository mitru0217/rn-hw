import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { userRoute } from "./router";

const Main = () => {
  const [user, setUser] = useState(null);
  const state = useSelector((state) => state);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      const uid = user.uid;
    }
    // else {

    // }
  });

  useEffect(() => {});

  const routing = userRoute(user);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
