const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.bind("localhost:9000", grpc.ServerCredentials.createInsecure());
server.addService(todoPackage.Todo.service, {
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getUsers: getUsers,
});

server.start();

const users = [];

function createUser(call, callback) {
  const todoItem = {
    id: users.length + 1,
    nom: call.request.nom,
    prenom: call.request.prenom,
    motPasse: call.request.motPasse,
  };
  users.push(todoItem);
  callback(null, todoItem);
}

function getUsers(call, callback) {
  const todoItem = {
    id: call.request.id,
  };
  callback(null, {
    items: users,
  });
}

function deleteUser(call, callback) {
  const resultat = users.find((user) => user.id === call.request.id);

  if (resultat) {
    const index = users.indexOf(resultat);
    users.splice(index, 1);

    callback(null, resultat);
  } else {
    callback("user not found !");
  }
}

function updateUser(call, callback) {
  const resultat = users.find((user) => user.id === call.request.id);

  if (resultat) {
    const index = users.indexOf(resultat);
    users[index] = call.request;

    callback(null, users[index]);
  } else {
    callback("user not found !");
  }
}
