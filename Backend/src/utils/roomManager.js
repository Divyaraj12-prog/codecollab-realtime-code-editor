const rooms = {};

function createOrJoinRoom(roomId, socketId) {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      users: [],
      code: ''
    };
  }

  if (!rooms[roomId].users.includes(socketId)) {
    rooms[roomId].users.push(socketId);
  }


  return rooms[roomId];
}

function updateCode(roomId, code) {
  if (rooms[roomId]) {
    rooms[roomId].code = code;
  }
}

function getRoom(roomId) {
  return rooms[roomId];
}

function removeUser(roomId, socketId) {
  if (!rooms[roomId]) return;

  rooms[roomId].users = rooms[roomId].users.filter(
    id => id !== socketId
  );

  if (rooms[roomId].users.length === 0) {
    delete rooms[roomId];
  }
}

module.exports = {
  createOrJoinRoom,
  updateCode,
  getRoom,
  removeUser
};