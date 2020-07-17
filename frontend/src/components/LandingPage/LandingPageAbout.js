import React from 'react';
import { useHistory } from 'react-router-dom';
import LandingPageCreateAccount from "./LandingPageCreateAccount";

const LandingPageAbout = () => {
    const history = useHistory();

    const redirect = () => {
        history.push("/signUp");
    }
    
    return (
        <section className="lp-top">

            <h1>FIND YOUR TRAVEL PARTNERS FOR LIFE</h1>

            <section className="lp-buttons">
                <LandingPageCreateAccount redirect={redirect} />

                <button onClick={() => history.push("/signIn")}>
                    LOGIN
                </button>
            </section>

		</section>
    )
}

export default LandingPageAbout;