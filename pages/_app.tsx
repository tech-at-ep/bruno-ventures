import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {FirebaseAuthProvider, useFirebaseAuth} from "../util/firebaseAuthHelpers"
import Head from "next/head";

import Hero from '../components/Hero';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Startups from './startups';

import logo from "../assets/logo.jpeg";


function MyApp({Component, pageProps}: AppProps) {
    const firebaseAuthState = useFirebaseAuth();

    // Waits until the session is loaded before loading the page
    // if (firebaseAuthState.isLoading) return null

    return (<FirebaseAuthProvider value={firebaseAuthState}>
        <Head>
            <title>🐻 Bruno Ventures</title>
            <div className="box-border">
      <div className="flex flex-col">
        <Navbar/>
        <Hero 
          tagLine={'Startups start here.'}
        />
        <div id="divider" className="rounded-full ring-2 ring-gray-200 lg:w-1/2 lg:mx-auto "></div>
      </div>
      <div className="relative top-48">
        <Startups/>
        </div>
        
        <div className="relative top-96 h-2 my-24">
        <Footer logo={logo.src}/>
        </div>
    </div>
        </Head>
        <Component {...pageProps} />
    </FirebaseAuthProvider>)
}

export default MyApp
