define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/config"
  , "main/serverOnly!sol/node/npm"
  , "main/serverOnly!dojo/node!../../../lib/terminal.js"
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
  , npm
  , terminal
  , connection
){
  
  var pty;
  
  var _handleConnection;
  
  var Search = declare([], {
    //, keepBuildRendering: true
    
    constructor: function(){
      var self = this;
    }
    
  });
  
  
  if (has("server-modules")){
  }else{
  };
  
  return Terminal;
  
});



