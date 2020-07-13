import React from "react";


const CreateSignUpForm3 = (props) => {
	const {
		bio,
		language,
		country,
		handlePageChange,
		handleSubmit,
	} = props;

	return (
		<div>
			<div>
				<h1>CREATE AN ACCOUNT 3 / 3</h1>
			</div>
			<form onSubmit={handleSubmit} className="createUser">
				<div>
					<label>Bio : </label>
					<textarea col="10" row="5" {...bio} name="bio" />
				</div>
				<div>
					<label>Language : </label>
					<input type="text" {...language} name="language" />
				</div>
				<div>
					<label>Country : </label>
					<input type="text" {...country} name="country" />
				</div>
				<button className="backBtn" onClick={()=>{handlePageChange(2)}}>
				back
				</button>
				<input className="signUp" type="submit" />
			</form>
		</div>
	);
};

export default CreateSignUpForm3;
