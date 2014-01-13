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
      
      mirror.use(express.limit(100000000000));
    
    // access to the choosen directory
    mirror.use(relativeStr + "file/", express["static"](dirStr));
    
    /*mirror.get(relativeStr + "x11", function(req, res){
      
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
        console.log("avconv ended");
        setTimeout(function(){
          res.end();
        }, 1000);
      });
      
      res.on("end", function(){
        console.log("http ended");
        avconv.kill();
      });
    });*/
      //avconv -s 1024x768 -f x11grab -r 5 -i :0.0+0,0 -vcodec libtheora -q:v 6 -f ogg -
    
    /*mirror.get(relativeStr + "x11.png", function(req, res){
      
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
    });*/
      
    
      
    /*mirror.get(relativeStr + "x11.mp4", function(req, res){
      
      res.header("Content-Type", "video/mp4");
      
      var spawn  = child_process.spawn;
      
      var x264Params = [
        "--demuxer", "y4m",
        "-",
        "--preset", "veryfast",
        "--tune", "zerolatency",
        "--intra-refresh",
        "--fps", "5",
        "--vbv-maxrate", "5000",
        "--vbv-bufsize", "200",
        "--slice-max-size", "1500",
        "-o", "-"
      ];
      var x264 = spawn('x264', x264Params);
      
      var instream = x264.stdin;
      var outstream = x264.stdout;
      outstream.pipe(res);

      
      var avconvParams = [
        //'-loglevel', 'quiet',
        "-r", "5",
        "-f", "x11grab",
        "-s", "1024x768",
        '-i', ":0.0+0,0",
        "-pix_fmt", "yuv420p",
        "-r", "5",
        "-f", "yuv4mpegpipe",
        "-"
      ];
      var avconv = spawn('avconv', avconvParams);
      
      var stream = avconv.stdout;
      stream.pipe(instream);
      
      res.on("end", function(){
        avconv.kill();
        x264.kill();
      });
    });
    //avconv -f x11grab -r 25 -s 1280x720 -i :0.0+0,0 -vcodec libx264 -pre lossless_ultrafast -threads 0 video.mkv  
    //avconv -r 5 -f x11grab -s 1024x768 -i :0.0+0,0  -pix_fmt yuv420p -r 5 -f yuv4mpegpipe - | x264 --demuxer y4m - --preset veryfast --tune zerolatency --intra-refresh –fps 5 --vbv-maxrate 5000 --vbv-bufsize 200 --slice-max-size 1500 -o z5.mp4
    */
      
      
    mirror.get(relativeStr + "x11.stream", function(req, res){
      req.connection.setTimeout(0);
      
      var format = "webm";
      
      res.header("Content-Type", "video/webm");
      
      var spawn  = child_process.spawn;
      
      x11size().then(function(size){
        console.log("x11 size:");
        console.log(size);
        
        var params = [
          "-re",                   // Real time mode
          "-f","x11grab",          // Grab screen
          "-r","4",              // Framerate
          "-s", size.x + "x" + size.y,   // Capture size
          "-i",":0+" + 0 + "," + 0, // Capture offset
          "-g","0",                // All frames are i-frames
          "-me_method","zero",     // Motion algorithms off
          "-flags2","fast",
          "-vcodec","libvpx",      // vp8 encoding
          "-preset","ultrafast",
          "-tune","zerolatency",
          "-b:v","1M",             // Target bit rate
          "-crf","40",             // Quality
          //"-qmin","5",             // Quantization
          //"-qmax","5",
          "-t", "180", // 3 min
          "-f","webm",             // File format
          "-"                      // Output to STDOUT
        ];
        //ffmpeg -re -f x11grab -r 12 -s 1024x768 -i :3+0,0 -g 1 -me_method zero -flags2 fast -vcodec libvpx -preset ultrafast -tune zerolatecy -b:v 1M -crf 40 -qmin 5 -qmax 5 -t 180 -f webm -
        var avconv;
        try{
          avconv = spawn('ffmpeg', params);
        }catch(e){
          console.log("error 1");
        }
        console.log("step 2");
        
        var stream;
        try{
          stream = avconv.stdout;
          stream.on("data", function(data){
            try{
              res.write(data);
            }catch(e){
              console.log("pipe error");
            };
          });
          stream.on("error", function(){
            console.log("some stream error");
          });
          res.on("error", function(){
            console.log("some res error");
          });
          //stream.pipe(res);
        }catch(e){
          console.log("error 2");
        }
        
        console.log("step 3");
        try{
        
        stream.on("end", function(){
          console.log("step end");
          try{
            console.log("avconv: end");
            res.end();
            avconv.kill();
          }catch(e){
            console.log("error 3");
          }
        });
        
        console.log("step 4");
        res.on("end", function(){
          console.log("step res end");
          try{
            console.log("webm: res end");
            avconv.kill();
            stream.end();
          }catch(e){
            console.log("error 4");
          }
        });
        console.log("step 5");
        res.on("close", function(){
          console.log("step res close");
          try{
            console.log("webm: res close");
            avconv.kill();
            stream.end();
          }catch(e){
            console.log("error 5");
          }
        });
        }catch(e){
          console.log("error 6");
        }
        console.log("step out");
        
      });
      
    });

      
      
      
    mirror.get(relativeStr + "x11.webm", function(req, res){
      req.connection.setTimeout(0);
      
      res.header("Content-Type", "video/webm");
      res.header("Cache-Control", "NO-CACHE");
      
      var spawn  = child_process.spawn;
      
      x11size().then(function(size){
        console.log("x11 size:");
        console.log(size);
        
        var params = [
          "-re",                   // Real time mode
          "-f","x11grab",          // Grab screen
          "-r","4",              // Framerate
          "-s", size.x + "x" + size.y,   // Capture size
          "-i",":0+" + 0 + "," + 0, // Capture offset
          "-g","0",                // All frames are i-frames
          "-me_method","zero",     // Motion algorithms off
          "-flags2","fast",
          "-vcodec","libvpx",      // vp8 encoding
          "-preset","ultrafast",
          "-tune","zerolatency",
          "-b:v","1M",             // Target bit rate
          "-crf","40",             // Quality
          //"-qmin","5",             // Quantization
          //"-qmax","5",
          "-t", "180", // 3 min
          "-f","webm",             // File format
          "-"                      // Output to STDOUT
        ];
        //ffmpeg -re -f x11grab -r 12 -s 1024x768 -i :3+0,0 -g 1 -me_method zero -flags2 fast -vcodec libvpx -preset ultrafast -tune zerolatecy -b:v 1M -crf 40 -qmin 5 -qmax 5 -t 180 -f webm -
        var avconv;
        try{
          avconv = spawn('ffmpeg', params);
        }catch(e){
          console.log("error 1");
        }
        console.log("step 2");
        
        var stream;
        try{
          stream = avconv.stdout;
          stream.on("data", function(data){
            try{
              res.write(data);
            }catch(e){
              console.log("pipe error");
            };
          });
          stream.on("error", function(){
            console.log("some stream error");
          });
          res.on("error", function(){
            console.log("some res error");
          });
          //stream.pipe(res);
        }catch(e){
          console.log("error 2");
        }
        
        console.log("step 3");
        try{
        
        stream.on("end", function(){
          console.log("step end");
          try{
            console.log("avconv: end");
            res.end();
            avconv.kill();
          }catch(e){
            console.log("error 3");
          }
        });
        
        console.log("step 4");
        res.on("end", function(){
          console.log("step res end");
          try{
            console.log("webm: res end");
            stream.end();
            avconv.kill();
          }catch(e){
            console.log("error 4");
          }
        });
        console.log("step 5");
        res.on("close", function(){
          console.log("step res close");
          try{
            console.log("webm: res close");
            stream.end();
            avconv.kill();
          }catch(e){
            console.log("error 5");
          }
        });
        }catch(e){
          console.log("error 6");
        }
        console.log("step out");
        
      });
      
    });
      
      
      /*
      var ffmpeg = child_process.spawn("ffmpeg",[
                "-re",                   // Real time mode
                "-f","x11grab",          // Grab screen
                "-r","100",              // Framerate
                "-s",width+"x"+height,   // Capture size
                "-i",":0+"+top+","+left, // Capture offset
                "-g","0",                // All frames are i-frames
                "-me_method","zero",     // Motion algorithms off
                "-flags2","fast",
                "-vcodec","libvpx",      // vp8 encoding
                "-preset","ultrafast",
                "-tune","zerolatency",
                "-b:v","1M",             // Target bit rate
                "-crf","40",             // Quality
                "-qmin","5",             // Quantization
                "-qmax","5",
                "-f","webm",             // File format
                "-"                      // Output to STDOUT
            ]);
            
   ffmpeg -re -f x11grab -r 100 -s 1024x768 -i :0+0,0 -g 0 -me_method zero -flags2 fast -vcodec libvpx -preset ultrafast -tune zerolatency -b:v 1M -crf 40 -qmin 5 -qmax 5 -f webm  -
            
            
            
      */
      
      function x11size(){
        var def = new Deferred();
        var spawn  = child_process.spawn;
        
        var params = [
          "-root", "_NET_DESKTOP_GEOMETRY"
        ];
        
        var xprop = spawn('xprop', params);
        
        var dataAr = [];
        var stream = xprop.stdout;
        stream.on("data", function(data){
          dataAr.push(data);
        });
        
        stream.on("end", function(){
          var s = Buffer.concat(dataAr).toString("utf8");
          var ar = s.split("=");
          var value = ar[ar.length - 1];
          ar = value.split(",");
          var y = parseInt(ar.pop(), 10);
          var x = parseInt(ar.pop(), 10);
          def.resolve({ x: x, y: y });
          //res.end();
        });

        return def.promise;
      }

      
    mirror.get(relativeStr + "x11properties", function(req, res){
      
      res.header("Content-Type", "application/json");
      
      x11size().then(function(size){
        res.send(size);
      });
    });
      
      var ulnr = 0;
      
    mirror.post(relativeStr + "ultest", function(req, res){
      fs.readFile(req.files.displayImage.path, function (err, data) {
        // ...
        var newPath = "/home/sol/uploadedFileName" + ulnr++;
        fs.writeFile(newPath, data, function (err) {
          res.redirect("back");
        });
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
