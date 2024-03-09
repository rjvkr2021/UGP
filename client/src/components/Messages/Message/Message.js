import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { message_id, message_text, message_sender }, current_user_name }) => {
  let text_to_display = message_id + ": " + message_text
  return (
    (message_sender == current_user_name)
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{current_user_name}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text_to_display)}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text_to_display)}</p>
          </div>
          <p className="sentText pl-10 ">{message_sender}</p>
        </div>
      )
  );
}

export default Message;