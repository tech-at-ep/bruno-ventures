import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {FirebaseAuthProvider, useFirebaseAuth} from "../util/firebaseAuthHelpers"
import Head from "next/head";

function MyApp({Component, pageProps}: AppProps) {
    const firebaseAuthState = useFirebaseAuth();

    // Waits until the session is loaded before loading the page
    if (firebaseAuthState.isLoading) return null

    return (<FirebaseAuthProvider value={firebaseAuthState}>
        <Head>
            <title>🐻 Bruno Ventures</title>
        </Head>
        <Component {...pageProps} />
    </FirebaseAuthProvider>)
    // return <Component {...pageProps} />
}

export default MyApp
