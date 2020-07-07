import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom"

 const LandingPage = () =>{
	return (
		<section>
			<section className="headers">
				<section>
					{/* <img src={logo} alt="triphikersLogo" /> */}
				</section>
				<h1>TRIPHIKERS</h1>
      </section>
      
      <section> 
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
		</section>
	);
 }
 export default LandingPage
