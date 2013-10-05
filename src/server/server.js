define([
  "dojo/node!express"
  , "dojo/node!mime-magic"
  , "dojo/node!socket.io"
  , "dojo/node!http"
  , "dojo/has"
  , "dojo/node!fs"
  , "dojo/node!session.socket.io"
  , "dojo/node!connect"
  , "dojo/Deferred"
], function(
  express
  , mimeMagic
  , socketIo
  , http
  , has
  , fs
  , sessionIo
  , connect
  , Deferred
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
    , "sol/node/npm"
    , "dojo/node!net"
    , "dojo/node!json-socket"
    , "sol/node/debug/Protocol"
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
    , npm
    , net
    , jsonSocket
    , debugProtocol
  ){
    
    console.log('Current directory: ' + process.cwd());
    
    
    
    //console.log(nodeMirrorConfig);
    
    EasyZip = easyZip.EasyZip;
    
    var mirror = express();
    
    var server = http.createServer(mirror);
    
    if (nodeMirrorConfig.username){
      mirror.use(express.basicAuth(nodeMirrorConfig.username, nodeMirrorConfig.password));
    };
    
    var cookieParser = express.cookieParser('my session secret');
    var sessionStore = new connect.middleware.session.MemoryStore();
    
    mirror.use(cookieParser);
    mirror.use(express.session({
      store: sessionStore,
      cookie : {
        path : '/',
        httpOnly : true,
        maxAge : null
      }
    }));
    
    
    mirror.use(express.bodyParser());
    
    mirror.put('/apicall', function(req, res){
      try{
        remoteCaller.serverCall(req.body).then(function(par){
          res.send({ result: par });
        });
      }catch(e){
        console.log(e);
        res.close();
      };
    });
    
    mirror.put("/reconnect", function(req, res){
      //console.log("----------------- recon request");
      res.setHeader('Content-Type', "application/json");
      res.send({ reconnected: true });
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
    
    var io = socketIo.listen(server);
    io.set("log level", 0);
    
    sessionSockets = new sessionIo(io, sessionStore, cookieParser);
    
    var pty;
    sessionSockets.on('connection', function (err, socket, session) {
      //console.log("----------------- socket con request");
      if (err){
        console.log("-------------------------------------------------- connection error");
        console.log(err);
        console.log("-------------------------------------------------- connection error");
        if (socket){
          console.log("socket present");
          socket.emit("tryagain");
        };
        return;
      };
        //console.log("-------------------------------------------------- new con");
      var terminals = {};
      var nextTerminalId = 0;
      
      //console.log(session);
      //your regular socket.io code goes here
      //and you can still use your io object
      socket.on("openterminal", function(par, respond){
        console.log("opening terminal");
        var termid = "terminal" + nextTerminalId;
        nextTerminalId++;
        
        respond({
          termid: termid
        });
        
        if (par.mode == "node"){
          process.__defineGetter__('stderr', function() { 
            return {
              write: function(data){
                socket.emit(termid, data);
                console.log(data);
              }
            };
          });
          /*process.stdout.on('data', function(data){
            socket.emit(termid, data);
          });
          process.stderr.on('data', function(data){
            socket.emit(termid, data);
          });
          socket.on(termid, function(data){
            process.stdin.emit('data', data);
          });*/
          socket.emit(termid + "_meta", {
            event: "ready"
          });
          socket.emit(termid, "welcome");
          console.log("ok");
          
          return;
        };
        
        
        if (par.mode == "dbg"){
          //jsonSocket
          var dbgSock = new net.Socket();
          //var dbgSock = new jsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
          
          dbgSock.connect(5858, function(par1, par2){
            console.log("listener evt");
            //console.log(par1);
          });
          var dbgProt = new debugProtocol();
          dbgProt.on("break", function(par){
            socket.emit(termid, {
              type: "break"
              , body: par
            });
          });
          dbgSock.on("data", function(data){
            dbgProt.write(data);
          });
          socket.emit(termid + "_meta", {
            event: "ready"
          });
          
          socket.on(termid, function(msg, callBack){
            if (msg.type == "source"){
              dbgProt.getSource({id: msg.id}).then(function(parRes){
                console.log(parRes);
                callBack(parRes);
              });
            };
            if (msg.type == "continue"){
              dbgProt.cont({step: msg.step}).then(function(parRes){
                console.log(parRes);
                callBack(parRes);
              });
            };
          });
          dbgProt.on("data", function(par){
            console.log("writing:");
            console.log(par);
            console.log("------------------------");
            dbgSock.write(par);
          });
          //type: "source"
          //, id: source.id
          
          return;
        };
        
        
        
        
        var def = new Deferred();
        
        if (pty){
          def.resolve(pty);
        }else{
          npm.load({
            name: "pty.js"
            , onInstall: function(){
              socket.emit(termid + "_meta", {
                event: "install"
              });
            }
            , onError: function(e){
              socket.emit(termid + "_meta", {
                event: "installerror"
              });
              def.reject();
            }
            , onLoad: function(module){
              def.resolve(module);
            }
          });
        };
        
        def.then(function(parPty){
          pty = parPty;
          if (process.platform == "win32"){
            // use fork instead
            terminals[termid] = pty.fork("c:\\windows\\system32\\cmd.exe", [], {
              name: 'xterm-color',
              cols: 80,
              rows: 30,
              cwd: process.env.HOME,
              env: process.env
            });
          }else{
            terminals[termid] = pty.spawn("bash", [], {
              name: 'xterm-color',
              cols: 80,
              rows: 30,
              cwd: process.env.HOME,
              env: process.env
            });
          };
          
          var term = terminals[termid];
          term.on("title", function(data){
            console.log("title change:");
            console.log(data);
          });
          term.on("data", function(data){
            socket.emit(termid, data);
          });
          socket.on(termid, function(data){
            term.write(data);
          });
          socket.on(termid + "_resize", function(size){
            //console.log("resize event");
            //console.log(size);
            try{
            term.resize(size.x, size.y);
            }catch(e){
              console.log(e);
            }
          });
          socket.emit(termid + "_meta", {
            event: "ready"
          });
        });
      });
    });
    
  });
});
