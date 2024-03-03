import { combineReducers } from "redux";
import { NEWDIFFICULTYCREATED, SUBJECTFETCHED, DIFFICULTYFETCHED, NEWTIMECREATED, TIMEFETCHED, NEWSUBJECTCREATED, NEWSUBJECTRECET } from "../Constants/Constant";

const initialState = [];

const subjectFetch = (state = initialState, action) => {
  switch (action.type) {
    case SUBJECTFETCHED:
      return action.payload.responseData;
    default:
      return state;
  }
};

const time = [];
const timeFetched = (state = time, action) => {
  switch (action.type) {
    case TIMEFETCHED:
      return action.payload.responseData;

    default:
      return state;
  }
};
const difficulties = [];
const difficultyFetched = (state = difficulties, action) => {
  switch (action.type) {
    case DIFFICULTYFETCHED:
      return action.payload.responseData;

    default:
      return state;
  }
};

const newTime = [];
const newTimeCreated = (state = newTime, action) => {
  switch (action.type) {
    case NEWTIMECREATED:
      return {
        ...state,
        newTime: action.payload.responseData,
      };
    default:
      return state;
  }
};
const newDifficulty = [];
const newDifficultyCreated = (state = newDifficulty, action) => {
  switch (action.type) {
    case NEWDIFFICULTYCREATED:
      return {
        ...state,
        newDifficulty: action.payload.responseData,
      };

    default:
      return state;
  }
};
const newSubject = {};
const newSubjectCreated = (state = newSubject, action) => {
  switch (action.type) {
    case NEWSUBJECTCREATED:
      return {
        ...state,
        newSubject: action.payload.responseData,
      };
    case NEWSUBJECTRECET:
      return {
        newSubject: {},
      };
    default:
      return state;
  }
};

const testReducer = combineReducers({
  subjects: subjectFetch,
  time: timeFetched,
  difficulties: difficultyFetched,
  newtime: newTimeCreated,
});

export default testReducer;
