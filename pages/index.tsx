import styles from '../styles/Home.module.css'

import SplashScreen from '../util/splashscreen';
import { useState, useEffect } from 'react';

import Hero from '../components/Hero';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Startups from './startups';

import { isMobile } from 'react-device-detect';

import logo from "../assets/logo.jpeg";

export default function Home() {
    const [loading, setLoading] = useState<boolean>(true);
    const [fading, setFading] = useState<boolean>(false);
    // Waits until the session is loaded before loading the page
    // if (firebaseAuthState.isLoading) return null
    
    useEffect(() => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
      loading ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible';
    })

    const StopLoading = () => {
      console.log()
      setFading(true);
      setTimeout(() => setLoading(false), 1000);
    }

    setTimeout(StopLoading, 2000);

    if (!isMobile){
        return (
            <div>
                {loading && <SplashScreen fading={fading}/>}
                <div className="box-border">
                    <div className="flex flex-col">
                        <Navbar/>
                        <Hero 
                        tagLine={'Startups start here.'} isMobile={false}
                        />
                        <div id="divider" className="rounded-full ring-2 ring-gray-200 lg:w-1/2 lg:mx-auto " />
                    </div>
                    <div className="relative top-48">
                        <Startups isMobile={false}/>
                    </div>
                    
                    <div className="relative top-96 h-2 my-24">
                        <Footer logo={logo}/>
                    </div>
                </div>
            </div>
        )
    } else {
        // mobile view
        return (
            <div>
                {loading && <SplashScreen fading={fading}/>}
                <div className="box-border">
                    <div className="flex flex-col">
                        <Navbar/>
                        <Hero 
                        tagLine={'Startups start here.'} isMobile={true}
                        />
                        <div id="divider" className="rounded-full ring-2 ring-gray-200 lg:w-1/2 lg:mx-auto " />
                    </div>
                    <div className="relative top-48">
                        <Startups isMobile={true}/>
                    </div>
                    
                    <div className="relative top-96 h-2 my-24">
                        <Footer logo={logo}/>
                    </div>
                </div>
            </div>
        )
    }
}
