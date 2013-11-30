// server only

define([
  "dojo/_base/declare"
  , "sol/node/debug/Protocol"
  , "dojo/_base/lang"
  , "dojo/Deferred"
  , "dojo/node!net"
], function(
  declare
  , Protocol
  , lang
  , Deferred
  , net
){
  var Debugger = declare([], {
    
    port: 5858
    
    , type: "js"
    
    , reconnect: 5000 // every 5 sec
    
    , constructor: function(par){
      this.sources = [];
      
      declare.safeMixin(this, par);
      var self = this;
      
      this.setState("offline");
      
      this.connect();
      
    }
    
    , connect: function(){
      var self = this;
      var def = new Deferred();
      
      console.log("connecting to port: " + self.port);
      
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
      
      try{
        this.dbgSock.connect(this.port, function(){
          console.log("connected to port: " + self.port);
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
      if (self.reconnect){
        console.log("connection refused - reconnect in: " + self.reconnect);
        this.setState("connecting");
        setTimeout(lang.hitch(this, "connect"), self.reconnect);
        return true;
      }else{
        console.log("connection refused");
        this.setState("failed");
        return false;
      };
      
    }
    
    , _connect: function(){
      
      this.setState("running");
      
      this.protocol = new Protocol();
      
      this.protocol.on("break", function(par){
        self._setState("break");
        self._emit("break", par);
      });
      this.dbgSock.on("data", function(data){
        self.protocol.write(data);
      });
      
      this.protocol.on("data", function(par){
            console.log("writing:");
            console.log(par);
            console.log("------------------------");
            self.dbgSock.write(par);
      });
      
    }
    
    , _emit: function(){}
    
    , setState: function(parState){
      this._state = parState;
      this._emit("state", parState);
    }
    
    , cont: function(parStep){
      if (this._state != "break"){
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
          ret.resolve(parRes);
        });
      };
      return ret;
    }
    
  });
  return Debugger;
});