import React from 'react';
import LandingPageLatest from "./LandingPageLatest";
import '../../css/landingPage/landingPageAbout.css';

const LandingPageAbout = ({ redirect }) => {
    return (
        <section className="lp-about">

            <h1>FIND YOUR TRAVEL PARTNERS FOR LIFE. FOR FREE</h1>

            <LandingPageLatest />

			<button onClick={redirect} className="lp-orange">See More Trips</button>

		</section>
    )
}

export default LandingPageAbout;