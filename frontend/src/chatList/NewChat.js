import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, Paper, CssBaseline, Typography } from '@material-ui/core';
import firebase from "../firebase";
import "../css/chats/newChat.css";

const NewChat = ({ redirectToChat, newChatSubmit }) => {
    const [userName, setUserName] = useState(null);
    const [message, setMessage] = useState(null);

    const userTyping = (type, e) => {
        switch (type) {
            case "username":
                setUserName(e.target.value)
                break;
            case "message":
                setMessage(e.target.value)
                break;

            default:
                break;
        }
    }
    
    const userExists = async () => {
        const usersSnapShot = await firebase
        .firestore()
        .collection("users")
        .get()
        const exists = usersSnapShot.docs
        .map(doc => doc.data().email)
        .includes(userName)
        return exists;
        // this.setState({ serverError: !exists})
    }
    
    const buildDocKey = () => {
        return [firebase.auth().currentUser.email, userName].sort().join(":");
    }
    
    const chatExists = async () => {
        const docKey = buildDocKey();
        const chat = await firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .get();
        return chat.exists
    }

    const createChat = () => {
        newChatSubmit({
            sendTo: userName,
            message: message
        });
    }

    const goToChat = () => {
        redirectToChat(buildDocKey(), message);
    }

    const submitNewChat = async (e) => {
        e.preventDefault();
        const doesUserExist = await userExists();
        if(doesUserExist){
            const doesChatExist = await chatExists();
            doesChatExist ? goToChat() : createChat()
        }
    }
    
    return (
        <main className="newChatMain">
            <CssBaseline></CssBaseline>
            <Paper className="paper">
                <Typography component="h1" variant="h5">Send A Message!</Typography>
                <form className="form" onSubmit={(e) => submitNewChat(e)}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="new-chat-username">
                            Enter An Email
                        </InputLabel>
                        <Input required className="input" autoFocus onChange={(e) => userTyping('username', e)} id="new-chat-username"></Input>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="new-chat-message">Enter Your Message</InputLabel>
                        <Input required className="input" onChange={(e) => userTyping('message', e)} id="new-chat-message"></Input>
                    </FormControl>
                    <Button fullWidth className="submit" variant="contained" color="primary" style={{marginTop: "15px"}} type="submit">Submit</Button>
                </form>
            </Paper>
        </main>
    )
}

export default NewChat;