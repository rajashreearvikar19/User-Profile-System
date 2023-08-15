import React from "react";
import "./SocialCard.css";
import Location from "./Location";
import Phone from "./Phone";

const SocialCard = ({ userData, activeProfile, onClick }) => {
  const { location, phone, cell, name } = userData;
  const isActive = userData === activeProfile;
  
  const email = `${name.first.toLowerCase()}.${name.last.toLowerCase()}@gmail.com`;

  return (
    <div className={`Card_Main ${isActive ? "active" : ""}`} onClick={onClick}>
      <div className="gradiant"></div>
      <div className="card__image"><img src={userData.picture.large} alt='error' /></div>
      <div className="card__title">{userData.name.first} {userData.name.last}</div>
      <div className="card__body">
        <Location location={location} />
        <Phone number={phone} type="Home" />
        <Phone number={cell} type="Cell" />
        <p> Conatct📩: {email}</p>
      </div>
    </div>
  );
};

export default SocialCard;