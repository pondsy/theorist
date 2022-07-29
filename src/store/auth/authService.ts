import firebase from "firebase/compat/app";
import {Firebase} from "../../firebase/service";

class AuthService {

    static async login(email: string, password: string, role: string): Promise<firebase.auth.UserCredential | undefined> {
        return await Firebase.login(email, password, role);
    }

    static logout(): Promise<void> {
        return Firebase.logout();
    };
}

export default AuthService;