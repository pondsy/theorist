import {createReducer, Reducer} from "@reduxjs/toolkit";
import {GET_QUESTIONNAIRES, SAVE_QUESTIONNAIRE, DELETE_QUESTIONNAIRE} from "./practitionerConstants";
import {PractitionerState} from "./practitionerTypes";

const initialState: PractitionerState = {
  questionnaires: []
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
});

export default practitioner;
