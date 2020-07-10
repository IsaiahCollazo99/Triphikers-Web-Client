import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom"

 const LandingPage = () =>{
	return (
		<main className="landingPage">
			<header>
				{/* <img src={logo} alt="triphikersLogo" /> */}
				<h1>TRIPHIKERS</h1>
      </header>
      
      <section className="lp-icons"> 
        <button>
					<Link to="/creat_a_plan">
            CREATE A PLAN
					</Link>
        </button>

        <button>
          <Link to="/find_buddies">
            FIND BUDDIES
          </Link>
        </button>

        <button>
          <Link to="/travel">
            TRAVEL
					</Link>
        </button>
			</section>

      <section>
        <button className="signUpBtn">
          <Link to="/sign_up">
            CREATE ACCOUNT
          </Link>
        </button>

        <button className="signIpBtn">
          <Link to="/sign_in">
            LOGIN
					</Link>
        </button>
			</section>

			<section>
				<p>LATEST TRIPS</p>
			</section>

			<section>
				<p>MOST POPULAR DESTINATION</p>
			</section>
		</main>
	);
 }
 export default LandingPage
