import firebase from "firebase/compat/app";
import {Firebase} from "../../firebase/service";

class PractitionerService {

    static async getQuestionnaires(uid: string): Promise<any> {
        return await Firebase.getQuestionnaires(uid);
    }
}

export default PractitionerService;