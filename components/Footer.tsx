import React from "react";

const Footer = ({logo}: {logo: StaticImageData}) => {
  return (
    <div id="contact" className="flex justify-center items-center p-4">
              <p>Powered by   </p>
      <a href="/" className="ml-1 w-6 h-6">      
        <img src={logo.src} alt="logo"/>
      </a>
    </div>
  );
};

export default Footer;
