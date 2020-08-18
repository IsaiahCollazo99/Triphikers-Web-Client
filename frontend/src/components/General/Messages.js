import React, { useState, useEffect } from "react";
import ChatList from "../../chatList/ChatList";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";
import "../../css/chats/messages.css";
import ChatView from "../../chatList/ChatView";
import ChatTextBox from "../../chatList/ChatTextBox";

const Messages = () => {
    const history = useHistory();
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

    const buildDocKey = (friend) => {
        let users = [email, friend]
        return users.sort().join(":")
    }

    const submitMessageToFirebase = (message) => {
        let usersArr = chats[selectedChatIndex].users
        const docKey = buildDocKey(usersArr.filter(user => user !== email)[0]);
        firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                sender: email,
                message: message,
                timestamp: Date.now()
            }),
            receiverHasRead: false
        })
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
           <div className="messagesContent">
            { newChatFormVisible ? null : <ChatView user={email} chat={chats[selectedChatIndex]}></ChatView> }
            {
                selectedChatIndex !== null && !newChatFormVisible ? <ChatTextBox submitMessageToFirebase={submitMessageToFirebase}></ChatTextBox> : null
            }
           </div>
        </div>
    )
}

export default Messages;