import {Questionnaire} from "../../components/Questionnaires/Questionnaires";

export interface PractitionerState {
  questionnaires: Questionnaire[];
  clients: Client[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  role: string;
  questionnaire: UserQuestionnaire;
  birthdate: string;
  practitioner: string;
}

export interface UserQuestionnaire {
  new: string[];
  ready: string[];
}