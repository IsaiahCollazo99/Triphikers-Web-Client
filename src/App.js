import React from "react";
import { AuthRoute, ProtectedRoute } from "./util/routesUtil";
import { Switch, Route } from "react-router-dom";
import TripsPage from "./components/trips-page/trips-page";
import CreateTripsContainer from "./components/create-trip/create-trip-container";
import DetailedTripPage from "./components/detailed-trip-page/detailed-trip-page";
import LandingPage from "./components/landing-page/landing-page";
import CreateSignUpContainer from "./components/sign-up/sign-up-container";
import LocationPage from "./components/location-page/location-page"
import Login	from "./components/login/login"
import UserPage from "./components/user-profile/user-profile";
import NavBar from "./components/nav-bar/nav-bar";
import AuthProvider from "./providers/AuthContext";
import LocationSearch from "./components/Location/LocationSearch";
import UserPageEdit from "./components/edit-profile/edit-profile-page";
import MessagesPage from "./components/chat-list/messages-page";
import Safety from "./components/landing-page/safety";
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
