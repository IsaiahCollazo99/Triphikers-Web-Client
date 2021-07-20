import React, { useEffect, useState, useContext } from 'react';
import { useParams, Switch, Route } from 'react-router-dom'
import { getUserById, getUserTrips, getUserFriendRequests, getUserFriends } from '../../util/apiCalls/getRequests'
import { AuthContext } from '../../providers/AuthContext';
import { sendFriendRequest } from '../../util/apiCalls/postRequests';
import { deleteFriendRequest } from '../../util/apiCalls/deleteRequests';
import { ProtectedUserRoute } from '../../util/routesUtil';
import Button from '@material-ui/core/Button';
import TripCard from '../custom-components/trip-card';
import UserPageFriends from './user-profile-friends';
import UserPageNav from './user-profile-nav';
import UserPageRequests from './user-profile-requests';
import UserPageAbout from './user-profile-about';
import FacebookLogo from '../../images/f_logo_RGB-Blue_1024.png';
import InstagramLogo from '../../images/glyph-logo_May2016.png';
import TwitterLogo from '../../images/Twitter_Social_Icon_Circle_Color.png'
// import NewChat from '../../chat-list/new-chat';
// import firebase from "../../firebase";
import '../../css/userPage/userPage.css'

const UserPage = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [ profileUser, setProfileUser ] = useState({});
    const [ userTrips, setUserTrips ] = useState([]);
    const [ friendRequests, setFriendRequests ] = useState([]);
    const [ friends, setFriends ] = useState([]);
    // const [newChatFormVisible, setNewChatFormVisible] = useState(false);

    const getUser = async () => {
        try {
            const data = await getUserById(id);
            setProfileUser(data.user)
            getUserTripsCall(data.user);
            
       } catch (error) {
            console.log(error)
        }
    }
    
    const getUserTripsCall = async () => {
        try {
            const data = await getUserTrips(id);
            setUserTrips(data.userTrips);

        } catch(error) {
            console.log(error)
        }
    }

    const getUserFriendsCall = async () => {
        try {
            const data = await getUserFriends(id);
            setFriends(data.friends);
        } catch ( error ) {
            console.log(error);
        }
    }

    const getUserFriendRequestsCall = async () => {
        try {
            const data = await getUserFriendRequests(id);
            setFriendRequests(data.requests);
            getUserFriendsCall();
        } catch ( error ) {
            console.log(error);
        }
    }
        
    useEffect(() => {
        getUser();
        getUserTripsCall();
        getUserFriendRequestsCall();

        return () => {
            setProfileUser({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    
    const sendFriendRequestCall = async () => {
        try {
            await sendFriendRequest(currentUser.id, id);
            await getUserFriendRequestsCall();
        } catch ( error ) {
            console.log(error);
        }
    }

    const currentUserSentRequest = () => {
        let userSentRequest = false;

        for(let request of friendRequests) {
            if(request.requester_id === currentUser.id) {
                userSentRequest = true;
                break;
            }
        }

        return userSentRequest;
    }

    const currentUserIsFriend = () => {
        let userIsFriend = false;

        for(let friendship of friends) {
            if(friendship.user_2 === currentUser.id) {
                userIsFriend = true;
                break;
            }
        }

        return userIsFriend;
    }

    const removeFriendRequest = async () => {
        try {
            await deleteFriendRequest(currentUser.id, id);
            await getUserFriendRequestsCall();
        } catch ( error ) {
            console.log(error);
        }
    }

    const displayFriendRequest = () => {
        if(currentUserSentRequest()) {
            return (
                <Button 
                    className="up-requestSent" 
                    onClick={removeFriendRequest}
                    color="primary"
                    variant="contained"
                    disableElevation
                >
                    <span>Friend Request Sent</span>
                </Button>
            )
        } else if(currentUserIsFriend()) {
            return null;
        } else {
            return (
                <div>
                    <Button 
                        className="up-friendRequest" 
                        onClick={sendFriendRequestCall}
                        color="primary"
                        variant="contained"
                        disableElevation
                    >
                        Send Friend Request
                    </Button>
                    {/* <Button variant="contained" fullWidth color="primary" className="addNewChat" onClick={newChat}>New Message</Button> */}
                </div>
            )
        }
    }
    
    const userTripsList = userTrips.map((trip, i) => {
        return (
            <TripCard trip={trip} refresh={getUserTripsCall} key={i} />
        )
    })

    // const newChat = () => {
    //     setNewChatFormVisible(true);
    // }

    // if(newChatFormVisible) console.log(newChat);

    // const buildDocKey = (friend) => {
    //     let users = [email, friend]
    //     return users.sort().join(":")
    // }

    // const newChatSubmit = async (chatObj) => {
    //     const docKey = buildDocKey(chatObj.sendTo);
    //     await firebase
    //     .firestore()
    //     .collection("chats")
    //     .doc(docKey)
    //     .set({
    //         receiverHasRead: false,
    //         users: [email, chatObj.sendTo],
    //         messages: [{
    //             message:chatObj.message,
    //             sender: email
    //         }]
    //     })
    //     setNewChatFormVisible(false);
    // }

    const displaySocialMedia = () => {
        const {
            facebook_link,
            twitter_username,
            instagram_username
        } = profileUser;

        const facebookLink = facebook_link ? (
            <a href={`https://www.${facebook_link}`} target="_blank" rel="noopener noreferrer">
                <img src={FacebookLogo} alt="facebook" />
            </a>
        ) : null;

        const instagramLink = instagram_username ? (
            <a href={`https://www.${instagram_username}`} target="_blank" rel="noopener noreferrer">
                <img src={InstagramLogo} alt="instagram" />
            </a>
        ) : null;

        const twitterLink = twitter_username ? (
            <a href={`https://www.${twitter_username}`} target="_blank" rel="noopener noreferrer">
                <img src={TwitterLogo} alt="instagram" />
            </a>
        ) : null;

        return (
            <section className="up-socialMedia">
                {facebookLink}
                {instagramLink}
                {twitterLink}
            </section>
        )
    }

    const getCoverButtons = () => {
        if(currentUser.id === id) {
            return null;
        } else {
            return (
                <section className="up-coverButtons">
                    {displayFriendRequest()}
                </section>
            )
        }
    } 

    return (
      
        <section className="userPageContainer">
            <aside>
                <section className="up-user">
                    <img src={profileUser.profile_picture} alt="profile_picture" />
                    <div className="up-userInteraction">
                        <p>{profileUser.full_name}</p>
                        <p className="up-username">@{profileUser.username}</p>   
                        {displaySocialMedia()}
                    </div>
                </section>

                {getCoverButtons()}

                <UserPageNav userId={id} />
            </aside>

            <main>
                <section className="up-main">
                <Switch>
                    <Route exact path={"/user/:id/"}>
                        {userTripsList.length ? userTripsList : (
                            <p className="error" style={{marginTop: '80px'}}>User has made no trips</p>
                        )}
                    </Route>

                    <Route exact path={"/user/:id/friends"}>
                        <UserPageFriends userFriends={friends} refresh={getUserFriendsCall} />
                    </Route>

                    <Route exact path={"/user/:id/about"}>
                        <UserPageAbout user={profileUser} />
                    </Route>

                    <ProtectedUserRoute userId={id} exact path={"/user/:id/friendRequests"}>
                        <UserPageRequests 
                            friendRequests={friendRequests} 
                            refresh={getUserFriendRequestsCall} 
                        />
                    </ProtectedUserRoute>
                </Switch>
                </section>
            </main>
            
        
        </section>
    )
}


export default UserPage;

