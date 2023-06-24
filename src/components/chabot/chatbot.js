import React, { useState, useEffect, KeyboardEvent } from 'react';
import { basicChatCompletion } from '../../lib/api';
import './ChatBot.scss';
import WaitSvg from '../../images/wait.svg';

import ChatBotEntry from './ChatBotEntry';

const ChatBot = () => {

    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState([]);
    const chatDataArray = [];
    const [chatEntries, setChatEntries] = useState([]);


    const [entries, setEntries] = useState(
        [
            {
                role: "model",
                content: "<div style='background-color: #fbcffc'>" + "Hello, I'm MoneyMentor, your financial educator, How can i help you?" + "</div>"
            },
        ]
    );
    const [inputValue, setInputValue] = useState('');

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    }

    async function handleSendMessage() {
        let message = inputValue;
        let query = {
            role: 'user',
            content: "<div style='background-color: #be79df'>" + message + "</div>"
        }
        let latestAnswer = message;
        let pendingResponse = {
            role: "model",
            // content: "<div style='background-color: #fbcffc'>" + "<strong>. . .</strong>" + "</div>"
            content: "<div class='avatar-img' style='background-color: #fbcffc'>" + "<img  src='wait.svg' style='max-width:51px' alt='...' />" + "</div>"
        }
        setEntries(entries => {
            return [...entries, query, pendingResponse];
        });
        setInputValue('');
        let data = await basicChatCompletion(message);
        let newResponse = {
            role: "model",
            content: "<div id='botAnswer' style='background-color: #fbcffc'>" + data.data.choices[0].message?.content + "</div>"
            // content: "<div style='background-color: #fbcffc'>" + "testing the response" + "</div>"
        }
        let latestResponse = data.data.choices[0].message?.content;
        // let latestResponse = "testing the response";
        setEntries(entries => {
            let newEntries = [...entries];
            newEntries.pop();
            newEntries.push(newResponse);
            return newEntries;
        })

    }

    async function addOneEntryToChatBot(entry) {
        if (!entry) return;
        setEntries(entries => [...entries, entry]);
    }

    return (
        <>
            <div className="chat-box">
                <div className="chat-room">
                    {
                        entries.map((entry, index) => {
                            return <ChatBotEntry key={index} chatBotEntry={entry} />
                        })
                    }
                </div>
                <div className="type-area">
                    <div className="input-wrapper">
                        <input value={inputValue} type="text" id="inputText" onKeyDown={handleKeyDown} onChange={(event) => { setInputValue(event.target.value) }} placeholder="Type message here..." />
                    </div>
                    <button className="button-send" onClick={() => handleSendMessage()}>Send</button>
                </div>
            </div>
        </>
    )
}

export default ChatBot;