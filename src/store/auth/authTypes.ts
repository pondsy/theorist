import firebase from "firebase/compat/app";

export interface AuthState {
  user?: firebase.User;
}