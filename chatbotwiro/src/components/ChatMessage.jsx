import { useState } from 'react';
import  Chatbot  from '../chatbot/Chatbot';

export function ChatInput({chatMessages, setChatMessages}){
  const [inputText, setInputText] = useState('');

  function saveInputtext(event){
    setInputText(event.target.value);
  }

  async function sendMessage(){
    const userMessage = inputText;
    if (!userMessage.trim()) return;

    const botMsgId = crypto.randomUUID();
    const newChatMessages = [
      ...chatMessages,
      { message: userMessage, sender: "user", id: crypto.randomUUID() },
      { message: "", sender: "wiro", id: botMsgId }
    ];

    setChatMessages(newChatMessages);
    setInputText('');

    const reply = await Chatbot.getResponseAsync(userMessage);

    let i = 0;
    const interval = setInterval(() => {
      setChatMessages(prev => prev.map(msg =>
        msg.id === botMsgId
          ? { ...msg, message: reply.substring(0, i + 1) }
          : msg
      ));
      i++;
      if (i >= reply.length) clearInterval(interval);
    }, 20);
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Chat with Wiro"
        onChange= {saveInputtext}
        value ={inputText}
        className="chat-input"
        onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      }}
      />
      <button
        onClick ={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
  }