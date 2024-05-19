import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationProvider } from "./context/NavContext";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <NavigationProvider>
        <Router>
          <App />
        </Router>
      </NavigationProvider>
    </AuthProvider>
  </Provider>
);
