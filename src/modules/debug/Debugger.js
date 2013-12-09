// server only

define([
  "dojo/_base/declare"
  , "sol/node/debug/Protocol"
  , "dojo/_base/lang"
  , "dojo/Deferred"
  , "dojo/node!net"
  , "./Interface"
  , "sol/mixin/events"
], function(
  declare
  , Protocol
  , lang
  , Deferred
  , net
  , Interface
  , eventsMixin
){
  var Debugger = declare([eventsMixin], {
    
    port: 5858
    
    , type: "js"
    
    , exceptionBreak: "all"
    
    , reconnect: 5000 // every 5 sec
    
    , constructor: function(par){
      this.sources = [];
      this.interfaces = [];
      
      declare.safeMixin(this, par);
      var self = this;
      
      this.setState("offline");
      
      this.connect();
      
    }
    
    , connect: function(){
      var self = this;
      self._reconnect_called = false;
      
      var def = new Deferred();
      
      //console.log("connecting to port: " + self.port);
      
      this.setState("connecting");
      
      if (this.protocol){
        this.protocol.destroy();
        delete this.protocol;
      };
      
      if (this.dbgSock){
        this.dbgSock.destroy();
        delete this.dbgSock;
      };
      
      this.dbgSock = new net.Socket();
      
      this.dbgSock.on("error", function(){
        if (!self._reconnect()){
          def.reject(this);
        };
      });
      
      this.dbgSock.on("close", function(){
        console.log("close event");
        self._reconnect();
      });
      
      try{
        this.dbgSock.connect(this.port, function(){
          //console.log("connected to port: " + self.port);
          self._connect();
          def.resolve(self);
        });
      }catch(e){
        if (!self._reconnect()){
          def.reject(this);
        };
      };
      return def.promise;
    }
    
    , _reconnect: function(){
      var self = this;
      if (self._reconnect_called){
        return true;
      };
      if (self.reconnect){
        self._reconnect_called = true;
        //console.log("connection refused - reconnect in: " + self.reconnect);
        this.setState("connecting");
        setTimeout(lang.hitch(this, "connect"), self.reconnect);
        return true;
      }else{
        //console.log("connection refused");
        this.setState("failed");
        return false;
      };
      
    }
    
    , getBreakPoint: function(){
      return this.breakpoint;
    }
    
    , _connect: function(){
      
      console.log("connected");
      
      this.setState("connected");
      var self = this;
      
      this.protocol = new Protocol();
      
      this.protocol.on("break", function(par){
        self.setState("break");
        self.protocol.setFrame(0).then(function(par){
          self.breakpoint = {
            frames: [par]
          };
          self.emit("break", self.breakpoint);
        });
        
      });
      
      this.protocol.on("exception", function(par){
        self.setState("exception");
        self.exception = par;
        self.protocol.setFrame(0).then(function(par){
          self.breakpoint = {
            frames: [par]
            , exception: par
          };
          self.emit("break", self.breakpoint);
        });
        
      });
      
      
      this.dbgSock.on("data", function(data){
        console.log("data:");
        console.log(data.toString());
        console.log("------------------------");
        self.protocol.write(data);
      });
      
      this.protocol.on("data", function(par){
        console.log("writing:");
        console.log(par);
        console.log("------------------------");
        self.dbgSock.write(par);
      });
      
      setTimeout(function(){
        self.initialize();
        self.protocol.version({
        }).then(function(par){
          //console.log("version: ------------------");
          //console.log(par);
          if (par.running){
            self.setState("running");
          }else{
            self.setState("break");
            self.protocol.setFrame(0).then(function(par){
              self.breakpoint = {
                frames: [par]
              };
              self.emit("break", self.breakpoint);
            });
          };
        });
      }, 10);
    }
    
    , setState: function(parState){
      this._state = parState;
      this.emit("state", parState);
    }
    
    , getState: function(){
      return this._state;
    }
    
    , initialize: function(){
      this.setExceptionBreak(this.exceptionBreak);
    }
    
    , setExceptionBreak: function(parType){
      this.exceptionBreak = parType;
      if (parType){
        if (parType == "all"){
          //this.protocol.setExceptionBreak({type: "uncaught", enabled: true});
          this.protocol.setExceptionBreak({type: "all", enabled: true});
          
        }else{
          //this.protocol.setExceptionBreak({type: "all", enabled: false});
          this.protocol.setExceptionBreak({type: "uncaught", enabled: true});
          
        };
        
      }else{
        this.protocol.setExceptionBreak({type: "all", enabled: false});
        //this.protocol.setExceptionBreak({type: "uncaught", enabled: false});
        
      };
    }
    
    , cont: function(parStep){
      if (this._state != "break" && this._state != "exception"){
        return;
      };
      this.setState("run");
      this.protocol.cont({step: parStep});
    }
    
    , getSource: function(id, parForce){
      var ret = this.sources[id];
      if (!ret || parForce){
        ret = new Deferred();
        this.sources[id] = ret;
        var self = this;
        this.protocol.getSource({id: id}).then(function(parRes){
          console.log("source arrives !!!");
          ret.resolve(parRes);
        });
      };
      return ret;
    }
    
  });
  return Debugger;
});