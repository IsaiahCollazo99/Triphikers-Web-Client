import React from "react";
import '../../css/landingPage/landingPage.css';
import { useHistory } from "react-router-dom";
import LandingPageAbout from "./LandingPageAbout";
import LandingPageWhy from "./LandingPageWhy";

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
