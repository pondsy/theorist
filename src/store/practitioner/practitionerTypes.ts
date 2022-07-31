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

export interface Questionnaire {
    id: string|null;
    title: string;
    questions: (FreeText|MultiChoice)[];
    added: string;
    practitioner?: string;
}

export interface MultiChoice extends Question {
    options?: Option[]
}

export interface FreeText extends Question {
    answer?: string;
}

export interface Question {
    id: string;
    title: string;
    type?: QuestionType;
}

export interface Option {
    id: string;
    answer: string;
    selected: boolean;
}

export enum QuestionType {
    multiChoice = 'multiChoice',
    freeText = 'freeText'
}
