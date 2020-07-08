import React from "react";
import "./App.css";
import TripsPage from "./components/TripsPage/TripsPage";
import { Switch, Route } from "react-router-dom";
import CreateTripsContainer from "./components/CreateTrip/CreateTripContainer";
import DetailedTripPage from "./components/DetaliedTripPage/DetailedTripPage";
import LandingPage from "./components/General/Landing";
import SignUp from "./components/Login/SignUp";
import CreateSignUpForm1 from "./components/Login/CreateSignUpForm1";
import CreateSignUpForm2 from "./components/Login/CreateSignUpForm2";
import CreateSignUpForm3 from "./components/Login/CreateSignUpForm3";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<LandingPage />
				</Route>

				<Route path="/signUp">
					<SignUp />
				</Route>
				{/* <Route path="/signUpFacebook">
          <SignUpFormWithFacebook />
        </Route>
        <Route path="/signUpGoogle">
          <SignUpFormWithGoogle/>
        </Route> */}

				<Route path="/signUp1">
					<CreateSignUpForm1 />
				</Route>
				<Route path="/signUp2">
					<CreateSignUpForm2 />
				</Route>
				<Route path="/signUp3">
					<CreateSignUpForm3 />
				</Route>
				<Route exact path="/trips">
					<TripsPage />
				</Route>
				<Route path="/trips/create">
					<CreateTripsContainer />
				</Route>
				<Route path="/trips/:id">
					<DetailedTripPage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
