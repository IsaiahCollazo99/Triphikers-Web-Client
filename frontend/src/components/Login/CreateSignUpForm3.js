import React from "react";
import { Link } from "react-router-dom";

const CreateSignUpForm3 = (props) => {
	const {
		bio,
		languages,
		country,
		handleSignUpPageChange,
		handleSignUp,
	} = props;

	return (
		<div>
			<div>
				<h1>CREATE AN ACCOUNT 3 / 3</h1>
			</div>
			<form onSubmit={handleSignUp} className="createUser">
				<div>
					<label>Bio : </label>
					<input type="text" {...bio} name="bio" />
				</div>
				<div>
					<label>Languages : </label>
					<input type="text" {...languages} name="languages" />
				</div>
				<div>
					<label>Country : </label>
					<input type="text" {...country} name="country" />
				</div>
				<button className="backBtn" onClick={handleSignUpPageChange}>
					<Link to="/signUp2">back</Link>
				</button>
				<button className="signUp" onClick={handleSignUpPageChange}>
					<Link to="/userProfile">Sign Up</Link>
				</button>
			</form>
		</div>
	);
};

export default CreateSignUpForm3;
