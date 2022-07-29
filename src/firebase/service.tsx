import {auth, db} from "./init";
import firebase from "firebase/compat/app";

export class Firebase {
    public static login = async (email: string, password: string, role: string): Promise<firebase.auth.UserCredential|undefined> => {
        const login = await auth.signInWithEmailAndPassword(email, password);
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
            await this.logout();
            throw new Error('Incorrect role!');
        }

        return login;
    };

    public static logout = async () => {
        await auth.signOut();
    };

    private static getUser = async (uid: string): Promise<any> => {
        return await db.collection("users").doc(uid).get().then((querySnapshot) => querySnapshot.data());
    }
}