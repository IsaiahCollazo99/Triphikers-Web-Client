import React, { useEffect, useState, useContext } from 'react';
// import Button from '@material-ui/core/Button';
import { useParams, Switch, Route, useHistory } from 'react-router-dom'
import { getUserById, getUserTrips, getUserFriendRequests, getUserFriends } from '../../util/apiCalls/getRequests'
import '../../css/userPage/userPage.css'
import UserPageNav from './UserPageNav';
import TripCard from '../General/TripCard';
import UserPageAbout from './UserPageAbout';
import { AuthContext } from '../../providers/AuthContext';
import { sendFriendRequest } from '../../util/apiCalls/postRequests';
import { deleteFriendRequest } from '../../util/apiCalls/deleteRequests';
import UserPageFriends from './UserPageFriends';
import { ProtectedUserRoute } from '../../util/routesUtil';
import UserPageRequests from './UserPageRequests';
// import FacebookLogo from '../../images/f_logo_RGB-Blue_1024.png';
// import InstagramLogo from '../../images/glyph-logo_May2016.png';
// import TwitterLogo from '../../images/Twitter_Social_Icon_Circle_Color.png'
// import NewChat from '../../chatList/NewChat';
// import firebase from "../../firebase";

const UserPage = () => {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [ profileUser, setProfileUser ] = useState({});
    const [ userTrips, setUserTrips ] = useState([]);
    const [ friendRequests, setFriendRequests ] = useState([]);
    const [ friends, setFriends ] = useState([]);
    const [newChatFormVisible, setNewChatFormVisible] = useState(false);
    const history = useHistory();

    const redirect = () => {
        history.push("/user/edit");
    }

    const getUser = async () => {
        console.log(newChatFormVisible);
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
        if(currentUser.id === id) {
            return (
                <button className="up-editButton" onClick={redirect}>Edit Profile</button>
            );
        } else if(currentUserSentRequest()) {
            return (
                <button className="up-requestSent" onClick={removeFriendRequest}>
                    <span>Friend Request Sent</span>
                </button>
            )
        } else if(currentUserIsFriend()) {
            return null;
        } else {
            return (
                <div>
                    <button className="up-friendRequest" onClick={sendFriendRequestCall}>
                        Send Friend Request
                    </button>
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

    const newChat = () => {
        setNewChatFormVisible(true);
    }

    console.log(newChat);

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

    return (
      
        <div className="userPageContainer">
            <header className="up-header">
                <section className="up-coverImage">
                    <section className="up-coverButtons">
                        {displayFriendRequest()}
                    </section>
                </section>

                <section className="up-user">
                    <img src={profileUser.profile_picture} alt="profile_picture" />
                    <div className="up-userInteraction">
                        {/* rating goes in the span */}
                        <p>{profileUser.full_name}<span></span></p>
                    </div>
                </section>

                <section className="up-userInfo">
                    <p><span>Age: </span>{profileUser.age}</p>
                    <p><span>Country of Origin: </span>{profileUser.country_of_origin}</p>
                    <p><span>Gender: </span>{profileUser.gender}</p>
                </section>

                <section className="up-bio">
                    <span>Bio: </span>
                    <p>{profileUser.bio}</p>
                </section>
            </header>

            <UserPageNav userId={id} />
            
            <section className="up-main">
            <Switch>
                <Route exact path={"/user/:id/"}>
                    {userTripsList}
                </Route>

                <Route exact path={"/user/:id/about"}>
                    <UserPageAbout user={profileUser} />
                </Route>

                <Route exact path={"/user/:id/friends"}>
                    <UserPageFriends userFriends={friends} refresh={getUserFriendsCall} />
                </Route>

                <ProtectedUserRoute userId={id} exact path={"/user/:id/friendRequests"}>
                    <UserPageRequests friendRequests={friendRequests} refresh={getUserFriendRequestsCall} />
                </ProtectedUserRoute>
            </Switch>
            </section>
        
        </div>
    )
}


export default UserPage;

