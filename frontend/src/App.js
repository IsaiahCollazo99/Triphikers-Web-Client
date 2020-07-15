import React from "react";
import "./App.css";
import TripsPage from "./components/TripsPage/TripsPage";
import { Switch, Route } from "react-router-dom";
import CreateTripsContainer from "./components/CreateTrip/CreateTripContainer";
import DetailedTripPage from "./components/DetaliedTripPage/DetailedTripPage";
import LandingPage from "./components/LandingPage/LandingPage";
// import LandingPageNav from "./components/LandingPage/LandingPageNav";
import CreateSignUpContainer from "./components/Login/SignUpContainer";
import LocationPage from "./components/Location/LocationPage"
import Login	from "./components/Login/Login"
import UserPage from "./components/User/UserPage";
import NavBar from "./components/General/NavBar";


function App() {
	const displayMainNav = () => {
		if(window.location.pathname.includes("/trips" ) || window.location.pathname === "/user" || window.location.pathname.includes("/signIn" )) {
			return (
				<NavBar />
			)
		} else {
			return null;
		}
	}
	
	return (
		<div className="App">
			{displayMainNav()}
			<Switch>
				<Route exact path="/">
					<LandingPage />
				</Route>

				<Route path="/signUp" >
					<CreateSignUpContainer />
				</Route>

				<Route path="/signIn" >
					<Login />
				</Route>
				
				<Route path="/user" >
					<UserPage />
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
			
        <Route path="/location/:locationId">
          <LocationPage/>
        </Route>
      </Switch>
    </div>
	);
}

export default App;
