import {auth, db} from "./init";
import firebase from "firebase/compat/app";
import {Client, Questionnaire} from "../store/practitioner/practitionerTypes";
import {AuthState} from "../store/auth/authTypes";

export class Firebase {

    public static login = async (email: string, password: string, role: string): Promise<AuthState|undefined> => {
        await auth.signInWithEmailAndPassword(email, password);
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
        return {
            user,
            data: document
        };
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

    private static getUser = async (uid: string): Promise<any> => {
        return await db.collection("users").doc(uid).get().then((querySnapshot) => querySnapshot.data());
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

    public static getClients = async (uid: string) => {
        let data: any[] = [];

        await db.collection("users").where("practitioner", "==", uid).where("role", "==", 'client').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data = data.concat({id: doc.id, ...doc.data()})
                });
        })

        return data;
    }

    public static assignQuestionnaire = async (uid: string, client: Client) => {

        const data = {
            name: client.name,
            email: client.email,
            role: client.role,
            questionnaire: client.questionnaire,
            birthdate: client.birthdate,
            practitioner: client.practitioner
        }
            return await db.collection("users").doc(client.id).set(data)
                .then(() => {
                    return this.getClients(uid)
                })
    }

}