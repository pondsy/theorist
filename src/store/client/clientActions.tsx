import {GET_CLIENT_QUESTIONNAIRES, SAVE_ANSWER} from "./clientConstants";
import {AppDispatch} from "../store";
import ClientService from "./clientService";
import {ClientQuestionnaire} from "./clientTypes";

export const getQuestionnaires = (uid: string[], clientId: string) => async (dispatch: AppDispatch) => {
  const data = await ClientService.getQuestionnaires(uid, clientId);
  dispatch({
    type: GET_CLIENT_QUESTIONNAIRES,
    payload: data,
  });
};

export const saveClientAnswer = (questionnaire: ClientQuestionnaire) => async (dispatch: AppDispatch) => {
  const data = await ClientService.saveClientAnswer(questionnaire);
  console.log('data?', data);
  dispatch({
    type: SAVE_ANSWER,
    payload: data,
  });
};