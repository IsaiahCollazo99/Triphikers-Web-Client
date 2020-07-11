import React from "react";
import LandingPageIcons from "./LandingPageIcons";
import LandingPageLatest from "./LandingPageLatest";
import LandingPagePopular from "./LandingPagePopular";
import '../../css/landingPage/landingPage.css';
import { useHistory } from "react-router-dom";
import LandingPageNav from "./LandingPageNav";

const LandingPage = () => {
  const history = useHistory();
 
  const redirect = () => {
    history.push("/sign_up");
  }
    
  return (
		<main className="landingPage">
      <section className="lp-top">
        <LandingPageNav />

        <h2>A portal for solo travelers</h2>

        <section className="lp-buttons">
          <button onClick={redirect}>
            CREATE ACCOUNT
          </button>

          <button onClick={() => history.push("/sign_in")}>
            LOGIN
          </button>
        </section>

      </section>

      <section className="lp-middle">
        <LandingPageIcons redirect={redirect} />
      </section>
			
      <section className="lp-bottom">
        <LandingPageLatest />

        <button onClick={redirect}>See More Trips</button>

        <LandingPagePopular />
      </section>

		</main>
	);
 }
 export default LandingPage
