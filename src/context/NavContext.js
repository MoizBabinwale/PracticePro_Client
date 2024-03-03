// NavigationContext.js
import React, { createContext, useState, useContext } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  return <NavigationContext.Provider value={{ isNavOpen, toggleNav }}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => useContext(NavigationContext);
