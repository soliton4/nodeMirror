define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/config"
  , "main/serverOnly!sol/node/npm"
  , "main/serverOnly!dojo/node!../../../lib/terminal.js"
  , "main/connection"
  , "main/serverOnly!dojo/node!child_process"
  , "main/serverOnly!dojo/node!fs"
  , "modules/base/Base"
  , "main/serverOnly!main/x11Fun"
], function(
  declare
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , config
  , npm
  , terminal
  , connection
  , child_process
  , fs
  , Base
  , x11Fun
){
  
  var pty;
  
  var _handleConnection;
  
  var TerminalInterface = declare([], {
    constructor: function(par){
      var self = this;
      this.socket = par.socket;
      this.termid = par.termid;
      this.eventid = "terminal" + par.termid;
      this._on = {
        "resize": [],
        "data": []
      };
      this.socket.on(this.eventid, function(data){
        array.forEach(self._on[data.event], function(fun){
          try{
            fun(data.data);
          }catch(e){
            console.log(e);
          };
        });
      });
    }
    , on: function(parWhat, parFun){
      this._on[parWhat].push(parFun);
    }
    , write: function(parData){
      this.socket.emit(this.eventid, {
        event: "data"
        , data: parData
      });
    }
    , resize: function(parData){
      this.socket.emit(this.eventid, {
        event: "resize"
        , data: parData
      });
    }
  });
  
  
  var Terminal = declare([Base], {
    //, keepBuildRendering: true
    
    remoteFunctions: {
      x11size: true
    }
    
    , constructor: function(){
      var self = this;
      this.socketDef = new Deferred();
      connection.on("connect", function(socket, session){
        self.handleConnection(socket, session);
      });
      self.handleConnection = _handleConnection;
    }
    
    , provideSideBarWidgetPs: function(){
      var def = new Deferred();
      var self = this;
      config.get("terminal", "x11terminal").then(function(par){
        var terminal = par.terminal;
        var x11terminal = par.x11terminal;
        if (terminal === false){
          def.reject();
          return;
        };
        if (self.wgt){
          def.resolve(self.wgt);
        }else{
          require(["main/clientOnly!modules/terminal/Wgt"], function(Wgt){
            self.wgt = new Wgt({
              module: self
              , x11terminal: x11terminal
            });
            def.resolve(self.wgt);
          });
        };
      });
      return def;
    }
    
    , openTerminal: function(parId){
      var def = new Deferred();
      var self = this;
      this.socket.emit("openterminal",  {
        mode: "terminal"
        , id: parId
      }, function(response){
        if (response.termid === undefined){
          def.reject();
          return;
        };
        def.resolve(new TerminalInterface({
          termid: response.termid
          , socket: self.socket
        }));
      });
      return def;
    }
    
    , mouseEvent: function(evt){
      this.socket.emit("x11mouse", evt);
    }
    , keyEvent: function(evt){
      this.socket.emit("x11key", evt);
    }
    
    , x11vidkill: function(vidid){
      this.socket.emit("x11vidkill", vidid);
    }
    
    , getList: function(){
      var def = new Deferred();
      this.socketDef.then(function(socket){
        socket.emit("terminal/getList", function(parList){
          def.resolve(parList);
        });
      });
      return def;
    }
    
    , registerX264StreamFunction: function(fun, par){
      this.x264fun = fun;
      this.socketDef.then(function(socket){
        socket.emit("x264test", par);
      });
      
    }
    
    , stopX264: function(){
      this.socketDef.then(function(socket){
        socket.emit("x264stop");
      });
      
    }
    
    , x264Data: function(frame){
      if (this.x264fun){
        if (!this.x264fun(frame)){
          delete this.x264fun;
        };
      };
    }
    
    , x11size: function(){
      return x11Fun.x11size();
    }
    
  });
  
  
  if (has("server-modules")){
    
    var x11queue = [];
    var x11executing = false;
    
    _handleConnection = function(parSocket, session){
      var socket = parSocket;
      
      
      socket.on("terminal/getList", function(callback){
        terminal.getList(callback);
      });
      
      socket.on("openterminal", function(par, respond){
        if (config.terminal === false){
          respond({
          });
          return;
        };
        console.log("opening terminal");
        
        var def = new Deferred();
        
        if (pty || process.platform == "win32"){
          def.resolve(pty);
        }else{
          console.log("installing");
          npm.load({
            name: "pty.js"
            , onInstall: function(){
              console.log("install..");
              socket.emit("terminal_meta", {
                event: "install"
              });
            }
            , onError: function(e){
              console.log("error..");
              socket.emit("terminal_meta", {
                event: "installerror"
              });
              def.reject();
            }
            , onLoad: function(module){
              console.log("load..");
              terminal.setPty(module);
              pty = module;
              def.resolve(module);
            }
          });
        };
        
        def.then(function(){
          var fun = lang.hitch(terminal, "newTerminal");
          if (par.id !== undefined){
            fun = lang.hitch(terminal, "getTerminal", par.id);
          };
                               
          fun(function(term){
            var termid = term.id;
            var eventId = "terminal" + termid;
            respond({
              termid: termid
            });
            
            term.on("data", function(data){
              socket.emit(eventId, {
                event: "data"
                , data: data
              });
            });
            term.on("resize", function(data){
              socket.emit(eventId, {
                event: "resize"
                , data: data
              });
            });
            socket.on(eventId, function(data){
              try{
              if (data.event == "data"){
                term.write(data.data);
              };
              if (data.event == "resize"){
                term.resize(data.data.x, data.data.y);
              };
              }catch(e){
                console.log(e);
              }
            });
            socket.emit(eventId, {
              event: "ready"
            });
            
          });
        });
      });

      var spawn  = child_process.spawn;
      
      var x11videotool;
      config.get("x11videotool").then(function(par){
        x11videotool = par || "avconv";
      });
      
      config.get("x11terminal", "x11videotool").then(function(x11terminal){
        
        if (!x11terminal){
          return;
        };
        
        
        socket.on("x264test", function(par){
          var i = 0;
          var spawn  = child_process.spawn;
          
          var fps = par.fps || "5";
          var quality = par.q || "5";
          
          x11Fun.x11size().then(function(size){
            
          
            var params = [
              "-re",                   // Real time mode
              "-f","x11grab",          // Grab screen
              "-r",fps,              // Framerate
              "-s", "" + size.x + "x" + size.y,   // Capture size
              //"-s", "1024x768",   // Capture size
              "-i",":0+" + 0 + "," + 0, // Capture offset
              "-g","0",                // All frames are i-frames
              "-me_method","zero",     // Motion algorithms off
              "-flags2","fast",
              "-vcodec", "libx264",      // vp8 encoding / ogg encoding
              "-preset","ultrafast",
              "-tune","zerolatency",
              //"-b:v","100000",             // Target bit rate
              //"-b:v","1M",             // Target bit rate
              "-an",
              //"-crf","20",             // Quality
              "-t", "180", // 3 min
              "-f", "h264"             // File format
            ];
            /*params.push("-qmin");
            params.push("1");             // Quantization
            params.push("-qmax");
            params.push(quality);*/
            params.push("-");                      // Output to STDOUT

            var cmdStr = "";
            cmdStr += x11videotool;
            i = 0;
            for (i = 0; i < params.length; ++i){
              cmdStr += " ";
              cmdStr += params[i];
            };
            console.log(cmdStr);

            //avconv -re -f x11grab -r 12 -s 1024x768 -i :3+0,0 -g 1 -me_method zero -flags2 fast -vcodec libvpx -preset ultrafast -tune zerolatecy -b:v 1M -crf 40 -qmin 5 -qmax 5 -t 180 -f webm -
            //ffmpeg -re -f x11grab -r 5 -s 1024x768 -i :0+0,0 -g 1 -me_method zero -flags2 fast -vcodec libtheora -preset ultrafast -tune zerolatecy -b:v 1M -crf 40 -q:v 6 -t 180 -f ogg -
            var avconv;
            try{
              avconv = spawn(x11videotool, params);
            }catch(e){
              console.log("error 1");
            };
            var killfun = function(){
              console.log("killing ...");
              avconv.kill();
              //delete nodeControl.gpregister.avconv[vidid];
            };
            socket.on("x264stop", killfun);

            //console.log("step 2");
            setTimeout(function(){
              killfun();
            }, 190000);

            i = 0;
            var stream;
            try{
              stream = avconv.stdout;
              var bufAr = [];
              stream.on("data", function(data){
                if (!(data && data.length)){
                  return;
                };
                var foundHit = false;
                var hit = function(offset){
                  foundHit = true;
                  bufAr.push(data.slice(0, offset));
                  socket.emit("x264test", {i: i++, frame: Buffer.concat(bufAr).toString("base64")});
                  bufAr = [];
                  bufAr.push(data.slice(offset));
                };
                
                var b = 0;
                var l = data.length;
                var zeroCnt = 0;
                for (b; b < l; ++b){
                  if (data[b] === 0){
                    zeroCnt++;
                  }else{
                    if (data[b] == 1){
                      if (zeroCnt >= 3){
                        hit(b - 3);
                        break;
                      };
                    };
                    zeroCnt = 0;
                  };
                };
                if (foundHit){
                  //socket.emit("x264test", {i: i++, frame: data.toString("base64")});
                }else{
                  bufAr.push(data);
                };
              });
              stream.on("error", function(err){
                console.log("some stream error");
                console.log(err);
              });
              //stream.pipe(res);
            }catch(e){
              console.log("error 2");
            }

            console.log("step 3");
            try{

            stream.on("end", function(){
              console.log("stream end");
              try{
                killfun();
              }catch(e){
                console.log("error 3");
              }
            });
            stream.on("close", function(){
              console.log("stream close");
              try{
                killfun();
              }catch(e){
                console.log("error 3.5");
              }
            });
            }catch(e){};
        
          });
        });
        
        var lastpos = "";
        var execMouseFun = function(evt){
          var params;
          var xdotool;
          if (evt.type == "mousedown" || evt.type == "mouseup" || evt.type == "mousemove"){
            params = ["mousemove", "" + evt.x, "" + evt.y];
            xdotool = spawn('xdotool', params);
            lastpos = "" + evt.x + " " + evt.y;
            x11executing = true;
            if (evt.type == "mousedown" || evt.type == "mouseup"){
              params = [evt.type, "" + evt.button];
              x11queue.push({
                params: params
                , log: evt.type + "" + evt.x + " " + evt.y
              });
            };
          }else if (evt.params){
            xdotool = spawn('xdotool', evt.params);
            console.log("lastpos " + lastpos);
            console.log(evt.log);
            x11executing = true;
          };
          if (xdotool){
            xdotool.on("exit", function(){
              x11executing = false;
              if (x11queue.length){
                var lastitem = x11queue[x11queue.length - 1];
                x11queue.pop();
                execMouseFun(lastitem);
              };
            });
          }else{
            if (x11queue.length){
              var lastitem = x11queue[x11queue.length - 1];
              x11queue.pop();
              execMouseFun(lastitem);
            };
          };
          
        };
        
        socket.on("x11mouse", function(evt){
          
          if (x11queue.length || x11executing){
            var lastitem = x11queue[x11queue.length - 1];
            if (lastitem && evt.type == "mousemove" && lastitem.type == "mousemove"){
              x11queue.pop();
            };
            x11queue.push(evt);
            return;
          };
          
          execMouseFun(evt);

        });

        var keyMap = {
          "BACKSPACE": "BackSpace"
          , "LEFT_ARROW": "Left"
          , "RIGHT_ARROW": "Right"
          , "UP_ARROW": "Up"
          , "DOWN_ARROW": "Down"
          , "DELETE": "Delete"
          , "SPACE": "space"
          , "ENTER": "Return"
          , "TAB": "Tab"
          , "CTRL": "ctrl"
          , "copyKey": "ctrl"
          , "ALT": "alt"
          , "CAPS_LOCK": "Caps_Lock"
        };

        socket.on("x11key", function(evt){

          var params1;
          var params2;

          //evt.charOrCode = "s";
          //console.log(evt.charOrCode);
          //console.log(typeof evt.charOrCode);
          var charStr = evt.charOrCode;
          if (keyMap[charStr]){
            charStr = keyMap[charStr];
          };
          //if (evt.charOrCode > 0){
          //  charStr = String.fromCharCode(evt.charOrCode);
          //};
          //console.log(charStr);

          if (!charStr){
            return;
          };

          if (evt.type == "keydown"){
            params1 = ["keydown", charStr];
            //params2 = ["keyup", charStr];

          }else if (evt.type == "keyup"){
            params1 = ["keyup", "" + charStr];

          };
          var do2;

          if (params1){
            //console.log(params1);
            var xdotool = spawn('xdotool', params1);
            xdotool.on("exit", function(){
              //console.log("exit");
            });
          };
        });

        require(["main/nodeControl"], function(nodeControl){
          socket.on("x11vidkill", function(vidid){
            console.log("vidkill event");
            var killfun = nodeControl.gpregister.avconv[vidid];
            if (killfun){
              console.log("calling fun");
              killfun();
            };
          });
        });
      });
    };
  }else{
    _handleConnection = function(socket){
      var self = this;
      this.socket = socket;
      this.socketDef.resolve(socket);
      this.socketDef = new Deferred();
      this.socketDef.resolve(socket);
      this.socket.on("terminalListChange", function(parList){
        if (self.wgt){
          self.wgt.listChanged(parList);
        };
      });
      this.socket.on("x264test", function(data){
        console.log(data.i);
        self.x264Data(data.frame);
      });
    };
  };
  
  return Terminal;
  
});
