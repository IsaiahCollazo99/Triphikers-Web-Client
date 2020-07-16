import React from "react";
import "./App.css";
import TripsPage from "./components/TripsPage/TripsPage";
import { Switch, Route } from "react-router-dom";
import CreateTripsContainer from "./components/CreateTrip/CreateTripContainer";
import DetailedTripPage from "./components/DetaliedTripPage/DetailedTripPage";
import LandingPage from "./components/LandingPage/LandingPage";
import CreateSignUpContainer from "./components/Login/SignUpContainer";
import LocationPage from "./components/Location/LocationPage"
import Login	from "./components/Login/Login"
import UserPage from "./components/User/UserPage";
import NavBar from "./components/General/NavBar";
import { AuthRoute, ProtectedRoute } from "./util/routesUtil";
import LandingPageNav from "./components/LandingPage/LandingPageNav";


function App() {
	const displayMainNav = () => {
		if(window.location.pathname.includes("/trips" ) || window.location.pathname === "/user") {
			return (
				<NavBar />
			)
		} else {
			return (
				<LandingPageNav />
			)
		}
	}
	
	return (
		<div className="App">
			<Switch>
				<AuthRoute exact path="/">
					<LandingPageNav />
					<LandingPage />
				</AuthRoute>

				<AuthRoute exact path="/signUp" >
					<LandingPageNav />
					<CreateSignUpContainer />
				</AuthRoute>

				<AuthRoute exact path="/signIn" >
					<LandingPageNav />
					<Login />
				</AuthRoute>
				
				<ProtectedRoute exact path="/user" >
					<NavBar />
					<UserPage />
				</ProtectedRoute>
				
				<ProtectedRoute exact path="/trips">
					<NavBar />
					<TripsPage />
				</ProtectedRoute>

				<ProtectedRoute path="/trips/create">
					<NavBar />
					<CreateTripsContainer />
				</ProtectedRoute>

				<ProtectedRoute path="/trips/:id">
					<NavBar />
					<DetailedTripPage />
				</ProtectedRoute>
				
				<ProtectedRoute path="/location/:locationId">
					<NavBar />
					<LocationPage/>
				</ProtectedRoute>
			</Switch>
		</div>
	);
}

export default App;
