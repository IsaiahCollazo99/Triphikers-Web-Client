import React from "react";


const CreateSignUpForm1 = (props) => {
	const { email, password, confirmPassword, handlePageChange } = props;
	
	const handleSubmit = (e) => {
		e.preventDefault()
		handlePageChange(2)
	}
	return (
		<>
		<header>
			<h1>CREATE AN ACCOUNT</h1>
			<h3>1/3</h3>
		</header>

		<form onSubmit={handleSubmit}>
			<label htmlFor="email">Email: </label>
			<input type="email" {...email} name="email" autoComplete="on" required />

			<label htmlFor="password">Password </label>
			<input type="password" {...password} name="password" autoComplete="on" required />

			<label htmlFor="confirm">Confirm password: </label>
			<input type="password" {...confirmPassword} name="confirm" autoComplete="on" required />

			<input type="submit" value="continue" />
		</form>
		</>
	);
};
export default CreateSignUpForm1;
