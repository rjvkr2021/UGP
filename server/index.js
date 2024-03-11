const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { addMessage } = require("./users");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from the client-side app
    methods: ["GET", "POST"], // Allow only GET and POST requests
    credentials: true // Allow sending cookies with requests
  }
});

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", async ({user_name, user_room}) => {
    console.log(`${socket.id} joined`);
    socket.join(user_room);
    socket.emit("message", {message_id: 0, message_text: `${user_name}, welcome to room ${user_room}.`, message_sender: "admin"});
    socket.broadcast.to(user_room).emit("message", {message_id: 0, message_text: `${user_name} has joined.`, message_sender: "admin"});
  });

  socket.on("sendMessage", async ({user_name, user_room, message_text}) => {
    try {
      const message_id = await addMessage({ socket_id: socket.id, user_name: user_name, user_room: user_room, message_text: message_text});
      io.to(user_room).emit("message", {message_id: message_id, message_text: message_text, message_sender: user_name});
    } catch (error) {
      console.error("Error:", error);
    }
  });

  socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected`);
  })
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});