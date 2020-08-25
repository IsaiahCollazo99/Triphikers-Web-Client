import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "../../css/general/navBar.css";
import { logout } from "../../util/firebaseFunction";
import { AuthContext } from "../../providers/AuthContext";
import { getUserById } from "../../util/apiCalls/getRequests";
import "bootstrap/dist/css/bootstrap.min.css";
const NavBar = () => {
	const { currentUser } = useContext(AuthContext);

	const [firstName, setFirstName] = useState("");
	const location = useLocation();

	const isOnTripsPage = location.pathname === "/trips";
	const isOnCreateTripsPage = location.pathname === "/trips/create";

	const displayCreateTrip = () => {
		if (isOnTripsPage || isOnCreateTripsPage) {
			return null;
		} else {
			return <NavLink to="/trips/create">CREATE A TRIP</NavLink>;
		}
	};

	const getFirstName = async () => {
		const data = await getUserById(currentUser.id);
		setFirstName(data.user.first_name);
	};

	const displayNavBar = () => {
		if (currentUser) {
			return (
				<section className="mainNav-right">
					{displayCreateTrip()}
					<NavLink exact to="/trips">
						TRIPS
					</NavLink>
					<NavLink to={`/user/${currentUser.id}`}>PROFILE</NavLink>
					<NavLink to="/search">CITY SEARCH</NavLink>
					<NavLink to="/messages">MESSAGES</NavLink>
					<a
						className="nav-link dropdown-toggle"
						data-toggle="dropdown"
						href="/trips"
						role="button"
						aria-expanded="false"
					>
						Hi, {firstName}
					</a>
					<div className="dropdown-menu">
						<a className="dropdown-item" href="/user/${currentUser.id}">
							PROFILE
						</a>
						<div className="dropdown-divider"></div>
						<a className="dropdown-item" href="/messages">
							MESSAGES
						</a>
						<div className="dropdown-divider"></div>
						<a className="dropdown-item" onClick={redirect}>
							LOG OUT
						</a>
					</div>
					<a onClick={redirect}>LOG OUT</a>
				</section>
			);
		} else {
			return (
				<section className="lp-navRight">
					<NavLink exact to="/">
						ABOUT
					</NavLink>
					<NavLink to="/safety">SAFETY</NavLink>
					<NavLink to="/signUp">CREATE ACCOUNT</NavLink>
					<NavLink to="/signIn">LOG IN</NavLink>
				</section>
			);
		}
	};

	const redirect = async () => {
		await logout();
	};

	useEffect(() => {
		getFirstName();
	}, []);

	return (
		<nav className="mainNav">
			<section className="mainNav-left">
				{/* Logo Here */}
				<h1>
					<Link to={currentUser ? "/trips" : "/"}>TRIPHIKERS</Link>
				</h1>
			</section>

			{displayNavBar()}
		</nav>
	);
};

export default NavBar;
