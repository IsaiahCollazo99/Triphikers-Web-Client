import React, { useContext, useEffect, useState } from 'react';
import { getUserById, updateUser } from '../../util/apiCalls/getRequests';
import { AuthContext } from '../../providers/AuthContext';
import { useInput } from '../../util/customHooks';
import { uploadPicture } from '../../util/firebaseFunction';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import UserInfoEdit from './UserInfoEdit';
import '../../css/userPage/userPage.css';
import '../../css/userPage/userPageEdit.css';

const UserPageEdit = () => {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [ user, setUser ] = useState({})
    const [ currentFirstName, setCurrentFirstName ] = useState("");
    const [ currentLastName, setCurrentLastName ] = useState("");
	const [ profilePicture, setProfilePicture ] = useState(null);
	const [ tab, setTab ] = useState(1);
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
	
	const userInfoProps = {
		handleFileSelect,
		firstName,
		lastName,
		country,
		gender
	}

	const getTabContent = () => {
		if(tab === 1) {
			return (
				<UserInfoEdit {...userInfoProps} />
			)
		} else {
			return (
				<section classname="upe-socialMedia">
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
			)
		}
	}
    
    return (
			<section className="up-edit">
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

				{getTabContent()}
			</section>
		);
}

export default UserPageEdit;