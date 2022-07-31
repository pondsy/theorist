import {createReducer, Reducer} from "@reduxjs/toolkit";
import {GET_CLIENT_QUESTIONNAIRES, GET_RESPONSES, SAVE_ANSWER} from "./clientConstants";
import {ClientState} from "./clientTypes";
import {PURGE} from "redux-persist/es/constants";

const initialState: ClientState = {
    questionnaires: [],
    answers: []
};

const client: Reducer<ClientState> = createReducer(initialState, {
    [GET_CLIENT_QUESTIONNAIRES]: (state, action) => {
        return {
            ...state,
            questionnaires: action.payload
        }
    },
    [SAVE_ANSWER]: (state, action) => {
        return {
            ...state,
            answers: action.payload
        }
    },
    [GET_RESPONSES]: (state, action) => {
        return {
            ...state,
            answers: action.payload
        }
    },
    [PURGE]: () => {
        return initialState
    }
});

export default client;
