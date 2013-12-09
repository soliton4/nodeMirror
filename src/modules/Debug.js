define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/config"
  , "main/connection"
  , "main/serverOnly!./debug/Debugger"
  , "modules/base/Base"
  , "modules/debug/Interface"
  
], function(
  declare
  , Deferred
  , has
  , solPromise
  , array
  , lang
  , solString
  , config
  , connection
  , Debugger
  , Base
  , Interface
  
){
  
  var _handleConnection;
  
  var getDebugId = function(options){
    return options.type + options.port;
  };
  
  var Debug = declare([Base], {
    //, keepBuildRendering: true
    remoteFunctions: lang.mixin({}, Base.remoteFunctions, { getList: true} )
    
    , constructor: function(){
      var self = this;
      self.debuggers = {};
      this.socketDef = new Deferred();
      self.handleConnection = _handleConnection;
      connection.on("connect", function(socket, session){
        self.handleConnection(socket, session);
      });
      self.interfaces = {};
    }
    
    , provideSideBarWidgetPs: function(){
      var def = new Deferred();
      var self = this;
      config.get("debug").then(function(debug){
        if (debug === false){
          def.reject();
          return;
        };
        if (self.wgt){
          def.resolve(self.wgt);
        }else{
          require(["main/clientOnly!modules/debug/Wgt"], function(Wgt){
            self.wgt = new Wgt({
              module: self
            });
            def.resolve(self.wgt);
          });
        };
      });
      return def;
    }
    
    , createDebugger: function(options){
      //console.log(options);
      var self = this;
      var def = new Deferred();
      this.socket.emit("debug/create", options, function(list){
        def.resolve(list);
      });
      return def;
    }
    
    , openDebugger: function(parId){
      
      var def = new Deferred();
      var self = this;
      
      if (self.interfaces[parId]){
        def.resolve(self.interfaces[parId]);
        return def;
      };
      
      this.socketDef.then(function(socket){
        self.interfaces[parId] = new Interface({
          debugId: parId
          , socket: socket
        });
        def.resolve(self.interfaces[parId]);
      });
      
      return def;
    }
    
    , getList: function(){
      var def = new Deferred();
      var res = {};
      for (var d in this.debuggers){
        res[d] = {
          type: this.debuggers[d].type
          , port: this.debuggers[d].port
        };
      };
      def.resolve(res);
      return def;
    }
    
  });
  
  
  if (has("server-modules")){
    _handleConnection = function(parSocket, session){
      session.interfaces = {};
      
      //console.log(parSocket);
      
      var self = this;
      var socket = parSocket;
      
      socket.on("debug/create", function(options, callback){
        //console.log("createDebugger");
        var debugId = getDebugId(options);
        if (!self.debuggers[debugId]){
          self.debuggers[debugId] = new Debugger(options);
        };
        self.getList().then(callback);
      });
      
      socket.on("debug/createInterface", function(parDebugId, readyFun){
        //console.log("createInterface");
        if (session.interfaces[parDebugId]){
          console.log("break1");
          readyFun(true);
          return;
        };
        if (!self.debuggers[parDebugId]){
          console.log("break2");
          readyFun(false);
          return;
        }
        var interface = new Interface({
          socket: socket
          , debugId: parDebugId
          , debuggerObj: self.debuggers[parDebugId]
        });
        var handler = interface.on("ready", function(){
          console.log("readyfun");
          readyFun(true);
          handler.remove();
        });
      });
      
      socket.on("opendebugger", function(par, respond){
        if (config.debug === false){
          respond({
          });
          return;
        };
        console.log("opening debugger");
        
        var def = new Deferred();
        
        require([
          "dojo/node!net"
        ], function(
          net){
          var dbgSock = new net.Socket();
          
        
          dbgSock.connect(5858, function(par1, par2){
            console.log("listener evt");
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
        
        });
        
      });
      
    };
  }else{
    _handleConnection = function(socket){
      var self = this;
      this.socket = socket;
      // the connection could be reopened
      this.socketDef.resolve(socket);
      this.socketDef = new Deferred();
      this.socketDef.resolve(socket);
      
    };
  };
  
  return Debug;
  
});



/*  
    

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
