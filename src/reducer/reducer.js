// reducers.js
import { combineReducers } from "redux";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUPSUCCESS, SIGNUPFAIL, SIGNUPREQUEST, FETCHALLUSER, RESULTFETCHED, RETEINGRESULT, SENDINGDATA, RESULTRESET } from "../Constants/Constant";
import testReducer from "./testReducers";

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  responseData: null, // Add responseData property to your initial state
  // ...other properties
};
const initialSingupState = {
  isSignup: false,
  isLoading: false,
  responseData: null,
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      localStorage.setItem("Profile", JSON.stringify({ ...action.payload.responseData.data }));
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        responseData: action.payload.responseData,
      };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, responseData: {} };
    default:
      return state;
  }
};

const signupReducer = (state = initialSingupState, action) => {
  switch (action.type) {
    case SIGNUPREQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUPSUCCESS:
      return {
        ...state,
        isLoading: false,
        isSignup: true,
        responseData: action.payload,
      };

    case SIGNUPFAIL:
      return {
        ...state,
        isLoading: false,
        isSignup: false,
      };
    default:
      return state;
  }
};
const initialUsers = {
  list: null,
};
const fetchAllUsers = (state = initialUsers, action) => {
  switch (action.type) {
    case FETCHALLUSER:
      return {
        ...state,
        list: action.payload.responseData,
      };

    default:
      return state;
  }
};

const initialRes = {
  result: null,
  sendingData: false,
  retrievingResult: false,
};
const fetchResult = (state = initialRes, action) => {
  switch (action.type) {
    case SENDINGDATA:
      return {
        ...state,
        sendingData: true,
        retrievingResult: false,
      };

    case RETEINGRESULT:
      return {
        ...state,
        retrievingResult: true,
        sendingData: false,
      };
    case RESULTFETCHED:
      return {
        ...state,
        result: action.payload.responseData,
        sendingData: false,
        retrievingResult: false,
      };
    case RESULTRESET:
      return {
        ...state,
        result: null,
        sendingData: false,
        retrievingResult: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  fetchallusers: fetchAllUsers,
  test: testReducer,
  fetchresult: fetchResult,
  // Add more reducers here if needed
});

export default rootReducer;
