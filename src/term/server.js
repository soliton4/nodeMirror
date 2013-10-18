define([
  "dojo/Deferred"
, "main/config"
, "sol/node/npm"
, "dojo/node!../../../lib/terminal.js"
], function(
  Deferred
  , nodeMirrorConfig
  , npm
  , terminal
){
  var pty;
  
  return {
    connections: []
    
    , newConnection: function(parSocket){
      this.connections.push(parSocket);
      
      var socket = parSocket;
      socket.on("openterminal", function(par, respond){
        if (nodeMirrorConfig.terminal === false){
          respond({
          });
          return;
        };
        console.log("opening terminal");
        
        var def = new Deferred();
        
        if (pty || process.platform == "win32"){
          def.resolve(pty);
        }else{
          npm.load({
            name: "pty.js"
            , onInstall: function(){
              socket.emit(termid + "_meta", {
                event: "install"
              });
            }
            , onError: function(e){
              socket.emit(termid + "_meta", {
                event: "installerror"
              });
              def.reject();
            }
            , onLoad: function(module){
              terminal.setPty(module);
              pty = module;
              def.resolve(module);
            }
          });
        };
        
        def.then(function(){
          terminal.newTerminal(function(term){
            var termid = "term" + term.id;
            respond({
              termid: termid
            });
            
            term.onData = function(data){
              socket.emit(termid, data);
            };
            socket.on(termid, function(data){
              term.write(data);
            });
            socket.on(termid + "_resize", function(size){
              try{
                term.resize(size.x, size.y);
              }catch(e){
                console.log(e);
              }
            });
            socket.emit(termid + "_meta", {
              event: "ready"
            });
            
          });
        });
      });
    }
  };
});



        /*if (par.mode == "dbg"){
          var dbgSock = new net.Socket();
          
          dbgSock.connect(5858, function(par1, par2){
            console.log("listener evt");
            //console.log(par1);
          });
          var dbgProt = new debugProtocol();
          dbgProt.on("break", function(par){
            socket.emit(termid, {
              type: "break"
              , body: par
            });
          });
          dbgSock.on("data", function(data){
            dbgProt.write(data);
          });
          socket.emit(termid + "_meta", {
            event: "ready"
          });
          
          socket.on(termid, function(msg, callBack){
            if (msg.type == "source"){
              dbgProt.getSource({id: msg.id}).then(function(parRes){
                console.log(parRes);
                callBack(parRes);
              });
            };
            if (msg.type == "continue"){
              dbgProt.cont({step: msg.step}).then(function(parRes){
                console.log(parRes);
                callBack(parRes);
              });
            };
          });
          dbgProt.on("data", function(par){
            console.log("writing:");
            console.log(par);
            console.log("------------------------");
            dbgSock.write(par);
          });
          //type: "source"
          //, id: source.id
          
          return;
        };*/
