import { useRouter } from "next/router";
import React from "react";
import { useAuth, User } from "../util/firebaseAuthHelpers";
import Aaron from "../images/headshots/Aaron.jpeg";
import Jacob from "../images/headshots/Jacob_Headshot.jpeg";
import Michael from "../images/headshots/Michael_headshot.png";
import Nathan from "../images/headshots/nathan.jpeg";
import Placeholder from "../images/headshots/placeholder.jpeg";

const cardStyle = {
  height: '350px',
  width: '250px'
};
const nameStyle = {
  fontSize: '30px',
}
const titleStyle = {
  fontWeight: 'normal',
}
const imgStyle= {
    height: '250px',
  width: '250px'
}

const Ourteam = () => {
  return (
    <div id="product">
      <div style={{backgroundImage: `url("../images/thisisatest.png")`}} className="flex flex-col items-center justify-start font-sans bg-gray-50 lg:pb-20 lg:bg-hero lg:bg-cover">
        <div className="items-center">
          <p className="p-2 text-3xl font-bold text-center text-blue-800 lg:mx-auto lg:w-6/6 lg:text-8xl lg:text-gray-90">
                        <p className="p-8 text-4xl text-center">
                          Our Team:
                        </p>
                       <div class="flex flex-row">
                        <div class="card basis-1/4" style={cardStyle}>
                          <img src={Aaron.src} style={imgStyle}></img>
                          <p class="text-center text-center" style={nameStyle}>Aaron Wang</p>
                          <p class="text-center" style={titleStyle}>Engineering Manager</p>
                        </div>
                        <div class="card basis-1/4" style={cardStyle}>
                          <img src={Placeholder.src} style={imgStyle}></img>
                          <p class="text-center" style={nameStyle}> Luke Primis</p>
                          <p class="text-center" style={titleStyle}>Fullstack Engineer</p>
                        </div>
                        <div class="card basis-1/4" style={cardStyle}>
                          <img src={Placeholder.src} style={imgStyle}></img>
                          <p class="text-center" style={nameStyle}> Jennifer Wang</p>
                          <p class="text-center" style={titleStyle}>Fullstack Engineer</p>
                        </div>
                        <div class="card basis-1/4" style={cardStyle}>
                          <img src={Nathan.src} style={imgStyle}></img>
                          <p class="text-center" style={nameStyle}> Nathan Luu</p>
                          <p class="text-center" style={titleStyle}>Fullstack Engineer</p>
                        </div>
                        <div class="card basis-1/4" style={cardStyle}>
                          <img src={Michael.src} style={imgStyle}></img>
                          <p class="text-center" style={nameStyle}> Michael Xu</p>
                          <p class="text-center" style={titleStyle}>Frontend Developer</p>
                        </div>
                        <div class="card basis-1/4" style={cardStyle}>
                          <img src={Jacob.src} style={imgStyle}></img>
                          <p class="text-center" style={nameStyle}> Jacob Frausto</p>
                          <p class="text-center" style={titleStyle}>Frontend Developer</p>
                        </div>
                      </div>
                      </p>
        </div>
      </div>
    </div>
  )
};
export default Ourteam;