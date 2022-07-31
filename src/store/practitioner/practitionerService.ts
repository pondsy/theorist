import {Firebase} from "../../firebase/service";
import {Questionnaire} from "../../components/Questionnaires/Questionnaires";
import {Client} from "./practitionerTypes";

class PractitionerService {

    static async getQuestionnaires(uid: string): Promise<Questionnaire[]> {
        return await Firebase.getQuestionnaires(uid);
    }

    static async saveQuestionnaire(questionnaire: Questionnaire): Promise<Questionnaire[]> {
        return await Firebase.saveQuestionnaire(questionnaire);
    }

    static async deleteQuestionnaire(questionnaire: Questionnaire): Promise<Questionnaire[]> {
        return await Firebase.deleteQuestionnaire(questionnaire);
    }

    static async getClients(uid: string): Promise<Client[]> {
        return await Firebase.getClients(uid);
    }

    static async assignQuestionnaire(uid: string, client: Client): Promise<Client[]> {
        return await Firebase.assignQuestionnaire(uid, client);
    }
}

export default PractitionerService;