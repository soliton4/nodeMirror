define([
  "dojo/_base/declare"
  , "dojo/_base/array"
], function(
  declare
  , array
){
  
  
  var _on = {};
  
  var connection = {
    
    newConnection: function(socket, session){
      if (_on.connect){
        array.forEach(_on.connect, function(fun){
          try{
            fun(socket, session);
          }catch(e){
            console.log(e);
          };
        });
      };
    }
    
    , on: function(parWhat, parFun){
      if (!_on[parWhat]){
        _on[parWhat] = [];
      };
      _on[parWhat].push(parFun);
    }
  };
  
  return connection;
  
});