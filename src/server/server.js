define([
  "dojo/node!express"
  , "main/config"
  , "dojo/node!mime-magic"
  , "dojo/node!pty.js"
  , "dojo/node!socket.io"
  , "dojo/node!http"
], function(
  express
  , config
  , mimeMagic
  , pty
  , socketIo
  , http
  , optimist
){
  config.isServer = true;
  
  require([
    "main/remoteCaller"
    , "main/treeItems"
    , "main/contentIO"
    , "main/nodeControl"
  ], function(
    remoteCaller
    , treeItems
    , nodeControl
  ){
    var mirror = express();
    
    var server = http.createServer(mirror);
    //var server = mirror;
    
    mirror.use(express.bodyParser());
    
    mirror.put('/apicall', function(req, res){
      console.log("call:");
      console.log(req.body);
      remoteCaller.serverCall(req.body).then(function(par){
		console.log("response:");
		console.log(par);
        res.send(par);
      });
    });
    
    
    mirror.use(express.static(config.static));
  
    mirror.get('/', function(req, res){
      res.send('Hello World');
    });
    
    server.listen(config.port);
    
    
    var io = socketIo.listen(server);
    
    
    
    
    var term = pty.spawn('bash', [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env
    });
    
    io.sockets.on('connection', function (socket) {
      console.log("connecting");
      //socket.emit('news', { hello: 'world' });
      /*socket.on('my other event', function (data) {
        console.log(data);
      });
      socket.on("create", function(cols, rows, fn){
        console.log("create");
        fn(null, {
          id: 1
        });
      });*/
      socket.on("data", function(id, data){
        console.log("data");
        //term.write(data);
      });
      /*term.on('data', function(data) {
        socket.emit('data', 1, data);
        console.log(data);
      });*/
    });
    
    term.on('close', function() {
      // Make sure it closes
      // on the clientside.
      console.log("term close");
    });
    
    /*setInterval(function(){
      term.write('ls\r');
    }, 10000)    */
    
//    term.on('data', function(data) {
      //console.log(data);
//    });

//term.write('ls\r');
//term.resize(100, 40);
//term.write('ls /\r');

//console.log(term.process);
    console.log(typeof(term));
    
  });
});
