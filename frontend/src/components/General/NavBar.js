import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "../../css/general/navBar.css";
import { logout } from "../../util/firebaseFunction";
import { AuthContext } from "../../providers/AuthContext";
import { getUserById } from "../../util/apiCalls/getRequests";
import { useScrollTrigger, Button, AppBar } from '@material-ui/core';
import "bootstrap/dist/css/bootstrap.min.css";

const style = {
	'backgroundColor': '#f3f3f3',
	'display': 'flex',
	'flexDirection': 'row',
	'justifyContent': 'space-between'
}

const ElevationScroll = ({ children }) => {
	const trigger = useScrollTrigger({
	  disableHysteresis: true,
	  threshold: 0
	});
  
	return React.cloneElement(children, {
	  elevation: trigger ? 4 : 0,
	});
}

const NavBar = ( props ) => {
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
				<section className="mainNav-right mh-right">
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
						Hi, {firstName.toUpperCase()}
					</a>
					<div className="dropdown-menu" id="ddmenu">
						<Link className="dropdown-item" to={`/user/${currentUser.id}`}>
							PROFILE
						</Link>
						<div className="dropdown-divider"></div>
						<Link className="dropdown-item" to="/messages">
							MESSAGES
						</Link>
						<div className="dropdown-divider"></div>
						<Link className="dropdown-item" to="/user/edit">
							EDIT PROFILE
						</Link>
						<div className="dropdown-divider"></div>
						<a className="dropdown-item" onClick={redirect} href="#ddmenu">
							LOG OUT
						</a>
					</div>
				</section>
			);
		} else {
			return (
				<section className="lp-navRight mh-right">
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
		<ElevationScroll {...props}>
		<AppBar style={style} className="mainHeader">
			<section className="mainNav-left" style={{width: '20%'}}>
				{/* Logo Here */}
				<h1 style={{width: 'fit-content'}}>
					<Link to={currentUser ? "/trips" : "/"} style={{width: 'fit-content'}}>
						TRIPHIKERS
					</Link>
				</h1>
			</section>

			{displayNavBar()}
		</AppBar>
		</ElevationScroll>
		
	);
};

export default NavBar;
