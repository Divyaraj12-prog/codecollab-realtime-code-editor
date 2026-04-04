const { Server } = require('socket.io');
const roomManager = require('../utils/roomManager');
function initSocketServer(httpserver) {
  const io = new Server(httpserver, {
    cors: {
      origin: "*",
      // credentials: true,
      // methods: ["GET", "POST"],
      // allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('join-room', ({ roomId }) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);

      socket.roomId = roomId;

      const room = roomManager.createOrJoinRoom(roomId, socket.id);

      
      socket.emit('code-update', room.code);
      socket.to(roomId).emit('user-joined', socket.id);

      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('code-change', ({ roomId, code }) => {
      roomManager.updateCode(roomId, code);
      console.log(`CODE CHANGE ${roomId}: ${code}`);

      socket.to(roomId).emit('code-update', code);
    });

    socket.on('send-message', ({ roomId, message, username }) => {
      socket.to(roomId).emit('receive-message', { message, username });
      console.log(`MESSAGE ${roomId}: ${message} by ${username}`);
    });


    socket.on('disconnect', () => {
      console.log('User disconnected: ' + socket.id);

      if(socket.roomId) {
        roomManager.removeUser(socket.roomId, socket.id);
      }

    });
  });
}

module.exports = initSocketServer;