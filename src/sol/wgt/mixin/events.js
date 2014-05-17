// server only

define([
  "dojo/_base/declare"
  , "dojo/_base/lang"
  , "dojo/aspect"
], function(
  declare
  , lang
  , aspect
){
  
  
  var events = declare([], {
    
    constructor: function(par){
      this._events = {};
    }
    
    , emit: function(parEvent, parData){
      try{
        //console.log("emitting " + parEvent);
        //console.log(parData);
        this._events[parEvent](parData);
      }catch(e){
        if (!this._events[parEvent]){
          this._events[parEvent] = function(){};
          return;
        };
        console.log("event emit error: " + parEvent);
        console.log(e);
      };
    }
    
    , on: function(parEvent, parFun){
      return aspect.after(this._events, parEvent, parFun, true);
    }
    
  });
  return events;
});