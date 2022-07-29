import firebase from "firebase/compat/app";
import {Firebase} from "../../firebase/service";

class AuthService {

    static async login(email: string, password: string): Promise<firebase.auth.UserCredential | undefined> {
        return Firebase.login(email, password)
    }

    static logout(): Promise<void> {
        return Firebase.logout();
    };
}

export default AuthService;