import {auth, db} from "./init";
import firebase from "firebase/compat/app";

export class Firebase {
    public static login = async (email: string, password: string, role: string): Promise<firebase.auth.UserCredential|undefined> => {
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
        return login;
    };

    public static logout = async (error?: string) => {
        localStorage.removeItem('user');
        await auth.signOut();
        if (error) throw new Error(error);
    };

    public static isLoggedIn = (): firebase.User|undefined => {
        const localUser = localStorage.getItem('user');
        return localUser ? JSON.parse(localUser) : firebase.auth().currentUser || undefined;
    }

    private static getUser = async (uid: string): Promise<any> => {
        return await db.collection("users").doc(uid).get().then((querySnapshot) => querySnapshot.data());
    }
}