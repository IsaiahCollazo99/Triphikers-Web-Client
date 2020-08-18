import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import "../css/chats/chatList.css";


const ChatList = ({chats, email, selectedChatIndex, selectChatButton}) => {

    const newChat = () => {

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

export default withStyles(styles)(ChatList);