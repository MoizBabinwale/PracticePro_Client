// store.js
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Middleware for handling asynchronous actions
import rootReducer from "./reducer/reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
