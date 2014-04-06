require("restartable")(function(parRestartableObj){
  var express = require("express");
  var http = require("http");

  var app = express();

  var server = http.createServer(app);

  server.listen(4000);




  var nodeMirror = require("../lib/nodeMirror.js");
  
  //app.use("/xxx/", express.bodyParser());
  
  nodeMirror.startServer({
    dir: process.cwd()
    , app: app
    , server: server
    , webpath: "xxx"
    , restartableObj: parRestartableObj
  }, function(){
    app.get("/", function(req, res){
      res.setHeader('Content-Type', "text/html");
      res.end("my site2");
    });
  });
  
  
}, function(parRestartableObj){

});


