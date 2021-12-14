const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  "localhost:9000",
  grpc.credentials.createInsecure()
);

if (process.argv[2] == "add") {
  client.createUser(
    {
      id: 1,
      nom: "mannai",
      prenom: "oumaima",
      motPasse: "mannaiPW",
    },
    (err, response) => {
      console.log("New user: " + JSON.stringify(response));
    }
  );
} else if (process.argv[2] == "delete") {
  if (process.argv[3] == null) {
    console.log("you must specify the user ID !!");
  } else {
    client.deleteUser(
      {
        id: process.argv[3],
      },
      (err, response) => {
        if (err) {
          console.log("user not deleted !");
        } else {
          console.log("user deleted " + JSON.stringify(response));
        }
      }
    );
  }
} else if (process.argv[2] == "get") {
  client.getUsers({}, (err, response) => {
    console.log("Users: ", JSON.stringify(response));
  });
} else if (process.argv[2] == "update") {
  if (process.argv[3] == null) {
    console.log("you must specify the user ID !!");
  } else {
    client.updateUser(
      {
        id: process.argv[3],
        nom: "abidi",
        prenom: "oumaima",
        motPasse: "mannaiPW12",
      },
      (err, response) => {
        if (err) {
          console.log("user not updated !");
        } else {
          console.log("Updated user: " + JSON.stringify(response));
        }
      }
    );
  }
} else {
  console.log("your choice is wrong !!");
}
