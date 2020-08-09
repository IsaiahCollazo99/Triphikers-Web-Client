// import React, { useEffect, useState, useContext } from 'react';

// import { useParams, useHistory } from 'react-router-dom';
// import { AuthContext } from '../../providers/AuthContext';
// import { useInput } from '../../util/customHooks';
// import { updateUser } from '../../util/apiCalls/getRequests';
// // import blankProfile from '../../assets/images/blankProfile.png';

// const UpdateUser = (id) => {
//     const { fullName: full_name } = useParams();
//     const [ error, setError ] = useState(null);
//     const [ user, setUser ] = useState({});
//     const [ editing, setEditing ] = useState(false);
//     const [ loading, setLoading ] = useState(true);
//     const { currentUser } = useContext(AuthContext);
//     const fullNameInput = useInput("");
//     const bioInput = useInput("");

//     const history = useHistory();
//   // console.log(fullName)
//   console.log(id)
//     useEffect(() => {
//         getUser();
//     }, [id])

//   const getUser = async () => {
//   //   // const history = useHistory();
//   //   const { id } = useParams();
//   //       try {
//   //         let user = await updateUser(id);
//   //         debugger
//   //           setUser(user);
//   //           // getPosts();
//   //       } catch (error) {
//   //           if(error.response) {
//   //               setError(error.response.data.error);
//   //           }
//   //           console.log(error);
//   //       }
//     }

//     // const getPosts = async () => {
//     //     try {
//     //         let posts = await getUserPosts(username);
//     //         setTimeout(() => {
//     //             setPosts(posts.map(post => {
//     //                 return (
//     //                     <Post post={post} key={post.id} />
//     //                 )
//     //             }));
//     //             setLoading(false);
//     //         }, 1000);
//     //         setError(null);

//     //     } catch(error) {
//     //         setPosts([]);
//     //         setLoading(false);
//     //         if(error.response) {
//     //             setError(error.response.data.error);
//     //         }
//     //         console.log(error);
//     //     }
//     // }

//     const editProfile = () => {
//         setEditing(true);
//     }

//     // const submitUpdate = async () => {
//     //     try {
//     //         if(fullNameInput.value || bioInput.value) {
//     //             const patchObj = { 
//     //                 fullName: fullNameInput.value, 
//     //                 bio: bioInput.value 
//     //             }
//     //             let updated = await updateUser(user.id, patchObj)

//     //             if(fullNameInput.value) {
//     //                 history.push("/" + updated.full_name);
//     //             }
//     //             getUser();
//     //         }
//     //         setEditing(false);
//     //     } catch(error) {
//     //         console.log(error);
//     //     }
//     // }

//     // const displayEditButton = () => {
//     //     if(currentUser) {
//     //         if(currentUser.full_name === fullName && !editing) {
//     //             return (
//     //                 <button onClick={editProfile}>Edit Profile</button>
//     //             )
//     //         } else {
//     //             if(editing) {
//     //                 return (
//     //                     <button onClick={submitUpdate}>Confirm</button>
//     //                 )
//     //             } else {
//     //                 return null
//     //             }
//     //         }
//     //     } else {
//     //         return null
//     //     }
//     // }

//     // let profilePic = blankProfile;
//     // if(user) {
//     //     profilePic = user.profile_pic ? user.profile_pic : blankProfile;
//     // }

//     // If there is a current user check if the currentUser is the owner of the profile
//     // If so then justify content space evenly. Otherwise (in both cases) justify flex start
//     // const userInfoStyle = currentUser ? {
//     //     'justifyContent': currentUser.username === username ? 'space-evenly' : 'flex-start'
//     // } : {'justifyContent': 'flex-start'}
    
//   return (
//       <> hello this is Updated User</>
//         // <div className="UpdateContainer">
//         //     <header>{user ? user.full_name : "Profile"}</header>
//         //     {user ? 
//             // <div className="profileUserInfo"  style={userInfoStyle}>
//             //     <div className="profileInfoLeft">
//             //         <img src={profilePic} alt={user.full_name} />
//             //         <div>
//             //             {!editing ? <p className="profileFullName">{user.full_name}</p> :
//             //             <label htmlFor="profileNameInput">Full Name:
//             //                 <input type="text" className="profileNameInput" {...nameInput} maxLength={20}/>
//                 //         </label>}
//                 //         {!editing ? <p className="profileUsername">@{user.username}</p> :
//                 //         <label htmlFor="profileUserInput">
//                 //             Username:
//                 //             <input type="text" className="profileUserInput" {...usernameInput} maxLength={20}/>
//                 //         </label>}
//                 //     </div>
//                 // </div>
//         //         {displayEditButton()}
//         //     </div> : <p className="error">User doesn't exist</p>
//         //     }
            
//         //     <section>Posts</section>
//         //     {loading ? <div className="loading">Loading</div> : null}
//         //     <div className="profilePostContainer">
//         //         {error ? <div className="error">{error}</div> : null}
//         //         {posts}
//         //     </div>
//         // </div>
//     )
// }

// export default UpdateUser;