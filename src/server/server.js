define([
  "dojo/node!express"
  , "main/config"
  , "dojo/node!mime-magic"
  , "dojo/node!pty.js"
  , "dojo/node!socket.io"
  , "dojo/node!http"
  , "dojo/has"
  , "dojo/node!fs"
], function(
  express
  , config
  , mimeMagic
  , pty
  , socketIo
  , http
  , has
  , fs
){
  has.add("server-modules", function(){
    return true; 
  }, true);
  
  config.isServer = true;
  
  require([
    "main/remoteCaller"
    , "main/treeItems"
    , "server/files"
    , "main/nameTranslator"
    , "sol/fileName"
    , "main/contentIO"
    , "main/nodeControl"
    
  ], function(
    remoteCaller
    , treeItems
    , files
    , nameTranslator
    , fileName
    , ContentIO    // is not used here but must be loaded!!!
    , nodeControl  // is not used here but must be loaded!!!
  ){
    var mirror = express();
    
    var server = http.createServer(mirror);
    
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
    
    mirror.get('/download', function(req, res){
      console.log("download:" + req.query.id);
      var filenameStr = nameTranslator.fileName(req.query.id);
      console.log(filenameStr);
      files.contentTypeDef(filenameStr).then(function(parContentType){
        console.log(parContentType);
        res.setHeader('Content-Type', parContentType);
        fs.readFile(filenameStr, function(err, data){
          if(err){
            console.log("err pos 1");
            console.log(err);
            res.end();
            return;
          };
          res.setHeader('Content-Length', data.length);
          res.setHeader('Content-Disposition', "attachment; filename=\"" + fileName.single(filenameStr) + "\"");
          res.end(data);
        });
      });
    });

    
    /*jshint sub:true*/
    mirror.use(express["static"](config["static"]));
  
    mirror.get('/', function(req, res){
      res.setHeader('Content-Type', "text/html");
      fs.readFile(config["static"] + "/index.html", function(err, data){
        if (err){
          res.end(err);
          return;
        };
        res.end(data);
      });
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
      socket.on("create", function(cols, rows, fn){
        console.log("create");
        fn(null, {
          id: 1
        });
      });
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
      // on the clientside
      console.log("term close");
    });
    
    console.log(typeof(term));
    
  });
});
