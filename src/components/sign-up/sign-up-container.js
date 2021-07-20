import React, { useState, useEffect } from "react";
import { useInput } from "../../util/customHooks";
import SignUpCredentials from "./sign-up-credentials";
import SignUpPersonalInfo from "./sign-up-personal-info";
import SignUpAccountInfo from "./sign-up-account-info";
import SignUpMethod from './sign-up-method';
import { createUser } from "../../util/apiCalls/postRequests";
import { signUp, uploadPicture } from "../../util/firebaseFunction";
import '../../css/signUpIn/signUp.css';

const CreateSignUpContainer = () => {
	const [ error, setError ] = useState(null);
	const [ page, setPage ] = useState(1);
	const [ username, setUsername ] = useState("");
	const email = useInput("");
	const password = useInput("");
	const confirmPassword = useInput("");
	const firstName = useInput("");
	const lastName = useInput("");
	const birthday = useInput("");
	const gender = useInput("");
	const bio = useInput("");
	const language = useInput("");
	const country = useInput("");
	const [ profilePicture, setProfilePicture ] = useState(null);
	const [ user, setUser ] = useState(null);

	useEffect(() => {
		if(user) {
			setPage(2);
		}
	}, [user])

	const handlePageChange = (toPage) => {
		setPage(toPage);
	};

	const pageOne = {
		email,
		password,
		confirmPassword,
	};

	const pageTwo = {
		firstName,
		lastName,
		username,
		setUsername,
		birthday,
		gender,
		user
	};

	const pageThree = {
		bio,
		language,
		country,
		setProfilePicture
	};

	const createUserCall = async (firebaseData) => {
		const userEmail = user ? user.email : email.value;
		const fullUser = {
			userEmail,
			...pageTwo,
			...pageThree,
			...firebaseData
		}

		await createUser(fullUser);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let firebaseUser;

			if(user) {
				firebaseUser = user;
			} else {
				const signUpRes = await signUp(email.value, password.value, username);
				firebaseUser = signUpRes;
			}

			uploadPicture(`${firebaseUser.uid}/profile_picture/`, {id: firebaseUser.uid, file: profilePicture}, createUserCall);
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
	};

	const getFormDisplay = () => {
		if (page === 0) {
			return (
				<SignUpMethod handlePageChange={handlePageChange} setUser={setUser} />
			)
		} else if (page === 1) {
			return (
				<SignUpCredentials {...pageOne} handlePageChange={handlePageChange} />
			);
		} else if (page === 2) {
			return (
				<SignUpPersonalInfo {...pageTwo} handlePageChange={handlePageChange} />
			);
		} else if (page === 3) {
			return (
				<SignUpAccountInfo 
					{...pageThree} 
					handlePageChange={handlePageChange} 
					handleSubmit={handleSubmit} 
				/>
			);
		}
	};

	return (
		<>
		<div className="signUpContainer">
			{error}
			{getFormDisplay()}
		</div>
		</>
	);
};

export default CreateSignUpContainer;
