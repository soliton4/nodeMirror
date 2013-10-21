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
      connection.on("connect", function(socket, session){
        self.handleConnection(socket, session);
      });
      self.handleConnection = _handleConnection;
    }
    
    , provideSideBarWidgetPs: function(){
      var def = new Deferred();
      var self = this;
      if (self.wgt){
        def.resolve(self.wgt);
      }else{
        require(["main/clientOnly!modules/terminal/Wgt"], function(Wgt){
          self.wgt = new Wgt({
            module: self
          });
          def.resolve(self.wgt);
        });
      };
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
    
    , getList: function(){
      var def = new Deferred();
      this.socket.emit("terminal/getList", function(parList){
        def.resolve(parList);
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
      
    };
  }else{
    _handleConnection = function(socket){
      var self = this;
      this.socket = socket;
      this.socket.on("terminalListChange", function(parList){
        if (self.wgt){
          self.wgt.listChanged(parList);
        };
      });
    };
  };
  
  return Terminal;
  
});



/*  
    
    , newConnection: function(parSocket){
      this.connections.push(parSocket);
      
      var socket = parSocket;
      socket.on("openterminal", function(par, respond){
        if (nodeMirrorConfig.terminal === false){
          respond({
          });
          return;
        };
        console.log("opening terminal");
        
        var def = new Deferred();
        
        if (pty || process.platform == "win32"){
          console.log("resoliving");
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
          terminal.newTerminal(function(term){
            var termid = "term" + term.id;
            respond({
              termid: termid
            });
            
            term.onData = function(data){
              socket.emit(termid, data);
            };
            socket.on(termid, function(data){
              term.write(data);
            });
            socket.on(termid + "_resize", function(size){
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
    }
  };
});



        /*if (par.mode == "dbg"){
          var dbgSock = new net.Socket();
          
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
        };*/
