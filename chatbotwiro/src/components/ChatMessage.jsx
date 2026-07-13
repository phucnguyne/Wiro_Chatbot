import WiroProfileImage from '../assets/img/Wiro.jpg';
import UserProfileImage from '../assets/img/Quao.jpg';
import './ChatMessage.css';

export function ChatMessage({ message, sender }) {
  const isUser = sender === "user";
  const isTyping = sender === "wiro" && message === "";

  return (
    <div className={`chat-message chat-message--${sender}`}>
      <img
        className="chat-message__avatar"
        src={isUser ? UserProfileImage : WiroProfileImage}
        alt={isUser ? "You" : "Wiro"}
      />
      <div className="chat-message__bubble">
        {isTyping ? (
          <div className="chat-message__typing" aria-label="Wiro is typing">
            <span className="chat-message__typing-dot" />
            <span className="chat-message__typing-dot" />
            <span className="chat-message__typing-dot" />
          </div>
        ) : (
          message
        )}
      </div>
    </div>
  );
}