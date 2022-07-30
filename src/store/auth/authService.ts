import firebase from "firebase/compat/app";
import {Firebase} from "../../firebase/service";

class AuthService {

    static async login(email: string, password: string, role: string): Promise<firebase.User | undefined> {
        return await Firebase.login(email, password, role);
    }

    static logout(): Promise<void> {
        return Firebase.logout();
    };

    static isLoggedIn(): firebase.User|undefined {
        return Firebase.isLoggedIn();
    }
}

export default AuthService;