import React, { useState } from "react";
import '../../css/signUpIn/signUp1.css';

const CreateSignUpForm1 = (props) => {
	const { email, password, confirmPassword, handlePageChange } = props;
	const [ error, setError ] = useState(null);
	
	const handleSubmit = (e) => {
		e.preventDefault()
		if(password.value !== confirmPassword.value) {
			setError(<p className="error">The passwords don't match</p>)
		} else {
			handlePageChange(2)
		}
	}
	return (
		<>
		<header>
			<h1>CREATE AN ACCOUNT</h1>
			<h3>1/3</h3>
		</header>

		<form onSubmit={handleSubmit} className="signUp1">
			{error}
		
			<label htmlFor="email">Email: </label>
			<input 
				type="email" 
				{...email} 
				name="email" 
				placeholder="Email" 
				autoComplete="on" 
				required 
			/>

			<label htmlFor="password">Password: </label>
			<input 
				type="password" 
				{...password} 
				name="password" 
				placeholder="Password" 
				autoComplete="on" 
				minLength="6"
				required 
			/>

			<label htmlFor="confirm">Confirm password: </label>
			<input 
				type="password" 
				{...confirmPassword} 
				name="confirm" 
				placeholder="Confirm Password" 
				autoComplete="on" 
				required 
			/>

			<input type="submit" value="Next Page" />
		</form>
		</>
	);
};
export default CreateSignUpForm1;
