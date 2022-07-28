import {SET_AUTH, REMOVE_AUTH} from "./authConstants";
import {AppDispatch} from "../store";
import firebase from "firebase/compat/app";

export const setAuth = (user: firebase.User) => async (dispatch: AppDispatch) => {
  dispatch({
    type: SET_AUTH,
    payload: user,
  });
};

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: REMOVE_AUTH
  });
};