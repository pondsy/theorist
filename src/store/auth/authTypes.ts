import firebase from "firebase/compat/app";
import {UserQuestionnaire} from "../practitioner/practitionerTypes";

export interface AuthState {
  user?: firebase.User;
  data?: UserData;
}

interface UserData {
  email: string;
  name: string;
  birthdate: string;
  role: string;
  practitioner?: string;
  questionnaire?: UserQuestionnaire
}