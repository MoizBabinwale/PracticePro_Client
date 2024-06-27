import axios from "axios";
import { SUBJECTFETCHED, TIMEFETCHED, DIFFICULTYFETCHED, SENDINGDATA, RETEINGRESULT, RESULTFETCHED, RESULTRESET } from "../Constants/Constant";
import { TEST_API } from "./api";

const token = JSON.parse(localStorage.getItem("Profile"))?.token ?? "";

export const testHeaders = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token, // Example of a custom header
  },
};

const sendingData = () => {
  return {
    type: SENDINGDATA, // No need to wrap responseData in an object
  };
};
const retrwingData = () => {
  return {
    type: RETEINGRESULT, // No need to wrap responseData in an object
  };
};
const fetchedSuccssfully = (responseData) => {
  return {
    type: RESULTFETCHED, // No need to wrap responseData in an object
    payload: { responseData },
  };
};

export const resetResult = () => {
  return {
    type: RESULTRESET, // No need to wrap responseData in an object
  };
};

const subjectFetched = (responseData) => {
  return {
    type: SUBJECTFETCHED,
    payload: { responseData }, // No need to wrap responseData in an object
  };
};

const timefetched = (responseData) => {
  return {
    type: TIMEFETCHED,
    payload: { responseData }, // No need to wrap responseData in an object
  };
};
const difficultyFetch = (responseData) => {
  return {
    type: DIFFICULTYFETCHED,
    payload: { responseData }, // No need to wrap responseData in an object
  };
};

export const getAllSubjects = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(TEST_API + "/getAllSubjects", testHeaders); // Await the axios request
      dispatch(subjectFetched(response.data)); // Access response.data for the actual data
    } catch (error) {
      console.log("error ", error);
    }
  };
};

export const getDifficultyLevel = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(TEST_API + "/getDifficulty", testHeaders); // Await the axios request
      dispatch(difficultyFetch(response.data)); // Access response.data for the actual data
    } catch (error) {
      console.log("error ", error);
    }
  };
};

export const getTimeLimits = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(TEST_API + "/getTimeLimits", testHeaders); // Await the axios request
      dispatch(timefetched(response.data)); // Access response.data for the actual data
    } catch (error) {
      console.log("error ", error);
    }
  };
};

export const evaluateResult = (answerData) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("Profile"))?.token ?? "";

      const testHead = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token, // Example of a custom header
        },
      };
      dispatch(sendingData());
      const response = await axios.post(TEST_API + "/checkAnswer", { questions: answerData }, testHead); // Await the axios request
      dispatch(retrwingData());
      if (response) {
        const data = response.data;
        dispatch(fetchedSuccssfully(data));
      }
    } catch (error) {
      console.log("error ", error);
    }
  };
};
