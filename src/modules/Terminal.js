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
  
  
  var Terminal = declare([], {
    //, keepBuildRendering: true
    
    constructor: function(){
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
    
  });
  
  
  if (has("server-modules")){
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
      
      config.get("x11terminal").then(function(x11terminal){
        if (!x11terminal){
          return;
        };

        socket.on("x11mouse", function(evt){

          var params1;
          var params2;

          if (evt.type == "mousedown" || evt.type == "mouseup" || evt.type == "mousemove"){
            params1 = ["mousemove", "" + evt.x, "" + evt.y];
          };
          if (evt.type == "mousedown"){
            params2 = ["mousedown", "" + evt.button];
          }else if (evt.type == "mouseup"){
            params2 = ["mouseup", "" + evt.button];
          };
          var do2;

          if (params1){
            //console.log(params1);
            var xdotool = spawn('xdotool', params1);
            xdotool.on("exit", function(){
              //console.log("exit");
              if (params2 && !do2){
                do2 = true;
                setTimeout(function(){
                  //console.log(params2);
                  xdotool = spawn('xdotool', params2);
                }, 0);
              };
            });
          };
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
        };

        socket.on("x11key", function(evt){

          var params1;
          var params2;

          //evt.charOrCode = "s";
          console.log(evt.charOrCode);
          //console.log(typeof evt.charOrCode);
          var charStr = evt.charOrCode;
          if (keyMap[charStr]){
            charStr = keyMap[charStr];
          };
          //if (evt.charOrCode > 0){
          //  charStr = String.fromCharCode(evt.charOrCode);
          //};
          console.log(charStr);

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
            console.log(params1);
            var xdotool = spawn('xdotool', params1);
            xdotool.on("exit", function(){
              //console.log("exit");
              if (params2 && !do2){
                do2 = true;
                setTimeout(function(){
                  console.log(params2);
                  xdotool = spawn('xdotool', params2);
                }, 100);
              };
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
    };
  };
  
  return Terminal;
  
});
