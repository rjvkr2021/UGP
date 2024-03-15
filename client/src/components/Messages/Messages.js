import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import "./Messages.css";

const Messages = ({messages, current_user_name, editMessage}) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} current_user_name={current_user_name} editMessage={editMessage}/></div>)}
  </ScrollToBottom>
);

export default Messages;