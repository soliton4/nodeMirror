// server only

define([
  "dojo/_base/declare"
  , "dojo/_base/lang"
  , "dojo/Deferred"
], function(
  declare
  , lang
  , Deferred
){
  var evented = declare([], {
    
    constructor: function(par){
      this._events = {};
    }
    
    , emit: function(){
      
    }
    
  });
  return evented;
});