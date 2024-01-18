const dgram = require('dgram');
const socket = dgram.createSocket('udp4'); // udp4 is ipv4 version of udp
socket.bind('5500', '127.0.0.1', () => {
  console.log('Listening');
}); // listen on port 5500 on localhost

socket.on('message', (msg, info) => {
  console.log(`Received ${msg} from ${info.address}:${info.port}`);
})
