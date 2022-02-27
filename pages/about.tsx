import styles from "../styles/Home.module.css";

import SplashScreen from "../util/splashscreen";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import logo from "../assets/logo.jpeg";
import Aaron from "../images/headshots/Aaron.jpeg";
import Jacob from "../images/headshots/Jacob_Headshot.jpeg";
import Michael from "../images/headshots/Michael_headshot.png";
import Nathan from "../images/headshots/nathan.jpeg";
import Placeholder from "../images/headshots/placeholder.jpeg";
import NelsonPic from "../assets/nelsonpic.jpeg";
import TeamMemberCard from "../components/TeamMemberCard";

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

  const aboutTextStyle = {
  letterSpacing: '3px',
  lineHeight: '50px'
  };

  const imageStyle= {
    backgroundImage: `url(${NelsonPic.src})`,
    height: '500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const membersArray = [
  {name: "Aaron Wang", title: "Engineering Manager", headshot: Aaron},
  {name: "Luke Primis", title: "Fullstack Engineer", headshot: Placeholder},
  {name: "Jennifer Wang", title: "Fullstack Engineer", headshot: Placeholder},
  {name: "Nathan Luu", title: "Fullstack Engineer", headshot: Nathan},
  {name: "Michael Xu", title: "Frontend Developer", headshot: Michael},
  {name: "Jacob Frausto", title: "Frontend Developer", headshot: Jacob}
  ]

  return (
    <div>
      {loading && <SplashScreen fading={fading} />}
      <div className="box-border">
        <div className="flex flex-col" style={imageStyle}>
          <Navbar />
          <div className="pt-44 pb-32 items-center" >
            <div className="headline__headline text-2xl font-bold text-center text-blue-800 lg:mx-auto lg:w-6/6 lg:text-8xl lg:text-gray-90 " style={headlineStyle}>
              ABOUT BRUNO VENTURES
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="text-center" style={{width: '50%'}}>
            <p className="p-16 text-5xl text-center">
              <b>Mission Statement:</b>
            </p>
            <div className="p-12 text-2xl text-center" style={aboutTextStyle}>
              For five decades we have partnered with intrepid founders to build iconic companies that made history. Today, Kleiner Perkins continues that legacy, investing in founders with bold ideas that span industries and continents, partnering with them from inception to IPO and beyond to maximize the potential of their ideas… and make history.
            </div>
          </div>
          <div className="text-center" style={{width: '50%'}}>
            <p className="pt-16 pb-8 text-5xl text-center">
              <b>Our Team:</b>
            </p>
            <div className="grid grid-cols-3 gap-6">
              {membersArray.map((member) => (
                <TeamMemberCard name={member.name} title={member.title} headshot={member.headshot}/>
              ))}
            </div>                      
          </div>
        </div>
        <div className="text-center pt-10">
            <p className="p-2 text-5xl text-center">
              Legal Language — TO BE REVIEWED WITH LIZ MALONE:
            </p>
            <p className="p-12 text-2xl text-center" style={aboutTextStyle}>
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
