var express = require("express");
var http = require("http");
var fs = require("fs");
var socketIo = require("socket.io");
var promiseland = require("promiseland");

var app = express();

var server = http.createServer(app);

app.get("/", function(req, res){
  res.setHeader('Content-Type', "text/html");
  fs.readFile("./nodeTestApp.html", function(err, data){
    if (err){
      res.end(err);
      return;
    };
    var s = data.toString();
    res.end(s);
  });
});

app.use("/promiseland", express["static"](__dirname + "/../"));
app.use("/pl", express["static"](__dirname + "/../"));
app.use("/requirejs", express["static"]("./requirejs"));
app.use("/testmodules", express["static"]("./testmodules"));


server.listen(3004);

promiseland.set("profile", "server");


var ClientProfile = function() {
  this.name = function(){
    return "client";
  };
  this.connections = {};
  this.find = function(parId){
    return this.connections[parId];
  };
  var nextid = 1;
  this.addConnection = function(connection){
    var id = nextid;
    nextid++;
    this.connections[id] = connection;
    this.emit("connection", connection);
  };
};
ClientProfile.prototype = new promiseland.ProfileBaseClass();


var clientProfile = new ClientProfile();
promiseland.addProfile(clientProfile);


var mainio = socketIo.listen(server);
mainio.on('connection', function (socket) {
  /*if (err){
    console.log("-------------------------------------------------- connection error");
    console.log(err);
    console.log("-------------------------------------------------- connection error");
    return;
  };*/
  console.log("got connected");
  
  var connection = new promiseland.ConnectionBaseClass();
  connection.socket = socket;
  socket.on("pl", function(data){
    connection.emit("data", data);
  });
  connection.send = function(data){
    socket.emit("pl", data);
  };
  
  clientProfile.addConnection(connection);
  socket.on("disconnect", function(){
    connection.emit("disconnect");
  });
  return;

});

require("./testmodules/clientServer");
require("./testmodules/syncTest");
//require("./testmodules/mouseTrack");
