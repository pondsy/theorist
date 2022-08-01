import {auth, db} from "./init";
import firebase from "firebase/compat/app";
import {Client, Questionnaire} from "../store/practitioner/practitionerTypes";
import {AuthState, UserData} from "../store/auth/authTypes";
import {ClientQuestionnaire} from "../store/client/clientTypes";

export class Firebase {

    public static login = async (email: string, password: string, role: string): Promise<AuthState> => {
        await auth.signInWithEmailAndPassword(email, password);
        const user = await firebase.auth().currentUser;
        if (!user) {
            await this.logout();
            throw new Error('User not found!');
        }
        const document = await this.getUser(user?.uid);
        if (!document) {
            await this.logout();
            throw new Error('User record not found!');
        }
        if (document.role !== role) {
            throw new Error(`You don't have permission to log in as ${role}!`);
        }

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role);
        return {
            user,
            data: document
        };
    };

    public static logout = async () => {
        localStorage.removeItem('user');
        await auth.signOut();
    };

    public static isLoggedIn = (): firebase.User | undefined => {
        const localUser = localStorage.getItem('user');
        return localUser ? JSON.parse(localUser) : firebase.auth().currentUser || undefined;
    };

    public static getQuestionnairesByPractitioner = async (uid: string): Promise<Questionnaire[]> => {
        let data: any[] = [];

        await db.collection("questionnaires").where("practitioner", "==", uid).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data = data.concat({id: doc.id, ...doc.data()})
                });
            })

        return data;
    };

    public static getClientQuestionnaires = async (ids: string[], clientId: string): Promise<ClientQuestionnaire[]> => {
        return await Promise.all(ids.map(async (id) => {
            return await db.collection("questionnaires").doc(id).get().then((querySnapshot) => {
                return {
                    clientId,
                    questionnaireId: querySnapshot.id,
                    ...querySnapshot.data()
                } as ClientQuestionnaire;
            })
        }))
    };

    public static getAnswersByClient = async (clientId: string): Promise<ClientQuestionnaire[]> => {
        let data: any[] = [];

        await db.collection("responses").where("clientId", "==", clientId).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data = data.concat({id: doc.id, ...doc.data()})
                });
            })

        return data;
    };

    public static getClientResponses = async (uid: string): Promise<ClientQuestionnaire[]> => {
        let data: any[] = [];

        await db.collection("responses").where("practitioner", "==", uid).get()
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
                    return this.getQuestionnairesByPractitioner(uid)
                })
        }
        return await db.collection("questionnaires").doc().set(questionnaire)
            .then(() => {
                return this.getQuestionnairesByPractitioner(uid)
            })
    };

    public static saveClientAnswer = async (questionnaire: ClientQuestionnaire): Promise<ClientQuestionnaire[]> => {

        const data = {
            questionnaireId: questionnaire.questionnaireId,
            clientId: questionnaire.clientId,
            title: questionnaire.title,
            questions: questionnaire.questions,
            added: questionnaire.added,
            practitioner: questionnaire.practitioner
        }

        return await db.collection("responses").doc().set(data)
            .then(async () => {
                return this.getAnswersByClient(questionnaire.clientId)
            })
    };

    public static deleteQuestionnaire = async (uid: string, questionnaireId: string): Promise<Questionnaire[]> => {
        if (!uid) throw new Error('missing practitioner uid!');
        if (!questionnaireId) throw new Error('Questionnaire is not saved!');

        return await db.collection('questionnaires').doc(questionnaireId).get()
            .then(function (querySnapshot) {
                querySnapshot.ref.delete()
            })
            .then(() => this.getQuestionnairesByPractitioner(uid));
    };

    public static removeQuestionnaireFromUsers = async (uid: string, questionnaireId: string, userIds: string[]): Promise<Client[]> => {
        if (!userIds) throw new Error('User ids not provided!');
        if (!questionnaireId) throw new Error('Questionnaire id is not provided!');

        return Promise.all(
            userIds.map(async (id) => {
                return await db.collection("users").doc(id).get().then((querySnapshot) => {
                    const questionnaire = (querySnapshot.data() as Client).questionnaire.filter((id) => id !== questionnaireId);
                    querySnapshot.ref.update({questionnaire})
                })
            })
        ).then(async () => await this.getClients(uid))
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

    public static assignQuestionnaire = async (uid: string, client: Client): Promise<Client[]> => {

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

    private static getUser = async (uid: string): Promise<UserData> => {
        return await db.collection("users").doc(uid).get().then((querySnapshot) => querySnapshot.data() as UserData);
    };

}