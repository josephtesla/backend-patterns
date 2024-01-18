const http = require('http');
const WebSocketServer = require('websocket').server;
const connections = [];

const httpServer = http.createServer((req, res) => {
  console.log('Received request for ' + req.url);
  res.writeHead(404);
  res.end();
})

const websocket = new WebSocketServer({ "httpServer": httpServer })

httpServer.listen(8080, () => {
  console.log("Listening on port: ", 8080);
})
