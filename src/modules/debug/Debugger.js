// server only

define([
  "dojo/_base/declare"
  , "sol/node/debug/Protocol"
  , "dojo/_base/lang"
  , "sol/node/debug/Protocol"
  , "dojo/Deferred"
], function(
  declare
  , Protocol
  , lang
  , Deferred
){
  var Debugger = declare([], {
    
    port: 5858
    
    , constructor: function(par){
      this.sources = [];
      
      declare.safeMixin(this, par);
      var self = this;
      
      this.setState("offline");
      
      this.protocol = new Protocol();
      
      this.dbgSock = new net.Socket();
      
      this.dbgSock.connect(this.port, function(par1, par2){
        console.log("debug listener started on port: " + self.port);
      });
      
      this.protocol.on("break", function(par){
        self._setState("break");
        self._emit("break", par);
      });
      this.dbgSock.on("data", function(data){
        self.protocol.write(data);
      });
      
      this.dbgProt.on("data", function(par){
            console.log("writing:");
            console.log(par);
            console.log("------------------------");
            self.dbgSock.write(par);
      });
      
    }
    
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