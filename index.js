const http = require('http')
const WebSocketServer = require('websocket').server;
let connections = [];

const httpServer = http.createServer();
const websocket = new WebSocketServer({ 'httpServer': httpServer });

httpServer.listen(8080, () => {
  console.log('server listening on 8080');
});

websocket.on('request', (request) => {
  const connection = request.accept(null, request.origin);

  // when someone sends a message, broadcast it to all connected clients.
  connection.on('message', (message) => {
    console.log('received message', message);
    connections.forEach((c) => { c.send(`User: ${connection.socket.remotePort} says ${message.utf8Data}`); });
  });

  // add the new connection to the list of connections.
  connections.push(connection);

  // send a message to all connected clients when a new client connects.
  connections.forEach((c) => { c.send(`User: ${connection.socket.remotePort} has joined`); });

  // when a client disconnects, remove it from the list of connections.
  connection.on('close', (reasonCode, description) => {
    console.log('client disconnected');
  });
});
