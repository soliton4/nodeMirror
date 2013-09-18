define([
  "dojo/_base/declare"
  , "dojo/request/xhr"
  , "dojo/_base/lang"
  , "dojo/json"
], function(
  declare
  , xhr
  , lang
  , json
){
  
  var ioUrl = window.location.origin;
  
  var opts = {
    'force new connection': true
    /*connect: function(){
      console.log("-connect");
    }
    , connect_error: function(){
      console.log("-connect_error");
    }
    , connect_timeout: function(){
      console.log("-connect_timeout");
    }
    , reconnect: function(){
      console.log("-reconnect");
    }
    , reconnect_error: function(){
      console.log("-reconnect_error");
    }
    , reconnect_failed: function(){
      console.log("-reconnect_failed");
    }*/
  };
  
  var socket = io.connect(ioUrl, opts);
  var sceduled = false;
  
  var initSocket;
  var reconnect = function(){
    xhr("/reconnect"
          , {
			method: "PUT"
            , data: json.stringify({
              reconnect: true
            })
			, handleAs: "json"
            , headers: {
              "Content-Type": "application/json"
              //, "Content-Encoding": "ISO-8859-1"
              //, "X-Method-Override": "FANCY-GET"
            }			
    }).then(function(p){
      setTimeout(function(){
        socket = io.connect(ioUrl, opts);
        initSocket(socket);
        sceduled = false;
      }, 500);
    }, function(p){ 
      setTimeout(function(){reconnect(socket);}, 5000);
    });  
  };
  
  initSocket = function(){
    var fun = function(parWhat){
      //console.log(parWhat);
      try{
        socket.disconnect('unauthorized');
        socket.disconnect();
        socket.socket.disconnect();
      }catch(e){
        console.log(e);
      };
      if (sceduled){
        return;
      };
      sceduled = true;
      setTimeout(function(){reconnect(socket);}, 500);
    };
    socket.on("disconnect", lang.hitch({}, fun, "disconnect"));
    /*socket.on("connect_failed", lang.hitch({}, fun, "connect_failed"));
    socket.on("reconnect_failed", lang.hitch({}, fun, "reconnect_failed"));
    socket.on("error", lang.hitch({}, fun, "error"));*/
    socket.on("tryagain", lang.hitch({}, fun, "tryagain"));
  };
  initSocket(socket);

  return {
    on: function(){
      socket.on.apply(socket, arguments);
    }
    , emit: function(){
      socket.emit.apply(socket, arguments);
    }
  };
  
});