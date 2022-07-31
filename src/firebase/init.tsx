import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ENV from "../utils/environments";

const firebaseConfig = {
    apiKey: ENV.API_KEY,
    authDomain: ENV.AUTH_DOMAIN,
    projectId: ENV.PROJECT_ID,
    storageBucket: ENV.STORAGE_BUCKET,
    messagingSenderId: ENV.MESSAGING_SENDER_ID,
    appId: ENV.APP_ID,
    measurementId: ENV.MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export {auth, db};
