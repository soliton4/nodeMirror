define([
  "dojo/_base/declare"
], function(
  declare
){
  
  var ioUrl = window.location.origin;
  
  var socket = io.connect(ioUrl);
  
  return {
    on: function(){
      socket.on.apply(socket, arguments);
    }
    , emit: function(){
      socket.emit.apply(socket, arguments);
    }
  };
  
});