import React from "react";
import { AuthRoute, ProtectedRoute } from "./util/routesUtil";
import { Switch, Route } from "react-router-dom";
import TripsPage from "./components/TripsPage/TripsPage";
import CreateTripsContainer from "./components/CreateTrip/CreateTripContainer";
import DetailedTripPage from "./components/DetaliedTripPage/DetailedTripPage";
import LandingPage from "./components/LandingPage/LandingPage";
import CreateSignUpContainer from "./components/Login/SignUpContainer";
import LocationPage from "./components/Location/LocationPage"
import Login	from "./components/Login/Login"
import UserPage from "./components/User/UserPage";
import NavBar from "./components/General/NavBar";
import AuthProvider from "./providers/AuthContext";
import LocationSearch from "./components/Location/LocationSearch";
import UserPageEdit from "./components/UserEdit/UserPageEdit";
import Messages from "./components/General/Messages";
import Safety from "./components/General/Safety";
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
						<Messages />
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
