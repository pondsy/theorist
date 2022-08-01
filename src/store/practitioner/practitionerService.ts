import {Firebase} from "../../firebase/service";
import {Client, Questionnaire} from "./practitionerTypes";
import {ClientQuestionnaire} from "../client/clientTypes";

class PractitionerService {

    static async getQuestionnaires(uid: string): Promise<Questionnaire[]> {
        return await Firebase.getQuestionnairesByPractitioner(uid);
    }

    static async saveQuestionnaire(questionnaire: Questionnaire): Promise<Questionnaire[]> {
        return await Firebase.saveQuestionnaire(questionnaire);
    }

    static async deleteQuestionnaire(uid: string, questionnaireId: string): Promise<Questionnaire[]> {
        return await Firebase.deleteQuestionnaire(uid, questionnaireId);
    }

    static async removeQuestionnaireFromUsers(uid: string, questionnaireId: string, userIds: string[]): Promise<Client[]> {
        return await Firebase.removeQuestionnaireFromUsers(uid, questionnaireId, userIds);
    }

    static async getClients(uid: string): Promise<Client[]> {
        return await Firebase.getClients(uid);
    }

    static async getClientResponses(uid: string): Promise<ClientQuestionnaire[]> {
        return await Firebase.getClientResponses(uid);
    }

    static async assignQuestionnaire(uid: string, client: Client): Promise<Client[]> {
        return await Firebase.assignQuestionnaire(uid, client);
    }
}

export default PractitionerService;