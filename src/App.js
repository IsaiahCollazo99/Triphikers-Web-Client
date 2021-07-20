import React from "react";
import { Switch, Route } from "react-router-dom";

import CreateTripsContainer from "./pages/create-trip/create-trip-container";
import DetailedTripPage from "./pages/detailed-trip-page/detailed-trip-page";
import UserPageEdit from "./pages/edit-profile/edit-profile-page";
import LandingPage from "./pages/landing-page/landing-page";
import Safety from "./pages/landing-page/safety";
import LocationPage from "./pages/location-page/location-page"
import LocationSearch from "./pages/location-search/location-search";
import Login	from "./pages/login/login"
import MessagesPage from "./pages/messages-page/messages-page";
import NavBar from "./pages/nav-bar/nav-bar";
import CreateSignUpContainer from "./pages/sign-up/sign-up-container";
import TripsPage from "./pages/trips-page/trips-page";
import UserPage from "./pages/user-profile/user-profile";
import AuthProvider from "./providers/auth-context";
import { AuthRoute, ProtectedRoute } from "./util/routes-util";
import "./App.css";

function App() {

	return (
		<div className="App">
			<AuthProvider>
				<NavBar />

				<div id="back-to-top-anchor"></div>

				<Switch>
					<AuthRoute exact path="/">
						<LandingPage />
					</AuthRoute>

					<AuthRoute exact path="/signUp">
						<CreateSignUpContainer />
					</AuthRoute>

					<AuthRoute exact path="/signIn">
						<Login />
					</AuthRoute>

					<ProtectedRoute path="/user/edit">
						<UserPageEdit />
					</ProtectedRoute>

					<ProtectedRoute path="/user/:id">
						<UserPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/search">
						<LocationSearch />
					</ProtectedRoute>

					<ProtectedRoute exact path="/messages">
						<MessagesPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/updated/:id">
						<updateUser />
					</ProtectedRoute>

					<ProtectedRoute exact path="/trips">
						<TripsPage />
					</ProtectedRoute>

					<ProtectedRoute path="/trips/create">
						<CreateTripsContainer />
					</ProtectedRoute>

					<ProtectedRoute path="/trips/:id">
						<DetailedTripPage />
					</ProtectedRoute>

					<Route path="/location/:country/:city">
						<LocationPage />
					</Route>

					<Route path="/safety">
						<Safety/>
					</Route>
				</Switch>
			</AuthProvider>
		</div>
	);
}

export default App;
