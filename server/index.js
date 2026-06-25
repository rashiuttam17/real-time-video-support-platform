const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { 
    origin: "http://localhost:3001", 
    methods: ["GET", "POST"] 
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined');
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('offer', ({ sessionId, offer }) => {
    socket.to(sessionId).emit('offer', { offer });
  });

  socket.on('answer', ({ sessionId, answer }) => {
    socket.to(sessionId).emit('answer', { answer });
  });

  socket.on('ice-candidate', ({ sessionId, candidate }) => {
    socket.to(sessionId).emit('ice-candidate', { candidate });
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room ${roomId}`);
  });
});

server.listen(5000, () => console.log('Signaling server running on 5000'));