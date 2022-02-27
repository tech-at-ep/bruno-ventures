import { useRouter } from "next/router";
import React from "react";
import { useAuth, User } from "../util/firebaseAuthHelpers";

const Navbar = () => {

  // const [openNav, setOpenNav] = useState(false);

  // const wrapperRef = useRef(null);
  // // useOutsideAlerter(wrapperRef, setOpenNav);
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const handleSignin = async () => {
    try {
      await signInWithGoogle();
      router.push("/form");
    } 
    catch(e) {
      console.log(e);
    }
  }
  const sendToAboutPage = (e) => {
      e.preventDefault();
      window.location.href='/about';
      }
  const sendToAbout2Page = (e2) => {
      e2.preventDefault();
      window.location.href='/about2';
      }
  const sendHome = (ev) => {
      ev.preventDefault();
      window.location.href='/';
      }

const navStyle = {
  backgroundColor: 'rgba(50, 50, 50, 0.5)',
  height: '100px',
};
const navButtonStyle = {
  opacity: '1'
};

  return (
    <div className="flex flex-auto justify-end items-center h-28 absolute left-0 right-0 top-0" style={navStyle}>
          
          {/* Desktop Nav */}
          <div className="flex justify-evenly w-1/4 mr-12 lg:visible sm:visible">
{/*          <div className="flex justify-evenly w-1/5 mr-12 lg:visible sm:visible">
*/}              <button onClick={handleSignin} className="text-lg font-light text-white transition-all hover:text-red-500" style={navButtonStyle}>For Startups</button>
              <button onClick={sendToAboutPage} className="text-lg font-light text-white transition-all hover:text-red-500" style={navButtonStyle}>About Us</button>
              <button onClick={sendToAbout2Page} className="text-lg font-light text-white transition-all hover:text-red-500" style={navButtonStyle}>About Us2</button>
              <button onClick={sendHome} className="text-lg font-light text-white transition-all hover:text-red-500" style={navButtonStyle}>Home</button>
          </div>
    </div>
  );
};

export default Navbar;
