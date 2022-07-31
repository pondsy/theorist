import {Firebase} from "../../firebase/service";
import {ClientQuestionnaire} from "./clientTypes";

class ClientService {

    static async getQuestionnaires(ids: string[], clientId: string): Promise<ClientQuestionnaire[]> {
        return await Firebase.getClientQuestionnaires(ids, clientId);
    }

    static async getClientResponses(uid: string): Promise<ClientQuestionnaire[]> {
        return await Firebase.getAnswersByClient(uid);
    }

    static async saveClientAnswer(questionnaire: ClientQuestionnaire): Promise<ClientQuestionnaire[]> {
        return await Firebase.saveClientAnswer(questionnaire);
    }
}

export default ClientService;