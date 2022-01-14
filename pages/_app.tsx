import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  FirebaseAuthProvider,
  useFirebaseAuth,
} from "../util/firebaseAuthHelpers";
import Head from "next/head";

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
      <Component {...pageProps} />
    </FirebaseAuthProvider>
  );
  // return <Component {...pageProps} />
}

export default MyApp;
