import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import "../css/chats/chatTextBox.css";

const ChatTextBox = ({ submitMessageToFirebase, messageRead, selectedChatIndex }) => {
    const [chatText, setchatText] = useState("");

    const userTyping = (e) => {
        e.keyCode === 13 ? submitMessage() : setchatText(e.target.value);
    }

    const messageValid = (text) => {
        if(text && text.replace(/\s/g, "").length) {
            return true
        }
    }

    const userClickedInput = () => {
        messageRead(selectedChatIndex)
    }

    const submitMessage = () => {
        if(messageValid(chatText)) {
            submitMessageToFirebase(chatText);
            document.getElementById("chatTextBox").value = "";
        }
    }

    return(
        <div className="chatTextBoxContainer">
            <TextField placeholder="Type Your Message..." onKeyUp={(e) => userTyping(e)} id="chatTextBox" className="chatTextBox" onFocus={userClickedInput}></TextField>
            <Send onClick={submitMessage} className="sendButton"></Send>
        </div>
    )
}

export default ChatTextBox