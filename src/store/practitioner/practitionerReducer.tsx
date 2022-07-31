import {createReducer, Reducer} from "@reduxjs/toolkit";
import {
  GET_QUESTIONNAIRES,
  SAVE_QUESTIONNAIRE,
  ASSIGN_QUESTIONNAIRE,
  DELETE_QUESTIONNAIRE,
  GET_CLIENTS
} from "./practitionerConstants";
import {PractitionerState} from "./practitionerTypes";

const initialState: PractitionerState = {
  questionnaires: [],
  clients: []
};

const practitioner: Reducer<PractitionerState> = createReducer(initialState, {
  [GET_QUESTIONNAIRES]: (state, action) => {
    return {
      ...state,
      questionnaires: action.payload
    }
  },
  [SAVE_QUESTIONNAIRE]: (state, action) => {
    return {
      ...state,
      questionnaires: action.payload
    }
  },
  [DELETE_QUESTIONNAIRE]: (state, action) => {
    return {
      ...state,
      questionnaires: action.payload
    }
  },
  [GET_CLIENTS]: (state, action) => {
    return {
      ...state,
      clients: action.payload
    }
  },
  [ASSIGN_QUESTIONNAIRE]: (state, action) => {
    return {
      ...state,
      clients: action.payload
    }
  },
});

export default practitioner;
