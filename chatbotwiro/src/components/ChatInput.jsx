import { useState } from 'react';
import Chatbot from '../chatbot/Chatbot';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    const userMessage = inputText.trim();
    if (!userMessage || isSending) return;

    setIsSending(true);

    const botMsgId = crypto.randomUUID();
    const newChatMessages = [
      ...chatMessages,
      { message: userMessage, sender: "user", id: crypto.randomUUID() },
      { message: "", sender: "wiro", id: botMsgId }
    ];

    setChatMessages(newChatMessages);
    setInputText('');

    try {
      const reply = await Chatbot.getResponseAsync(userMessage);

      let i = 0;
      const interval = setInterval(() => {
        setChatMessages(prev => prev.map(msg =>
          msg.id === botMsgId
            ? { ...msg, message: reply.substring(0, i + 1) }
            : msg
        ));
        i++;
        if (i >= reply.length) {
          clearInterval(interval);
          setIsSending(false);
        }
      }, 15);
    } catch {
      setChatMessages(prev => prev.map(msg =>
        msg.id === botMsgId
          ? { ...msg, message: "Sorry, something went wrong. Please try again." }
          : msg
      ));
      setIsSending(false);
    }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Message Wiro…"
        onChange={handleInputChange}
        value={inputText}
        className="chat-input"
        aria-label="Type a message"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <button
        onClick={sendMessage}
        className="send-button"
        disabled={!inputText.trim() || isSending}
        aria-label="Send message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        Send
      </button>
    </div>
  );
}