import React from 'react';
import '../../css/landingPage/landingPageAbout.css';
import LandingPageSearch from './LandingPageSearch';
import worldIcon from "../../images/icons/around-the-globe-icon.png";
import peopleIcon from "../../images/icons/people-icon.png";
import selfieIcon from "../../images/icons/selfie-icon.png";

const LandingPageAbout = ({ redirect }) => {
    return (
        <section className="lp-about">
            <div className="leftContainer">
                <h1>FIND YOUR TRAVEL PARTNERS FOR LIFE. FOR FREE</h1>
                <LandingPageSearch redirect={redirect}/>
			    <button onClick={redirect} className="lp-orange">Create Your Trip</button>
            </div>
            <div className="rightContainer">
                <div className="landingPageCard">
                    <img src={worldIcon} alt="icon" className="landingPageIcon"/>
                    <h2 className="landingPageCardTitle">Travel The World</h2>
                    <p className="landingPageCardInfo">Indulge in new cultures, explore new cities, and experience adventure.</p>
                </div>
                <div className="landingPageCard">
                    <img src={peopleIcon} alt="icon" className="landingPageIcon"/>
                    <h2 className="landingPageCardTitle">Travel Together</h2>
                    <p className="landingPageCardInfo">Vacation with friends, venture with new buddies, or tour with locals.</p>
                </div>
                <div className="landingPageCard">
                    <img src={selfieIcon} alt="icon" className="landingPageIcon"/>
                    <h2 className="landingPageCardTitle">Travel & Share</h2>
                    <p className="landingPageCardInfo">Organize trips, choose your interests, and share photos with the community.</p>
                </div>
            </div>
		</section>
    )
}

export default LandingPageAbout;