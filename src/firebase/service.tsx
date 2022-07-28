import {auth} from "./init";
import firebase from "firebase/compat/app";

export class Firebase {
    public static login = async (email: string, password: string): Promise<firebase.auth.UserCredential> => {
        return await auth.signInWithEmailAndPassword(email, password);
    };

    public static logout = async () => {
        await auth.signOut();
    };
}