import React, { useState, useEffect } from "react";
import ChatList from "../../chatList/ChatList";
// import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthContext";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const Messages = () => {
    const history = useHistory();
    // const { currentUser } = useContext(AuthContext);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newChatFormVisible, setNewChatFormVisible] = useState(false);
    const [email, setEmail] = useState(null);
    const [chats, setChats] = useState([]);

    const newChatButtonClicked = (chatIndex) => {
        console.log(chatIndex);
    }

    const selectChat = () => {
        setNewChatFormVisible(true);
        setSelectedChat(null);
    }

    useEffect(() => {
       firebase.auth().onAuthStateChanged(async user => {
        if(!user){
            history.push("/login");
        } else {
            await firebase
            .firestore()
            .collection('chats')
            .where('users', 'array-contains', user.email)
            .onSnapshot(async res => {
                const convo = res.docs.map(doc => doc.data());
                await setEmail(user.email) 
                await setChats(convo)
            })
        }
    })
}, [])

    return(
        <div>
           Hello these are your messages
           <ChatList newChat = {newChatButtonClicked} selectChat={selectChat} chats={chats} email={email} selectedChat={selectedChat}/>
        </div>
    )
}

export default Messages;