import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

function ChatMessages({ chatMessages }) {
  const chatMessageRef = useRef(null);

  useEffect(() => {
    const container = chatMessageRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  return (
    <div
      className="chat-messages-container"
      ref={chatMessageRef}
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {chatMessages.length === 0 ? (
        <div className="chat-messages-empty">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <p>Start a conversation with Wiro</p>
        </div>
      ) : (
        chatMessages.map((chatMessage) => (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        ))
      )}
    </div>
  );
}

export default ChatMessages;