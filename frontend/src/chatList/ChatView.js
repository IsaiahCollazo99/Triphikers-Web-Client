import React, { useEffect } from "react";
import "../css/chats/chatView.css"

const ChatView = ({user, chat}) => {

    useEffect(() => {
        const container = document.getElementById("chatview-context");
        if(container) {
            container.scrollTo(0, container.scrollHeight);
        }
    }, [chat])

    if(chat === undefined){
        return (
            <main id="chatview-context" className="chatViewContainer"></main>
        )
    } else {
        return(
            <div>
                <div className="chatHeader">
                    Your conversation with {chat.users.filter(_user => _user !== user)}
                </div>
                <main id="chatview-context" className="chatViewContainer">
                    {
                        chat.messages.map((message, index) => {
                            return(
                                <div key={index} className={message.sender === user ? "userSent" : "friendSent"}>
                                    {message.message}
                                </div>
                            )
                        })
                    }
                </main>
            </div>
        )
    }
}

export default ChatView;
