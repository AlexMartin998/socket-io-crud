'use strict';
console.clear();

import { Server as WebsocketServer } from 'socket.io';
import http from 'http';

import app from './app';
import { PORT } from './config';
import sockets from './sockets/sockets';

export const server = http.createServer(app);
const httpServer = server.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

const io = new WebsocketServer(httpServer);
sockets(io);
