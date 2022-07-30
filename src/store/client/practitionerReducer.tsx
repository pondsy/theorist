import {createReducer, Reducer} from "@reduxjs/toolkit";
import {GET_QUESTIONNAIRES} from "./practitionerConstants";
import {PractitionerState} from "./practitionerTypes";

const initialState: PractitionerState = {
  questionnaires: []
};

const practitioner: Reducer<PractitionerState> = createReducer(initialState, {
  [GET_QUESTIONNAIRES]: (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  }
});

export default practitioner;
