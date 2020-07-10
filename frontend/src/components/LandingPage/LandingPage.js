import React from "react";
import logo from "../../images/logo.png";
import LandingPageIcons from "./LandingPageIcons";
import LandingPageLatest from "./LandingPageLatest";
import LandingPagePopular from "./LandingPagePopular";
import '../../css/landingPage/landingPage.css';

 const LandingPage = () =>{
	return (
		<main className="landingPage">
      <section className="lp-top">
        <header>
          {/* <img src={logo} alt="triphikersLogo" /> */}
          <h1>TRIPHIKERS</h1>
        </header>
        
        <LandingPageIcons />

        <section className="lp-buttons">
          <button>
            CREATE ACCOUNT
          </button>

          <button>
            LOGIN
          </button>
        </section>

      </section>
			
      <section className="lp-bottom">
        <LandingPageLatest />

        <LandingPagePopular />
      </section>

		</main>
	);
 }
 export default LandingPage
