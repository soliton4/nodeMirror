define([
  "dojo/node!express"
  , "dojo/node!mime-magic"
  //, "dojo/node!socket.io"
  , "dojo/node!http"
  , "dojo/has"
  , "dojo/node!fs"
  , "dojo/node!session.socket.io"
  , "dojo/node!connect"
  , "dojo/Deferred"
], function(
       express
         , mimeMagic
         //, socketIo
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
           , "main/x11Fun"
           , "dojo/_base/config"
           , "modules/terminal/AvconvRunner"
           , "dojo/_base/lang"
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
                   , x11Fun
                   , dojoConfig
                   , AvconvRunner
                   , lang
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

                   var mirror;
                   if (nodeMirrorConfig.app){
                     mirror = nodeMirrorConfig.app;
                   }else{
                     mirror = express();
                   };

                   var server;
                   if (nodeMirrorConfig.server){
                     server = nodeMirrorConfig.server;
                   }else{
                     server = http.createServer(mirror);
                   };
                   
                   var use = function(par1, par2, par3, par4){
                     mirror.use(par1, par2);
                   };
                   
                   var auth;

                   /*if (nodeMirrorConfig.username){
                     console.log("username present");
                     auth = express.basicAuth(nodeMirrorConfig.username, nodeMirrorConfig.password);
                     use(relativeStr, auth);
                   }else{
                     auth = undefined; /*express.basicAuth(function(user, pass) {
                       return true;
                     });* /
                   };*/
                   
                   var get = function(par1, par2, par3, par4){
                     if (auth){
                       mirror.get(par1, auth, par2, par3, par4);
                     }else{
                       mirror.get(par1, par2);
                     };
                   };
                   var put = function(par1, par2, par3, par4){
                     if (auth){
                       mirror.put(par1, auth, par2, par3, par4);
                     }else{
                       mirror.put(par1, par2);
                     };
                   };

                   var cookieParser = express.cookieParser('my session secret');
                   var sessionStore = new connect.middleware.session.MemoryStore();

                   use(relativeStr, cookieParser);
                   use(relativeStr, express.session({
                     store: sessionStore,
                     cookie : {
                       path : '/',
                       httpOnly : true,
                       maxAge : null
                     }
                   }));

console.log(relativeStr);
                   use(relativeStr, express.bodyParser());

                   put(relativeStr + 'apicall', function(req, res){
                     try{
                       remoteCaller.serverCall(req.body).then(function(par){
                         res.send({ result: par });
                         //console.log("success");
                       });
                     }catch(e){
                       console.log(e);
                       //console.log(req);
                       res.end();
                     };
                   });

                   put(relativeStr + "reconnect", function(req, res){
                     //console.log("----------------- recon request");
                     res.setHeader('Content-Type', "application/json");
                     res.send({ reconnected: true });
                   });

                   get(relativeStr + 'download', function(req, res){
                     console.log("download:" + req.query.id);
                     var filenameStr = nameTranslator.fileName(req.query.id);
                     console.log(filenameStr);
                     files.contentTypeDef(filenameStr).then(function(parContentType){
                       console.log(parContentType);
                       if (parContentType == "inode/directory"){
                         // creating archives

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
                   get(relativeStr, function(req, res){
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

                   use(relativeStr, express.limit(100000000000));

                   // access to the choosen directory
                   use(relativeStr + "file/", express["static"](dirStr));


                   nodeControl.gpregister.avconv = {};


                   if (nodeMirrorConfig.x11terminal){

                     // x11 forwarding
                     get(relativeStr + "x11.stream", function(req, res){
                       req.connection.setTimeout(0);

                       var runner;
                       var killfun = function(){
                         setTimeout(function(){
                           killfun();
                         }, 30000);
                       };

                       var format = req.query.format || "ogg";
                       var fps = req.query.fps || "5";
                       var quality = req.query.q || "5";
                       var maxrate = req.query.maxrate || "unlimited";
                       var preset = req.query.preset || "medium";

                       console.log("format: " + format);
                       var vidid = req.query.vidid || "1"; 

                       nodeControl.gpregister.avconv[vidid] = function(){
                         killfun();
                       };
                       


                       res.header("Content-Type", "video/" + format);


                       x11Fun.x11size().then(function(size){
                         
                         var streamDataFun = function(data){
                           //console.log("stream data");
                             try{
                               res.write(data);
                             }catch(e){
                               console.log("pipe error");
                             };
                         };
                         
                         runner = new AvconvRunner(lang.mixin({}, {
                           format: format
                           , fps: fps
                           , quality: quality
                           , maxrate: maxrate
                           , preset: preset
                         }, {
                           dim: {
                             x: 0, y: 0, h: size.y, w: size.x
                           },
                           streamData: streamDataFun
                         }));

                         killfun = function(){
                           console.log("killing ...");
                           delete nodeControl.gpregister.avconv[vidid];
                           runner.kill();
                           res.close();
                         };
                         //console.log("step 2");
                         setTimeout(function(){
                           killfun();
                         }, 190000);

                         try{
                           res.on("error", function(err){
                             console.log("some res error");
                             console.log(err);
                           });
                         }catch(e){
                           console.log("error 2");
                         }

                         console.log("step 3");
                         try{
                           res.on("end", function(){
                             try{
                               killfun();
                             }catch(e){
                               console.log("error 4");
                             }
                           });
                           res.on("close", function(){
                             try{
                               killfun();
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
                     
                     // --- x11 audio
                     
                     get(relativeStr + "x11.audio", function(req, res){
                       req.connection.setTimeout(0);

                       var runner;
                       var killfun = function(){
                         setTimeout(function(){
                           killfun();
                         }, 30000);
                       };
                       

                       var format = req.query.format || "ogg";
                       var bitrate = req.query.bitrate || "256";
                       //var preset = req.query.preset || "medium";

                       console.log("format: " + format);
                       var vidid = req.query.vidid || "1"; 

                       nodeControl.gpregister.avconv[vidid] = function(){
                         killfun();
                       };
                       

                       //res.header("Content-Type", "text/text");
                       res.header("Content-Type", "audio/" + format);

                       /*fs.readFile("/home/sol/projects/nodeMirror/src/test/testpipe.opus", function(err, data){
                         if (err){
                           res.write("error");
                           res.end();
                           return;
                         };
                         res.write(data);
                         res.end();
                       });
                       return;*/

                         
                         var streamDataFun = function(data){
                           //console.log("stream data");
                             try{
                               res.write(data);
                             }catch(e){
                               console.log("pipe error");
                             };
                         };
                         
                         runner = new AvconvRunner(lang.mixin({}, {
                           type: "audio"
                           , format: format
                           , bitrate: bitrate
                           //, preset: preset
                         }, {
                           streamData: streamDataFun
                         }));

                         killfun = function(){
                           console.log("killing ...");
                           delete nodeControl.gpregister.avconv[vidid];
                           runner.kill();
                         };
                         //console.log("step 2");
                         setTimeout(function(){
                           killfun();
                         }, 190000);

                         try{
                           res.on("error", function(err){
                             console.log("some res error");
                             console.log(err);
                           });
                         }catch(e){
                           console.log("error 2");
                         }

                         console.log("step 3");
                         try{
                           res.on("end", function(){
                             try{
                               killfun();
                             }catch(e){
                               console.log("error 4");
                             }
                           });
                           res.on("close", function(){
                             try{
                               killfun();
                             }catch(e){
                               console.log("error 5");
                             }
                           });
                         }catch(e){
                           console.log("error 6");
                         }
                         console.log("step out");
                         

                     });

                   };

                   /*  var ulnr = 0;

      mirror.post(relativeStr + "ultest", function(req, res){
        fs.readFile(req.files.displayImage.path, function (err, data) {
          // ...
          var newPath = "/home/sol/uploadedFileName" + ulnr++;
          fs.writeFile(newPath, data, function (err) {
            res.redirect("back");
          });
        });
      });*/



                   // access to app files
                   use(relativeStr, express["static"](nodeMirrorConfig["static"]));


                   if (!nodeMirrorConfig.server){
                     server.listen(nodeMirrorConfig.port);
                   }
                   
                   var nodeMirror = dojoConfig.nodeMirrorNodeModule;
                   var socketIo = nodeMirror.getSocketIo(nodeMirrorConfig.socketIoPreRelease);

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
                   
                   if (nodeMirrorConfig.callback){
                     try{
                       nodeMirrorConfig.callback();
                     }catch(e){};
                   };

                 });
       }); 
