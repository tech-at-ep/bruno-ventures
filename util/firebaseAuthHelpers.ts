import {createContext, useContext, useEffect, useState} from 'react';
import {User} from "@firebase/auth";
import firebaseClient from "./firebaseClient";

export interface AuthState {
    /** Indicates if the current user is logged in. */
    isAuthenticated: boolean;
    /** Indicates whether the auth session is currently being loaded. */
    isLoading: boolean;
    /** The current user, if logged in. */
    user?: User;
}

/** The initial authentication state */
export const defaultAuthState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    user: undefined
};

const FirebaseAuthContext = createContext<AuthState>(defaultAuthState);
export const FirebaseAuthProvider = FirebaseAuthContext.Provider;

/** Hook that provides a session listener and various session methods */
export function useFirebaseAuth() {
    const [authState, setAuthState] = useState(defaultAuthState);

    useEffect(() => {
        // create authentication state listener
        firebaseClient.auth().onAuthStateChanged((user: User) => {
            if (user) {
                // User is signed in.
                setAuthState({isAuthenticated: true, isLoading: false, user: user});
            } else {
                // User is signed out.
                setAuthState({isAuthenticated: false, isLoading: false, user: undefined});
            }
        });
    }, []);

    return authState;
}

/** Hook for reading and interacting with the app's current Firebase auth session */
export function useAuth() {
    return useContext(FirebaseAuthContext);
}