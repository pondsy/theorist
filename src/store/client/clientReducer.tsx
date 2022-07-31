import {createReducer, Reducer} from "@reduxjs/toolkit";
import {GET_QUESTIONNAIRES} from "./clientConstants";
import {ClientState} from "./clientTypes";
import {PURGE} from "redux-persist/es/constants";

const initialState: ClientState = {
  questionnaires: []
};

const client: Reducer<ClientState> = createReducer(initialState, {
  [GET_QUESTIONNAIRES]: (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  },
  [PURGE]: () => {
    return initialState
  }
});

export default client;
