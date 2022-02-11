import { initializeApp, getApps, FirebaseApp, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

let firebaseApp: FirebaseApp;

if (getApps().length == 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

export default firebaseApp;
