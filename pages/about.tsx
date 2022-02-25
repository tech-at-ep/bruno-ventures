import styles from "../styles/Home.module.css";

import SplashScreen from "../util/splashscreen";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutStatement from "../components/AboutStatement";
import Ourteam from "../components/Ourteam";
import LegalNotice from "../components/LegalNotice";

import logo from "../assets/logo.jpeg";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [fading, setFading] = useState<boolean>(false);
  // Waits until the session is loaded before loading the page
  // if (firebaseAuthState.isLoading) return null

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    loading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  });

  const StopLoading = () => {
    setFading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  setTimeout(StopLoading, 2000);

  return (
    <div>
      {loading && <SplashScreen fading={fading} />}
      <div className="box-border">
        <div className="flex flex-col">
          <Navbar />
          <AboutStatement />
        </div>
        <div className="relative top-0">
          <Ourteam />
        </div>
        <div className="relative top-0">
          <LegalNotice />
        </div>

        <div className="relative top-0 h-2 my-24">
          <Footer logo={logo} />
        </div>
      </div>
    </div>
  );
}
