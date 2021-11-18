import styles from '../styles/Home.module.css'
import {useAuth} from "../util/firebaseAuthHelpers";

export default function Home() {
    const {isAuthenticated, user, signInWithGoogle, signOut} = useAuth();

    return (
        <div className={styles.container}>
            {isAuthenticated ? <div>
                <h1>Signed in as {user?.email}</h1>
                <button onClick={signOut}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign out
                </button>
            </div> : <div>
                <h1>Signed out:</h1>
                <button onClick={signInWithGoogle}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign in with Google
                </button>
            </div>}

        </div>
    )
}
