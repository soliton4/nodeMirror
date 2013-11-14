define([
  "dojo/_base/declare"
  , "dojo/request/xhr"
  , "dojo/_base/lang"
  , "dojo/json"
  , "main/connection"
  , "dojo/_base/array"
], function(
  declare
  , xhr
  , lang
  , json
  , connection
  , array
){
  
  var webpath = window._nodeMirrorGlobal.webpath;
  var ioUrl = window.location.origin; // + webpath;
  
  var opts = {
    'force new connection': true
    , resource: webpath.substr(1) + "socket.io"
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
  var connected = false;
  
  var _on = {
    "connect": []
  };
  
  var initSocket;
  var reconnect = function(){
    xhr(webpath + "reconnect"
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
    
    socket.on("connect", function(){
      connection.newConnection(socket);
      array.forEach(_on.connect, function(fun){
        try{
          fun(socket);
        }catch(e){
          console.log(e);
        };
      });
      connected = true;
    });
    
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
    on: function(parWhat, parFun){
      if (parWhat == "connect"){
        _on.connect.push(parFun);
        if (connected){
          try{
            parFun(socket);
          }catch(e){
            console.log(e);
          };
        };
        return;
      };
      socket.on.apply(socket, arguments);
    }
    , emit: function(){
      socket.emit.apply(socket, arguments);
    }
  };
  
});