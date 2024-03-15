import React, {useState} from "react";
import "./Message.css";

const Message = ({message, current_user_name, editMessage}) => {
  const { message_id, message_text, message_sender } = message;
  const text_to_display = `id: ${message_id} | text: ${message_text}`;
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessageText, setEditedMessageText] = useState(message_text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    editMessage(message, editedMessageText);
    setIsEditing(false);
  };

  return (
    (message_sender === current_user_name)
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{current_user_name}</p>
          <div className="messageBox backgroundBlue">
          {isEditing ? (
            <textarea
              className="messageText"
              value={editedMessageText}
              onChange={({ target: { value } }) => setEditedMessageText(value)}
            />
          ) : (
            <p className="messageText colorWhite">{text_to_display}</p>
          )}
          </div>
          <button onClick={isEditing ? handleSaveClick : handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
          {isEditing ? (
            <textarea
              className="messageText"
              value={editedMessageText}
              onChange={({ target: { value } }) => setEditedMessageText(value)}
            />
          ) : (
            <p className="messageText colorDark">{text_to_display}</p>
          )}
          </div>
          <button onClick={isEditing ? handleSaveClick : handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </button>
          <p className="sentText pl-10 ">{message_sender}</p>
        </div>
      )
  );
}

export default Message;