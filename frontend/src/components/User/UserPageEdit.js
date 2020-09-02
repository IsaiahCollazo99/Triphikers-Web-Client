import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { getUserById, updateUser } from '../../util/apiCalls/getRequests';
import '../../css/userPage/userPage.css';
import '../../css/userPage/userPageEdit.css';
import { useInput } from '../../util/customHooks';
import axios from 'axios';
import { uploadPicture } from '../../util/firebaseFunction';
import { useHistory } from 'react-router-dom';

const UserPageEdit = () => {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [ user, setUser ] = useState({})
    const [ currentFirstName, setCurrentFirstName ] = useState("");
    const [ currentLastName, setCurrentLastName ] = useState("");
    const [ countries, setCountries ] = useState([]);
    const [ profilePicture, setProfilePicture ] = useState(null);
    const firstName = useInput("");
    const lastName = useInput("");
    const country = useInput("");
    const gender = useInput("");
    const bio = useInput("");
    const facebook = useInput("");
    const twitter = useInput("");
    const instagram = useInput("");

    const getUserCall = async () => {
        const data = await getUserById(currentUser.id);
        setCurrentFirstName(data.user.first_name);
        setCurrentLastName(data.user.last_name);
        setUser(data.user);
    }

	const getCountries = async () => {
		let res = await axios.get("https://restcountries.eu/rest/v2/all");
		setCountries(res.data);
	}

    useEffect(() => {
        getUserCall();
        getCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getFullName = () => {
        if(firstName.value && lastName.value) {
            return firstName.value + " " + lastName.value;
        } else if(firstName.value && !lastName.value) {
            return firstName.value + " " + currentLastName;
        } else if(!firstName.value && lastName.value) {
            return currentFirstName + " " + lastName.value;
        } else {
            return null;
        }
    }

    const updateUserCall = async ( pictureData ) => {
        const userData = {
            full_name: getFullName(),
            first_name: firstName.value ? firstName.value : null,
            last_name: lastName.value ? lastName.value : null,
            country_of_origin: country.value,
            gender: gender.value,
            bio: bio.value,
            profile_picture: pictureData ? pictureData.url : null,
            facebook_link: facebook.value ? `facebook.com/${facebook.value}` : null,
            twitter_username: twitter.value ? `twitter.com/${twitter.value}` : null,
            instagram_username: instagram.value ? `instagram.com/${instagram.value}` : null
        }

        await updateUser(currentUser.id, userData);
    }

    const handleUpdate = () => {
        if(profilePicture) {
            uploadPicture(`${currentUser.id}/profile_picture`, {id: currentUser.id, file: profilePicture}, updateUserCall)
        } else {
            updateUserCall();
        }
    }

    const handleFileSelect = ( e ) => {
		setProfilePicture(e.target.files[0]);
    }

    const returnToProfile = () => {
        history.push(`/user/${currentUser.id}`);
    }
    
    const countryOptions = countries.map(country => {
		return <option value={country.name} key={country.alpha2Code}>{country.name}</option>
	})
    
    return (
			<section className="up-edit">
				<header className="upe-header">
					<section className="upe-coverImage">
						<button className="upe-closeEdit" onClick={returnToProfile}>
							Return To Profile
						</button>
					</section>

					<section className="upe-user">
						<label>
							<span>Profile Picture: </span>
							<input
								type="file"
								accept=".png, .jpg, .jpeg"
								onChange={handleFileSelect}
							/>
						</label>

						<div className="upe-userInteraction">
							<label>
								<span>First Name:</span>
								<input type="text" placeholder="First Name" {...firstName} />
							</label>

							<label>
								<span>Last Name: </span>
								<input type="text" placeholder="Last Name" {...lastName} />
							</label>
						</div>
					</section>

					<section className="upe-userInfo">
						<p>
							<span>Age: </span>
							{user.age}
						</p>

						<label>
							<span>Country of Origin: </span>
							<select defaultValue="" {...country}>
								<option disabled value="">
									Select a country
								</option>
								{countryOptions}
							</select>
						</label>

						<label>
							<span>Gender: </span>
							<select defaultValue="" {...gender}>
								<option disabled value="">
									Select a gender
								</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Non-Binary">Non-Binary</option>
							</select>
						</label>
					</section>

					<section className="upe-bio">
						<label htmlFor="bio">Bio: </label>
						<textarea rows="7" cols="40" placeholder="Bio" {...bio} />
					</section>
				</header>

				<section className="upe-extras">
					<section className="upe-socialMedia">
						<label htmlFor="facebook">
							<p>Facebook Link: </p>

							<span>Facebook.com/</span>
							<input
								type="text"
								placeholder="Facebook Username"
								{...facebook}
							/>
						</label>

						<label htmlFor="instagram">
							<p>Instagram Username: </p>

							<span>Instagram.com/</span>
							<input
								type="text"
								placeholder="Instagram Username"
								{...instagram}
							/>
						</label>

						<label>
							<p>Twitter Username: </p>

							<span>Twitter.com/</span>
							<input type="text" placeholder="Twitter Username" {...twitter} />
						</label>
					</section>

                <button
                    type="submit"
                    onClick={handleUpdate}
					>
						Update
					</button>
				</section>
			</section>
		);
}

export default UserPageEdit;