import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateSignUpForm1 = (props) => {
	const { email, password, confirmPassword, handleSignUpPageChange } = props;

	return (
		<>
			<h1>
				CREATE AN ACCOUNT <span>1 / 3</span>
			</h1>
			<form className="signUpPage1" onSubmit={handleSignUpPageChange}>
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
						// className={emailClass} required
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
						type="confirmPassword"
						{...confirmPassword}
						name="password"
						autoComplete="on"
						required
					/>
					<button type="submit">
						<Link to="/signUp2">Continue</Link>
					</button>
				</section>
			</form>
		</>
	);
};
export default CreateSignUpForm1;
