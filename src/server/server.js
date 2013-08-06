define([
  "dojo/node!express"
  , "dojo/node!mime-magic"
  , "dojo/node!socket.io"
  , "dojo/node!http"
  , "dojo/has"
  , "dojo/node!fs"
], function(
  express
  , mimeMagic
  , socketIo
  , http
  , has
  , fs
){
  // first add our server-modules flag so we can use same source files for server and client
  has.add("server-modules", function(){
    return true; 
  }, true);
  
  require([
    "main/remoteCaller"
    , "main/treeItems"
    , "server/files"
    , "main/nameTranslator"
    , "sol/fileName"
    , "main/contentIO"
    , "main/nodeControl"
    , "dojo/node!easy-zip"
    , "main/config"
  ], function(
    remoteCaller
    , treeItems
    , files
    , nameTranslator
    , fileName
    , ContentIO    // is not used here but must be loaded!!!
    , nodeControl  // is not used here but must be loaded!!!
    , easyZip
    , nodeMirrorConfig
  ){
    //console.log(nodeMirrorConfig);
    
    
    EasyZip = easyZip.EasyZip;
    
    var mirror = express();
    
    var server = http.createServer(mirror);
    
    if (nodeMirrorConfig.username){
      mirror.use(express.basicAuth(nodeMirrorConfig.username, nodeMirrorConfig.password));
    };
    
    
    mirror.use(express.bodyParser());
    
    mirror.put('/apicall', function(req, res){
      remoteCaller.serverCall(req.body).then(function(par){
        res.send({ result: par });
      });
    });
    
    mirror.get('/download', function(req, res){
      console.log("download:" + req.query.id);
      var filenameStr = nameTranslator.fileName(req.query.id);
      console.log(filenameStr);
      files.contentTypeDef(filenameStr).then(function(parContentType){
        console.log(parContentType);
        if (parContentType == "inode/directory"){
          // creating archives
          var zip = new EasyZip();
          
          // add local file
          zip.zipFolder(filenameStr, function(){
            //res.setHeader('Content-Length', data.length);
            res.setHeader('Content-Disposition', "attachment; filename=\"" + fileName.single(filenameStr) + ".zip\"");
            zip.writeToResponse(res, fileName.single(filenameStr) + ".zip");
            res.end();
          });
          
        }else{
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
        };
      });
    });

    
    /*jshint sub:true*/
    mirror.use(express["static"](nodeMirrorConfig["static"]));
  
    mirror.get('/', function(req, res){
      res.setHeader('Content-Type', "text/html");
      fs.readFile(nodeMirrorConfig["static"] + "/index.html", function(err, data){
        if (err){
          res.end(err);
          return;
        };
        res.end(data);
      });
    });
    
    server.listen(nodeMirrorConfig.port);
    
    /*
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
      });* /
    });
    
    term.on('close', function() {
      // Make sure it closes
      // on the clientside
      console.log("term close");
    });
    
    console.log(typeof(term));
    */
  });
});
