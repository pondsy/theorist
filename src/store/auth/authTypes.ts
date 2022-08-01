import firebase from "firebase/compat/app";

export interface AuthState {
    user?: firebase.User;
    data?: UserData;
}

export interface UserData {
    email: string;
    name: string;
    birthdate: string;
    role: string;
    practitioner?: string;
    questionnaire?: string[]
}