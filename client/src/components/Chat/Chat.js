import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

function Chat(){
  const location = useLocation();
  const [user_name, set_user_name] = useState("");
  const [user_room, set_user_room] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const {user_name, user_room} = queryString.parse(location.search);
    socket = io(ENDPOINT);
    set_user_room(user_room);
    set_user_name(user_name);
    socket.emit("join", {user_name, user_room});
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if(message){
      socket.emit("sendMessage", {user_name: user_name, user_room: user_room, message_text: message});
      setMessage("");
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar user_room={user_room} />
        <Messages messages={messages} current_user_name={user_name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );

}

export default Chat;