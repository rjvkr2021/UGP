const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

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

io.on('connect', (socket) => {
  socket.on('join', async ({ name, room }, callback) => {
    try {
      await addUser({ id: socket.id, name, room });

      socket.join(room);

      socket.emit('message', { user: 'admin', text: `${name}, welcome to room ${room}.`});
      socket.broadcast.to(room).emit('message', { user: 'admin', text: `${name} has joined!` });

      io.to(room).emit('roomData', { room: room, users: await getUsersInRoom(room) });

      callback();
    } catch (error) {
      console.error('Error:', error);
      callback(error.message);
    }
  });

  socket.on('sendMessage', async (message, callback) => {
    try {
      const user = await getUser(socket.id);
      io.to(user.room).emit('message', { user: user.name, text: message });

      callback();
    } catch (error) {
      console.error('Error:', error);
    }
  });

  socket.on('disconnect', async () => {
    try {
      const user = await getUser(socket.id);
      await removeUser(socket.id);
      
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    } catch (error) {
      console.error('Error:', error);
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));