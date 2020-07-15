import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import { getUserProfile, getUserPosts } from '../../util/apiCalls/getRequests'
// import { AuthContext } from '../../providers/AuthContext';
import { useInput } from '../../util/customHooks';
//  import { AuthContext } from '../../providers/AuthContext';

 
const Profile = () => {
  const { fullName: full_name } = useParams();
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(true);
  const [ loading, setLoading ] = useState(true);
  // const { currentUser } = useContext(AuthContext);
  const fullNameInput = useInput("");


  const history = useHistory("");

  

  const getUser = async () => {
    // try {
     
    // } catch (error) {
      
    //   console.log(error);
    // }
  }
  return (
    <div className="profileContainer">
     
    </div>
)
}

export default Profile;