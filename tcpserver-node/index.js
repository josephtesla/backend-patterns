const net = require('net');

const server = net.createServer((socket) => {
  console.log('TCP handshake established with ' + socket.remoteAddress + ':' + socket.remotePort);
  socket.write('Hello Client! from TCP server');
  socket.on('data', (data) => {
    console.log("Received from client: " + data.toString());
  })
})

server.listen(5600, '127.0.0.1', () => {
  console.log('TCP server listening on port 5600');
});
