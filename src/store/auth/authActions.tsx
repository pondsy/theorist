import {SET_AUTH} from "./authConstants";
import {AppDispatch} from "../store";
import {AuthState} from "./authTypes";
import AuthService from "./authService";

export const setAuth = (user: AuthState) => async (dispatch: AppDispatch) => {
    dispatch({
        type: SET_AUTH,
        payload: user,
    });
};

export const removeAuth = () => async () => {
    await AuthService.logout();
};