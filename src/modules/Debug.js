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
){
  
  var _handleConnection;
  
  var Debug = declare([], {
    //, keepBuildRendering: true
    
    constructor: function(){
      var self = this;
      this.socketDef = new Deferred();
      self.handleConnection = _handleConnection;
      connection.on("connect", function(socket, session){
        self.handleConnection(socket, session);
      });
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
    
    , openDebugger: function(parId){
      var def = new Deferred();
      var self = this;
      this.socket.emit("opendebugger",  {
        mode: "debug"
        , id: parId
      }, function(response){
        if (response.dbgid === undefined){
          def.reject();
          return;
        };
        def.resolve(new DebugInterface({
          dbgid: response.dbgid
          , socket: self.socket
        }));
      });
      return def;
    }
    
    , getList: function(){
      var def = new Deferred();
      this.socketDef.then(function(socket){
        socket.emit("debug/getList", function(parList){
          def.resolve(parList);
        });
      });
      return def;
    }
    
  });
  
  
  if (has("server-modules")){
    _handleConnection = function(parSocket, session){
      var socket = parSocket;
      
      socket.on("debug/getList", function(callback){
        
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
      
      this.socket.on("debug/listChange", function(parList){
        if (self.wgt){
          self.wgt.listChanged(parList);
        };
      });
    };
  };
  
  return Terminal;
  
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
