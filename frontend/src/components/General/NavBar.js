import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "../../css/general/navBar.css";
import { logout } from "../../util/firebaseFunction";
import { AuthContext } from "../../providers/AuthContext";
import { getUserById } from "../../util/apiCalls/getRequests";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import "bootstrap/dist/css/bootstrap.min.css";

const style = {
	'background-color': '#f3f3f3',
	'display': 'flex',
	'flex-direction': 'row',
	'box-shadow': 'none',
	'justify-content': 'space-between'
}

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
					{/* <button onClick={redirectCaT} className="nb-createTrip">CREATE A TRIP</button> */}
					<Button onClick={redirectCaT} variant="contained" color="primary">
						CREATE A TRIP
					</Button>
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
		// <nav className="mainNav">
		<AppBar color='#F3F3F3' style={style} className="mainHeader">
			<section className="mainNav-left" style={{width: '20%'}}>
				{/* Logo Here */}
				<h1 style={{width: 'fit-content'}}>
					<Link to={currentUser ? "/trips" : "/"} style={{width: 'fit-content'}}>TRIPHIKERS</Link>
				</h1>
			</section>

			{displayNavBar()}
		</AppBar>
		// </nav>
	);
};

export default NavBar;
