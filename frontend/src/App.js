import React from "react";
import "./App.css";
import TripsPage from "./components/TripsPage/TripsPage";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/General/Landing";
import SignUpForm from "./components/Login/SignUpForm";
import SignUpFormWithEmail from "./components/Login/SignUpFormWithEmail";
import LocationPage from "../src/components/Location/LocationPage";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<LandingPage />
        </Route>
        <Route path="/sign_up">
					<SignUpForm />
        </Route>
        {/* <Route path="/signUp_facebook">
					<SignUpFormWithFacebook />
        </Route>
        <Route path="/signUp_google">
					<SignUpFormWithGoogle/>
        </Route> */}
        <Route path="/signUp_email">
					<SignUpFormWithEmail/>
				</Route>
				<Route exact path="/">
					<TripsPage />
				</Route>
		<Route path="/location/:locationId">
			<LocationPage/>
		</Route>
			</Switch>
		</div>
	);
}

export default App;
