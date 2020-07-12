import React from "react";

import LandingPageNav from "./LandingPageNav";
import { Switch, Route } from "react-router-dom";
import LandingPageAbout from "./LandingPageAbout";

const LandingPage = () => {
  return (
		<main className="landingPage">
      <LandingPageNav />
     
      <Switch>
        <Route exact to="/">
          <LandingPageAbout /> 
        </Route>
      </Switch>
		</main>
	);
 }
 export default LandingPage
