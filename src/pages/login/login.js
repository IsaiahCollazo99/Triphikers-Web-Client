import { IconButton, InputAdornment, Button } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from "react";

import CustomTextField from '../../components/custom-text-field/custom-text-field';
import { useInput } from "../../util/custom-hooks";
import { login } from "../../util/firebase-functions";
import './login.css';

const Login = () => {
	const email = useInput("");
	const password = useInput("");
	const [ error, setError ] = useState(false);
	const [ showPassword, setShowPassword ] = useState(false);

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			await login(email.value, password.value);
		} catch (error) {
			setError('That email/password combination does not exist.');
		}
	};

	const handleShowPassword = () => {
		setShowPassword((prevState) => !prevState);
	}

	const handleMouseDownPassword = ( e ) => {
		e.preventDefault();
	};
	
  	return (
		<>
		<div className="loginContainer">
			<header>
				<h1>LOG IN</h1>
			</header>

			<form onSubmit={handleSignIn} className="signIn">
			{error ? <p className="error">{error}</p> : null}
				<CustomTextField 
					label="Email"
					type="email"
					variant="outlined"
					InputLabelProps={{
						shrink: true,
						required: false,
					}}
					placeholder="Enter your Email Address"
					required
					error={error ? true : false}
					fullWidth
					{...email}
				/>

				<CustomTextField 
					label="Password"
					type={showPassword ? "text" : "password"}
					variant="outlined"
					InputLabelProps={{
						shrink: true,
						required: false,
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={handleShowPassword}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						)
					}}
					placeholder="Enter your Password"
					required
					error={error ? true : false}
					fullWidth
					{...password}
					
				/>
	
				<Button type="submit" variant="contained" color="primary">
					Log in
				</Button>
			</form>	
		</div>		
				
		</>
       
	);
}

export default Login;