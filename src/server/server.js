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
    , "main/config"
    , "sol/node/npm"
    , "dojo/node!net"
    , "sol/node/debug/Protocol"
    , "dojo/node!../../lib/terminal.js"
    , "term/server"
    , "main/connection"
    , "dojo/node!adm-zip"
    , "sol/string"
    , "dojo/node!child_process"
  ], function(
    remoteCaller
    , treeItems
    , files
    , nameTranslator
    , fileName
    , ContentIO    // is not used here but must be loaded!!!
    , nodeControl  // is not used here but must be loaded!!!
    , nodeMirrorConfig
    , npm
    , net
    , debugProtocol
    , terminal
    , terminalServer
    , connection
    , AdmZip
    , solString
    , child_process
  ){
    
    var relativeStr = nodeMirrorConfig.webpath;
    
    var dirStr = nodeMirrorConfig["dir"];
    var wd = process.cwd();
    if (!( solString.endsWith(wd, "/") || solString.endsWith(wd, "\\") )){
      wd += "/";
    };
    
    if (( solString.startsWith(dirStr, "/") )){
      
    }else{
      dirStr = wd + dirStr;
    };
    
    dirStr = fileName.normalize(dirStr);
    console.log("file directory: " + dirStr);
    
    //console.log(nodeMirrorConfig);
    
    
    //console.log(nodeMirrorConfig);
    
    //EasyZip = easyZip.EasyZip;
    
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
    
    mirror.put(relativeStr + 'apicall', function(req, res){
      try{
        remoteCaller.serverCall(req.body).then(function(par){
          res.send({ result: par });
        });
      }catch(e){
        console.log(e);
        res.close();
      };
    });
    
    mirror.put(relativeStr + "reconnect", function(req, res){
      //console.log("----------------- recon request");
      res.setHeader('Content-Type', "application/json");
      res.send({ reconnected: true });
    });
    
    mirror.get(relativeStr + 'download', function(req, res){
      console.log("download:" + req.query.id);
      var filenameStr = nameTranslator.fileName(req.query.id);
      console.log(filenameStr);
      files.contentTypeDef(filenameStr).then(function(parContentType){
        console.log(parContentType);
        if (parContentType == "inode/directory"){
          // creating archives
          //var zip = new EasyZip();
          
          // add local file
          /*zip.zipFolder(filenameStr, function(){
            //res.setHeader('Content-Length', data.length);
            res.setHeader('Content-Disposition', "attachment; filename=\"" + fileName.single(filenameStr) + ".zip\"");
            zip.writeToResponse(res, fileName.single(filenameStr) + ".zip");
            res.end();
          });*/
          var zip = new AdmZip();
          zip.addLocalFolder(filenameStr);
          res.setHeader('Content-Disposition', "attachment; filename=\"" + fileName.single(filenameStr) + ".zip\"");
          res.end(zip.toBuffer());
          
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
    mirror.get(relativeStr, function(req, res){
      res.setHeader('Content-Type', "text/html");
      fs.readFile(nodeMirrorConfig["static"] + "/index.html", function(err, data){
        if (err){
          res.end(err);
          return;
        };
        var s = data.toString();
        s = s.replace(/{{{relativeStr}}}/g, relativeStr);
        res.end(s);
      });
    });
    
    // access to the choosen directory
    mirror.use(relativeStr + "file/", express["static"](dirStr));
    
    mirror.get(relativeStr + "x11", function(req, res){
      
      res.header("Content-Type", "video/ogg");
      
      var spawn  = child_process.spawn;
      
      var params = [
        '-loglevel', 'quiet',
        "-flags", "low_delay",
        "-s", "1024x768",
        "-f", "x11grab",
        "-r", "2",
        '-i', ":0.0+0,0",
        '-f', "ogg",
        //'-acodec', 'libvorbis',
        "-an",
        '-vcodec', 'libtheora',
        '-q:v', '9',
        //"-flags", "low_delay",
        //"-fflags", "nobuffer",
        //"-max_delay", "0.1",
        "-t", "0.5", 
        "-threads", "0",
        //"-tune", "zerolatency",
        'pipe:1'
      ];
      
      avconv = spawn('avconv', params);
      
      var stream = avconv.stdout;
      stream.pipe(res);
      stream.on("end", function(){
        res.end();
      });
      
      res.on("end", function(){
        avconv.kill();
      });
    });
      //avconv -s 1024x768 -f x11grab -r 5 -i :0.0+0,0 -vcodec libtheora -q:v 6 -f ogg -
    
    mirror.get(relativeStr + "x11.png", function(req, res){
      
      res.header("Content-Type", "image/png");
      
      var spawn  = child_process.spawn;
      
      var params = [
        '-window', 'root', 'png:-'
      ];
      
      var ip = spawn('import', params);
      
      var stream = ip.stdout;
      stream.pipe(res);
      stream.on("end", function(){
        res.end();
      });
      
      res.on("end", function(){
        ip.kill();
      });
    });
      
    
      
    mirror.get(relativeStr + "x11.mp4", function(req, res){
      
      res.header("Content-Type", "video/h264");
      
      var spawn  = child_process.spawn;
      
      var params = [
        '-loglevel', 'quiet',
        //"-flags", "low_delay",
        "-s", "1024x768",
        "-f", "x11grab",
        "-r", "4",
        '-i', ":0.0+0,0",
        '-f', "h264",
        //'-acodec', 'libvorbis',
        "-an",
        '-vcodec', 'libx264',
        '-pre', 'lossless_ultrafast',
        "-flags", "low_delay",
        "-threads", "0",
        'pipe:1'
      ];
      
      avconv = spawn('avconv', params);
      
      var stream = avconv.stdout;
      stream.pipe(res);
      
      res.on("end", function(){
        avconv.kill();
      });
    });
    //avconv -f x11grab -r 25 -s 1280x720 -i :0.0+0,0 -vcodec libx264 -pre lossless_ultrafast -threads 0 video.mkv  
      
      
    mirror.get(relativeStr + "x11.webm", function(req, res){
      
      res.header("Content-Type", "video/webm");
      
      var spawn  = child_process.spawn;
      
      var params = [
        '-loglevel', 'quiet',
        //"-flags", "low_delay",
        "-s", "1024x768",
        "-f", "x11grab",
        "-r", "4",
        '-i', ":0.0+0,0",
        '-f', "webm",
        //'-acodec', 'libvorbis',
        "-an",
        '-vcodec', 'libvpx',
        "-max_delay", "0.1",
        "-t", "1", 
        "-q:v", "10",
        //'-pre', 'lossless_ultrafast',
        //"-flags", "low_delay",
        "-threads", "0",
        "-tune", "zerolatency",
        'pipe:1'
      ];
      
      avconv = spawn('avconv', params);
      
      var stream = avconv.stdout;
      stream.pipe(res);
      
      res.on("end", function(){
        avconv.kill();
      });
    });
      
      
    // access to app files
    mirror.use(relativeStr, express["static"](nodeMirrorConfig["static"]));
    
      
    
    
    
    
    server.listen(nodeMirrorConfig.port);
    
    var mainio = socketIo.listen(server);
    
    mainio.set("log level", 0);
    mainio.set("resource", relativeStr + "socket.io");
    
    //var io = mainio.of(relativeStr);
    
    sessionSockets = new sessionIo(mainio, sessionStore, cookieParser);
    
    var pty;
    sessionSockets.on('connection', function (err, mainsocket, session) {
      //var socket = mainsocket.of(relativeStr);
      var socket = mainsocket;
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
      connection.newConnection(socket, session);
      
      //terminalServer.newConnection(socket);
      return;
      
    });
    
  });
}); 
