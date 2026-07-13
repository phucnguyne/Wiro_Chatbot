import { useState } from 'react'

import './App.css'
import { ChatInput } from './components/ChatInput';
import DarkMode from './components/DarkMode';
import ChatMessages from './components/ChatMessages';
import WiroLogo from './assets/img/Wiro.jpg';

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hey! I'm Wiro, your conversational assistant. Ask me anything — or try \"flip a coin\" and \"roll a dice\".",
      sender: "wiro",
      id: 'welcome-msg'
    }
  ]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-brand">
          <img className="app-logo" src={WiroLogo} alt="Wiro logo" />
          <div>
            <div className="app-title">Wiro</div>
            <div className="app-subtitle">AI Assistant</div>
          </div>
        </div>
        <DarkMode />
      </header>

      <ChatMessages chatMessages={chatMessages} />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
