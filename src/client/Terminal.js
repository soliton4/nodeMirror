define([
  "dojo/_base/declare"
  , "term/TerminalWgt"
  , "dijit/layout/BorderContainer"
  , "client/connection"
  , "sol/wgt/Text"
], function(
  declare
  , Terminal
  , BorderContainer
  , connection
  , Text
){
  return declare([BorderContainer], {
    title: "Terminal"
    , "class": "terminalTab"
    , buildRendering: function(){
      this.inherited(arguments);
      this.terminal = new Terminal({
        region: "center"
        
      });
      this.addChild(this.terminal);
      var self = this;
      var term = this.terminal;
      connection.emit("openterminal", {
        mode: this.mode
      }, function(par){
        var termid = par.termid;
        
        var installWgt;
        
        connection.on(termid + "_meta", function(meta){
          if (meta.event == "install"){
            installWgt = new Text({
              text: "please wait while pty.js is being installed ..."
              , region: "top"
              , "class": "message"
            });
            self.addChild(installWgt);
            self.own(installWgt);
          };
          if (meta.event == "installerror"){
            if (installWgt){
              installWgt.destroy();
            };
            errorWgt = new Text({
              text: "installation of pty.js was not successful ..."
              , region: "top"
              , "class": "message"
            });
            self.addChild(errorWgt);
            self.own(errorWgt);
          };
          if (meta.event == "ready"){
            if (installWgt){
              installWgt.destroy();
            };
            self.resize();
            term.emitResize();
          };
        });
        
        term.on("resize", function(size){
          connection.emit(termid + "_resize", size);
        });
        connection.on(termid, function(data){
          term.write(data);
        });
        term.on("data", function(data){
          connection.emit(termid, data);
        });
      });
    }
  });
});