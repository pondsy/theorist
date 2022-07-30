import {GET_QUESTIONNAIRES} from "./practitionerConstants";
import {AppDispatch} from "../store";
import PractitionerService from "./practitionerService";

export const getQuestionnaires = (uid: string) => async (dispatch: AppDispatch) => {
  const  {data} = await PractitionerService.getQuestionnaires(uid);
  dispatch({
    type: GET_QUESTIONNAIRES,
    payload: data,
  });
};