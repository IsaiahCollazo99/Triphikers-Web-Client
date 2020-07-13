import React, { useState } from "react";


const CreateSignUpForm1 = (props) => {
	const { email, password, confirmPassword, handlePageChange } = props;
	
	const handleSubmit = (e) => {
		e.preventDefault()
		handlePageChange(2)
	}
	return (
		<>
			<h1>
				CREATE AN ACCOUNT <span>1 / 3</span>
			</h1>
			<form className="signUpPage1" onSubmit={handleSubmit}>
				<section>
					<label className="formLabel">Email: </label>
				</section>
				<section>
					<input
						type="email"
						{...email}
						name="email"
						autoComplete="on"
						required
		
					/>
				</section>
				<section>
					<label className="formLabel">Password </label>
				</section>
				<section>
					<input
						type="password"
						{...password}
						name="password"
						autoComplete="on"
						required
					/>
				</section>
				<section>
					<label className="formLabel">Confirm password: </label>
				</section>
				<section>
					<input
						type="password"
						{...confirmPassword}
						name="password"
						autoComplete="on"
						required
					/>
					<button type="submit">
						Continue
					</button>
				</section>
			</form>
		</>
	);
};
export default CreateSignUpForm1;
