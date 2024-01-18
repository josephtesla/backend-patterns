const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./todo.proto";
const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), () => {
  console.log("Server listening on 40000");
  server.start()
});

server.addService(todoPackage.Todo.service, {
  "createTodo": createTodo,
  "readTodos": readTodos,
  "readOneTodo": readOne,
  "readTodosStream": readTodosStream,
})

const todos = [
  {
    id: 1,
    text: "wake up"
  },
  {
    id: 2,
    text: "go to the gym",
  },
  {
    id: 3,
    text: "eat and read"
  }
];

function createTodo(call, callback) {
  const todoItem = {
    id: todos.length + 1,
    text: call.request.text,
  };

  todos.push(todoItem);
  callback(null, todoItem);
}

function readTodos(call, callback) {
  callback(null, { "items": todos });
}

function readOne(call, callback) {
  const id = call.request.id;
  const todo = todos.find(t => t.id === id);
  if (!todo){
    call(null, { error: "Todo with the id does not exist" });
  }

  callback(null, todo);
}

function readTodosStream(call, callback) {
  todos.forEach(todo => call.write(todo));
  call.end();
}
