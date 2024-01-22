const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from the client-side app
    methods: ["GET", "POST"], // Allow only GET and POST requests
    credentials: true // Allow sending cookies with requests
  }
});

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

io.on('connection', (socket) => {
  console.log('We have a new connection!!!');

  socket.on('join', ({name, room}) => {
    const {error, user} = addUser({id: socket.id, name, room});
    if(error){
      return callback(error);
    }
    socket.emit('message', { user: 'admin', text: `hi ${user.name}`});
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!!!`});
    socket.join(user.room);
    callback();
  });

  socket.on('sendMessage', ({message, callback}) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', {user: user.name, text : message});
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User had left!!!');
  });
});

app.use(router);

server.listen(process.env.PORT || 5000, () => {
  console.log('Server has started.');
});