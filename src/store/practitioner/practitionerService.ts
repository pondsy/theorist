import {Firebase} from "../../firebase/service";
import {Questionnaire} from "../../components/Questionnaires/Questionnaires";

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
}

export default PractitionerService;