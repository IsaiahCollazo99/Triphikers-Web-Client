import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../util/firebaseFunction";
import LandingPageNav from "../LandingPage/LandingPageNav";
import { useInput } from "../../util/customHooks";
import '../../css/signUpIn/login.css';

export default function Login() {
	const email = useInput("");
	const password = useInput("");
	const [error, setError] = useState(false);
	const history = useHistory();


	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			await login(email.value, password.value);
      		history.push("/trips");
		} catch (error) {
			debugger;
			setError(error.message);
		}
	};
  	return (
		<>
		<div className="loginContainer">
			{error ? <p className="error">{error.message}</p> : null}
				
				<form onSubmit={handleSignIn} className="signIn">
					<label>
						Email :
						<input {...email} required />
					</label>
		
					<label>
						Password :
						<input {...password} autoComplete="on" required />
		
					</label>
		
					<button type="submit">
						Log in
					</button>
				</form>	
		</div>		
				
		</>
       
	);
}
