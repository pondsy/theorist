import {GET_QUESTIONNAIRES} from "./clientConstants";
import {AppDispatch} from "../store";
import ClientService from "./clientService";

export const getQuestionnaires = (uid: string) => async (dispatch: AppDispatch) => {
  const  {data} = await ClientService.getQuestionnaires(uid);
  dispatch({
    type: GET_QUESTIONNAIRES,
    payload: data,
  });
};