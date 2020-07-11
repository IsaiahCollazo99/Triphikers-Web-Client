import React from "react";
import { Link } from "react-router-dom";

const CreateSignUpForm2 = (props) => {
	const { firstName, lastName, age, gender, handleSignUpPageChange } = props;
	return (
		<>
			<div>
				<h1>CREATE AN ACCOUNT 2 / 3</h1>
			</div>
			<form className="signUpPage1" onSubmit={handleSignUpPageChange}>
				<div>
					<label>First Name : </label>
					<input type="text" name="firstName" {...firstName} required />
				</div>
				<div>
					<label>Last Name : </label>
					<input type="text" {...lastName} name="lastName" require />
				</div>
				<div>
					<label>Birthday : </label>
					<input type="number" name="age" {...age} />
				</div>
				<div>
					<label>Gender : </label>
					<input type="text" name="gender" {...gender} />
				</div>
				<div>
					<button className="backBtn">
						<Link to="/signUp1">back</Link>
					</button>
					<button className="continueBtn">
						<Link to="/signUp3">continue</Link>
					</button>
				</div>
			</form>
		</>
	);
};

export default CreateSignUpForm2;
