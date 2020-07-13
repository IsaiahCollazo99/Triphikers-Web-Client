import React from "react";

const CreateSignUpForm3 = (props) => {
	const { bio, languages, country, handlePageChange, handleSubmit } = props;

	const handleSignUp3 = (e) => {
		e.preventDefault();
		console.log("page 3 submit");
		handleSubmit(e);
	};
	return (
		<div>
			<div>
				<h1>CREATE AN ACCOUNT 3 / 3</h1>
			</div>
			<form onSubmit={handleSignUp3} className="createUser">
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
				<button
					className="backBtn"
					onClick={() => {
						handlePageChange(2);
					}}
				>
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
