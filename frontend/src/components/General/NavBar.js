import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "../../css/general/navBar.css";
import { logout } from "../../util/firebaseFunction";
import { AuthContext } from "../../providers/AuthContext";
import { getUserById } from "../../util/apiCalls/getRequests";
import "bootstrap/dist/css/bootstrap.min.css";
const NavBar = () => {
	const { currentUser } = useContext(AuthContext);
	const history = useHistory();

	const [firstName, setFirstName] = useState("");

	const getFirstName = async ( backOffTime = 1 ) => {
		try {
			if (currentUser) {
				let data = await getUserById(currentUser.id);
				setFirstName(data.user.first_name);
			}
		} catch ( error ) {
			setTimeout(() => {
				getFirstName(backOffTime * 2);
			}, backOffTime * 1000);
		}

	};

	const redirectCaT = () => {
		history.push("/trips/create");
	}

	const displayNavBar = () => {
		if (currentUser) {
			return (
				<section className="mainNav-right">
					<button onClick={redirectCaT} className="nb-createTrip">CREATE A TRIP</button>
					<NavLink exact to="/trips">
						TRIPS
					</NavLink>
					<NavLink to="/search">CITY SEARCH</NavLink>
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
						<Link className="dropdown-item" to={`/user/${currentUser.id}`}>
							PROFILE
						</Link>
						<div className="dropdown-divider"></div>
						<Link className="dropdown-item" to="/messages">
							MESSAGES
						</Link>
						<div className="dropdown-divider"></div>
						<Link className="dropdown-item" onClick={redirect} to="/signUp">
							LOG OUT
						</Link>
					</div>
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

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
