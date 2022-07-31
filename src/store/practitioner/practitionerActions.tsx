import {
    ASSIGN_QUESTIONNAIRE,
    DELETE_QUESTIONNAIRE,
    GET_CLIENT_RESPONSES,
    GET_CLIENTS,
    GET_PRACTITIONER_QUESTIONNAIRES,
    SAVE_PRACTITIONER_QUESTIONNAIRE
} from "./practitionerConstants";
import {AppDispatch} from "../store";
import PractitionerService from "./practitionerService";
import {Client, Questionnaire} from "./practitionerTypes";

export const getQuestionnaires = (uid: string) => async (dispatch: AppDispatch) => {
    const data = await PractitionerService.getQuestionnaires(uid);
    dispatch({
        type: GET_PRACTITIONER_QUESTIONNAIRES,
        payload: data,
    });
};

export const saveQuestionnaire = (uid: string, questionnaire: Questionnaire) => async (dispatch: AppDispatch) => {
    const data = {
        ...questionnaire,
        practitioner: uid
    }
    const response = await PractitionerService.saveQuestionnaire(data);
    dispatch({
        type: SAVE_PRACTITIONER_QUESTIONNAIRE,
        payload: response
    });
};

export const deleteQuestionnaire = (uid: string, questionnaire: Questionnaire) => async (dispatch: AppDispatch) => {
    const data = {
        ...questionnaire,
        practitioner: uid
    }
    const response = await PractitionerService.deleteQuestionnaire(data);
    dispatch({
        type: DELETE_QUESTIONNAIRE,
        payload: response
    });
};

export const assignQuestionnaire = (uid: string, client: Client) => async (dispatch: AppDispatch) => {
    const response = await PractitionerService.assignQuestionnaire(uid, client);
    dispatch({
        type: ASSIGN_QUESTIONNAIRE,
        payload: response
    });
};

export const getClients = (uid: string) => async (dispatch: AppDispatch) => {
    const response = await PractitionerService.getClients(uid);
    dispatch({
        type: GET_CLIENTS,
        payload: response
    });
};

export const getClientResponses = (uid: string) => async (dispatch: AppDispatch) => {
    const data = await PractitionerService.getClientResponses(uid);
    dispatch({
        type: GET_CLIENT_RESPONSES,
        payload: data,
    });
};
