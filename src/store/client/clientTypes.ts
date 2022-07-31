import {Questionnaire} from "../practitioner/practitionerTypes";

export interface ClientState {
    questionnaires: ClientQuestionnaire[];
    answers: ClientQuestionnaire[];
}

export interface ClientQuestionnaire extends Questionnaire {
    clientId: string;
    questionnaireId: string;
}