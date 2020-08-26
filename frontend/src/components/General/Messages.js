import React, { useState, useEffect } from "react";
import ChatList from "../../chatList/ChatList";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";
import "../../css/chats/messages.css";
import ChatView from "../../chatList/ChatView";
import ChatTextBox from "../../chatList/ChatTextBox";
import NewChat from "../../chatList/NewChat";

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

    const selectChatButton = async (chatIndex) => {
        await setSelectedChatIndex(chatIndex);
        messageRead(chatIndex)
    }

    const buildDocKey = (friend) => {
        let users = [email, friend]
        return users.sort().join(":")
    }

    const submitMessageToFirebase = (message, index = selectedChatIndex) => {
        let usersArr = chats[index].users
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

    const otherUserClickedChat = (chatIndex) => {
        let lastMessage = chats[chatIndex].messages[chats[chatIndex].messages.length-1]
        if(lastMessage.sender !== email){
            return true
        } else {
            return false
        }
    }

    const messageRead = (chatIndex) => {
        let usersArr = chats[chatIndex].users
        const docKey = buildDocKey(usersArr.filter(user => user !== email)[0]);
        if(otherUserClickedChat(chatIndex)){
            firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                receiverHasRead: true
            })
        }
    }

    
    const redirectToChat = async (docKey, message) => {
        const usersInChat = docKey.split(":");
        const chat = chats.find(chatInfo => usersInChat.every(user => chatInfo.users.includes(user)));
        let index = chats.indexOf(chat);
        submitMessageToFirebase(message, index);
        setNewChatFormVisible(false);
        setSelectedChatIndex(index);
    }
    
    const newChatSubmit = async (chatObj) => {
        const docKey = buildDocKey(chatObj.sendTo);
        await firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .set({
            receiverHasRead: false,
            users: [email, chatObj.sendTo],
            messages: [{
                message:chatObj.message,
                sender: email
            }]
        }, ((error) => {
            if(error){
                console.log(error)
            }
        }))
        debugger
        // const chatRef = firebase.firestore().collection("chats").doc(docKey).get();
        // const allChats = await chatRef.map(doc => doc.data().email)
        // setNewChatFormVisible(false);
        // setSelectedChatIndex(chats.length-1)
        //doesn't open up chat!
    }

    useEffect(() => {
       firebase.auth().onAuthStateChanged(async user => {
        if(!user){
            history.push("/signUp");
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
           <ChatList newChatButtonClicked = {newChatButtonClicked} selectChatButton={selectChatButton} chats={chats} email={email} selectedChatIndex={selectedChatIndex}/>
           <div className="messagesContent">
            { newChatFormVisible ? null : <ChatView user={email} chat={chats[selectedChatIndex]}></ChatView> }
            {
                selectedChatIndex !== null && !newChatFormVisible ? <ChatTextBox submitMessageToFirebase={submitMessageToFirebase} messageRead={messageRead} selectedChatIndex={selectedChatIndex}></ChatTextBox> : null
            }
            {
                newChatFormVisible ? <NewChat redirectToChat={redirectToChat} newChatSubmit={newChatSubmit}></NewChat> : null
            }
           </div>
        </div>
    )
}

export default Messages;