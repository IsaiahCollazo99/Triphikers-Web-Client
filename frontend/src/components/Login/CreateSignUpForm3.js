import React from "react";

const CreateSignUpForm3 = (props) => {
	const { 
		bio, 
		language, 
		country, 
		setProfilePicture,
		handlePageChange, 
		handleSubmit 
	} = props;

	const handleFileSelect = ( e ) => {
		setProfilePicture(e.target.files[0]);
	}

	return (
		<>
		<header>
			<h1>CREATE AN ACCOUNT</h1>
			<h3>3/3</h3>
		</header>

		<form onSubmit={handleSubmit}>
			<label htmlFor="bio">Bio : (OPTIONAL)</label>
			<textarea col="10" row="5" {...bio} name="bio" />

			<label htmlFor="language">Language : </label>
			<input type="text" {...language} name="language" required />

			<label htmlFor="country">Country : </label>
			<input type="text" {...country} name="country" required />

			<label htmlFor="profilePic">Profile Picture : </label>
			<input type="file" name="profilePic" accept=".png .jpg .jpeg" onChange={handleFileSelect} required />

			<div className="buttons">
				<button onClick={() => handlePageChange(2)} type="button">
					BACK
				</button>
				<input type="submit" value="SIGN UP" />
			</div>
		</form>
		</>
	);
};

export default CreateSignUpForm3;
