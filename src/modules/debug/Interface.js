// server only

define([
  "dojo/_base/declare"
  , "sol/node/debug/Protocol"
  , "dojo/_base/lang"
  , "dojo/Deferred"
  , "dojo/_base/array"
  , "dojo/aspect"
  , "sol/mixin/events"
], function(
  declare
  , Protocol
  , lang
  , Deferred
  , array
  , aspect
  , eventsMixin
){
  var Debugger = declare([eventsMixin], {
    
    constructor: function(par){
      declare.safeMixin(this, par);
      var self = this;
      this.socket = par.socket;
      //console.log("listening: " + self.socketEventName("event"));
      this._socketEventHandler = this.socket.on(self.socketEventName("event"), function(parWhat, parData, parCallback){
        //console.log("event:" + parWhat);
        //console.log(parWhat);
        self.emit(parWhat, {
          data: parData
          , callback: parCallback || function(){
            console.log("missing callback for " + parWhat);
          }
        });
      });
      if (this.debuggerObj){
        this._eventBindings = [];
        
        
        this._eventBindings.push(this.on("getState", function(par){
          par.callback(self.debuggerObj.getState());
        }));
        
        this._eventBindings.push(this.debuggerObj.on("state", function(par){
          //console.log("stateevent " + par);
          self._remoteEmit("state", par);
        }));
        
        this._eventBindings.push(this.on("getBreakPoint", function(par){
          par.callback(self.debuggerObj.getBreakPoint());
        }));
        
        this._eventBindings.push(this.on("getTrace", function(par){
          self.debuggerObj.getTrace().then(function(trace){
            console.log("have trace");
            par.callback(trace);
          });
        }));
        
        this._eventBindings.push(this.on("getSource", function(par){
          self.debuggerObj.getSource(par.data.id, par.data.force).then(par.callback);
        }));
        
        this._eventBindings.push(this.on("setExceptionBreak", function(par){
          self.debuggerObj.setExceptionBreak(par.data);
        }));
        
        this._eventBindings.push(this.debuggerObj.on("destroy", function(){
          self.destroy();
        }));
        this._eventBindings.push(this.debuggerObj.on("break", function(par){
          self._remoteEmit("break", par);
        }));
        this._eventBindings.push(this.on("cont", function(par){
          self.debuggerObj.cont(par.data);
        }));
      }else{
        //debugger;
        par.socket.emit("debug/createInterface", par.debugId, function(){
          self.emit("ready");
        });
      };
    }
    
    , setExceptionBreak: function(par){
      this._remoteEmit("setExceptionBreak", par);
    }
    
    , socketEventName: function(parEvent){
      return "debug/" + this.debugId + "/" + parEvent;
    }
    
    , destroy: function(){
      this._socketEventHandler.remove();
      array.forEach(this._eventBindings, function(binding){
        binding.remove();
      });
      if (this.debuggerObj){
        this._remotEmit("destroy");
        delete this.debuggerObj;
      };
      this.inherited(arguments);
    }
    
    , getBreakPoint: function(){
      var def = new Deferred();
      this._remoteEmit("getBreakPoint", {
      }, function(res){
        def.resolve(res);
      });
      return def.promise;
    }
    
    , getTrace: function(){
      var def = new Deferred();
      this._remoteEmit("getTrace", {
      }, function(res){
        def.resolve(res);
      });
      return def.promise;
    }
    
    , getState: function(){
      var def = new Deferred();
      this._remoteEmit("getState", {
      }, function(res){
        def.resolve(res);
      });
      return def.promise;
    }
    
    , cont: function(parStep){
      this._remoteEmit("cont", parStep);
    }
    
    , _remoteEmit: function(parWhat, parData, parCallback){
      //console.log("emitting " + this.socketEventName("event"));
      this.socket.emit(this.socketEventName("event"), parWhat, parData, parCallback);
    }
    
    , getSource: function(id, parForce){
      var def = new Deferred();
      this._remoteEmit("getSource", {
        id: id
        , force: parForce
      }, function(res){
        def.resolve(res);
      });
      return def.promise;
    }
    
  });
  return Debugger;
  
});
