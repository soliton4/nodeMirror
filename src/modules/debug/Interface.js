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
    
    constructor: function(par){
      declare.safeMixin(this, par);
      var self = this;
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