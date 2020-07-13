import React from "react";

const CreateSignUpForm3 = (props) => {
	const { bio, language, country, handlePageChange, handleSubmit } = props;

	return (
		<div>
			<header>
				<h1>CREATE AN ACCOUNT</h1>
				<h3>3/3</h3>
			</header>

			<form onSubmit={handleSubmit}>
				<label htmlFor="bio">Bio : </label>
				<textarea col="10" row="5" {...bio} name="bio" />

				<label htmlFor="language">Language : </label>
				<input type="text" {...language} name="language" />

				<label htmlFor="country">Country : </label>
				<input type="text" {...country} name="country" />

				<div className="buttons">
					<button onClick={() => handlePageChange(2)}>
						BACK
					</button>
					<input type="submit" value="SIGN UP" />
				</div>
			</form>
		</div>
	);
};

export default CreateSignUpForm3;
