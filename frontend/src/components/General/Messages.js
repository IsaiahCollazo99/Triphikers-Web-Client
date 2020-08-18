import React, { useState, useEffect } from "react";
import ChatList from "../../chatList/ChatList";
// import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthContext";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";
import "../../css/chats/messages.css";
import ChatView from "../../chatList/ChatView";

const Messages = () => {
    const history = useHistory();
    // const { currentUser } = useContext(AuthContext);
    const [selectedChatIndex, setSelectedChatIndex] = useState(null);
    const [newChatFormVisible, setNewChatFormVisible] = useState(false);
    const [email, setEmail] = useState(null);
    const [chats, setChats] = useState([]);

    const newChatButtonClicked = () => {
        setNewChatFormVisible(true);
        setSelectedChatIndex(null);
    }

    const selectChatButton = (chatIndex) => {
        setSelectedChatIndex(chatIndex);
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
        <div className="messagesContainer">
           <ChatList newChat = {newChatButtonClicked} selectChatButton={selectChatButton} chats={chats} email={email} selectedChatIndex={selectedChatIndex}/>
           { newChatFormVisible ? null : <ChatView user={email} chat={chats[selectedChatIndex]}></ChatView> }
        </div>
    )
}

export default Messages;