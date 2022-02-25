import { useRouter } from "next/router";
import React from "react";
import { useAuth, User } from "../util/firebaseAuthHelpers";

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


const TeamMemberCard = ({name, title, headshot}: { name: string, title: string, headshot: StaticImageData}) => {
  return (
  	<div className="card" style={cardStyle}>
    	<img src={headshot.src} style={imgStyle}></img>
    	<p class="text-center text-center" style={nameStyle}>{name}</p>
    	<p class="text-center" style={titleStyle}>{title}</p>
  	</div>
  )
};
export default TeamMemberCard;