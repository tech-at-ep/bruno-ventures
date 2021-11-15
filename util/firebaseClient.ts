// @ts-ignore
import firebase from 'firebase';
import {FirebaseError} from "@firebase/util";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId
};
try {
    if (typeof window !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        firebase.analytics()
    }
} catch (err) {
    if (err instanceof FirebaseError) {
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }
}

const firebaseClient = firebase;
export default firebaseClient;