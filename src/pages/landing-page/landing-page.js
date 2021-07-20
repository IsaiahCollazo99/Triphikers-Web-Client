import React from "react";
import { useHistory } from "react-router-dom";

import LandingPageAbout from "./components/landing-page-about";
import LandingPageWhy from "./components/landing-page-why";
import './landing-page.css';

const LandingPage = () => {
	const history = useHistory();
 
    const redirect = () => {
      history.push("/signUp");
    }
    
    return (
        <main className="landingPage">
			<LandingPageAbout redirect={redirect} />

			<LandingPageWhy redirect={redirect} />
        </main>
    )
}
 export default LandingPage
