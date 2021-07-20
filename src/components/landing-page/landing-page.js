import React from "react";
import '../../css/landingPage/landingPage.css';
import { useHistory } from "react-router-dom";
import LandingPageAbout from "./landing-page-about";
import LandingPageWhy from "./landing-page-why";

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
