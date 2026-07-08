import { useState } from 'react'

import './App.css'
import { ChatInput } from './components/ChatInput';
import  DarkMode  from './components/DarkMode';
import  ChatMessages  from './components/ChatMessages';

function App() {
  const [chatMessages, setChatMessages] = useState([{
          message: " Hello",
          sender: "user",
          id: 'id1'
        },
        {
          message: " U I A ",
          sender: "wiro",
          id: 'id2'
        },
        {
          message:" Date",
          sender: "user",
          id: 'id3'
        },
        {
          message: " Today ",
          sender: "wiro",
          id: 'id4'
        }]);
  return (
    <>
      <div className="app-container">
            <ChatMessages 
              chatMessages={chatMessages}
            />
            <ChatInput 
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
            <DarkMode className="darkMode-button" />
          </div>
    </>
  )
}

export default App
