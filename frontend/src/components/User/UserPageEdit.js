import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { getUserById } from '../../util/apiCalls/getRequests';
import '../../css/userPage/userPage.css';
import '../../css/userPage/userPageEdit.css';
import { useInput } from '../../util/customHooks';
import axios from 'axios';

const UserPageEdit = () => {
    const { currentUser } = useContext(AuthContext);
    const [ user, setUser ] = useState({})
    const [ countries, setCountries ] = useState([]);
    const [ profilePicture, setProfilePicture ] = useState(null);
    const firstName = useInput("");
    const lastName = useInput("");
    const country = useInput("");
    const gender = useInput("");
    const bio = useInput("");

    const getUserCall = async () => {
        const data = await getUserById(currentUser.id);
        setUser(data.user);
    }

	const getCountries = async () => {
		let res = await axios.get("https://restcountries.eu/rest/v2/all");
		setCountries(res.data);
	}

    useEffect(() => {
        getUserCall();
        getCountries();
    }, [])

    const updateUserCall = () => {
        
    }

    const handleFileSelect = ( e ) => {
		setProfilePicture(e.target.files[0]);
    }
    
    const countryOptions = countries.map(country => {
		return <option value={country.name} key={country.alpha2Code}>{country.name}</option>

	})
    
    return (
        <section className="up-edit">
            <header className="upe-header">
                <section className="upe-coverImage">
                </section>

                <section className="upe-user">
                    <label>
                        <span>Profile Picture: </span>
                        <input type="file"  accept=".png, .jpg, .jpeg" onChange={handleFileSelect} />
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
                    <p><span>Age: </span>{user.age}</p>

                    <label>
                        <span>Country of Origin: </span> 
                        <select defaultValue="" {...country}>
                            <option disabled value="">Select a country</option>
                            {countryOptions}
                        </select>
                    </label>

                    <label>
                        <span>Gender: </span>
                        <select defaultValue="" {...gender}>
                            <option disabled value="">Select a gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="nonbinary">Non-Binary</option>
                        </select>
                    </label>
                </section>

                <section className="upe-bio">
                    <label htmlFor="bio">Bio: </label>
                    <textarea rows="7" cols="40" placeholder="Bio" {...bio} />
                </section>
            </header>

            <section className="upe-extras">
                <button type="submit" onClick={updateUserCall}>Update</button>
            </section>
        </section>
    )
}

export default UserPageEdit;