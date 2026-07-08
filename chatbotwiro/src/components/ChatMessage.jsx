import WiroProfileImage from '../assets/images/Wiro.jpg';
import UserProfileImage from '../assets/images/Quao.jpg';
import './ChatMessage.css';

export function ChatMessage(props){
  const message = props.message;
  const sender = props.sender;
  //const {message, sender} = props;

  /*
  if(sender === "user")
    return (
      <div>
        {message}
        <img src="images/Quao.jpg" width="70" />
      </div>
    );
  */

  return (
    <div className={
      sender === "wiro" 
        ? "chat-message-wiro" 
        : "chat-message-user"}>
      {sender === "wiro" && (
        <img className="wiro-image" src= {WiroProfileImage} />
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === "user" && (
        <img className="user-image" src={UserProfileImage} />
      )}
    </div>
  );
}