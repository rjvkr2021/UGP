import React from 'react';

import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onClick={event => sendMessage(event)}
    />
    <button className="sendButton" onClick={event => sendMessage(event)}>Send</button>
  </form>
)

export default Input;