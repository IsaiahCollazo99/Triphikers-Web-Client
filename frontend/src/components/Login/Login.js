import React, { useState } from "react";
import { login } from "../../util/firebaseFunction";
import { useInput } from "../../util/customHooks";
import '../../css/signUpIn/login.css';

export default function Login() {
	const email = useInput("");
	const password = useInput("");
	const [error, setError] = useState(false);


	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			await login(email.value, password.value);
		} catch (error) {
			setError('That email/password combination does not exist.');
		}
	};


	
  	return (
		<>
		<div className="loginContainer">
			<header>
				<h1>LOG IN</h1>
			</header>

			{error ? <p className="error">{error}</p> : null}
				
			<form onSubmit={handleSignIn} className="signIn">
				<label>
					Email :
					<input {...email} type="email" autoComplete="on" required placeholder="Email" />
				</label>
	
				<label>
					Password :
					<input {...password} type="password" autoComplete="on" required placeholder="Password" />
	
				</label>
	
				<button type="submit">
					Log in
				</button>
			</form>	
		</div>		
				
		</>
       
	);
}
