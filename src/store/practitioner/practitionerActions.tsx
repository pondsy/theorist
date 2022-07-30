import {DELETE_QUESTIONNAIRE, GET_QUESTIONNAIRES, SAVE_QUESTIONNAIRE} from "./practitionerConstants";
import {AppDispatch} from "../store";
import PractitionerService from "./practitionerService";
import {Questionnaire} from "../../components/Questionnaires/Questionnaires";

export const getQuestionnaires = (uid: string) => async (dispatch: AppDispatch) => {
  const data = await PractitionerService.getQuestionnaires(uid);
  dispatch({
    type: GET_QUESTIONNAIRES,
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
      type: SAVE_QUESTIONNAIRE,
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