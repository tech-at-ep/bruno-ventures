import styles from "../styles/Home.module.css";

import SplashScreen from "../util/splashscreen";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutStatement2 from "../components/AboutStatement2";
import Ourteam from "../components/Ourteam";
import LegalNotice from "../components/LegalNotice";

import logo from "../assets/logo.jpeg";
import Aaron from "../images/headshots/Aaron.jpeg";
import Jacob from "../images/headshots/Jacob_Headshot.jpeg";
import Michael from "../images/headshots/Michael_headshot.png";
import Nathan from "../images/headshots/nathan.jpeg";
import Placeholder from "../images/headshots/placeholder.jpeg";

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

  const headlineStyle = {
  color: 'rgb(239, 68, 68)'
  };
  const cardStyle = {
    height: '200px',
    width: '150px'
  };
  const nameStyle = {
    fontSize: '15px',
  }
  const titleStyle = {
    fontWeight: 'normal',
    fontSize: '10px',
  }
  const imgStyle= {
    //   height: '130px',
    // width: '150px'
  }

  return (
    <div>
      {loading && <SplashScreen fading={fading} />}
      <div className="box-border">
        <div className="flex flex-col">
          <Navbar />
          <div className="p-44 items-center">
            <div className="headline__headline text-2xl font-bold text-center text-blue-800 lg:mx-auto lg:w-6/6 lg:text-8xl lg:text-gray-90 " style={headlineStyle}>
              ABOUT BRUNO VENTURES
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="text-center" style={{width: '50%'}}>
            <p className="p-4 text-4xl text-center">
              Mission Statement:
            </p>
            <p className="p-4 text-2xl text-center">
              For five decades we have partnered with intrepid founders to build iconic companies that made history. Today, Kleiner Perkins continues that legacy, investing in founders with bold ideas that span industries and continents, partnering with them from inception to IPO and beyond to maximize the potential of their ideas… and make history.
            </p>
          </div>
          <div className="text-center" style={{width: '50%'}}>
            <p className="p-4 text-4xl text-center">
              Our Team:
            </p>
            <div className="grid grid-cols-4 gap-4">
              <div className="card" style={cardStyle}>
                <img src={Aaron.src} style={imgStyle}></img>
                <p class="text-center text-center" style={nameStyle}>Aaron Wang</p>
                <p class="text-center" style={titleStyle}>Engineering Manager</p>
              </div>
              <div className="card" style={cardStyle}>
                <img src={Aaron.src} style={imgStyle}></img>
                <p class="text-center text-center" style={nameStyle}>Aaron Wang</p>
                <p class="text-center" style={titleStyle}>Engineering Manager</p>
              </div>
            </div>                      
          </div>
        </div>
        <div className="text-center p-20">
            <p className="p-4 text-4xl text-center">
              Legal Language — TO BE REVIEWED WITH LIZ MALONE:
            </p>
            <p className="p-4 text-2xl text-center">
              The sole purpose of this website is to recognize the existing work of Brown University student ventures. Furthermore, Brown EP and the Nelson Center for Entrepreneurship are not liable for any unwarranted copying of current ventures.
            </p>
          </div>
        <div className="relative top-0 h-2 my-24">
          <Footer logo={logo} />
        </div>
      </div>
    </div>
  );
}
