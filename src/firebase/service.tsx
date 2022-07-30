import {auth, db} from "./init";
import firebase from "firebase/compat/app";
import {Questionnaire} from "../components/Questionnaires/Questionnaires";
import {FreeText} from "../components/Questionnaires/FreeTextQuestion/FreeTextQuestion";
import {MultiChoice} from "../components/Questionnaires/MultiChoiceQuestion/MultiChoiceQuestion";

export class Firebase {
    public static login = async (email: string, password: string, role: string): Promise<firebase.User|undefined> => {
        const login = await auth.signInWithEmailAndPassword(email, password);
        const user = await firebase.auth().currentUser;
        if (!user) {
            await this.logout('User not found!');
            return;
        }
        const document = await this.getUser(user?.uid);
        if (!document) {
            await this.logout('User record not found!');
            return;
        }
        if (document.role !== role) {
            await this.logout('Incorrect role!');
            return;
        }

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role);
        return user;
    };

    public static logout = async (error?: string) => {
        localStorage.removeItem('user');
        await auth.signOut();
        if (error) throw new Error(error);
    };

    public static isLoggedIn = (): firebase.User|undefined => {
        const localUser = localStorage.getItem('user');
        return localUser ? JSON.parse(localUser) : firebase.auth().currentUser || undefined;
    };

    public static getQuestionnaires = async (uid: string): Promise<any> => {
        let data: any[] = [];

        await db.collection("questionnaires").where("practitioner", "==", uid).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data = data.concat({id: doc.id, ...doc.data()})
                });
        })

        return data;
    };

    public static saveQuestionnaire = async (questionnaire: Questionnaire): Promise<Questionnaire[]> => {
        if (!questionnaire.practitioner) throw new Error('missing practitioner uid!');
        const uid = questionnaire.practitioner;

        if (questionnaire.id) {
            const data = {
                title: questionnaire.title,
                questions: questionnaire.questions,
                added: questionnaire.added,
                clients: questionnaire.clients,
                filledIn: questionnaire.filledIn,
                practitioner: questionnaire.practitioner
            }
            return await db.collection("questionnaires").doc(questionnaire.id).set(data)
                .then(() => {
                    return this.getQuestionnaires(uid)
                })
        }
        return await db.collection("questionnaires").doc().set(questionnaire)
            .then(() => {
                return this.getQuestionnaires(uid)
            })
    };

    public static deleteQuestionnaire = async (questionnaire: Questionnaire): Promise<Questionnaire[]> => {
        if (!questionnaire.practitioner) throw new Error('missing practitioner uid!');
        if (!questionnaire.id) throw new Error('Questionnaire is not saved!');

        const uid = questionnaire.practitioner;
        const id = questionnaire.id;

        return await db.collection('questionnaires').doc(id).get()
            .then(function(querySnapshot) {querySnapshot.ref.delete()})
            .then(() => this.getQuestionnaires(uid));
    };

    private static getUser = async (uid: string): Promise<any> => {
        return await db.collection("users").doc(uid).get().then((querySnapshot) => querySnapshot.data());
    };
}