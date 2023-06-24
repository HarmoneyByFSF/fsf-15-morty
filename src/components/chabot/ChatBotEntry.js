import { useState } from "react";
import MarkdownPreview from '@uiw/react-markdown-preview';


const ChatBotEntry = (props) => {
    const chatBotEntry = props.chatBotEntry;
    if (chatBotEntry.role == "calculator") {
        return <div className="message message-left">
        <div className="avatar-wrapper avatar-small">
            <img src="https://znews-photo.zadn.vn/w660/Uploaded/pnbcuhbatgunb/2020_03_23/i13863960814_1.jpg" alt="avatar" />
        </div>
        <div className="bubble bubble-light" dangerouslySetInnerHTML={{__html: chatBotEntry.content}}>
            {/* <MarkdownPreview source={chatBotEntry.content}/> */}
        </div>
    </div>  
    }
    return (chatBotEntry.role == 'model')
    ?
    <div className="message message-left">
        <div className="avatar-wrapper avatar-small">
            <img src="https://znews-photo.zadn.vn/w660/Uploaded/pnbcuhbatgunb/2020_03_23/i13863960814_1.jpg" alt="avatar" />
        </div>
        <div className="bubble bubble-light">
            <MarkdownPreview source={chatBotEntry.content}/>
        </div>
    </div>  
    :
    <div className="message message-right">
        <div className="avatar-wrapper avatar-small">
            <img src="https://www.clipartmax.com/png/small/132-1323860_how-to-use-this-website-e-learning-student-icon.png" alt="avatar" />
        </div>
        <div className="bubble bubble-dark">
            <MarkdownPreview source={chatBotEntry.content}/>
        </div>
    </div>
}

export default ChatBotEntry