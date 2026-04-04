require('dotenv').config();
const app = require('./src/app');
const cors = require('cors');
const http = require('http');
const initSocketServer = require('./src/sockets/socketServer');
const express = require('express');
const corsOptions = require('./src/config/cors');

const PORT = process.env.PORT;


app.use(cors(corsOptions));
app.use(express.json());

const startServer = () => {
    try {
    const httpserver = http.createServer(app);
    initSocketServer(httpserver);
    
    httpserver.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}
startServer();