import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import "../../css/chats/chatList.css";


const ChatList = ({ newChatButtonClicked, chats, email, selectedChatIndex, selectChatButton }) => {

    const newChat = () => {
        newChatButtonClicked();
    }

    const userIsSender = (chat) => {
        let lastMessage = chat.messages[chat.messages.length-1]
        if(lastMessage.sender === email){
            return true
        } else {
            return false
        }
    }

    const selectChat = (index) => {
        selectChatButton(index)
    }

    if(chats.length > 0){
        return(
            <main className="chatListContainer">
                <Button variant="contained" fullWidth color="primary" className="addNewChat" onClick={newChat}>New Message</Button>
                <List>
                    {
                        chats.map((chat, index) => {
                            return(
                                <div key={index}>
                                <ListItem onClick={() => selectChat(index)} className="chatPreview" selected={selectedChatIndex === index} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp">{chat.users.filter(user => user !== email)[0].split("")[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={chat.users.filter(user => user !== email)[0]} secondary={
                                        <React.Fragment>
                                            <Typography component='span' color='textPrimary'>
                                                {
                                                    chat.messages[chat.messages.length - 1].message.substring(0, 50)
                                                }
                                            </Typography>
                                        </React.Fragment>
                                    }>
                                    </ListItemText>
                                    {
                                        chat.receiverHasRead === false && !userIsSender(chat) ? <ListItemIcon>
                                            <NotificationImportant className="unreadMessage">
                                            </NotificationImportant>
                                        </ListItemIcon> : null
                                    }
                                </ListItem>
                                <Divider></Divider>
                                </div>
                            )
                        })
                    }
                </List>
            </main>
        )

    } else {
        return(
            <main className="chatListContainer">
                <Button variant="contained" color="primary" fullWidth onClick={newChat} className="addNewChat">
                    New Message
                </Button>
                <List></List>
            </main>
        )
    }

}

export default ChatList;