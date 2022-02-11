import "../styles/globals.css";
import "../styles/button.css";
import type { AppProps } from "next/app";
import {
  FirebaseAuthProvider,
  useFirebaseAuth,
} from "../util/firebaseAuthHelpers";
import Head from "next/head";

import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  const firebaseAuthState = useFirebaseAuth();

  return (
    <FirebaseAuthProvider value={firebaseAuthState}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>🐻 Bruno Ventures</title>
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
    </FirebaseAuthProvider>
  );
  // return <Component {...pageProps} />
}

export default MyApp;
