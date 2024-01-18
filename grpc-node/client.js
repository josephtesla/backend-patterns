const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./todo.proto";
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());

client.createTodo({ 
  "id": -1,
  "text": "Do Laundry",
}, (err, response) => {
  console.log("Received from server: ", JSON.stringify(response));
  client.readTodos({}, (err, res2) => {
    console.log("Todos: ", JSON.stringify(res2))
    client.readOneTodo({ id: 5 }, (err, res3) => {
      console.log(res3)
      client.readOneTodo({id: 1}, (err, res4) => {
        console.log(res4);
      })
    })
  })
})

const call = client.readTodosStream();

call.on('data', (item) => {
  console.log(`received item from server ${JSON.stringify(item)}`);
})

call.on('end', () => {
  console.log(`server done!`)
})
