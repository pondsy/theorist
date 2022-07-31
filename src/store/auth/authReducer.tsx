import {createReducer, Reducer} from "@reduxjs/toolkit";
import {SET_AUTH} from "./authConstants";
import {AuthState} from "./authTypes";
import {PURGE} from "redux-persist/es/constants";

const initialState: AuthState = {
    user: undefined,
    data: undefined
};

const auth: Reducer<AuthState> = createReducer(initialState, {
    [SET_AUTH]: (state, action) => {
        return action.payload
    },
    [PURGE]: () => {
        return initialState;
    }
});

export default auth;
