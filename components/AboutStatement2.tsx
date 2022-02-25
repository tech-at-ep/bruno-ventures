import { useRouter } from "next/router";
import React from "react";
import { useAuth, User } from "../util/firebaseAuthHelpers";

const headlineStyle = {
  color: 'rgb(239, 68, 68)'
};

const AboutStatement2 = () => {
  return (
    <div id="product">
      <div style={{backgroundImage: `url("../images/thisisatest.png")`}} className="flex flex-col items-center justify-start font-sans bg-gray-50 lg:pt-10 lg:bg-hero lg:bg-cover">
        <div className="items-center">
          <p className="p-44 text-3xl font-bold text-center text-blue-800 lg:mx-auto lg:w-6/6 lg:text-8xl lg:text-gray-90">
                        <strong class="headline__headline" style={headlineStyle}>ABOUT BRUNO VENTURES</strong>
                        <p class="p-16"></p>
                        <p className="p-8 text-4xl text-center">
                          Mission Statement:
                        </p>
                        <p className="p-8 text-2xl text-center">
                          For five decades we have partnered with intrepid founders to build iconic companies that made history. Today, Kleiner Perkins continues that legacy, investing in founders with bold ideas that span industries and continents, partnering with them from inception to IPO and beyond to maximize the potential of their ideas… and make history.
                        </p>
                        </p>
        </div>
      </div>
    </div>
  )
};
export default AboutStatement2;