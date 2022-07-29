import {createReducer, Reducer} from "@reduxjs/toolkit";
import {SET_AUTH, REMOVE_AUTH} from "./authConstants";
import {AuthState} from "./authTypes";

const initialState: AuthState = {
  user: undefined
};

const auth: Reducer<AuthState> = createReducer(initialState, {
  [SET_AUTH]: (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  },
  [REMOVE_AUTH]: (state) => {
    return {
      ...state,
      user: undefined
    }
  }
});

export default auth;
