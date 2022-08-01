import {createReducer, Reducer} from "@reduxjs/toolkit";
import {
    ASSIGN_QUESTIONNAIRE,
    DELETE_QUESTIONNAIRE,
    GET_CLIENT_RESPONSES,
    GET_CLIENTS,
    GET_PRACTITIONER_QUESTIONNAIRES,
    SAVE_PRACTITIONER_QUESTIONNAIRE
} from "./practitionerConstants";
import {PractitionerState} from "./practitionerTypes";
import {PURGE} from "redux-persist/es/constants";

const initialState: PractitionerState = {
    questionnaires: [],
    clients: [],
    responses: []
};

const practitioner: Reducer<PractitionerState> = createReducer(initialState, {
    [GET_PRACTITIONER_QUESTIONNAIRES]: (state, action) => {
        return {
            ...state,
            questionnaires: action.payload
        }
    },
    [SAVE_PRACTITIONER_QUESTIONNAIRE]: (state, action) => {
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
    [GET_CLIENT_RESPONSES]: (state, action) => {
        return {
            ...state,
            responses: action.payload
        }
    },
    [PURGE]: () => {
        return initialState
    }
});

export default practitioner;
