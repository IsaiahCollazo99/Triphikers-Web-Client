import Button from '@material-ui/core/Button';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserInfoEdit from './edit-user-info';
import UserSocialEdit from './edit-user-social';
import { AuthContext } from '../../providers/auth-context';
import { getUserById, updateUser } from '../../util/apiCalls/get-requests';
import { useInput } from '../../util/custom-hooks';
import { uploadPicture } from '../../util/firebaseFunction';
import './edit-profile.css';
import '../user-profile/user-profile.css';

const UserPageEdit = () => {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [ user, setUser ] = useState({})
    const [ currentFirstName, setCurrentFirstName ] = useState("");
    const [ currentLastName, setCurrentLastName ] = useState("");
	const [ profilePicture, setProfilePicture ] = useState(null);
	const [ response, setResponse ] = useState(null);
	const [ imagePreview, setImagePreview ] = useState(null);
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
		if(user) console.log(user);
    }

    useEffect(() => {
        getUserCall();
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
		try {
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
			setResponse(<p className="success">Profile Updated Successfully</p>);
		} catch ( error ) {
			setResponse(<p className="error">There was an issue with your request. Try again.</p>);
		}
        
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
		setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const returnToProfile = () => {
        history.push(`/user/${currentUser.id}`);
	}
	
	const userInfoProps = {
		handleFileSelect,
		firstName,
		lastName,
		country,
		gender,
		bio,
		imagePreview,
	}

	const userSocialProps = {
		facebook,
		instagram,
		twitter
	}
    
    return (
			<section className="up-edit">
				<UserInfoEdit {...userInfoProps} />

				<UserSocialEdit {...userSocialProps} />

				{response}

				<section className="upe-buttons">
					<Button 
						onClick={returnToProfile}
						variant="outlined"
						color="primary"
					>
						Return To Profile
					</Button>

					<Button 
						onClick={handleUpdate}
						variant="contained"
						color="primary"
					>
						Update
					</Button>
				</section>
			</section>
		);
}

export default UserPageEdit;