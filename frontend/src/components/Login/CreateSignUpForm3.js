import React from "react";
import { Link } from "react-router-dom";

const CreateSignUpForm3 = (props) => {
	const {
		bio,
		languages,
		country,
		handlePageChange,
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
					<textarea col="10" row="5" {...bio} name="bio" />
				</div>
				<div>
					<label>Languages : </label>
					<input type="text" {...languages} name="languages" />
				</div>
				<div>
					<label>Country : </label>
					<input type="text" {...country} name="country" />
				</div>
				<button className="backBtn" onClick={()=>{handlePageChange(2)}}>
				back
				</button>
				<button className="signUp" type="submit">
				Sign Up
				</button>
			</form>
		</div>
	);
};

export default CreateSignUpForm3;
