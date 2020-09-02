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
                <img src={worldIcon} className="landingPageIcon"/>
                <h1>Travel The World</h1>
                <p>Induldge in new culture, explore new cities, and experience adventure. The world is your oyster with Triphikers. </p>

                <img src={peopleIcon} className="landingPageIcon"/>
                <h1>Travel Together</h1>
                <p>Vacation with friends, venture with new buddies, or just meet locals. Triphikers connects you with people from around the globe.</p>

                <img src={selfieIcon} className="landingPageIcon"/>
                <h1>Travel, Create, and Share</h1>
                <p>Organize trips, choose your interests, and share photos with the community. Triphikers encourages users to share and travel with like-minded users.</p>
            </div>
		</section>
    )
}

export default LandingPageAbout;