import React from "react";
import logo from "../../images/logo.png";
import LandingPageIcons from "./LandingPageIcons";

 const LandingPage = () =>{
	return (
		<main className="landingPage">
      <section className="lp-top">
        <header>
          {/* <img src={logo} alt="triphikersLogo" /> */}
          <h1>TRIPHIKERS</h1>
        </header>
        
        <LandingPageIcons />

        <section className="lp-signUpIn">
          <button>
            CREATE ACCOUNT
          </button>

          <button>
            LOGIN
          </button>
        </section>

      </section>
			
      <section className="lp-bottom">
        <section className="lp-latestTrips">
          <p>LATEST TRIPS</p>
        </section>

        <section className="lp-mostPopular">
          <p>MOST POPULAR DESTINATION</p>
        </section>
      </section>

		</main>
	);
 }
 export default LandingPage
