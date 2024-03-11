import React from "react";
import "./Message.css";

const Message = ({ message, current_user_name }) => {
  const { message_id, message_text, message_sender } = message;
  const text_to_display = `id: ${message_id} | text: ${message_text}`;
  return (
    (message_sender === current_user_name)
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{current_user_name}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text_to_display}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{text_to_display}</p>
          </div>
          <p className="sentText pl-10 ">{message_sender}</p>
        </div>
      )
  );
}

export default Message;