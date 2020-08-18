import React from "react";
import styles from "../chatList/chatViewStyles";
import { withStyles } from '@material-ui/core/styles';

const ChatView = () => {

    return(
        <div className="chatView">
            Hello from ChatView
        </div>
    )
}

export default withStyles(styles)(ChatView);
