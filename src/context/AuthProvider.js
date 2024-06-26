import React, { createContext, useState, useEffect } from "react";

import Swal from "sweetalert2";
import { logoutAction } from "../actions/action";
import { useDispatch, useSelector } from "react-redux";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [subscribtionSelected, setSubscriptionSelected] = useState("");

  const loginState = useSelector((state) => state.login);
  useEffect(() => {
    // Check if user is logged in or session is expired on component mount
    checkLoggedIn();
  }, [loginState]);

  const checkLoggedIn = () => {
    const profile = JSON.parse(localStorage.getItem("Profile"));
    if (profile?.data) {
      const isAdminstatus = profile.data.isAdmin;
      setIsAdmin(isAdminstatus);
      const token = profile.token;
      if (token) {
        const currentTime = Date.now();
        const tokenExpiration = JSON.parse(localStorage.getItem("ExpiryTime"));
        if (currentTime < tokenExpiration) {
          // Token is valid
          setIsLoggedIn(true);
          const subscriptionDetail = profile.data.subscription;
          const subscribedStatus = subscriptionDetail.isSubscribed;
          const planExpiryDate = new Date(subscriptionDetail.planExpiryDate);
          const today = new Date();
          if (subscribedStatus && planExpiryDate > today) {
            setIsPremiumUser(true);
          } else {
            setIsPremiumUser(false);
          }
          // Set a timeout to automatically logout after token expiry
          // const timeout = tokenExpiration - currentTime;
          // setTimeout(logout, timeout);
        } else {
          // Token has expired
          setIsSessionExpired(true);
          // Perform automatic logout
          forceLogout();
        }
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const dispatch = useDispatch();
  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    dispatch(logoutAction());
  };

  const forceLogout = () => {
    Swal.fire({
      icon: "error",
      title: "Token Expired",
      text: "Your session has expired. Please log in again.",
      showConfirmButton: false,
      timer: 2000,
    });
    localStorage.clear();
    window.location.pathname = "/";
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isSessionExpired,
        isAdmin,
        isPremiumUser,
        setIsLoggedIn,
        setIsAdmin,
        logout,
        checkLoggedIn,
        subscribtionSelected,
        setSubscriptionSelected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
